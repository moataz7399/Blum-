// توكن البوت الخاص بك
const token = "7766585791:AAHgUpf6uonqz_KXU4gdFCZb_CjN1GKw_m8";
// اسم المستخدم أو معرف القناة
const channelUsername = "@javaoavaobqpqja";

// التحقق من تعزيز القناة
async function checkBoost(userId) {
  const statusDiv = document.getElementById("status");

  try {
    // استدعاء API للتحقق من حالة المستخدم
    const response = await fetch(
      `https://api.telegram.org/bot${token}/getChatMember?chat_id=${channelUsername}&user_id=${userId}`
    );
    const data = await response.json();

    if (data.ok) {
      const status = data.result.status;
      // تحقق من حالة العضو
      if (status === "member" || status === "administrator" || status === "creator") {
        statusDiv.textContent = "✅ Boosted!";
        statusDiv.className = "status green";
      } else {
        statusDiv.textContent = "❌ Not Boosted!";
        statusDiv.className = "status red";
      }
    } else {
      statusDiv.textContent = "❌ Error: " + data.description;
      statusDiv.className = "status red";
    }
  } catch (error) {
    statusDiv.textContent = "❌ Error: " + error.message;
    statusDiv.className = "status red";
  }
}

// الحصول على بيانات المستخدم من Telegram Web App
window.onload = () => {
  const telegram = window.Telegram.WebApp;
  telegram.ready();

  const initData = telegram.initDataUnsafe;
  if (initData && initData.user) {
    const userId = initData.user.id; // معرف المستخدم الذي فتح الصفحة
    checkBoost(userId);
  } else {
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "❌ Unable to fetch user data.";
    statusDiv.className = "status red";
  }
};
