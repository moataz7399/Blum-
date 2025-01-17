// الحصول على النقاط المخزنة
const pointsElement = document.getElementById('points');
const referralLinkElement = document.getElementById('referralLink');
const addPointsButton = document.getElementById('addPoints');
const generateLinkButton = document.getElementById('generateLink');

let points = localStorage.getItem('points') || 0;
points = parseInt(points);
pointsElement.textContent = points;

// إضافة النقاط عند الضغط على الزر
addPointsButton.addEventListener('click', () => {
    points += 100;
    localStorage.setItem('points', points);
    pointsElement.textContent = points;
});

// الحصول على معرف الشخص من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const referrerId = urlParams.get('startapp');

if (referrerId) {
    // إضافة 10000 نقطة لصاحب الرابط
    const referrerPointsKey = `points_${referrerId}`;
    let referrerPoints = localStorage.getItem(referrerPointsKey) || 0;
    referrerPoints = parseInt(referrerPoints) + 10000;
    localStorage.setItem(referrerPointsKey, referrerPoints);
}

// توليد رابط الإحالة
generateLinkButton.addEventListener('click', () => {
    const userId = Math.floor(Math.random() * 1000000); // معرف شخصي تجريبي
    const referralLink = `https://t.me/falcon_tapbot/FALCON?startapp=${userId}`;
    referralLinkElement.textContent = referralLink;
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('تم نسخ الرابط بنجاح!');
    });
});
