
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
