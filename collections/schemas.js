Schemas = {};

Schemas.Loan = new SimpleSchema({
    title: {
        type: String,
        max: 20
    },
    description: {
        type: String,
        max: 500
    },
    amount: {
        type: Number,
        min: 1000,
        max: 100000
    },
    period: {
        type: Number,
        min: 3,
        max: 36
    },
    rate: {
        type: Number,
        decimal: true,
        min: 1,
        max: 20
    }
});