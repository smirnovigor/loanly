Template.loanItem.helpers({
    isOwner : function(){
        return this.userId === Meteor.userId();
    },
    isWaiting : function(){
        return this.status === 'waiting';
    },
    isFinished : function(){
        return this.status === 'completed';
    }
});


Template.loanItem.events({
    "click .add": function (event) {
        event.preventDefault();

        if (Meteor.user()){
            //TODO:: remove this ugly global
            Session.set('currentLoan', this);
            $('#investmentModal').openModal();
        } else {
            //Router.go('signIn');
        }
    },
    "click .progress": function (event, tmp) {
        event.preventDefault();

        if(Meteor.userId()){
            var numOfInvestors = 5;
            var users = Meteor.users.find().fetch();
            var myPart = tmp.data.amount / numOfInvestors;
            users.length = numOfInvestors; // limit users

            var interval = Meteor.setInterval(function(){
                numOfInvestors--;

               var newInvestment = {
                   investorId: users[numOfInvestors]._id,
                   loanId: tmp.data._id,
                   amount: parseInt(myPart),
                   estimatedRepayment: parseInt(tmp.data.amount + tmp.data.amount * tmp.data.rate)
               };

               Investments.insert(newInvestment);// check investment insert hook in server/observers.js

                if(numOfInvestors <= 0){
                    interval();
                }
            }, 3000);
        }
    }
});