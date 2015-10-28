var Random = new Mongo.Collection("randoms");


Template.loanForm.helpers({
    random: function(){
        Meteor.subscribe('random');
        return Random.findOne();
    },
    minimumrate: function(){
        return calculateMinRate();
    },
    amount : function(){
        if(Router.current().params.query.amount){
            Session.set('amount', Router.current().params.query.amount)
        } else if(Session.get('amount')==null){
            Session.set('amount', 25000)
        }
        return Session.get('amount');
    },
    period : function(){
        if(Router.current().params.query.month){
            Session.set('period', Router.current().params.query.month);
        } else if(Session.get('period')==null){
            console.log('empty');
            Session.set('period', 18)
        }
        return Session.get('period');
    },
    rate : function(){
        if(!Session.get('rate')){
            Session.set('rate', calculateMinRate());
        }
        return Session.get('rate');
    },
    monthlyReturn: function(){
        var rate = Session.get('rate') / 100;
        var amount = Session.get('amount');
        var period = Session.get('period');

        var calcMonthlyReturn = (amount / period) + (amount / period) * rate;
        var monthlyReturn = calcMonthlyReturn.toFixed(2);
        return monthlyReturn;
    }
});

Template.loanForm.events({

    "input [type=range]": function(event, tmp){
        if(event.target.name === 'amount'){
            Router.current().params.query.amount = false;
            Session.set('amount', event.target.value);
        } else if (event.target.name === 'period') {
            Router.current().params.query.month = false;
            Session.set('period', event.target.value);
        } else if (event.target.name === 'rate') {
            Session.set('rate', event.target.value);
        }
    },
   "submit .new-loan": function(event){
       event.preventDefault();

       var createdAt = new Date();

       var endsAt = new Date();
       endsAt.setMonth(endsAt.getMonth() + 2);

       var ctx = Loans.simpleSchema().namedContext("loanForm");
       var newLoan = {
           userId: Meteor.userId(),
           userCreditRating: Meteor.user().userCreditRating,
           title: $(event.target.title).find('option[value="' + event.target.title.value + '"]').text(),
           description: event.target.description.value,
           amount: parseInt(Session.get('amount')),
           period: parseInt(Session.get('period')),
           rate: parseInt(Session.get('rate')),
           categoryId : Number(event.target.title.value),
           createdAt : createdAt,
           endsAt : endsAt
       };

       if(ctx.validate(newLoan)){
           let id = Loans.insert(newLoan);

           changeLoanStatusToActive(id);

           Router.go('/my-loans');

           event.target.title.value = '';
           event.target.description.value = '';
           event.target.amount.value = '';
           event.target.period.value = '';
           event.target.rate.value = '';
       }
       else{
           ctx.invalidKeys().forEach(function(key){
                console.log(ctx.keyErrorMessage(key.name));
           });
       }
    }
});

var changeLoanStatusToActive = function(id){
    Meteor.setTimeout(function(){
        Loans.update(id, {$set: {status: 'active'}});
    },5000);
};

var calculateMinRate = function(){
    var userCreditRating = Meteor.user().userCreditRating;
    var minRate = 1;
    var maxRate = 10;

    var minimumRate = (1 - userCreditRating) * (maxRate - minRate) + minRate;
    return minimumRate.toFixed(2);
};