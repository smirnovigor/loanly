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
            var categoryNumber = Number(Math.random() * 9).toFixed();
            categoryNumberName = {
                0 : 'הלוואה למטרה אחרת',
                1 : 'הלוואה ללימודים',
                2 : 'הלוואה משלימה לדירה',
                3 : 'הלוואה לשיפוץ',
                4 : 'הלוואה לחופשה',
                5 : 'הלוואה לאירוע משפחתי',
                6 : 'הלוואה לקניית מוצר',
                7 : 'הלוואה לכיסוי חובות',
                8 : 'הלוואה לחתונה',
                9 : 'הלוואה לטיפול קוסמטי'
            };
            console.log("here",categoryNumberName[categoryNumber],categoryNumber);
            Loans.insert({
                userId: randomUser._id ,
                userCreditRating: randomUser.userCreditRating,
                title: Fake.fromArray(['הלוואה ללימודים', 'הלוואה משלימה לדירה', 'הלוואה לשיפוץ', 'הלוואה לחופשה', 'הלוואה לאירוע משפחתי', 'הלוואה לקניית מוצר', 'הלוואה לכיסוי חובות', 'הלוואה לחתונה', 'הלוואה לטיפול קוסמטי', 'הלוואה למטרה אחרת']),
               // title: Fake.fromArray(categoryNumberName[categoryNumber]),
              //  description: Fake.fromArray(["הדרך למימון לימודים גבוהים מתחילה בתשלום שכר הלימוד ומאתגרת את הסטודנט עוד לפני שהתיישב על ספסל הלימודים. בשנת הלימודים 2014 פרסמה המועצה להשכלה גבוהה כי מספר הסטודנטים עמד על  כ-308.3 אלף סטודנטים באוניברסיטאות ובמכללות. בארץ קיימים עשרות מוסדות לימוד להשכלה גבוהה המציעים מבחר רחב של נושאי לימוד לפי תחומי העניין של הסטודנטים העתידיים. אלא שמטלות הקורסים, הגשת עבודות והכנה למבחנים הם לא הדבר הראשון שמעסיק את הסטודנטים והוריהם, אלא השאלה מאיפה יממנו את שכר הלימוד. הפתרון הנפוץ לכך הוא הלוואה ללימודים. "]),

                description: Fake.paragraph(5),
                amount: amount,
                period: 5 + Number(Math.floor(Math.random() * 25)),
                rate: rateBasedOnCreditRating,
                categoryId : Number(Math.random() * 9).toFixed(), //TODO:: replace with LoansCategories length
                investments : [{userId : users[Math.floor(Math.random() * users.length)]._id ,amount : investmentsAmount}],
                createdAt : createdAt,
                status: 'active',
                endsAt : endsAt
            });
        }
    }
};

