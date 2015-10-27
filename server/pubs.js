// ## loans
var buildSortParams = function(sortField, sortDirection) {
    var sortParams = {};
    var direction = sortDirection || 1;
    if (direction === 'desc') {
        direction = -1;
    } else {
        direction = 1;
    }

    var field = sortField || 'createdAt';
    if (sortField === 'amount' || sortField === 'rate' || sortField === 'endsAt' || sortField === 'period' || sortField === 'userCredit') {
        field = sortField;
    }

    sortParams[field] = direction;

    return sortParams;
};

Meteor.publish('loans', function() {
    return Loans.find();
});

Meteor.publish('loans-list', function(skipCount, sortField, sortDirection, q, userId) {
    q = q || '';

    //Meteor._sleepForMs(1000);
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });

    check(skipCount, positiveIntegerCheck);

    var query = {title_sort : {$regex : q}};
    if (userId){
        query.userId = this.userId;
    } else {
        query.userId = {$ne : this.userId};
    }

    Counts.publish(this, 'loansCount', Loans.find(query), {
        noReady: true
    });

    var sortParams = buildSortParams(sortField, sortDirection);

    //console.log(sortParams);

    return Loans.find(query, {
        limit: parseInt(Meteor.settings.public.recordsPerPage), // records to show per page
        skip: skipCount,
        sort: sortParams
    });
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


// ## notifications
Meteor.publish('notifications', function() {
    return Notifications.find({receiverId: this.userId});
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
