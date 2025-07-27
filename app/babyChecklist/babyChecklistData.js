const babyChecklistData = [
    // 🛏 שינה ולינה
    { id: 1, name: "מיטת תינוק / עריסה", category: "שינה ולינה", checked: false },
    { id: 2, name: "מזרן למיטה", category: "שינה ולינה", checked: false },
    { id: 3, name: "סדינים למיטה (לפחות 3)", category: "שינה ולינה", checked: false },
    { id: 4, name: "שמיכות קלות (לתינוק)", category: "שינה ולינה", checked: false },
    { id: 5, name: "מגן ראש", category: "שינה ולינה", checked: false },
    { id: 6, name: "נחשוש", category: "שינה ולינה", checked: false },
    { id: 7, name: "מובייל לתינוק", category: "שינה ולינה", checked: false },
    { id: 8, name: "מכשיר רעש לבן", category: "שינה ולינה", checked: false },

    // 👶 החתלה והיגיינה
    { id: 9, name: "חבילת חיתולים (ניובורן)", category: "החתלה והיגיינה", checked: false },
    { id: 10, name: "מגבונים לחים (ללא בישום)", category: "החתלה והיגיינה", checked: false },
    { id: 11, name: "משטח החתלה", category: "החתלה והיגיינה", checked: false },
    { id: 12, name: "קרם לטוסיק", category: "החתלה והיגיינה", checked: false },
    { id: 13, name: "פח לחיתולים", category: "החתלה והיגיינה", checked: false },
    { id: 14, name: "אמבטיה לתינוק", category: "החתלה והיגיינה", checked: false },
    { id: 15, name: "מדחום למים", category: "החתלה והיגיינה", checked: false },
    { id: 16, name: "מגבות עם כובע", category: "החתלה והיגיינה", checked: false },
    { id: 17, name: "סבון ושמפו לתינוק", category: "החתלה והיגיינה", checked: false },
    { id: 18, name: "מברשת שיער לתינוק", category: "החתלה והיגיינה", checked: false },
    { id: 19, name: "קוצץ ציפורניים לתינוק", category: "החתלה והיגיינה", checked: false },

    // 👕 בגדים
    { id: 20, name: "בגדי גוף", category: "בגדים", checked: false },
    { id: 21, name: "רגליות (אוברולים)", category: "בגדים", checked: false },
    { id: 22, name: "כובעים דקים", category: "בגדים", checked: false },
    { id: 23, name: "גרביים", category: "בגדים", checked: false },
    { id: 24, name: "סינרים", category: "בגדים", checked: false },
    { id: 25, name: "כפפות (למניעת שריטות)", category: "בגדים", checked: false },
    { id: 26, name: "שמיכה דקה ליציאה", category: "בגדים", checked: false },

    // 🍼 האכלה
    { id: 27, name: "בקבוקים", category: "האכלה", checked: false },
    { id: 28, name: "מברשת לניקוי בקבוקים", category: "האכלה", checked: false },
    { id: 29, name: "סטריליזטור", category: "האכלה", checked: false },
    { id: 30, name: "פורמולה", category: "האכלה", checked: false },
    { id: 31, name: "משטח הנקה / כרית", category: "האכלה", checked: false },
    { id: 32, name: "משאבת חלב", category: "האכלה", checked: false },
    { id: 33, name: "שקיות אחסון לחלב אם", category: "האכלה", checked: false },
    { id: 34, name: "חיתולי טטרה", category: "האכלה", checked: false },
    { id: 35, name: "סינרי האכלה", category: "האכלה", checked: false },
    { id: 36, name: "מחמם בקבוקים", category: "האכלה", checked: false },
    { id: 37, name: "מטליות לניקוי", category: "האכלה", checked: false },

    // 🚗 יציאות וטיולים
    { id: 38, name: "עגלה לתינוק", category: "יציאות וטיולים", checked: false },
    { id: 39, name: "סלקל", category: "יציאות וטיולים", checked: false },
    { id: 40, name: "תיק החתלה", category: "יציאות וטיולים", checked: false },
    { id: 41, name: "שמיכה קלה לעגלה", category: "יציאות וטיולים", checked: false },
    { id: 42, name: "מטריה לעגלה", category: "יציאות וטיולים", checked: false },
    { id: 43, name: "ריפוד לעגלה", category: "יציאות וטיולים", checked: false },
    { id: 44, name: "כיסוי גשם לעגלה", category: "יציאות וטיולים", checked: false },

    // 🍼 מוצצים ואביזרים
    { id: 45, name: "מוצצים (ניובורן)", category: "מוצצים ואביזרים", checked: false },
    { id: 46, name: "מחזיק מוצץ", category: "מוצצים ואביזרים", checked: false },
    { id: 47, name: "קופסה לאחסון מוצץ", category: "מוצצים ואביזרים", checked: false },

    // 🧸 צעצועים וגירויים
    { id: 48, name: "מובייל לעגלה / מיטה", category: "צעצועים וגירויים", checked: false },
    { id: 49, name: "רעשנים", category: "צעצועים וגירויים", checked: false },
    { id: 50, name: "ספרים רכים", category: "צעצועים וגירויים", checked: false },
    { id: 51, name: "משטח פעילות", category: "צעצועים וגירויים", checked: false },

    // 🏠 לבית
    { id: 52, name: "מצלמת תינוק / מוניטור", category: "לבית", checked: false },
    { id: 53, name: "מד חום לחדר", category: "לבית", checked: false },
    { id: 54, name: "מד חום דיגיטלי", category: "לבית", checked: false },
    { id: 55, name: "מנורת לילה", category: "לבית", checked: false },
    { id: 56, name: "סל כביסה לתינוק", category: "לבית", checked: false },
    { id: 57, name: "סל אחסון לצעצועים", category: "לבית", checked: false }
];

export default babyChecklistData;
