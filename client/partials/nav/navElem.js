Template.navElem.onCreated(function() {
    this.subscribe('userCounts', Meteor.userId());
});

Template.navElem.helpers({
    userLoansCount : function(){
        return Counts.get('userLoansCount');
    },
    userInvestmentCount : function(){
        return Counts.get('userInvestmentCount');
    }
});