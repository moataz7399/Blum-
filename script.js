// استخراج معرف المستخدم الحالي من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const currentUserId = urlParams.get('startapp');

// التحقق من وجود معرف المستخدم الحالي
if (!currentUserId) {
    alert('معرف المستخدم غير موجود في الرابط. تأكد من إضافة ?startapp=USER_ID');
} else {
    // استرجاع النقاط من localStorage
    function getPoints(userId) {
        const points = localStorage.getItem(`points_${userId}`);
        return points ? parseInt(points) : 0;
    }

    // حفظ النقاط في localStorage
    function setPoints(userId, points) {
        localStorage.setItem(`points_${userId}`, points);
    }

    // تحديث عرض النقاط
    function updatePointsDisplay(points) {
        document.getElementById('pointsDisplay').innerText = `${points.toLocaleString()} PAWS`;
    }

    // إضافة النقاط
    function addPoints(userId, amount) {
        const currentPoints = getPoints(userId);
        const newPoints = currentPoints + amount;
        setPoints(userId, newPoints);
        updatePointsDisplay(newPoints);
    }

    // تحديث النقاط عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        const userPoints = getPoints(currentUserId);
        updatePointsDisplay(userPoints);

        // التحقق إذا كان الدخول عبر رابط إحالة
        const referrerId = urlParams.get('referrer');
        if (referrerId && referrerId !== currentUserId) {
            const referralRegisteredKey = `referral_${currentUserId}_${referrerId}`;
            if (!localStorage.getItem(referralRegisteredKey)) {
                // إضافة 100,000 نقطة للمُحيل
                addPoints(referrerId, 100000);
                // تسجيل الإحالة
                localStorage.setItem(referralRegisteredKey, 'true');
                alert(`تمت إضافة 100,000 نقطة للمستخدم صاحب المعرّف: ${referrerId}`);
            }
        }
    });

    // زر نسخ رابط الإحالة
    const copyLinkButton = document.getElementById('copyLinkButton');
    copyLinkButton.addEventListener('click', () => {
        const referralLink = `https://t.me/falcon_tapbot/FALCON?startapp=${currentUserId}&referrer=${currentUserId}`;
        navigator.clipboard.writeText(referralLink).then(() => {
            alert('تم نسخ رابط الإحالة!');
        }).catch(err => {
            console.error('خطأ أثناء نسخ الرابط:', err);
        });
    });
}
