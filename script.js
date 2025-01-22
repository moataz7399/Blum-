// تأكد من أن Telegram Web App جاهز
Telegram.WebApp.ready();

// الحصول على معلومات المستخدم
const initDataUnsafe = Telegram.WebApp.initDataUnsafe;
const statusDiv = document.getElementById("status");

if (initDataUnsafe.user) {
    // التحقق من حالة الاشتراك في Telegram Premium
    if (initDataUnsafe.user.is_premium) {
        statusDiv.textContent = "✅";
        statusDiv.style.color = "green";
    } else {
        statusDiv.textContent = "❌";
        statusDiv.style.color = "red";
    }
} else {
    statusDiv.textContent = "❓";
    statusDiv.style.color = "gray";
}
