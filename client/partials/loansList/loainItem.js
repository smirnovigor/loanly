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
    }
});