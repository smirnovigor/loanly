// ## loans
Meteor.publish('loans', function() {
    return Loans.find();
});

Meteor.publish('loan-by-id', function(loanId) {
    return Loans.find(loanId);
});

// ## repayments
Meteor.publish('repayments', function() {
    return Repayments.find();
});

Meteor.publish('repayment-by-id', function(repaymentId) {
    return Repayments.find(repaymentId);
});

// ## investments
Meteor.publish('investments', function() {
    return Investments.find({investorId: this.userId});
});

Meteor.publish('investment-by-id', function(investmentsId) {
    return Investments.find(investmentsId);
});

// ## users
Meteor.publish('allUsers', function() {
    return Meteor.users.find({}, {fields: {username:true, profile: true, userCreditRating:true}});
});

Meteor.publish('user-by-id', function(userId) {
    return Meteor.users.find(userId, {fields: {username:true, profile: true, userCreditRating:true}});
});


// ## just for fun
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
