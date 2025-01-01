/************************************************************/
/* تنقل بين الصفحات + Loader                                */
/************************************************************/
function showLoader(callback) {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden'); // إظهار شاشة التحميل
  setTimeout(() => {
    loader.classList.add('hidden'); // إخفاء شاشة التحميل بعد ثانية واحدة
    if (typeof callback === 'function') callback();
  }, 1000); // مدة التحميل 1 ثانية
}

function showMain() {
  showLoader(() => {
    document.querySelector('header').classList.remove('hidden'); // إظهار الهيدر
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('login-daily-page').classList.add('hidden'); 
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
    setActiveNav('main');
  });
}

function showFriends() {
  showLoader(() => {
    document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.remove('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('login-daily-page').classList.add('hidden'); 
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
    setActiveNav('friends');
  });
}

function showCollab() {
  showLoader(() => {
    document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.remove('hidden');
    document.getElementById('login-daily-page').classList.add('hidden'); 
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
    setActiveNav('collab');
  });
}

function showLeaderboard() {
  showLoader(() => {
    // Logic for leaderboard page (if implemented)
    alert('Leaderboard page is not implemented yet!');
    setActiveNav('leaderboard');
  });
}

function showLoginDaily() {
  showLoader(() => {
    document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('login-daily-page').classList.remove('hidden'); 
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
    setActiveNav('loginDaily');
  });
}

function setActiveNav(page) {
  const navLinks = document.querySelectorAll('.bottom-nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('onclick') === `handleNavClick('${page}')`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/************************************************************/
/* قبل بدء اللعبة                                           */
/************************************************************/
function prepareGame() {
  showLoader(() => {
    startGame();
  });
}

/************************************************************/
/* متغيرات اللعبة                                           */
/************************************************************/
let falconScore = 0;
let bombScore = 0;
let ratsScore = 0.00; // متغير النقاط الرئيسية
let gameTime = 30.00; // مدة اللعبة
let countdownInterval;
let totalFalcons;
let totalBombs;
const fallSpeed = 300; // سرعة سقوط بالبكسل لكل ثانية

/************************************************************/
/* تعريف مكافآت الأيام اليومية                             */
/************************************************************/
const dailyRewards = [
  { day: 1, points: 100, cards: 2 },
  { day: 2, points: 250, cards: 5 },
  { day: 3, points: 300, cards: 7 },
  { day: 4, points: 500, cards: 18 },
  { day: 5, points: 750, cards: 12 },
  { day: 6, points: 1000, cards: 13 },
  { day: 7, points: 1250, cards: 14 },
  { day: 8, points: 1500, cards: 15 },
  { day: 9, points: 2000, cards: 20 },
];

/************************************************************/
/* بدء اللعبة                                               */
/************************************************************/
function startGame() {
  document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
  document.getElementById('game-overlay').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('friends-page').classList.add('hidden');
  document.getElementById('collab-page').classList.add('hidden');
  document.getElementById('login-daily-page').classList.add('hidden'); 
  document.getElementById('end-game-screen').classList.add('hidden');

  falconScore = 0;
  bombScore = 0;
  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  document.getElementById('cardsCount').textContent = cardsCount;
  gameTime = 30.00;
  document.getElementById('falconScore').textContent = falconScore;
  document.getElementById('bombScore').textContent = bombScore;
  document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));
  document.getElementById('timer').textContent = formatTimerDigits(gameTime.toFixed(2));

  totalFalcons = Math.floor(Math.random() * (150 - 100 + 1)) + 150;
  totalBombs = Math.floor(Math.random() * (20 - 10 + 1)) + 20;

  scheduleEmojis();

  countdownInterval = setInterval(() => {
    gameTime -= 0.1;
    if (gameTime <= 0) {
      gameTime = 0;
      endGame();
    }
    document.getElementById('timer').textContent = formatTimerDigits(gameTime.toFixed(2));
  }, 100);
}

/************************************************************/
/* توزيع الصقور والقنابل                                   */
/************************************************************/
function scheduleEmojis() {
  const falconInterval = gameTime / totalFalcons;
  const bombInterval = gameTime / totalBombs;

  for (let i = 0; i < totalFalcons; i++) {
    let spawnTime = i * falconInterval;
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('falcon');
    }, spawnTime * 1000);
  }

  for (let j = 0; j < totalBombs; j++) {
    let spawnTime = j * bombInterval;
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('bomb');
    }, spawnTime * 1000);
  }
}

