// Telegram WebApp Initialization
const tg = window.Telegram.WebApp;

// Emoji ID for 🔥
const emojiId = "5805306706145582692";

// Handle button click
document.getElementById("setEmojiButton").addEventListener("click", () => {
  // Request permission to set emoji status
  tg.requestEmojiStatusAccess()
    .then(() => {
      // Set the emoji status
      tg.setEmojiStatus(emojiId)
        .then(() => {
          document.getElementById("message").textContent = "🔥 Emoji status set successfully!";
        })
        .catch((error) => {
          document.getElementById("message").textContent = "Failed to set emoji status.";
          console.error("Error setting emoji status:", error);
        });
    })
    .catch((error) => {
      document.getElementById("message").textContent = "Permission denied to set emoji status.";
      console.error("Permission denied:", error);
    });
});
