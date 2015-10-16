/**
 * Created by igor on 10/10/15.
 */
Template.loanList.helpers({
   loans: function(){
       return Loans.find();
   }
});