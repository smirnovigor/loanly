/**
 * Created by igor on 10/10/15.
 */
Template.loanDetails.helpers({
    currentUserInvestment: function(){
        return _.find(this.investments, function (investment) {
            return investment.userId == Meteor.userId();
        });
    }
});