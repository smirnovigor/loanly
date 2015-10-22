Template.investmentForm.created = function() {
    this.repaymentRV = new ReactiveVar(0);
};

Template.investmentForm.helpers({
    estimatedRepayment: function(){
        return Template.instance().repaymentRV.get();
    }
});

Template.investmentForm.events({
   "keyup #investmentAmount": function(event, tmp){
       var years = this.loan.period / 12;
       var profitRate = (this.loan.rate / 100) * years;
       tmp.repaymentRV.set(event.target.value * (1 + profitRate));
   },
   "submit .new-investment": function(event, tmp){
       event.preventDefault();

       var ctx = Investments.simpleSchema().namedContext("investmentForm");
       var newInvestment = {
           investorId: Meteor.userId(),
           loanId: this.loan._id,
           amount: parseInt(event.target.amount.value),
           estimatedRepayment: parseInt(tmp.repaymentRV.get())
       };

       if(ctx.validate(newInvestment)){
           Investments.insert(newInvestment);
           Loans.update(this.loan._id, { $push: {investments : { userId: Meteor.userId(), amount:parseInt(event.target.amount.value)}}});

           if (this.onSuccess){
               this.onSuccess();
           } else {
               Router.go('/investments');
           }

           event.target.amount.value = '';
           tmp.repaymentRV.set(0);
       }
       else{
           ctx.invalidKeys().forEach(function(key){
                console.log(ctx.keyErrorMessage(key.name));
           });
       }
    }
});