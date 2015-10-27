Investments = new Mongo.Collection('investments');

// permission
Investments.allow({
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
Investments.helpers({
    loan: function(){
        return Loans.findOne(this.loanId);
    }
});

// unique index
if(Meteor.isServer)
    Investments._ensureIndex({investorId: 1, loanId: 1}, {unique: true});


// schema
Investments.attachSchema(new SimpleSchema({
    investorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    loanId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    auto: {
        type: Boolean,
        optional: true,
        defaultValue: false
    },
    amount: {
        type: Number,
        min: 1,
        max: 50000
    },
    createdAt: {
        type: Date,
        optional: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    estimatedRepayment: {
        type: Number,
        decimal: true
    },
    currentRepayment: {
        type: Number,
        optional: true,
        defaultValue: 0
    }
}));