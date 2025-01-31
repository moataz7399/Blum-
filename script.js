// script.js
// تهيئة Telegram WebApp
const tg = window.Telegram.WebApp;

// بيانات المستخدم الحالي
const user = {
    id: tg.initDataUnsafe.user?.id || "غير معروف",
    name: tg.initDataUnsafe.user?.first_name || "مستخدم",
    score: 0,
};

// جلب النقاط من LocalStorage
let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

// عرض اسم المستخدم
document.getElementById("name").textContent = user.name;

// عرض النقاط الحالية
const currentScoreElement = document.getElementById("current-score");
currentScoreElement.textContent = user.score;

// زر إضافة نقطة
document.getElementById("add-point").addEventListener("click", () => {
    user.score += 1;
    currentScoreElement.textContent = user.score;
    updateLeaderboard();
});

// تحديث لوحة المتصدرين
function updateLeaderboard() {
    // البحث عن المستخدم في اللوحة
    const userIndex = leaderboardData.findIndex((u) => u.id === user.id);

    // إذا كان المستخدم موجودًا، قم بتحديث نقاطه
    if (userIndex !== -1) {
        leaderboardData[userIndex].score = user.score;
    } else {
        // إذا لم يكن موجودًا، أضفه إلى اللوحة
        leaderboardData.push({ id: user.id, name: user.name, score: user.score });
    }

    // ترتيب اللوحة تنازليًا حسب النقاط
    leaderboardData.sort((a, b) => b.score - a.score);

    // حفظ اللوحة في LocalStorage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));

    // عرض اللوحة
    displayLeaderboard();
}

// عرض لوحة المتصدرين
function displayLeaderboard() {
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    // عرض أعلى 10 مستخدمين
    leaderboardData.slice(0, 10).forEach((user, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${index + 1}. ${user.name}</span>
            <span>${user.score} نقطة</span>
        `;
        leaderboardList.appendChild(li);
    });
}

// تهيئة الصفحة
updateLeaderboard();
