Template.loanItem.events({
    "click .add": function (event) {
        event.preventDefault();

        //TODO:: remove this ugly global
        Session.set('currentLoan', this);

        $('#investmentModal').openModal();
    }
});