Template.autoInvestment.helpers({
   autoInvestment: function(){
       var ai = new AutoInvestment(1000);
       return ai.getCompatibleLoans();
   }
});
