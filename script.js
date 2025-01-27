// تعريف المتغيرات
const botToken = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8"; // توكن البوت
const channelUsername = "@Squirrels_Community"; // اسم القناة
const statusIcon = document.getElementById("status-icon"); // عنصر حالة التعزيز

// تهيئة Telegram Web App
Telegram.WebApp.ready();

// الحصول على بيانات المستخدم
const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user.id; // معرف المستخدم

// دالة للتحقق من التعزيز
async function checkBoost(userId) {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${channelUsername}&user_id=${userId}`
        );
        const data = await response.json();

        // التحقق من حالة التعزيز
        if (data.result && data.result.status === 'member' && data.result.is_boosting) {
            return true; // إذا كان معززًا
        } else {
            return false; // إذا لم يكن معززًا
        }
    } catch (error) {
        console.error("حدث خطأ أثناء التحقق من التعزيز:", error);
        return false;
    }
}

// تحديث حالة التعزيز
checkBoost(userId).then(isBoosted => {
    if (isBoosted) {
        statusIcon.textContent = "✅"; // إذا كان معززًا
    } else {
        statusIcon.textContent = "❌"; // إذا لم يكن معززًا
    }
});
