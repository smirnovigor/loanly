Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.route('/', {
    name: 'home'
});

Router.route('/loans', {
    name: 'loan-list',
    waitOn: function(){
        return [Meteor.subscribe('loans'), Meteor.subscribe('allUsers')]
    },
    fastRender: true
});

Router.route('/loans/form', {
    name: 'loan-form',
    waitOn: function(){
        return Meteor.subscribe('user-by-id', Meteor.userId());
    }
});

Router.route('/loans/:_id', {
    name: 'loan-details',
    waitOn: function(){
        return Meteor.subscribe('loan-by-id', this.params._id);
    },
    data: function(){
        return Loans.findOne(this.params._id);
    }
});

Router.route('/userprofile/:userId', {
    name: 'userprofile',
    waitOn: function(){
        return Meteor.subscribe('user-by-id', this.params.userId);
    },
    data: function(){
        return Meteor.users.findOne(this.params.userId);
    },
    fastRender: true
});

Router.route('/investments', {
    name: 'investment-list',
    waitOn: function(){
        return Meteor.subscribe('investments');
    },
    fastRender: true
});

Router.plugin('ensureSignedIn', {
    only: ['loan-form']
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');