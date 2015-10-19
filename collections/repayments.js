Repayments = new Mongo.Collection('repayments');

// permission
Repayments.allow({
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
Repayments.helpers({
});


// schema
Repayments.attachSchema(new SimpleSchema({
    investorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    loanId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    amount: {
        type: Number,
        min: 100,
        max: 1000
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
}));