/************************************************************/
/* إنهاء اللعبة                                             */
/************************************************************/
function endGame() {
  clearInterval(countdownInterval);
  document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());
  document.getElementById('game-overlay').classList.add('hidden');
  document.getElementById('end-game-screen').classList.remove('hidden');

  // تأثير الاهتزاز
  const overlay = document.getElementById('game-overlay');
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
  overlay.classList.add('shake');
  setTimeout(() => {
    overlay.classList.remove('shake');
  }, 300);

  // كشكشة
  showConfetti('confetti-container');

  // إضافة falconScore إلى ratsScore
  ratsScore += falconScore;
  localStorage.setItem('ratsScore', ratsScore.toFixed(2));
  document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));

  gameTime = 0; 
}

/************************************************************/
/* إنشاء الأيقونة بالسقوط + الضغط                           */
/************************************************************/
function createFallingEmoji(type) {
  if (gameTime <= 0) return;

  const gameOverlay = document.getElementById('game-overlay');
  const emojiEl = document.createElement('span');
  emojiEl.classList.add('falling-emoji');

  if (type === 'falcon') {
    emojiEl.innerHTML = '<i class="fas fa-dove"></i>';
    emojiEl.style.color = '#FFD700';
  } else if (type === 'bomb') {
    emojiEl.innerHTML = '<i class="fas fa-bomb"></i>';
    emojiEl.style.color = '#FF0000';
  }

  const maxLeft = window.innerWidth - 50;
  emojiEl.style.left = `${Math.random() * maxLeft}px`;
  emojiEl.style.top = '-50px';

  emojiEl.addEventListener('click', () => {
    if (gameTime <= 0) return;

    if (type === 'falcon') {
      falconScore++;
      document.getElementById('falconScore').textContent = falconScore;
      // التحقق هل عندي إحالة؟
      handleReferralBonus(1); 
    } else {
      bombScore++;
      falconScore = 0;
      document.getElementById('falconScore').textContent = falconScore;
      document.getElementById('bombScore').textContent = bombScore;
      bombEffect();
    }
    emojiEl.remove();
  });

  gameOverlay.appendChild(emojiEl);

  let currentTop = -50;
  let lastTimestamp = null;

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    currentTop += (fallSpeed * delta) / 1000;

    emojiEl.style.top = `${currentTop}px`;

    if (currentTop > window.innerHeight) {
      emojiEl.remove();
      return;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/************************************************************/
/* تأثير القنبلة                                           */
/************************************************************/
function bombEffect() {
  const overlay = document.getElementById('game-overlay');
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
  overlay.classList.add('bomb-image');
  overlay.classList.add('shake');
  setTimeout(() => {
    overlay.classList.remove('bomb-image');
    overlay.classList.remove('shake');
  }, 300);
}

/************************************************************/
/* أزرار شاشة النهاية                                      */
/************************************************************/
document.getElementById('btn-new-round').addEventListener('click', () => {
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  if (cardsCount < 1) {
    showSuccessMessage('No cards available. Please collect your daily reward.');
    return;
  }

  cardsCount -= 1;
  localStorage.setItem('cardsCount', cardsCount);
  document.getElementById('cardsCount').textContent = cardsCount;

  showConfetti('confetti-container');
  prepareGame();
});

document.getElementById('btn-back-home').addEventListener('click', () => {
  clearConfetti('confetti-container');
  showMain();
});

document.getElementById('btn-share-link').addEventListener('click', () => {
  showConfetti('confetti-container');
  alert('Share Link Bot clicked!');
});

/************************************************************/
/* وظيفة نسخ رابط الدعوة (تم تعديلها)                       */
/************************************************************/
function copyInviteLink() {
  // اجلب الكود الخاص بالمستخدم
  const myCode = localStorage.getItem('myInviteCode') || generateInviteCode(8);
  localStorage.setItem('myInviteCode', myCode);

  // شكل الرابط المطلوب نسخه
  const inviteLink = `https://t.me/Falcon_tapbot?startapp=${myCode}`;

  navigator.clipboard.writeText(inviteLink).then(() => {
    showSuccessMessage('Invite link copied!');
  }).catch(err => {
    console.error('Failed to copy invite link: ', err);
  });
}

/************************************************************/
/* وظيفة مشاركة رابط الدعوة (نفسها لكن بالرابط الحقيقي)      */
/************************************************************/
function shareInviteLink() {
  const myCode = localStorage.getItem('myInviteCode') || generateInviteCode(8);
  localStorage.setItem('myInviteCode', myCode);

  const inviteLink = `https://t.me/Falcon_tapbot?startapp=${myCode}`;
  if (navigator.share) {
    navigator.share({
      title: 'Join Rats Kingdom',
      text: 'Join me in Rats Kingdom!',
      url: inviteLink
    }).then(() => {
      console.log('Invite link shared successfully.');
    }).catch(err => {
      console.error('Error sharing invite link: ', err);
    });
  } else {
    alert('Share not supported on this browser.');
  }
}

/************************************************************/
/* إعطاء مكافأة الإحالة 10% (محاكاة في الفرونت فقط)         */
/************************************************************/
function handleReferralBonus(collectedFalcons = 1) {
  // إذا هذا المستخدم لديه referrerCode وخاصية isReferred = true
  // نعتبره مستخدم جديد (أول مرة يزور الصفحة) ومحتسب إحالة
  const isReferred = localStorage.getItem('isReferred') === 'true';
  const referrerCode = localStorage.getItem('referrerCode');

  if (!isReferred || !referrerCode) return; 
  // لو كان المستخدم فعلًا جديدًا ودخل برابط إحالة

  // هنا نفترض مثلًا أنه جمع "collectedFalcons" صقر الآن
  // نعتبر كل صقر يساوي 1 نقطة مثلاً (كما نفعل مع falconScore)
  // نعطي الداعي 10% من هذه النقاط = 0.1 * collectedFalcons

  const bonusForReferrer = 0.1 * collectedFalcons;

  // على أرض الواقع يجب إرسال bonusForReferrer للبوت أو للخادم مع referrerCode
  // حتى يضيفه لحساب الداعي. لكننا في الفرونت فقط سنعرض رسالة:
  console.log(`Referrer ${referrerCode} gets +${bonusForReferrer} points (simulation).`);

  // إن أردت مشاهدة تنبيه للمستخدم:
  showSuccessMessage(`Your referrer got +${bonusForReferrer} points (10%)!`);
}

/************************************************************/
/* دالة عرض رسالة النجاح                                    */
/************************************************************/
function showSuccessMessage(message = 'Success') {
  const successMessage = document.createElement('div');
  successMessage.textContent = message;
  successMessage.classList.add('success-message');
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 1000);
}

/************************************************************/
/* دالة توليد كود عشوائي للمستخدم                           */
/************************************************************/
function generateInviteCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/************************************************************/
/* دالة تنسيق الأرقام                                       */
/************************************************************/
function formatNumber(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const styledNumbers = {
    '0': '𝟬','1': '𝟭','2': '𝟮','3': '𝟯','4': '𝟰',
    '5': '𝟱','6': '𝟲','7': '𝟳','8': '𝟴','9': '𝟵',
    ',': ','
  };
  parts[0] = parts[0].split('').map(digit => styledNumbers[digit] || digit).join('');
  if (parts[1]) {
    parts[1] = parts[1].split('').map(digit => styledNumbers[digit] || digit).join('');
    return parts.join('.');
  }
  return parts[0];
}

/************************************************************/
/* دالة تنسيق الوقت                                         */
/************************************************************/
function formatTimerDigits(value) {
  const styledNumbers = {
    '0': '𝟬','1': '𝟭','2': '𝟮','3': '𝟯','4': '𝟰',
    '5': '𝟱','6': '𝟲','7': '𝟳','8': '𝟴','9': '𝟵','.': '.'
  };
  return value.toString().split('').map(digit => styledNumbers[digit] || digit).join('');
}

/************************************************************/
/* التنقل بين الصفحات مع تأثير التحميل                       */
/************************************************************/
function handleNavClick(page) {
  if (page === 'loginDaily') {
    showLoginDaily();
    return;
  }

  showLoader(() => {
    document.querySelector('header').classList.add('hidden');
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('login-daily-page').classList.add('hidden'); 
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');

    if (page === 'main') {
      document.querySelector('header').classList.remove('hidden');
      document.getElementById('main-content').classList.remove('hidden');
      setActiveNav('main');
    } else if (page === 'friends') {
      document.getElementById('friends-page').classList.remove('hidden');
      setActiveNav('friends');
    } else if (page === 'collab') {
      document.getElementById('collab-page').classList.remove('hidden');
      setActiveNav('collab');
    } else if (page === 'leaderboard') {
      showLeaderboard();
      setActiveNav('leaderboard');
    }
  });
}

/************************************************************/
/* دالة التعامل مع زر Play Falcon وإدارة المكافآت اليومية   */
/************************************************************/
function handlePlayFalcon() {
  let currentDay = parseInt(localStorage.getItem('currentDay')) || 1;
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;

  if (cardsCount < 1) {
    showSuccessMessage('No cards available. Please collect your daily reward.');
    return;
  }

  cardsCount -= 1;
  localStorage.setItem('cardsCount', cardsCount);
  document.getElementById('cardsCount').textContent = cardsCount;

  prepareGame();
}

/************************************************************/
/* تهيئة خانات الـ 9 أيام                                   */
/************************************************************/
function initializeDailyLogin() {
  const dayItems = document.querySelectorAll('.day-item');
  let claimedDays = JSON.parse(localStorage.getItem('claimedDays')) || [];
  let lastClaimedDate = localStorage.getItem('lastClaimedDate') ? new Date(localStorage.getItem('lastClaimedDate')) : null;

  dayItems.forEach((dayItem, index) => {
    const dayNumber = index + 1;
    if (claimedDays.includes(dayNumber)) {
      unlockDay(dayItem, true);
    } else {
      if (dayNumber === 1) {
        unlockDay(dayItem, false);
      } else {
        const previousDay = dayNumber - 1;
        if (claimedDays.includes(previousDay) && lastClaimedDate) {
          const today = new Date();
          const nextUnlockTime = new Date(lastClaimedDate);
          nextUnlockTime.setDate(nextUnlockTime.getDate() + 1);

          if (today.toDateString() === nextUnlockTime.toDateString() || today > nextUnlockTime) {
            unlockDay(dayItem, false);
          }
        }
      }
    }
  });

  dayItems.forEach((dayItem, index) => {
    dayItem.addEventListener('click', () => {
      const dayNumber = index + 1;
      if (isDayUnlocked(dayNumber)) {
        if (!claimedDays.includes(dayNumber)) {
          unlockDay(dayItem, true);
          showConfetti('confetti-container-login');
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
          claimedDays.push(dayNumber);
          localStorage.setItem('claimedDays', JSON.stringify(claimedDays));
          localStorage.setItem('lastClaimedDate', new Date().toISOString());

          const reward = dailyRewards[dayNumber - 1];
          if (reward) {
            ratsScore += reward.points;
            let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
            cardsCount += reward.cards;
            localStorage.setItem('ratsScore', ratsScore.toFixed(2));
            localStorage.setItem('cardsCount', cardsCount);
            document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));
            document.getElementById('cardsCount').textContent = cardsCount;

            let currentDay = parseInt(localStorage.getItem('currentDay')) || 1;
            currentDay += 1;
            if (currentDay > dailyRewards.length) {
              currentDay = 1;
            }
            localStorage.setItem('currentDay', currentDay);

            showSuccessMessage(`Day ${dayNumber} reward claimed: +${reward.points} PAWS and +${reward.cards} cards!`);
          }
        }
      } else {
        showSuccessMessage('You need to wait for the next day to unlock this day.');
      }
    });
  });
}

