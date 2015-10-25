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
    }
}));