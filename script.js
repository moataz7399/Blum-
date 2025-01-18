// تهيئة WebApp تيليجرام
const tg = window.Telegram.WebApp;
tg.expand();

// الحصول على معرف المستخدم
const userId = tg.initDataUnsafe.user.id;

// عناصر DOM
const pointsElement = document.getElementById("points");
const referralLinkInput = document.getElementById("referralLink");
const botUsername = "falcon_tapbot"; // اسم المستخدم الخاص بالبوت
const appName = "FALCON"; // اسم التطبيق

// تحميل النقاط من LocalStorage
let points = parseInt(localStorage.getItem(`points_${userId}`) || "0");
pointsElement.textContent = points;

// إنشاء رابط الإحالة
const referralLink = `https://t.me/${botUsername}/${appName}?startapp=${userId}`;
referralLinkInput.value = referralLink;

// إضافة 100 نقطة
function addPoints() {
    points += 100;
    localStorage.setItem(`points_${userId}`, points);
    pointsElement.textContent = points;
}

// نسخ رابط الإحالة
function copyLink() {
    referralLinkInput.select();
    document.execCommand("copy");
    alert("تم نسخ رابط الإحالة!");
}

// إضافة نقاط الإحالة
const urlParams = new URLSearchParams(window.location.search);
const referrerId = urlParams.get("startapp");
if (referrerId && referrerId !== userId.toString()) {
    let referrerPoints = parseInt(localStorage.getItem(`points_${referrerId}`) || "0");
    referrerPoints += 100000; // إضافة 100,000 نقطة للمُحيل
    localStorage.setItem(`points_${referrerId}`, referrerPoints);
}
