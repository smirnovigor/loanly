class InvestmentObserver {

    constructor(){
        this.isActive = false;
        this.subscribeToChanges();
    }

    subscribeToChanges(){
        var self = this;

        Investments.find().observeChanges({
            added: function(id, investment){
                // run hook outside current stack
                Meteor.setTimeout(function(){
                    if(self.isActive){
                        self.investmentAfterInsertHook(investment);
                    }
                });
            }
        })
    }

    /**
     * activated from Meteor.startup()
     */
    activate(){
        this.isActive = true;
    }

    investmentAfterInsertHook(investment){

        var myPart = investment.amount;
        var myPartNegative = myPart * (-1);
        var investor = Meteor.users.findOne(investment.investorId);
        var loan = Loans.findOne(investment.loanId);
        var investmentTotalAmount = loan.investments.reduce(function(memo, elem){return memo + elem.amount;}, 0);

        var updateObject = {$push: {investments: {userId: investment.investorId, amount:myPart}}};
        this.createNotification(loan.userId, 'You just got investment ' + accounting.formatMoney(myPart, '₪') + ' from ' + investor.username);


        if(investmentTotalAmount + myPart >= loan.amount){
            // notify all investors about active loan state
            var investors = _.pluck(loan.investments, 'userId');
            investors.push(investment.investorId);

            this.createNotification(investors, 'Your invested loan ' + loan.title + ' is completed now');

            // notify loaner about his loan state change
            this.createNotification(loan.userId, 'Your loan ' + loan.title + ' is completed now');

            // notify loaner that his balance has changed
            this.createNotification(loan.userId, 'Your balance has been changed on ' + accounting.formatMoney(loan.amount, '₪') + ' from completed loan ' + loan.title);

            Meteor.users.update(loan.userId, {$inc: {balance: loan.amount}});

            // notify investor that his balance has changed
            this.createNotification(investment.investorId, 'Your balance has been changed on ' + accounting.formatMoney(myPartNegative, '₪'));

            Meteor.users.update(investment.investorId, {$inc: {balance: myPartNegative}});

            updateObject.$set =  {status: 'completed'};
        }

        Loans.update(loan._id, updateObject);
    }

    createNotification(receiver, msg){

        var receivers = Array.isArray(receiver) ? receiver : [receiver];

        receivers.forEach(function(reciverId){
            Notifications.insert({
                receiverId: reciverId,
                message: msg
            });
        });
    }
}

var io = new InvestmentObserver();

Meteor.startup(function(){
    io.activate();
});