function unlockDay(dayItem, isCompleted) {
  const overlay = dayItem.querySelector('.overlay');
  if (overlay) {
    if (isCompleted) {
      overlay.innerHTML = '<i class="fas fa-check"></i>';
      overlay.classList.remove('hidden');
      overlay.classList.add('completed');
    } else {
      overlay.classList.add('hidden');
    }
  }
}

function isDayUnlocked(dayNumber) {
  const dayItem = document.querySelector(`.day-item[data-day="${dayNumber}"]`);
  if (!dayItem) return false;
  const overlay = dayItem.querySelector('.overlay');
  return (overlay && overlay.classList.contains('hidden')) || (overlay && overlay.classList.contains('completed'));
}

/************************************************************/
/* دالة عرض الكشكشة                                         */
/************************************************************/
function showConfetti(containerId) {
  const confettiContainer = document.getElementById(containerId);
  if (!confettiContainer) return;
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.width = confettiContainer.offsetWidth;
  canvas.height = confettiContainer.offsetHeight;
  confettiContainer.appendChild(canvas);

  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
  myConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
  setTimeout(() => {
    confettiContainer.removeChild(canvas);
  }, 3000);
}

/************************************************************/
/* دالة إزالة الكشكشة                                       */
/************************************************************/
function clearConfetti(containerId) {
  const confettiContainer = document.getElementById(containerId);
  if (!confettiContainer) return;
  const canvases = confettiContainer.querySelectorAll('canvas');
  canvases.forEach(canvas => canvas.remove());
}

