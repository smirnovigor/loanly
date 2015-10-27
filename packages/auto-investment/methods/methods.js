Meteor.methods({
    getCompatibleLoans : function(amount, period, risk){
        var ai = new AutoInvestment(amount, period, risk);
        return ai.toObject();
    }
});