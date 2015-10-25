class InvestmentObserver {

    constructor(){
        this.subscribeToChanges();
    }

    subscribeToChanges(){
        var self = this;

        Investments.find().observeChanges({
            added: function(id, investment){

                // run hook outside current stack
//                Meteor.setTimeout(function(){
//                    self.investmentAfterInsertHook(investment);
//                });
            }
        })
    }

    investmentAfterInsertHook(investment){
        // add investment to Loans
        // change status if needed
        // add notification

        var myPart = investment.amount;
        var investorUsername = Meteor.user().username;
        var loan = Loans.findOne(investment.loanId);
        var investmentTotalAmount = loan.investments.reduce(function(memo, elem){return memo + elem.amount;}, 0);

        var updateObject = {$push: {investments: {userId: investment.investorId, amount:myPart}}};

        if(investmentTotalAmount + myPart >= loan.amount){
            // notify all investors about active loan state
            var investors = _.pluck(loan.investments, 'userId');
            this.createNotification(investors, 'Your invested loan [' + loan.title + '](' + loan._id + ') is active now!');

            // notify loaner about his loan state change
            this.createNotification(loan.userId, 'Your loan [' + loan.title + '](' + loan._id + ') is active now!');

            updateObject.$set =  {status: 'active'};
        }

        Loans.update(loan._id, updateObject);
        this.createNotification(loan.userId, 'You just got investment ' + accounting.formatMoney(myPart, '₪') + ' from ' + investorUsername);
    }

    createNotification(receiver, msg){

        var receivers = receiver.length ? receiver : [receiver];

        var notifications = receivers.map(function(reciver){
            return {
                receiverId: reciver,
                message: msg
            };
        });

        Notifications.insert(notifications);
    }
}

new InvestmentObserver();