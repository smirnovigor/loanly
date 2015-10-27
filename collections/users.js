var calculateUserCreditRating = function(userId, accountNumber){
    var API_URL = 'https://bankapi.azure-api.net/v1/bankTransaction/getBalanceByAccountNumber/' + accountNumber;
    var headers = {"Ocp-Apim-Subscription-Key": "c5de97a26a0b41f7a25c40a5fa15fe90"};

    console.log('getUserCreditRating');

    HTTP.get(API_URL, {headers: headers}, function (error, result) {
        if (!error && result && result.content) {

            var userCreditRating = 0.001;
            var balance = Number(result.content);

            switch (true){
                case balance > 10000:
                    userCreditRating = 1;
                case balance <= 100:
                default:
                    break;
            }



            Meteor.users.update({_id: userId}, {$set: {userCreditRating: userCreditRating}});
        }
        else{
            console.error('Error occurs: ', error);
        }
    });
};

// helpers
Meteor.users.helpers({
    userCreditRatingStr: function() {
        var creditRating = ['C', 'CC', 'CCC', 'B', 'BB', 'BBB', 'A', 'AA', 'AAA'];
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
    accountId : {
        type: String,
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
                calculateUserCreditRating(this._id, this.accountNumber);

                //return default value and calculate the new one based on bank API
                return 0.001;
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

