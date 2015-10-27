loadTestData = function loadTestData() {

    if (Meteor.users.find().count() === 0) {
        for (var i = 0; i < 50; i++) {
            Meteor.users.insert({
                username: Fake.sentence(1),
                createdAt: new Date(),
                profile: {
                    accountId: 29168
                }
            });
        }
    }

    if (Loans.find().count() === 0) {
        for (var i = 0; i < 100; i++) {
            var users = Meteor.users.find().fetch();
            var randomUser = users[Math.floor(Math.random() * users.length)];
            var amount = 1000 + Number(Math.floor(Math.random() * 99000));
            var investmentsAmount = Math.floor(amount * (Math.random()*1));
            var rateBasedOnCreditRating = Number((1 + (1 - randomUser.userCreditRating) * 9).toFixed(2));

            var createdAt = new Date();
            createdAt.setDate(createdAt.getDate() + Math.floor(Math.random() * 30));

            var endsAt = new Date();
            endsAt.setMonth(endsAt.getMonth() + Math.floor(Math.random() * 3) + 1);

            Loans.insert({
                userId: randomUser._id ,
                userCreditRating: randomUser.userCreditRating,
                title: Fake.sentence(5),
                description: Fake.paragraph(5),
                amount: amount,
                period: 5 + Number(Math.floor(Math.random() * 25)),
                rate: rateBasedOnCreditRating,
                categoryId : Number(Math.random() * 9).toFixed(), //TODO:: replace with LoansCategories length
                investments : [{userId : users[Math.floor(Math.random() * users.length)]._id ,amount : investmentsAmount}],
                createdAt : createdAt,
                endsAt : endsAt
            });
        }
    }
};

