Template.autoInvestment.created =function(){
    var self = this;
    this.compatibleLoansRV = new ReactiveVar([]);

    Meteor.call('getCompatibleLoans', 10000, 24, 0.5, function(err, data){
        if(err){
            return console.error(err);
        }
        self.compatibleLoansRV.set(data);
    });
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
