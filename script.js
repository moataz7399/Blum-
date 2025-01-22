// Telegram WebApp Initialization
const tg = window.Telegram.WebApp;
tg.ready();

// Emoji ID for 🔥
const emojiId = "5805306706145582692";

// Handle button click
document.getElementById("setEmojiButton").addEventListener("click", () => {
  const messageElement = document.getElementById("message");

  // Check if the user is premium
  const user = tg.initDataUnsafe.user;
  if (!user || !user.is_premium) {
    messageElement.textContent = "هذه الميزة متاحة فقط لمشتركي Telegram Premium.";
    messageElement.className = "error";
    return;
  }

  // Directly set the emoji status (will prompt confirmation dialog)
  tg.setEmojiStatus(emojiId)
    .then(() => {
      messageElement.textContent = "🔥 تم تعيين الإيموجي بنجاح!";
      messageElement.className = "success";
    })
    .catch((error) => {
      messageElement.textContent = "حدث خطأ أثناء تعيين الإيموجي.";
      messageElement.className = "error";
      console.error("Error setting emoji status:", error);
    });
});