/************************************************************/
/* استخراج كود الإحالة من ?startapp                          */
/************************************************************/
function checkReferralFromURL() {
// مثال: https://t.me/Falcon_tapbot?startapp=XYZ123
  // نريد الحصول على XYZ123
  const urlParams = new URLSearchParams(window.location.search);
  const startappCode = urlParams.get('startapp');
  if (startappCode) {
    // هل المستخدم زار الصفحة من قبل؟ إذا لا، نسجّل أنه مستخدم جديد ودخل بكود إحالة
    const alreadyVisited = localStorage.getItem('alreadyVisited');
    if (!alreadyVisited) {
      // أول زيارة
      localStorage.setItem('alreadyVisited', 'true');
      localStorage.setItem('isReferred', 'true');
      localStorage.setItem('referrerCode', startappCode);
      console.log('User is new. Referred by:', startappCode);
    } else {
      // زار الصفحة من قبل => لن تُحتسب الإحالة هذه المرة
      console.log('User has visited before. No referral counted.');
    }
  }
}

/************************************************************/
/* شغل شاشة الافتتاح  + التهيئة عند تحميل الصفحة            */
/************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress-bar .progress");
  const splashScreen = document.getElementById("splash-screen");
  const ratsScoreElement = document.getElementById("ratsScore");
  const cardsCountElement = document.getElementById("cardsCount");

  // استرجاع النقاط والكروت
  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
  ratsScoreElement.textContent = formatNumber(ratsScore.toFixed(2));

  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  cardsCountElement.textContent = cardsCount;

  // املأ الشريط في 5 ثوانٍ
  setTimeout(() => {
    progress.style.width = "100%";
  }, 10);

  // بعد 5 ثوانٍ، أخفِ شاشة الافتتاح
  setTimeout(() => {
    splashScreen.style.display = "none";
    showMain();
    document.querySelector('.progress-bar').classList.add('hidden');
  }, 5000);

  // إنشاء أو استرجاع الكود الخاص بالمستخدم
  let myCode = localStorage.getItem('myInviteCode');
  if (!myCode) {
    myCode = generateInviteCode(8);
    localStorage.setItem('myInviteCode', myCode);
  }

  // تحقق من رابط الإحالة
  checkReferralFromURL();

  // إضافة مستمعي الأحداث لأزرار المهام
  document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (button.textContent.trim() === 'Start') {
        const link = button.getAttribute('data-link');
        if (link) {
          window.open(link, '_blank');
        }
        button.textContent = 'Wait...';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = 'Claim';
          button.classList.add('claim-btn');
          button.classList.remove('start-btn');
          button.disabled = false;
        }, 10000);
      } else if (button.textContent.trim() === 'Claim') {
        const points = parseInt(button.getAttribute('data-points'), 10);
        if (isNaN(points)) return;
        ratsScore += points;
        localStorage.setItem('ratsScore', ratsScore.toFixed(2));
        document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));

        button.textContent = '✓';
        button.classList.add('completed-btn');
        button.classList.remove('claim-btn');
        button.disabled = true;
        
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        showSuccessMessage('Points claimed successfully!');

        // التحقق من الإحالة وإضافة مكافأة للداعي (10%)
        // هنا نعتبر أنّ هذه النقاط = points، نعطي الداعي 10% منها
        handleReferralBonus(points);
      }
    });
  });

  // تهيئة خانات الـ 9 أيام
  initializeDailyLogin();

  // منع قائمة السياق على الصور
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', event => event.preventDefault());
  });
});
