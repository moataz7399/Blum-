// توكن البوت
const BOT_TOKEN = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8";

// التأكد من أن الصفحة تعمل داخل تيليجرام
if (window.Telegram.WebApp) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ownerId = urlParams.get('startapp'); // معرف صاحب الرابط

    // وظيفة لإرسال بيانات الشخص الجديد إلى صاحب الرابط
    const sendNewReferral = async (ownerId, newUser) => {
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: ownerId,
                    text: `شخص جديد دخل من رابطك: ${newUser.username || 'غير معروف'} (${newUser.first_name || 'اسم غير متوفر'})`
                }),
            });
        } catch (error) {
            console.error("خطأ أثناء إرسال بيانات الإحالة:", error);
        }
    };

    // وظيفة لجلب بيانات الشخص الجديد (الذي يفتح الرابط)
    const getCurrentUserData = () => {
        const currentUser = window.Telegram.WebApp.initDataUnsafe.user;
        return {
            id: currentUser.id,
            username: currentUser.username,
            first_name: currentUser.first_name,
        };
    };

    // إذا كان معرف صاحب الرابط موجودًا
    if (ownerId) {
        const newUser = getCurrentUserData();

        // إرسال بيانات الشخص الجديد إلى صاحب الرابط
        sendNewReferral(ownerId, newUser);
    } else {
        document.body.innerHTML = '<p id="error">لا يمكن تحديد صاحب الرابط.</p>';
    }
} else {
    document.body.innerHTML = '<p>هذه الصفحة يجب أن تُفتح من خلال بوت تيليجرام.</p>';
}
