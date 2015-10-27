Notifications = new Mongo.Collection('notifications');

// permission
Notifications.allow({
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
Notifications.helpers({
});


// schema
Notifications.attachSchema(new SimpleSchema({
    receiverId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    message: {
        type: String
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
    status: {
        type: String,
        optional:true,
        defaultValue: 'unread',
        allowedValues: ['unread', 'read']
    }
}));