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
        var sortField = Router.current().params.query.sortField;
        var sortDirection = Router.current().params.query.sortDirection;

        var route;
        if (this.myLoansList){
            route = Router.routes.myLoans;
        } else {
            route = Router.routes.loans;
        }

        var query = {query : {page: previousPage}};
        if (sortField) query.query.sortField = sortField;
        if (sortDirection) query.query.sortDirection = sortDirection;

        return route.path({}, query);
    },
    nextPage: function() {
        var currentPage = currentLoansPage();
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        var sortField = Router.current().params.query.sortField;
        var sortDirection = Router.current().params.query.sortDirection;

        //Router.current().route.getName()
        var route;
        if (this.myLoansList){
            route = Router.routes.myLoans;
        } else {
            route = Router.routes.loans;
        }

        var query = {query : {page: nextPage}};
        if (sortField) query.query.sortField = sortField;
        if (sortDirection) query.query.sortDirection = sortDirection;


        return route.path({}, query);
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

        Router.go(routeName, {}, {query : {
            page: Router.current().params.query.page,
            sortField : sortField,
            sortDirection : sortDirection
        }});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.query.page) || 1;
    var totalLoans = Counts.get('loansCount');
    return currentPage * parseInt(Meteor.settings.public.recordsPerPage) < totalLoans;
};

var currentLoansPage = function() {
    return parseInt(Router.current().params.query.page) || 1;
};
