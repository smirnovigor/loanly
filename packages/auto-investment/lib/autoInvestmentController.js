
AutoInvestment = class AutoInvestment {

    constructor(amount, period = 12, risk = 0.5){

        this.amount = amount;
        this.period = period;
        this.risk   = risk;

        this.calculate();
    }

    calculate(){


        //amount
        //period
        //currentFundraising
        //rate

        // find compatible loans (uncompleted, with compatible risk and period)
        // show to user computed investment
        // make investment

        var minRate = (1 - this.risk) - 0.1;
        var maxRate = (1 - this.risk) - 0.1;
        var query = {
            status: 'waiting',
            period: {$lte: this.period},
            rate: {$gte: minRate},
            rate: {$lte: maxRate}};

        Meteor.subscribe('loans');
        var loansCount = Loans.find();
    }

    getCompatibleLoans(){
        return this.compatibleLoans;
    }

    getComputedProfit(){
        return this.computedProfit;
    }

    getComputedRate(){
        return this.computedRate;
    }
};
