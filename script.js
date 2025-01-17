// النقاط المخزنة ديناميكيًا أثناء الجلسة
let points = 0;
let referrals = {}; // تخزين النقاط المؤقتة للمُحيلين

// استهداف عناصر الصفحة
const pointsElement = document.getElementById('points');
const addPointsButton = document.getElementById('addPoints');
const generateLinkButton = document.getElementById('generateLink');
const referralLinkElement = document.getElementById('referralLink');

// الحصول على معرف المُحيل من الرابط
const urlParams = new URLSearchParams(window.location.search);
const referrerId = urlParams.get('startapp');

// إضافة النقاط للمُحيل
if (referrerId) {
    if (!referrals[referrerId]) {
        referrals[referrerId] = 10000; // إضافة 10,000 نقطة للمُحيل عند أول زيارة
    } else {
        referrals[referrerId] += 10000; // تحديث النقاط إذا كانت موجودة
    }
    alert(`تم إضافة 10,000 نقطة للمُحيل ID: ${referrerId}`);
}

// تحديث النقاط على الصفحة
function updatePoints() {
    pointsElement.textContent = points;
}

// إضافة النقاط عند الضغط على زر +100
addPointsButton.addEventListener('click', () => {
    points += 100;
    updatePoints();
});

// توليد رابط الإحالة
generateLinkButton.addEventListener('click', () => {
    const userId = Math.floor(Math.random() * 1000000); // توليد معرف مستخدم عشوائي
    const referralLink = `https://yourgithubpage.github.io/index.html?startapp=${userId}`;
    referralLinkElement.textContent = referralLink;
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('تم نسخ رابط الإحالة!');
    });
});

// تحديث النقاط عند تحميل الصفحة
updatePoints();
