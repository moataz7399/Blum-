const startButton = document.getElementById('startButton');
const messageDiv = document.getElementById('message');

startButton.addEventListener('click', async () => {
    const botToken = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8";
    const chatId = "@Falcon_community_bot";
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/getChatMember`;

    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;

    if (!userId) {
        messageDiv.textContent = "Unable to get user ID.";
        return;
    }

    try {
        const response = await fetch(`${telegramApiUrl}?chat_id=${chatId}&user_id=${userId}`);
        const data = await response.json();

        if (data.ok && (data.result.status === "member" || data.result.status === "administrator" || data.result.status === "creator")) {
            messageDiv.textContent = "Success";
            messageDiv.style.color = "green";
        } else {
            messageDiv.textContent = "Dead";
            messageDiv.style.color = "red";
        }
    } catch (error) {
        console.error("Error checking membership:", error);
        messageDiv.textContent = "Error occurred. Try again later.";
        messageDiv.style.color = "red";
    }
});
