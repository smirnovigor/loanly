/**
 * Created by Vitaliy on 27/10/2015.
 */

Template.userprofile.onRendered(function() {
    $(document).ready(function(){

        $('ul.tabs').tabs();
        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        $(".click_balance").click(function() {

            $(".balance").css("display", "none");
            $(".hide-click").css("display", "block");
        });
    });

});




//Template.userprofile.helpers({
//    waitingInvestments : function(){
//        Meteor.subscribe('investments', 'waiting');
//       return Investments.find({});
//    },
//    activeInvestments : function(){
//        Meteor.subscribe('investments', 'active');
//        return Investments.find({});
//    },
//    finishedInvestments : function(){
//        Meteor.subscribe('investments', 'finished');
//        return Investments.find({});
//    }
//
//});
Template.userprofile.helpers({

    loansWaiting : function(){
       Meteor.subscribe('loans', Meteor.userId(), 'waiting');
       return Loans.find();
    },
    loansFinished : function(){
        Meteor.subscribe('loans', Meteor.userId(), 'completed');
        return Loans.find();
    },
    loansActive : function(){
        Meteor.subscribe('loans', Meteor.userId(), 'active');
        return Loans.find();
    },
//    balanceUser : function(){
//        Meteor.subscribe('users', Meteor.userId());
//        return users.find();
//    },

    investRatePie : function(){
        return {
            title : false,
            tooltip : false,
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: "90",
                width: "90",
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
    },
    investRatePieAverage : function(){
        return {
            title : false,
            tooltip : false,
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: "90",
                width: "90",
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
    },
    investRatePieMax : function(){
        return {
            title : false,
            tooltip : false,
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: "90",
                width: "90",
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
