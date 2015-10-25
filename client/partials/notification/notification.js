var isLoaded = false;

Template.notification.onCreated(function(){
    Notifications.find({status: 'unread'}).observeChanges({
        added: function(id, document){
            if(isLoaded){
                console.log('notification is added', document.message)
            }
        }
    });
});
Template.notification.onRendered(function(){
    isLoaded = true;
});

Template.notification.helpers({
   notifications: function(){
       return Notifications.find();
   },
    count: function(){
       return Notifications.find({status: 'unread'}).count();
   }
});
