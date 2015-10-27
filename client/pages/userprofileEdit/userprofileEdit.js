/**
 * Created by Vitaliy on 24/10/2015.
 */
 Template.userprofileEdit.onCreated(function() {


    var userId = false;
    var userName = false;
        userId = Meteor.userId();
        userName = Meteor.user();
    console.log("userId",Meteor.userId());
    console.log("userName",Meteor.user());

     var template = this;
     template.data = template.data || {};
     template.state = {
         userId: Meteor.userId(),
         userName: Meteor.user()
     };

});
Template.userprofileEdit.helpers({
    userId: function() { // if I want dual binding
        return Template.instance().state.userId; // sic! *3
    }
});