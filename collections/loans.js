Loans = new Mongo.Collection('loans');

// permission
Loans.allow({
    insert: function(userId, party) {
        return true;
    },
    update: function(userId, party, fields, modifier) {
        return true;
    },
    remove: function(userId, party) {
        return true;
    }
});



// helpers
Loans.helpers({
    user: function() {
        return Meteor.users.findOne(this.userId);
    }
});


// schema
Loans.attachSchema(new SimpleSchema({
    userId: {
        type: String
        //regEx: SimpleSchema.RegEx.Id
    },
    title: {
        type: String,
        max: 20
    },
    description: {
        type: String,
        max: 500
    },
    amount: {
        type: Number,
        min: 1000,
        max: 100000
    },
    period: {
        type: Number,
        min: 3,
        max: 36
    },
    rate: {
        type: Number,
        decimal: true,
        min: 1,
        max: 20
    },
    investments: {
        type: [Object],
        optional: true
    },
    "investments.$.userId": {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    "investments.$.amount": {
        type: Number,
        min: 100,
        max: 1000
    }
}));