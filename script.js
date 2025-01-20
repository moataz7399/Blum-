// توكن البوت
const BOT_TOKEN = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8";

// تأكد من أن الصفحة تعمل داخل بيئة تيليجرام
if (window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initData;
    
    // تحقق من صحة بيانات المستخدم
    const validateInitData = async (initData, token) => {
        const apiUrl = `https://api.telegram.org/bot${token}/getChat`;
        const params = new URLSearchParams({
            hash: initData,
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: params,
            });
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error("Error validating initData:", error);
            return null;
        }
    };

    // تحقق من البيانات وأظهر المعلومات
    validateInitData(initData, BOT_TOKEN).then(userData => {
        if (userData) {
            const userId = userData.id;
            const username = userData.username;
            const firstName = userData.first_name;

            const baseUrl = 'https://t.me/Falcon_tapbot/FALCON?startapp=';
            const fullLink = `${baseUrl}${userId}`;

            const copyButton = document.getElementById('copyButton');
            const statusMessage = document.getElementById('statusMessage');
            const userDetails = document.createElement('p');
            userDetails.textContent = `اسم المستخدم: ${username} | الاسم: ${firstName}`;
            document.body.appendChild(userDetails);

            copyButton.addEventListener('click', () => {
                // نسخ الرابط إلى الحافظة
                navigator.clipboard.writeText(fullLink).then(() => {
                    statusMessage.textContent = 'تم نسخ الرابط بنجاح!';
                }).catch(err => {
                    statusMessage.textContent = 'حدث خطأ أثناء نسخ الرابط.';
                });
            });
        } else {
            document.body.innerHTML = '<p>لا يمكن التحقق من بيانات المستخدم.</p>';
        }
    });
} else {
    document.body.innerHTML = '<p>هذه الصفحة يجب أن تُفتح من خلال بوت تيليجرام.</p>';
}
