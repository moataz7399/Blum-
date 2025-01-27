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
const username = user.username || `User ${userId}`; // اسم المستخدم أو معرفه

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
    // الحصول على البيانات المحفوظة في localStorage
    const storedData = localStorage.getItem(`referrals_${originalUserId}`);
    let referrals = storedData ? JSON.parse(storedData) : [];

    // إضافة المستخدم الحالي إلى القائمة
    referrals.push({ userId, username });

    // حفظ البيانات المحدثة في localStorage
    localStorage.setItem(`referrals_${originalUserId}`, JSON.stringify(referrals));

    // إضافة المستخدم الحالي إلى القائمة
    const li = document.createElement("li");
    li.textContent = username;
    userList.appendChild(li);
}

// عرض المستخدمين الذين دخلوا من الرابط (لصاحب الرابط)
if (!originalUserId || originalUserId === userId) {
    const storedData = localStorage.getItem(`referrals_${userId}`);
    const referrals = storedData ? JSON.parse(storedData) : [];

    referrals.forEach(ref => {
        const li = document.createElement("li");
        li.textContent = ref.username;
        userList.appendChild(li);
    });
}
