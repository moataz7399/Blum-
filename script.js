// النقاط لجميع المستخدمين
const userPoints = {};

// النقاط الحالية للمستخدم الحالي
let points = 0;

// عند تحميل الصفحة
window.onload = function () {
    if (window.Telegram.WebApp) {
        const initData = Telegram.WebApp.initDataUnsafe;
        const referralID = initData.start_param; // ID المرسل بالرابط

        // إذا كان هناك referralID في الرابط
        if (referralID) {
            // إذا كان ID المرسل موجودًا، أضف 10000 نقطة له
            if (!userPoints[referralID]) {
                userPoints[referralID] = 0; // تأكد أن النقاط تبدأ من 0
            }
            userPoints[referralID] += 10000;

            // عرض ID المرسل
            document.getElementById("referral-id").textContent = referralID;

            // عرض النقاط المحدثة لصاحب الـ ID
            console.log(`Referral ID ${referralID} now has ${userPoints[referralID]} points.`);
        } else {
            document.getElementById("referral-id").textContent = "None";
        }
    } else {
        alert("Telegram WebApp API is not available!");
    }

    // إعداد زر إضافة النقاط
    const addPointsBtn = document.getElementById("add-points-btn");
    addPointsBtn.addEventListener("click", () => {
        points += 10;
        updatePoints();
    });

    // تحديث عرض النقاط للمستخدم الحالي
    function updatePoints() {
        document.getElementById("points").textContent = points;
    }
};
