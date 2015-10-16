UI.registerHelper('money', function(amount){
    return accounting.formatMoney(amount);
});
UI.registerHelper('percentage', function(percent){
    return accounting.formatMoney(percent, {precision: 2, format: "%v %"});
});
UI.registerHelper('periodFilter', function(period){
    return period + ' month';
});