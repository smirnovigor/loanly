var Random = new Mongo.Collection("randoms");

Template.loanForm.helpers({
    random: function(){
        Meteor.subscribe('random');
        return Random.findOne();
    }
});

Template.loanForm.events({
   "submit .new-loan": function(event){
       event.preventDefault();

       var ctx = Loans.simpleSchema().namedContext("loanForm");
       var newLoan = {
           userId: Meteor.userId(),
           userCreditRating: Meteor.user().userCreditRating,
           title: event.target.title.value,
           description: event.target.description.value,
           amount: parseInt(event.target.amount.value),
           period: parseInt(event.target.period.value),
           rate: parseInt(event.target.rate.value),
           categoryId : 0,
           createdAt : new Date
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