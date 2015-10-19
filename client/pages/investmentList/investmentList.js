/**
 * Created by igor on 10/10/15.
 */
Template.investmentList.helpers({
    investments: function(){
       return Investments.find();
    }
});