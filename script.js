// تعريف المتغيرات
const botToken = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8"; // توكن البوت
const channelUsername = "@Squirrels_Community"; // اسم القناة
const statusIcon = document.getElementById("status-icon"); // عنصر حالة الاشتراك

// تهيئة Telegram Web App
Telegram.WebApp.ready();

// الحصول على بيانات المستخدم
const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user.id; // معرف المستخدم

// دالة للتحقق من الاشتراك
async function checkSubscription(userId) {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${channelUsername}&user_id=${userId}`
        );
        const data = await response.json();
        return data.result.status === 'member' || data.result.status === 'administrator' || data.result.status === 'creator';
    } catch (error) {
        console.error("حدث خطأ أثناء التحقق من الاشتراك:", error);
        return false;
    }
}

// تحديث حالة الاشتراك
checkSubscription(userId).then(isSubscribed => {
    if (isSubscribed) {
        statusIcon.textContent = "✅"; // إذا كان مشتركًا
    } else {
        statusIcon.textContent = "❌"; // إذا لم يكن مشتركًا
    }
});
