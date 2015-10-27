/**
 * Created by Vitaliy on 27/10/2015.
 */

Template.userprofile.onRendered(function() {
    $(document).ready(function(){
        $('ul.tabs').tabs();
        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
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
//    investments: function(){
//        return Investments.find();
//    }
    loansWaiting : function(){
       Meteor.subscribe('loans', Meteor.userId(), 'waiting');
       return Loans.find();
    },
    loansFinished : function(){
        Meteor.subscribe('loans', Meteor.userId(), 'finished');
        return Loans.find();
    },
    loansActive : function(){
        Meteor.subscribe('loans', Meteor.userId(), 'active');
        return Loans.find();
    }

});
