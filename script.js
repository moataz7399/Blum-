// تخزين النقاط في LocalStorage
let points = parseInt(localStorage.getItem("myPoints")) || 0;

// النقاط المحفوظة لكل مستخدم تمت مشاركتها معه
const referralPoints = JSON.parse(localStorage.getItem("referralPoints")) || {};

// عند تحميل الصفحة
window.onload = function () {
    if (window.Telegram.WebApp) {
        const initData = Telegram.WebApp.initDataUnsafe;
        const referralID = initData.start_param; // ID المرسل بالرابط

        // إذا كان هناك referralID في الرابط
        if (referralID) {
            // إذا كان ID المرسل موجودًا، أضف 10000 نقطة له
            if (!referralPoints[referralID]) {
                referralPoints[referralID] = 0; // ابدأ النقاط من الصفر إذا غير موجود
            }
            referralPoints[referralID] += 10000;

            // حفظ النقاط الجديدة في LocalStorage
            localStorage.setItem("referralPoints", JSON.stringify(referralPoints));

            // عرض ID المرسل
            document.getElementById("referral-id").textContent = referralID;

            // عرض النقاط المحدثة لصاحب الـ ID في وحدة التحكم
            console.log(
                `Referral ID ${referralID} now has ${referralPoints[referralID]} points.`
            );
        } else {
            document.getElementById("referral-id").textContent = "None";
        }
    } else {
        alert("Telegram WebApp API is not available!");
    }

    // عرض النقاط المحفوظة للمستخدم الحالي
    updatePoints();

    // إعداد زر إضافة النقاط
    const addPointsBtn = document.getElementById("add-points-btn");
    addPointsBtn.addEventListener("click", () => {
        points += 10;
        updatePoints();
        localStorage.setItem("myPoints", points); // حفظ النقاط الجديدة للمستخدم
    });
};

// تحديث عرض النقاط للمستخدم الحالي
function updatePoints() {
    document.getElementById("points").textContent = points;
}
