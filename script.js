// التأكد من تفعيل Telegram WebApp
const tg = window.Telegram.WebApp;

// معرف القناة والبوت
const botToken = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8"; // ضع رمز البوت هنا
const channelId = "@Squirrels_Community"; // ضع معرف القناة هنا

// التعامل مع زر التحقق
document.getElementById('checkButton').addEventListener('click', async () => {
    const statusElement = document.getElementById('status');
    statusElement.textContent = "جارٍ التحقق...";

    // الحصول على معرف المستخدم من WebApp
    const userId = tg.initDataUnsafe?.user?.id;

    if (!userId) {
        statusElement.textContent = "❌ فشل الحصول على معرف المستخدم.";
        return;
    }

    // استدعاء Telegram API للتحقق
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${channelId}&user_id=${userId}`);
        const data = await response.json();

        if (data.ok) {
            const isMember = ["member", "administrator", "creator"].includes(data.result.status);
            statusElement.textContent = isMember ? "✅ أنت مشترك" : "❌ لست مشتركًا";
        } else {
            statusElement.textContent = "❌ خطأ في التحقق من الاشتراك.";
        }
    } catch (error) {
        statusElement.textContent = "❌ حدث خطأ أثناء الاتصال بالخادم.";
    }
});
