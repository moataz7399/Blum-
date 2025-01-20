// تأكد من أن الصفحة تعمل داخل بيئة تيليجرام
if (window.Telegram.WebApp) {
    // الحصول على بيانات المستخدم
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        const userId = user.id;
        const baseUrl = 'https://t.me/Falcon_tapbot/FALCON?startapp=';
        const fullLink = `${baseUrl}${userId}`;

        const copyButton = document.getElementById('copyButton');
        const statusMessage = document.getElementById('statusMessage');

        copyButton.addEventListener('click', () => {
            // نسخ الرابط إلى الحافظة
            navigator.clipboard.writeText(fullLink).then(() => {
                statusMessage.textContent = 'تم نسخ الرابط بنجاح!';
            }).catch(err => {
                statusMessage.textContent = 'حدث خطأ أثناء نسخ الرابط.';
            });
        });
    } else {
        document.body.innerHTML = '<p>لا يمكن الحصول على معلومات المستخدم.</p>';
    }
} else {
    document.body.innerHTML = '<p>هذه الصفحة يجب أن تُفتح من خلال بوت تيليجرام.</p>';
}
