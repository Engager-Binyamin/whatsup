
require('dotenv').config();
const campaignController = require("../DL/controllers/campaign.controller");
const leadController = require("../DL/controllers/lead.controller");



const go2 = async () => {
    const db = require('./db')
    db.connect()

    let objCamp = {
        user: "65c34bc58b8d79a3e4ae0497",
        title: "כפר נוער - גיוס תלמידים",
        details: "כל המנויים שנרשמו דרך מזכירות מטה בנימין",
        msg: [
            {
            subject: "הודעה ראשונה - התנעה",
            content: "חלק ממרכזי המחוננים מפעילים תוכניות לתלמידים מצטיינים לתלמידים שהישגיהם במבחני הקבלה לתוכניות המחוננים היו בתחום ה-5% הגבוהים ביותר אחרי סף הקבלה לתוכנית המחוננים באזורם. הורי התלמידים המשתייכים לקבוצה זו יקבלו על כך הודעה בכתב ובה פרטי התקשרות עם מנהל התוכנית למצטיינים. התוכנית מיועדת לתלמידי כיתות ג'–ו'. היא פועלת יום בשבוע לאחר שעות הלימודים וכוללת שני קורסים מתחומי ידע שונים שאינם כלולים בתוכנית הלימודים הפורמלית. ההשתתפות בתוכנית כרוכה בתשלום הורים, וההסעות אליה הן באחריות ההורים.",
            creationDate: new Date("2024-01-06"),
            leads: [
                {
                    lead: "65c3ecc8f5e3c2450e40bf9d",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c48844e9e1152bec10d8af",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3ebc9f5e3c2450e40bf0e",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3d5eed89a3d4c0223c7d9",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c1f3a918e977cc0d69b779",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3ecb6f5e3c2450e40bf86",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c1f35f18e977cc0d69b772",
                    receptionDate: new Date("2024-02-07"),
                },
            ],
            status: "sent",
        },
        {
            subject: "יום פתוח",
            content: "יום פתוח, יתקיים ביום שישי, 1.3.24, בשעה 09:30 בבוקר.            תוכלו להירשם דרך טופס ההרשמה (עכשיו הירשמו) הנמצא בכל דפי האתר.",
            creationDate: new Date("2024-01-22"),
            leads: [
                {
                    lead: "65c3ebc9f5e3c2450e40bf0e",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3d5eed89a3d4c0223c7d9",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c1f3a918e977cc0d69b779",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3ecb6f5e3c2450e40bf86",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c1f35f18e977cc0d69b772",
                    receptionDate: new Date("2024-02-07"),
                },
            ],
            status: "sent",
        },
        {
            subject: "הזדמנות אחרונה להירשם",
            content: "הזדמנות אחרונה להירשם! קורס עיצוב תיק דוקטור עם אלה עלוש ⏰משך הקורס: 6 מפגשים בני 4 שעות. ⏳תאריך פתיחה: 19/1 ימים ושעות: ימי חמישי",
            creationDate: new Date("2024-02-08"),
            leads: [],
            status: "created",
        }
        ],

        leads: [
            {
                lead: "65c48844e9e1152bec10d8af",
                joinDate: new Date("2024-02-08"),
            },
            {
                lead: "65c3ebc9f5e3c2450e40bf0e",
                joinDate: new Date("2024-02-08"),
            },
            {
                lead: "65c3d5eed89a3d4c0223c7d9",
                joinDate: new Date("2024-02-08"),
            },

            {
                lead: "65c1f35f18e977cc0d69b772",
                joinDate: new Date("2024-02-08"),
            },
            {
                lead: "65c1f3a918e977cc0d69b779",
                joinDate: new Date("2024-02-01"),
            },
            {
                lead: "65c3ecb6f5e3c2450e40bf86",
                joinDate: new Date("2024-02-02"),
            },
            {
                lead: "65c3ecc8f5e3c2450e40bf9d",
                joinDate: new Date("2024-01-27"),
            }

        ],
    }
    let camp = await campaignController.create(objCamp)

    let objCamp2 = {
        user: "65c34bc58b8d79a3e4ae0497",
        title: "מנויי חדר כושר בנימין",
        details: "כל המנויים שנרשמו דרך מזכירות מטה בנימין",
        msg: [{
            subject: "הודעה ראשונה - ההרשמה נפתחה",
            content: "סתכל על עצמך רגע! אתה בטוח שזה לא יכול להראות טוב יותר? שאתה לא יכול להרגיש טוב יותר? זה זמן לשינוי. מועדון הכושר שלנו מציע תוכניות מותאמות אישית לכל רמת כושר ומטרה. אנחנו מאמינים שכולם יכולים להגיע לחזונותיהם, ואנחנו כאן להכווין אותך כל הדרך. אם אתה מחפש להשיג גוף חזק יותר, להרגיש בריא יותר, להגביר את מסת השריר, או אפילו פשוט לשפר את מצב הרוח - יש לנו את מה שאתה צריך.",
            creationDate: new Date("2024-02-06"),
            leads: [
                {
                    lead: "65c1f3a918e977cc0d69b779",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3ecb6f5e3c2450e40bf86",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c1f3a918e977cc0d69b779",
                    receptionDate: new Date("2024-02-07"),
                },
            ],
            status: "sent",
        },
        {
            subject: "הודעה ראשונה - תראו מה כותבים עלינו",
            content: "אנחנו אוהבים תמונות ואנשים, יש לנו ניסיון עשיר בהדפסת תמונות על מגוון רעיונות ועיצובים, יש לנו מגוון רחב של מתנות עם תמונה לאוהבים שלכם, או לעצמכם, טיילו באתר ותהנו. ",
            creationDate: new Date("2024-02-02"),
            leads: [
                {
                    lead: "65c1f3a918e977cc0d69b779",
                    receptionDate: new Date("2024-02-07"),
                },
                {
                    lead: "65c3ecb6f5e3c2450e40bf86",
                    receptionDate: new Date("2024-02-07"),
                },
            ],
            status: "sent",
        },
        {
            subject: "הזדמנות אחרונה להירשם",
            content: "הזדמנות אחרונה להירשם! קורס עיצוב תיק דוקטור עם אלה עלוש ⏰משך הקורס: 6 מפגשים בני 4 שעות. ⏳תאריך פתיחה: 19/1 ימים ושעות: ימי חמישי",
            creationDate: new Date("2024-02-08"),
            leads: [],
            status: "created",
        }
        ],

        leads: [
            {
                lead: "65c1f35f18e977cc0d69b772",
                joinDate: new Date("2024-02-08"),
            },
            {
                lead: "65c1f3a918e977cc0d69b779",
                joinDate: new Date("2024-02-01"),
            },
            {
                lead: "65c3ecb6f5e3c2450e40bf86",
                joinDate: new Date("2024-02-02"),
            },
            {
                lead: "65c3ecc8f5e3c2450e40bf9d",
                joinDate: new Date("2024-01-27"),
            }

        ],
    }
    let camp2 = await campaignController.create(objCamp2)


    await leadController.update("65c1f35f18e977cc0d69b772", { $set: { campaigns: [] } })
    await leadController.update("65c1f3a918e977cc0d69b779", { $set: { campaigns: [] } })
    await leadController.update("65c3ecb6f5e3c2450e40bf86", { $set: { campaigns: [] } })
    await leadController.update("65c3ecc8f5e3c2450e40bf9d", { $set: { campaigns: [] } })
    
    await leadController.update("65c48844e9e1152bec10d8af", { $set: { campaigns: [] } })
    await leadController.update("65c3ebc9f5e3c2450e40bf0e", { $set: { campaigns: [] } })
    await leadController.update("65c3d5eed89a3d4c0223c7d9", { $set: { campaigns: [] } })
    
    
    
    await leadController.update("65c1f35f18e977cc0d69b772", { $push: { campaigns: camp2._id } })
    await leadController.update("65c1f3a918e977cc0d69b779", { $push: { campaigns: camp2._id } })
    await leadController.update("65c3ecb6f5e3c2450e40bf86", { $push: { campaigns: camp2._id } })
    await leadController.update("65c3ecc8f5e3c2450e40bf9d", { $push: { campaigns: camp2._id } })
    
    
    await leadController.update("65c3ecc8f5e3c2450e40bf9d", { $push: { campaigns: camp._id } })
    await leadController.update("65c3ebc9f5e3c2450e40bf0e", { $push: { campaigns: camp._id } })
    await leadController.update("65c3d5eed89a3d4c0223c7d9", { $push: { campaigns: camp._id } })
    await leadController.update("65c1f35f18e977cc0d69b772", { $push: { campaigns: camp._id } })
    await leadController.update("65c1f3a918e977cc0d69b779", { $push: { campaigns: camp._id } })
    await leadController.update("65c3ecb6f5e3c2450e40bf86", { $push: { campaigns: camp._id } })
    await leadController.update("65c3ecc8f5e3c2450e40bf9d", { $push: { campaigns: camp._id } })
    
    console.log("Doneeeeeee");
};

go2()