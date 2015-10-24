/**
 * Created by igor on 10/10/15.
 */

Template.loanList.onCreated(function() {

    var template = this;

    template.autorun(function() {
        var currentPage = currentLoansPage();
        var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage; // 3 records per page

        template.subscribe(
            'loans-list',
            skipCount,
            Router.current().params.sortField,
            Router.current().params.sortDirection
        );
    });
});


Template.loanList.helpers({
    loans: function(){
        return Loans.find({'userId' : {$ne : Meteor.userId()}});
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
        return Router.routes.loanList.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = currentLoansPage();
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.loanList.path({page: nextPage});
    },
    prevPageClass: function() {
        return currentLoansPage() <= 1 ? "disabled" : "";
    },
    nextPageClass: function() {
        return hasMorePages() ? "" : "disabled";
    }
});


Template.loanList.events({
    "change .sort-option": function (event, tmp) {
        var sortField = event.target.value;
        var sortDirection = 'desc';

        if (sortDirection === 'amount'){
            sortDirection = 'asc';
        }

        var url = Router.routes.loanList.path({
            page: Router.current().params.page,
            sortField : sortField,
            sortDirection : sortDirection
        });


        Router.go(url);
        //window.location.href = url;
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalLoans = Counts.get('loansCount');
    return currentPage * parseInt(Meteor.settings.public.recordsPerPage) < totalLoans;
};

var currentLoansPage = function() {
    return parseInt(Router.current().params.page) || 1;
};
