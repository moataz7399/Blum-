// التوكن الخاص بالبوت
const botToken = '7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8';
// معرف القناة (يمكن استخراجه من الرابط)
const chatId = '@Squirrels_Community';

// بيانات المستخدم من Telegram WebApp
const initData = new URLSearchParams(window.Telegram.WebApp.initData);
const userId = initData.get('user.id');

// عنصر النتيجة في HTML
const resultElement = document.querySelector('.result');

// دالة للتحقق من التعزيز
async function checkBoost() {
    try {
        // استدعاء API للتحقق من حالة العضو
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${chatId}&user_id=${userId}`);
        const data = await response.json();

        // التحقق من حالة التعزيز
        if (data.result && data.result.status === 'member' && data.result.is_boosting) {
            resultElement.innerHTML = '✅ لقد قمت بتعزيز القناة!';
            resultElement.classList.add('success');
        } else {
            resultElement.innerHTML = '❌ لم تقم بتعزيز القناة بعد.';
            resultElement.classList.add('error');
        }
    } catch (error) {
        resultElement.innerHTML = '❌ حدث خطأ أثناء التحقق. يرجى المحاولة لاحقًا.';
        resultElement.classList.add('error');
        console.error(error);
    }
}

// بدء التحقق عند تحميل الصفحة
checkBoost();
