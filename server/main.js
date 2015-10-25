Meteor.startup(function() {
    //loadTestData();

    if (Meteor.settings.public == undefined) Meteor.settings.public = {};
    if (Meteor.settings.public.recordsPerPage == undefined) Meteor.settings.public.recordsPerPage = "6";
});