var Random = new Mongo.Collection("randoms");


Template.loanForm.helpers({
    random: function(){
        Meteor.subscribe('random');
        return Random.findOne();
    },
    minimumrate: function(){
        var userCreditRating = Meteor.user().userCreditRating;
        var minimumRate = 100 - ((1 - userCreditRating)*100);
        return minimumRate.toFixed(2);
    },
    amount : function(){
        if(Router.current().params.query.amount){
            Session.set('amount', Router.current().params.query.amount)
        } else if(Session.get('amount')==null){
            Session.set('amount', 25000)
        }
        return Session.get('amount');
    },
    year : function(){
        if(Router.current().params.query.year){
            return Session.set('period', (Router.current().params.query.year * 12));
        } else if(Session.get('period')==null){
            console.log('empty');
            Session.set('period', 18)
        }
        return Session.get('period');
    },
    monthlyReturn: function(){
        var calcMonthlyReturn = Session.get('amount')/Session.get('period');
        var monthlyReturn = calcMonthlyReturn.toFixed(2);
        Session.set('monthlyReturn', monthlyReturn)
        return Session.get('monthlyReturn');
    },
    minimumRate: function(){

    }
});

Template.loanForm.events({

    "change [type=range]": function(event, tmp){
        if(event.target.name === 'amount'){
            Router.current().params.query.amount = false;
            Session.set('amount', event.target.value);
        } else if (event.target.name === 'period') {
            Router.current().params.query.year = false;
            Session.set('period', event.target.value);
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
           title: event.target.title.value,
           description: event.target.description.value,
           amount: parseInt(Session.get('amount')),
           period: parseInt(Session.get('period')),
           rate: parseInt(event.target.rate.value),
           categoryId : 0,
           createdAt : createdAt,
           endsAt : endsAt
       };

       if(ctx.validate(newLoan)){
           Loans.insert(newLoan);

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