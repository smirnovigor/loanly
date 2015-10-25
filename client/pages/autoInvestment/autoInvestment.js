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
    'submit .calculate-investment' : function(event, tmp){
        event.preventDefault();

        if(!Meteor.userId()){
            Router.go('/sign-in');
        }

        createInvestments(tmp.compatibleLoansRV.get().compatibleLoans);

        Router.go('/investments');
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

var createInvestments = function(loans){
    for(let loan of loans){

        var newInvestment = {
            investorId: Meteor.userId(),
            loanId: loan._id,
            auto: true,
            amount: parseInt(loan.myPart),
            estimatedRepayment: calculateRepayment(loan)
        };

        Investments.insert(newInvestment); // check investment insert hook in server/observers.js
    }
};

var calculateRepayment = function(loan){
    var years = loan.period / 12;
    var profitRate = (loan.rate / 100) * years;
    return loan.myPart * (1 + profitRate);
};