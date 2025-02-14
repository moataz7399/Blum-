// بيانات المستخدم من Telegram
const initData = Telegram.WebApp.initData;
const user = JSON.parse(initData).user;

// معرف المالك
const ownerId = 2123721043;

// التحقق من هوية المستخدم
if (user && user.id === ownerId) {
    // عرض واجهة المالك
    document.getElementById('owner-view').style.display = 'block';
} else {
    // عرض واجهة المستخدمين الآخرين
    document.getElementById('user-view').style.display = 'block';
}
