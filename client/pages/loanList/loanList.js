/**
 * Created by igor on 10/10/15.
 */
Template.loanList.helpers({
    loans: function(){
        return Loans.find({
            'investments' : {$elemMatch : {
                //TODO:: fix not operator
                userId : {$not : 'Gp3cbLEmcQqGXrZB7'}
            }}
        });
    },
    currentLoan : function(){
        return Session.get('currentLoan');
    },
    addInvestment : function(){
        return function(){
            $('#investmentModal').closeModal();
        }
    }
});