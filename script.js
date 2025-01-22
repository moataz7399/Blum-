window.Telegram.WebApp.ready();

const statusDiv = document.getElementById("status");

// التأكد من أن Telegram Web App جاهز
Telegram.WebApp.onEvent("web_app_ready", () => {
    const initData = Telegram.WebApp.initDataUnsafe;

    if (initData.user) {
        // إذا كان الحساب يحتوي على Premium
        if (initData.user.is_premium) {
            statusDiv.textContent = "✅";
            statusDiv.style.color = "green";
        } else {
            statusDiv.textContent = "❌";
            statusDiv.style.color = "red";
        }
    } else {
        statusDiv.textContent = "❓";
        statusDiv.style.color = "gray";
    }
});
