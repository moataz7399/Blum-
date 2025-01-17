// Telegram WebApp Integration
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe.user;
    const userId = user ? user.id : null;

    // DOM Elements
    const pointsElement = document.getElementById('points');
    const referralLinkElement = document.getElementById('referralLink');
    const addPointsButton = document.getElementById('addPoints');
    const generateLinkButton = document.getElementById('generateLink');

    // Retrieve points for the current user
    let points = localStorage.getItem(`points_${userId}`) || 0;
    points = parseInt(points);
    pointsElement.textContent = points;

    // Add points for current user
    addPointsButton.addEventListener('click', () => {
        points += 100;
        localStorage.setItem(`points_${userId}`, points);
        pointsElement.textContent = points;
    });

    // Check for referrer ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('startapp');

    if (referrerId && referrerId !== userId) {
        // Add 10000 points to the referrer
        let referrerPoints = localStorage.getItem(`points_${referrerId}`) || 0;
        referrerPoints = parseInt(referrerPoints) + 10000;
        localStorage.setItem(`points_${referrerId}`, referrerPoints);
    }

    // Generate referral link
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

    // Automatically update points when returning to the app
    pointsElement.textContent = localStorage.getItem(`points_${userId}`) || 0;
} else {
    alert('Telegram WebApp غير مدعوم في هذا المتصفح.');
}
