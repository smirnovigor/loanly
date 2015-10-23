loadTestData = function loadTestData() {

    if (Meteor.users.find().count() === 0) {
        for (var i = 0; i < 50; i++) {
            Meteor.users.insert({
                username: Fake.sentence(1),
                createdAt: new Date()
            });
        }
    }

    if (Loans.find().count() === 0) {
        for (var i = 0; i < 100; i++) {
            var users = Meteor.users.find().fetch();
            var randomUser = users[Math.floor(Math.random() * users.length)];
            var amount = 1000 + Number(Math.floor(Math.random() * 99000));
            var investmentsAmount = Math.floor(amount * (Math.random()*1));
            Loans.insert({
                userId: randomUser._id ,
                userCreditRating: randomUser.userCreditRating,
                title: Fake.sentence(5),
                description: Fake.paragraph(5),
                amount: amount,
                period: 5 + Number(Math.floor(Math.random() * 25)),
                rate: 1 + Number((Math.random() * 3).toFixed(2)),
                categoryId : Number(Math.random() * 9).toFixed(), //TODO:: replace with LoansCategories length
                investments : [{userId : users[Math.floor(Math.random() * users.length)]._id ,amount : investmentsAmount}]
            });
        }
    }
};

