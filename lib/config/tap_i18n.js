getUserLanguage = function () {
    // Put here the logic for determining the user language
    var user = Meteor.user();
    var lang = (user && user.profile && user.profile.lang) ? user.profile.lang : 'he';
    return lang;
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("showLoadingIndicator", true);

        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set("showLoadingIndicator", false);
            })
            .fail(function (error_message) {
                // Handle the situation
                console.log(error_message);
            });

        var lang = getUserLanguage() || 'en';
        if (lang === 'he') $('html').attr('dir', 'rtl');
    });
}