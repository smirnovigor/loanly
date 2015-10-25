LoansCategories = {
    0 : 'loan for other purposes',
    1 : 'loan for studies',
    2 : 'loan for apartment',
    3 : 'loan for renovation',
    4 : 'loan for holiday',
    5 : 'loan for family event',
    6 : 'loan for buying a product',
    7 : 'loan for cover debts',
    8 : 'loan for marriage',
    9 : 'loan for cosmetic treatment'
};

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
(function(){
    var funded = function(){
        return !this.investments ? 0 : this.investments.reduce(function(memo, elem){
            return memo + elem.amount;
        }, 0);
    };

    Loans.helpers({
        user: function() {
            return Meteor.users.findOne(this.userId);
        },
        category : function(){
            return this.categoryId ? LoansCategories[this.categoryId] : LoansCategories[0];
        },
        funded: function() {
            return funded.bind(this)();
        },
        fundedPercentage: function() {
            return Math.floor((funded.bind(this)() / this.amount) * 100);
        },
        image : function(){
            var url = 'http://loremflickr.com/600/300/';

            if (this.categoryId === 0){
                url += 'house';
            } else if (this.categoryId === 1){
                url += 'student';
            } else if (this.categoryId === 2){
                url += 'house';
            } else if (this.categoryId === 3){
                url += 'living%20room';
            } else if (this.categoryId === 4){
                url += 'holiday';
            } else if (this.categoryId === 5){
                url += 'house';
            } else if (this.categoryId === 6){
                url += 'house';
            } else if (this.categoryId === 7){
                url += 'house';
            } else if (this.categoryId === 8){
                url += 'house';
            } else if (this.categoryId === 9){
                url += 'house';
            }

            url += '?random=' + Math.floor(Math.random() * 1000);

            return url;
        }
    });
})();


// schema
Loans.attachSchema(new SimpleSchema({
    userId: {
        type: String
        //regEx: SimpleSchema.RegEx.Id
    },
    userCreditRating: {
        type: Number,
        decimal: true,
        min: 0.001,
        max: 0.999
    },
    title: {
        type: String,
        max: 512
    },
    title_sort: {
        type: String,
        optional: true,
        autoValue: function() {
            var title = this.field("title");
            if (title.isSet) {
                return title.value.toLowerCase();
            } else {
                this.unset(); // Prevent user from supplying her own value
            }
        }
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
    status: {
        type: String,
        optional: true,
        defaultValue: 'waiting',
        allowedValues: ['waiting', 'active', 'finished']
    },
    investments: {
        type: [Object],
        optional: true,
        defaultValue: []
    },
    "investments.$.userId": {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    "investments.$.amount": {
        type: Number,
        min: 100,
        max: 100000
    },
    categoryId : {
        type: Number,
        min: 0,
        max: Object.keys(LoansCategories).length -1,
        defaultValue: 0
    },
    createdAt : {
        type : Date,
        denyUpdate: true
    },
    endsAt: {
        type: Date,
        denyUpdate: true
    }
}));