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
    },
    createLoanQueryParams : function(){
        return {year : Template.instance().yearRV.get(), amount : Template.instance().amountRV.get()};
    },
    investRatePie : function(){
        return {
            title : false,
            tooltip : false,
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: "200",
                width: "200",
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            series: [{
                name: 'Browsers',
                data: [["rate",8.7], ["empty",91.3]],
                size: '100%',
                innerSize: '80%',
                showInLegend:false,
                dataLabels: {
                    enabled: false
                }
            }]

        };
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
