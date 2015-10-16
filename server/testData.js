loadTestData = function loadTestData() {
    if (Loans.find().count() === 0) {
        for (var i = 0; i < 10; i++) {
            Loans.insert({
                title: Fake.sentence(1),
                description: Fake.paragraph(7),
                amount: 1000 + Number(Math.floor(Math.random() * 10000)),
                period: 5 + Number(Math.floor(Math.random() * 25)),
                rate: 1 + Number((Math.random() * 3).toFixed(2))
            });
        }
    }
}
