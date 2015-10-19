var creditRating = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'];


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
        type: String,
        allowedValues: creditRating,
        autoValue: function(){
            return creditRating[Math.floor(Math.random() * creditRating.length)];
        }
    },
    balance: {
        type: Number,
        defaultValue: 0
    }
}));

