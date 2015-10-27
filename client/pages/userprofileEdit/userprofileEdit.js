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

Template.userprofileEdit.events({
    "submit .submit-btn": function (event) {
      console.log("here Submit");
    }
});

Template.userprofileEdit.created = function() {
    Uploader.init(this);
}

Template.userprofileEdit.rendered = function () {
    Uploader.render.call(this);
};

Template.userprofileEdit.events({
    'click .start': function (e) {
        Uploader.startUpload.call(Template.instance(), e);
    }
});

Template.userprofileEdit.helpers({
    'infoLabel': function() {
        var instance = Template.instance();

        // we may have not yet selected a file
        var info = instance.info.get()
        if (!info) {
            return;
        }

        var progress = instance.globalInfo.get();

        // we display different result when running or not
        return progress.running ?
            info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
            info.name + ' - ' + info.size + 'B';
    },
    'progress': function() {
        return Template.instance().globalInfo.get().progress + '%';
    }
})