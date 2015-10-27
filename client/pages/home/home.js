Template.home.created = function(){
    this.amountRV = new ReactiveVar(12000);
    this.yearRV = new ReactiveVar(2);
};

Template.home.helpers({
    amount : function(){
        return Template.instance().amountRV.get();
    },
    year : function(){
        return Template.instance().yearRV.get();
    },
    minAmount : function(){
        return 3000;
    },
    maxAmount : function(){
        return 50000;
    },
    amountStep : function(){
        return 1000;
    },
    minYear : function(){
        return 1;
    },
    maxYear : function(){
        return 3;
    },
    yearStep : function(){
        return 1;
    },
    loanRate : function(){
        return 4.5;
    },
    investRate : function(){
        return 7.8;
    }
});

Template.home.events({
    'change #amount-rage' : function(e, template){
        template.amountRV.set(e.target.value);
    },
    'change #year-rage' : function(e, template){
        template.yearRV.set(e.target.value);
    }
});