var creaditRating = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'];

loadTestData = function loadTestData() {

    if (Meteor.users.find().count() === 0) {
        for (var i = 0; i < 3; i++) {
            Meteor.users.insert({
                username: Fake.sentence(1),
                createdAt: new Date(),
                userCreditRating: Number((Math.random()).toFixed(3))
            });
        }
    }

    if (Loans.find().count() === 0) {
        for (var i = 0; i < 10; i++) {
            var users = Meteor.users.find().fetch();
            var randomUser = users[Math.floor(Math.random() * users.length)];
            Loans.insert({
                userId: randomUser._id ,
                title: Fake.sentence(1),
                description: Fake.paragraph(7),
                amount: 1000 + Number(Math.floor(Math.random() * 10000)),
                period: 5 + Number(Math.floor(Math.random() * 25)),
                rate: 1 + Number((Math.random() * 3).toFixed(2))
            });
        }
    }
};

