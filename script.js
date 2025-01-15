// استرجاع النقاط من localStorage أو تعيين القيمة الافتراضية
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;

// تحديث عرض النقاط
function updatePointsDisplay() {
    document.getElementById('pointsDisplay').innerText = `النقاط: ${points}`;
}

// عند الضغط على الزر لجمع النقاط
document.getElementById('collectButton').addEventListener('click', () => {
    points += 100;
    localStorage.setItem('points', points); // حفظ النقاط
    updatePointsDisplay();
});

// تحديث النقاط عند تحميل الصفحة
updatePointsDisplay();

// استخراج معرّف الإحالة من الرابط
const urlParams = new URLSearchParams(window.location.search);
const referrerId = urlParams.get('startapp');

// التحقق إذا كان المستخدم جديدًا
if (!localStorage.getItem('isNewUser')) {
    if (referrerId) {
        // إضافة 10,000 نقطة للمُحال
        let referrerPointsKey = `referrer_${referrerId}`;
        let referrerPoints = localStorage.getItem(referrerPointsKey) ? parseInt(localStorage.getItem(referrerPointsKey)) : 0;
        referrerPoints += 10000;
        localStorage.setItem(referrerPointsKey, referrerPoints);

        alert(`تمت إضافة 10,000 نقطة للمستخدم صاحب المعرّف: ${referrerId}`);
    }
    localStorage.setItem('isNewUser', 'false'); // وضع علامة المستخدم الحالي كـ "غير جديد"
}
