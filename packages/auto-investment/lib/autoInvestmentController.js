
AutoInvestment = class AutoInvestment {

    constructor(amount, period = 12, risk = 0.5){

        this.amount = amount;
        this.period = period;
        this.risk   = risk;

        this.calculate();
    }

    calculate(){

        // find compatible loans (uncompleted, with compatible risk and period)
        // show to user computed investment
        // make investment

        console.log('calculating auto investment with %s amount, for %s month period and %s risk', this.amount, this.period, this.risk);

        var maxInvestmentPerLoan = 500;
        var loansLimit = parseInt(this.amount / maxInvestmentPerLoan);

        // check bounderis
        var minUserCreditRating = Number(((1 - this.risk) - 0.2).toFixed(3));
        var maxUserCreditRating = Number(((1 - this.risk) + 0.2).toFixed(3));

        var query = {
            status: 'waiting',
            period: {$lte: this.period},
            $and : [
                {userCreditRating: {$gte: minUserCreditRating}},
                {userCreditRating: {$lte: maxUserCreditRating}}
            ]
        };

        var pipeline = [
            {$match: query},
            {$unwind: '$investments'},
            {$group: {
                    _id: '$_id',
                    rate: {$first: "$rate"},
                    status: {$first: "$status"},
                    period: {$first: "$period"},
                    userCreditRating: {$first: "$userCreditRating"},
                    investmentTotalAmount: {$sum: '$investments.amount'}
                }
            },
            {$match: {investmentTotalAmount : {$gte: maxInvestmentPerLoan}}},
            {$sort: {rate: -1}}, // get the loans with higher rate
            {$limit: loansLimit}

        ];

        this.compatibleLoans = Loans.aggregate(pipeline);
        this.computedProfit = 100;
        this.computedRate = 3.4

    }

    toObject(){
        return {
            compatibleLoans : this.compatibleLoans,
            computedProfit : this.computedProfit,
            computedRate: this.computedRate
        }
    }
};
