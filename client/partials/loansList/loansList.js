/**
 * Created by igor on 10/10/15.
 */

Template.loansList.onCreated(function() {

    var template = this;

    template.autorun(function() {
        var currentPage = currentLoansPage();
        var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage; // 3 records per page

        var userId = false;
        if (template.data && template.data.myLoansList){
            userId = Meteor.userId();
        }

        template.subscribe(
            'loans-list',
            skipCount,
            Router.current().params.query.sortField,
            Router.current().params.query.sortDirection,
            Router.current().params.query.q,
            userId
        );
    });
});


Template.loansList.helpers({
    selected : function(a){
        return (a == Router.current().params.query.sortField) ? 'selected' : '';
    },
    loans: function(){
        return Loans.find({});
    },
    currentLoan : function(){
        return Session.get('currentLoan');
    },
    addInvestment : function(){
        return function(){
            $('#investmentModal').closeModal();
        }
    },
    prevPage: function() {
        var currentPage = currentLoansPage();
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;

        var route;
        if (this.myLoansList){
            route = Router.routes.myLoans;
        } else {
            route = Router.routes.loans;
        }

        var query = getQueryParams({page: previousPage});
        return route.path({}, {query : query});
    },
    nextPage: function() {
        var currentPage = currentLoansPage();
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;

        //Router.current().route.getName()
        var route;
        if (this.myLoansList){
            route = Router.routes.myLoans;
        } else {
            route = Router.routes.loans;
        }

        var query = getQueryParams({page: nextPage});
        return route.path({}, {query : query});
    },
    prevPageClass: function() {
        return currentLoansPage() <= 1 ? "disabled" : "";
    },
    nextPageClass: function() {
        return hasMorePages() ? "" : "disabled";
    }
});


Template.loansList.events({
    "change .sort-option": function (event, tmp) {
        var sortField = event.target.value;
        var sortDirection = 'desc';

        if (sortField === 'amount' || sortField === 'endsAt' || sortField === 'period'){
            sortDirection = 'asc';
        }

        var routeName;
        if (this.myLoansList){
            routeName = 'myLoans';
        } else {
            routeName = 'loans';
        }

        var query = getQueryParams({sortField : sortField, sortDirection : sortDirection});
        Router.go(routeName, {}, {query : query});
    },
    "keyup #search": function (event, tmp) {
        var val = event.target.value.trim();
        if (val.length >= 3 || val.length === 0){
            val = val.toLowerCase();

            var routeName;
            if (this.myLoansList){
                routeName = 'myLoans';
            } else {
                routeName = 'loans';
            }

            var query = getQueryParams({q : val, page : 1});
            Router.go(routeName, {}, {query : query});
        }
    }
});

var getQueryParams = function(params){
    params = params || {};

    var queryParams = {};

    var page = Router.current().params.query.page;
    var sortField = Router.current().params.query.sortField;
    var sortDirection = Router.current().params.query.sortDirection;
    var q = Router.current().params.query.q;

    if (page) queryParams.page = page;
    if (sortField) queryParams.sortField = sortField;
    if (sortDirection) queryParams.sortDirection = sortDirection;
    if (q) queryParams.q = q;

    for (var key in params) {
        queryParams[key] = params[key];
    }

    return queryParams;
};

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.query.page) || 1;
    var totalLoans = Counts.get('loansCount');
    return currentPage * parseInt(Meteor.settings.public.recordsPerPage) < totalLoans;
};

var currentLoansPage = function() {
    return parseInt(Router.current().params.query.page) || 1;
};
