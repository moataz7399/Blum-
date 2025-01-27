// التوكن الخاص بالبوت (استبدله بتوكن البوت الخاص بك)
const BOT_TOKEN = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8";
const CHANNEL_USERNAME = "Squirrels_Community"; // اسم القناة بدون @

// دالة للتحقق من تعزيز المستخدم للقناة
async function checkBoostStatus() {
    const userId = Telegram.WebApp.initDataUnsafe.user?.id; // الحصول على معرف المستخدم من Telegram WebApp

    if (!userId) {
        document.getElementById("status").textContent = "❌ لم يتم العثور على معرف المستخدم.";
        return;
    }

    try {
        // استدعاء API للتحقق من تعزيزات المستخدم
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/premium.getBoostsStatus?chat_id=@${CHANNEL_USERNAME}&user_id=${userId}`);
        const data = await response.json();

        if (data.ok && data.result.is_boosting) {
            document.getElementById("status").textContent = "✅ أنت معزز لهذه القناة!";
        } else {
            document.getElementById("status").textContent = "❌ أنت لست معززًا لهذه القناة.";
        }
    } catch (error) {
        console.error("حدث خطأ أثناء التحقق:", error);
        document.getElementById("status").textContent = "❌ حدث خطأ أثناء التحقق.";
    }
}

// تشغيل الدالة عند تحميل الصفحة
window.onload = checkBoostStatus;
