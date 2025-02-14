window.onload = function() {
    const ADMIN_ID = 2123721043;
    const user = Telegram.WebApp.initDataUnsafe.user;

    if (user && user.id === ADMIN_ID) {
        document.getElementById('content').innerHTML = `
            <div class="admin">
                <h1>مرحبًا، ${user.first_name}!</h1>
                <p>هذه لوحة التحكم الخاصة بالمسؤول.</p>
                <!-- محتوى إضافي للمسؤول -->
            </div>
        `;
    } else {
        document.getElementById('content').innerHTML = `
            <div class="user">
                <h1>مرحبًا، ${user ? user.first_name : 'ضيف'}!</h1>
                <p>مرحبًا بك في تطبيقنا المصغر.</p>
                <!-- محتوى إضافي للمستخدمين الآخرين -->
            </div>
        `;
    }
};
