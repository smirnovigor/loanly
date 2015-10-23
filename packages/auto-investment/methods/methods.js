Meteor.methods({
    getCompatibleLoans : function(amount, period, risk){
        debugger;
        var ai = new AutoInvestment(amount, period, risk);
        return ai.toObject();
    }
});