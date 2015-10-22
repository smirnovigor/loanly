UI.registerHelper('count', function(amount){
    return accounting.formatNumber(amount, 0);
});

UI.registerHelper('money', function(amount){
    return accounting.formatMoney(amount, '₪');
});

UI.registerHelper('percentage', function(percent){
    return accounting.formatMoney(percent, {precision: 2, format: "%v%"});
});

UI.registerHelper('periodFilter', function(period){
    return period + ' month';
});

UI.registerHelper('dateFilter', function(date, format){
    return moment(date).format(format);
});

UI.registerHelper('time', function(date){
    var time;

    var now = new Date();

    if (now.getYear() > date.getYear()){
        time = now.getYear() - date.getYear() + ' ' + TAPi18n.__('Years');
    } else if (now.getMonth() > date.getMonth()){
        time = now.getMonth() - date.getMonth() + ' ' + TAPi18n.__('Months');
    } else if (now.getDate() > date.getDate()){
        time = now.getDate() - date.getDate() + ' ' + TAPi18n.__('Days');
    } else {
        time = TAPi18n.__('Today');
    }



    return time;
});