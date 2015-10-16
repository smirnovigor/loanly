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
        return Meteor.subscribe('loans');
    },
    fastRender: true
});

Router.route('/loans/form', {
    name: 'loan-form'
});

Router.route('/loans/:_id', {
    name: 'loan-details',
    waitOn: function(){
        return Meteor.subscribe('loan-by-id', this.params._id);
    },
    data: function(){
        return Loans.findOne(this.params._id);
    },
    fastRender: true
});
