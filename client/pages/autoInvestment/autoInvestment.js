Template.autoInvestment.created =function(){
    this.compatibleLoansRV = new ReactiveVar([]);
};

Template.autoInvestment.helpers({
    compatibleLoans: function(){
       return Template.instance().compatibleLoansRV.get().compatibleLoans;
   },
    computedProfit: function(){
       return Template.instance().compatibleLoansRV.get().computedProfit;
   },
    computedRate: function(){
       return Template.instance().compatibleLoansRV.get().computedRate;
   }
});

Template.autoInvestment.events({
    'submit .calculate-investment' : function(event){
        event.preventDefault();


    },
    'input .calculate-investment' : function(event){
        event.preventDefault();

        event.currentTarget.amountOutput.value = event.currentTarget.amount.value;
        event.currentTarget.periodOutput.value = event.currentTarget.period.value;
        event.currentTarget.riskOutput.value   = event.currentTarget.risk.value;
    },
    'change .calculate-investment' : function(event, tmp){
        event.preventDefault();

        var amount = event.currentTarget.amount.value;
        var period = event.currentTarget.period.value;
        var risk = event.currentTarget.risk.value;

        Meteor.call('getCompatibleLoans', amount, period, risk, function(err, data){
            if(err){
                return console.error(err);
            }
            tmp.compatibleLoansRV.set(data);
        });
    }
});