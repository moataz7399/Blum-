// تعريف المتغيرات
const botUsername = "FALCON_tapbot"; // اسم البوت
const appName = "FALCON"; // اسم التطبيق المصغر
const copyButton = document.getElementById("copy-button"); // زر نسخ الرابط
const statusMessage = document.getElementById("status-message"); // رسالة الحالة
const userList = document.getElementById("user-list"); // قائمة المستخدمين

// تهيئة Telegram Web App
Telegram.WebApp.ready();

// الحصول على بيانات المستخدم
const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user.id; // معرف المستخدم الحالي

// إنشاء الرابط المخصص
const customLink = `https://t.me/${botUsername}/${appName}?startapp=${userId}`;

// نسخ الرابط عند النقر على الزر
copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(customLink).then(() => {
        statusMessage.textContent = "تم نسخ الرابط بنجاح! 🎉";
    }).catch(() => {
        statusMessage.textContent = "حدث خطأ أثناء نسخ الرابط. ❌";
    });
});

// التحقق من المعلمة startapp في الرابط
const urlParams = new URLSearchParams(window.location.search);
const originalUserId = urlParams.get('startapp'); // معرف المستخدم الأصلي

// إذا كان هناك معرف مستخدم أصلي، قم بتتبع المستخدم الحالي
if (originalUserId && originalUserId !== userId) {
    // إرسال البيانات إلى الخادم لتتبع المستخدم
    fetch('/track-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUserId, currentUserId: userId })
    });

    // إضافة المستخدم الحالي إلى القائمة
    const li = document.createElement("li");
    li.textContent = user.username || `User ${userId}`;
    userList.appendChild(li);
}

// استرداد قائمة المستخدمين من الخادم (مثال)
fetch('/get-users')
    .then(response => response.json())
    .then(data => {
        data.users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.username || `User ${user.id}`;
            userList.appendChild(li);
        });
    });
