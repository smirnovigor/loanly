var creditRating = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'];


// helpers
Meteor.users.helpers({
    userCreditRatingStr: function() {
        var creditRating = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'];
        var index = parseInt(creditRating.length * (1 - this.userCreditRating));
        return creditRating[index];
    }
});

// schema
Schema = {};
Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    lang: {
        type: String,
        allowedValues: ['en', 'he'],
        optional: true
    }
});

Meteor.users.attachSchema(new SimpleSchema({
    username: {
        type: String
    },
    emails: {
        optional: true,
        type: [Object]
    },
    "emails.$.address": {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    userCreditRating: {
        type: Number,
        decimal: true,
        min: 0.001,
        max: 0.999,
        // patch for demo only
        autoValue: function() {
            if (this.isInsert) {
                return Number((Math.random()).toFixed(3));
            }
        }
    },
    balance: {
        type: Number,
        decimal: true,
        // patch for demo only
        autoValue: function() {
            if (this.isInsert) {
                return Number((Math.random() * 10000).toFixed(2));
            }
        }
    }
}));

