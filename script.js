// النقاط لجميع المستخدمين
const userPoints = JSON.parse(localStorage.getItem("userPoints")) || {};

// عند تحميل الصفحة
window.onload = function () {
    if (window.Telegram.WebApp) {
        const initData = Telegram.WebApp.initDataUnsafe;
        const referralID = initData.start_param; // ID المرسل بالرابط

        // إذا كان المستخدم لديه ID محدد
        if (referralID) {
            // إذا لم يكن لدى المستخدم نقاط محفوظة، قم بتهيئتها
            if (!userPoints[referralID]) {
                userPoints[referralID] = 0;
            }

            // أضف 10000 نقطة لصاحب الـ ID
            userPoints[referralID] += 10000;

            // حفظ النقاط المحدثة
            localStorage.setItem("userPoints", JSON.stringify(userPoints));

            // عرض النقاط لصاحب الـ ID الحالي
            if (initData.user && initData.user.id == referralID) {
                document.getElementById("your-points").textContent =
                    userPoints[referralID];
            }

            // عرض ID الإحالة
            document.getElementById("referral-id").textContent = referralID;
        } else {
            document.getElementById("referral-id").textContent = "None";
        }
    } else {
        alert("Telegram WebApp API is not available!");
    }
};
