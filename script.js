// التحقق من توفر كائن Telegram WebApp
if (window.Telegram.WebApp) {
    // الحصول على بيانات المستخدم
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe.user;
    const userId = user ? user.id : null;

    // عناصر DOM
    const pointsElement = document.getElementById('points');
    const referralLinkElement = document.getElementById('referralLink');
    const addPointsButton = document.getElementById('addPoints');
    const generateLinkButton = document.getElementById('generateLink');

    // استرجاع النقاط المخزنة
    let points = localStorage.getItem('points') || 0;
    points = parseInt(points);
    pointsElement.textContent = points;

    // إضافة النقاط عند الضغط على الزر
    addPointsButton.addEventListener('click', () => {
        points += 100;
        localStorage.setItem('points', points);
        pointsElement.textContent = points;
    });

    // الحصول على معرف المُحيل من رابط الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('startapp');

    if (referrerId && referrerId !== userId) {
        // إضافة 10000 نقطة لصاحب الرابط
        const referrerPointsKey = `points_${referrerId}`;
        let referrerPoints = localStorage.getItem(referrerPointsKey) || 0;
        referrerPoints = parseInt(referrerPoints) + 10000;
        localStorage.setItem(referrerPointsKey, referrerPoints);
    }

    // توليد رابط الإحالة
    generateLinkButton.addEventListener('click', () => {
        if (userId) {
            const referralLink = `https://t.me/falcon_tapbot/FALCON?startapp=${userId}`;
            referralLinkElement.textContent = referralLink;
            navigator.clipboard.writeText(referralLink).then(() => {
                alert('تم نسخ الرابط بنجاح!');
            });
        } else {
            alert('تعذر الحصول على معرف المستخدم.');
        }
    });
} else {
    alert('Telegram WebApp غير مدعوم في هذا المتصفح.');
}
