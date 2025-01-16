// دالة لاسترجاع النقاط من localStorage
function getPoints(userId) {
    const points = localStorage.getItem(`points_${userId}`);
    return points ? parseInt(points) : 0;
}

// دالة لحفظ النقاط في localStorage
function setPoints(userId, points) {
    localStorage.setItem(`points_${userId}`, points);
}

// دالة لتحديث عرض النقاط في الواجهة
function updatePointsDisplay(points) {
    document.getElementById('pointsDisplay').innerText = `النقاط: ${points}`;
}

// دالة لإضافة النقاط عند الضغط على الزر
function addPoints(userId, amount) {
    const currentPoints = getPoints(userId);
    const newPoints = currentPoints + amount;
    setPoints(userId, newPoints);
    updatePointsDisplay(newPoints);
}

// استخراج معرف المستخدم الحالي من الرابط
const urlParams = new URLSearchParams(window.location.search);
const currentUserId = urlParams.get('startapp'); // معرف المستخدم الحالي من الرابط

if (!currentUserId) {
    alert('معرف المستخدم غير موجود في الرابط. تأكد من إضافة ?startapp=USER_ID');
} else {
    // عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        // تحديث عرض النقاط للمستخدم الحالي
        const userPoints = getPoints(currentUserId);
        updatePointsDisplay(userPoints);

        // التحقق إذا كان المستخدم جديدًا ولم يتم تسجيل إحالة له
        if (!localStorage.getItem(`referral_registered_${currentUserId}`) && urlParams.has('referrer')) {
            const referrerId = urlParams.get('referrer'); // استخراج معرف المُحيل
            if (referrerId !== currentUserId) {
                // إضافة 10,000 نقطة للمُحيل
                const referrerPoints = getPoints(referrerId) + 10000;
                setPoints(referrerId, referrerPoints);
                alert(`تمت إضافة 10,000 نقطة للمستخدم صاحب المعرّف: ${referrerId}`);
            }
            // تسجيل أن الإحالة تمت لهذا المستخدم
            localStorage.setItem(`referral_registered_${currentUserId}`, 'true');
        }
    });

    // إضافة حدث للزر لجمع النقاط
    document.getElementById('collectButton').addEventListener('click', () => {
        addPoints(currentUserId, 100);
    });
}
