
AutoInvestment = class AutoInvestment {

    constructor(amount, period = 12, risk = 0.5){

        this.amount = Number(amount);
        this.period = Number(period);
        this.risk   = Number(risk);

        this.calculate();
    }

    calculate(){
        this.maxInvestmentPerLoan = 500;

        do {
            console.log('calculating auto investment with %s amount, max investment per loan %s, for %s month period and %s risk', this.amount, this.maxInvestmentPerLoan, this.period, this.risk);

            this.computedProfit = 0;
            this.computedRate = 0;

            this.calculateLoans();
            this.calculateRateAndProfit();

        } while(this.isCompleted());

        this.calculateInvestorPartInLoans();
    }

    calculateLoans(){

        var loansLimit = parseInt(this.amount / this.maxInvestmentPerLoan) + 1;
        var minUserCreditRating = Number(((1 - this.risk) - 0.2).toFixed(3));
        var maxUserCreditRating = Number(((1 - this.risk) + 0.2).toFixed(3));

        // check the boundaries
        minUserCreditRating = minUserCreditRating < 0 ? 0 : minUserCreditRating;
        maxUserCreditRating = maxUserCreditRating > 1 ? 1 : maxUserCreditRating;

        var query = {
            status: 'waiting',
            period: {$lte: this.period},
            investments: {$not: {$elemMatch: {userId: Meteor.userId()}}},
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
                    amount: {$first: "$amount"},
                    status: {$first: "$status"},
                    period: {$first: "$period"},
                    userCreditRating: {$first: "$userCreditRating"},
                    investmentTotalAmount: {$sum: '$investments.amount'}
                }
            },
            {$project: { // calculate investmentTotalAndMyPart
                    _id: 1,
                    rate: 1,
                    amount: 1,
                    status: 1,
                    period: 1,
                    userCreditRating: 1,
                    investmentTotalAmount: 1,
                    investmentTotalAndMyPart: { $add: [ "$investmentTotalAmount", this.maxInvestmentPerLoan ] }
                }
            },
            {$project: { // compare calculated investmentTotalAndMyPart and amount
                    _id: 1,
                    rate: 1,
                    amount: 1,
                    status: 1,
                    period: 1,
                    userCreditRating: 1,
                    investmentTotalAmount: 1,
                    investmentTotalAndMyPart: 1,
                    match: {$gte: ["$amount", "$investmentTotalAndMyPart"]}
                }
            },
            {$match: {match: true}},
            {$sort: {rate: -1}}, // get the loans with higher rate
            {$limit: loansLimit}
        ];

        this.compatibleLoans = Loans.aggregate(pipeline);
    }

    calculateRateAndProfit(){

        var years = this.period / 12;

        for(let loan of this.compatibleLoans){
            var profitRate = (loan.rate / 100) * years;
            this.computedProfit += this.maxInvestmentPerLoan * (1 + profitRate);
        }

        this.computedRate = ((this.computedProfit / this.amount) - 1) / years * 100;

        // set decimal
        this.computedRate = this.computedRate.toFixed(2);
        this.computedProfit = this.computedProfit.toFixed(2);
    }

    calculateInvestorPartInLoans(){

        var totalAmount = this.amount;

        for(let loan of this.compatibleLoans){
            if(totalAmount > this.maxInvestmentPerLoan){
                loan.myPart = this.maxInvestmentPerLoan;
            }
            else{
                loan.myPart = totalAmount;
            }
            totalAmount -= this.maxInvestmentPerLoan;
        }
    }

    isCompleted(){

        if(this.compatibleLoans.length === 0){
            this.computedRate = 0;
            this.computedProfit = 0;
            console.error('There is no loans compatible for current request!');
            return false;
        }

        if(this.amount <= this.maxInvestmentPerLoan * this.compatibleLoans.length){
            return false; // successful finished
        }

        // increment max investment per loan, based on loans count.
        this.maxInvestmentPerLoan += Math.round(this.maxInvestmentPerLoan * (1 / this.compatibleLoans.length));
        this.maxInvestmentPerLoan = this.maxInvestmentPerLoan > this.amount ? this.amount : this.maxInvestmentPerLoan;

        return true;
    }

    toObject(){
        return {
            compatibleLoans : this.compatibleLoans,
            computedProfit : this.computedProfit,
            computedRate: this.computedRate
        }
    }
};
