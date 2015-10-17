Meteor.publish('loans', function() {
    return Loans.find();
});

Meteor.publish('loan-by-id', function(loanId) {
    return Loans.find(loanId);
});

Meteor.publish('user-by-id', function(userId) {
    return Meteor.users.find(userId, {fields: {username:true, profile: true}});
});


Meteor.publish('random', function() {

    var self = this;
    var returnRandom = function(){return Math.floor(Math.random() * 100)};

    var intervalId = Meteor.setInterval(function(){
        self.changed('randoms', 'randomId', {value: returnRandom()});
    }, 1000);

    this.added('randoms', 'randomId', {value: returnRandom()});
    this.ready();

    this.onStop(function(){
        Meteor.clearInterval(intervalId);
    });
});
