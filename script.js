/************************************************************/
/* (A) أكواد خاصة بصفحة الفحص (3 شرائط + زر Continue)      */
/************************************************************/

// التأكد من جاهزية Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  Telegram.WebApp.ready();
}

// الحصول على بيانات المستخدم من Telegram WebApp
const initDataUnsafe = (window.Telegram && window.Telegram.WebApp)
  ? window.Telegram.WebApp.initDataUnsafe
  : { user: null };

// التحقق هل المستخدم جديد أم لا
const visitedCheckPage = localStorage.getItem('visitedCheckPage');

// سنخزّن نقاط المستخدم هنا (ratsScore)
let ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0;

// الحصول على عناصر الـ3 شرائط (progress-fill) وعناوينها
const progressBars = document.querySelectorAll('#account-checking-page .progress-fill');
const progressTitles = document.querySelectorAll('#account-checking-page .progress-title');
const continueButton = document.getElementById('continueButton');

// مؤشر أي شريط نعبّئ
let indexCheck = 0;

/**
 * عند تحميل الصفحة:
 *  - إذا المستخدم شاهد صفحة الفحص سابقًا → نتخطّاها فورًا
 *  - وإلا نبدأ تعبئة الشرائط
 */
document.addEventListener('DOMContentLoaded', () => {
  if (visitedCheckPage) {
    // إخفاء صفحة الفحص
    document.getElementById('account-checking-page').style.display = 'none';
    // الذهاب مباشرةً للشاشة القديمة + الصفحة الرئيسية
    showSplashAndThenMain();
  } else {
    // مستخدم جديد → تعبئة الشرائط
    fillNextBar();
  }
});

/**
 * تعبئة الشرائط الثلاثة واحدًا تلو الآخر، كل واحد 5 ثوانٍ
 */
function fillNextBar() {
  if (indexCheck < progressBars.length) {
    // ملء الشريط بالكامل
    progressBars[indexCheck].style.width = '100%';

    const currentIndex = indexCheck;

    // بعد 5 ثوانٍ من بدء تعبئة الشريط
    setTimeout(() => {
      // اهتزاز بسيط
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      // الشريط الأول (Random Reward)
      if (currentIndex === 0) {
        progressBars[currentIndex].style.background = 'green';
        showConfetti();

        // رقم عشوائي بين 1000 و 10000
        const randomNumber = Math.floor(Math.random() * 9001) + 1000;
        ratsScore += randomNumber;
        localStorage.setItem('ratsScore', ratsScore.toFixed(2));
        animateCountUp(randomNumber);
      }

      // الشريط الثاني (Telegram Premium)
      else if (currentIndex === 1) {
        if (initDataUnsafe.user && initDataUnsafe.user.is_premium) {
          progressBars[currentIndex].style.background = 'green';
          showConfetti();
          ratsScore += 5000;
          localStorage.setItem('ratsScore', ratsScore.toFixed(2));
        } else {
          progressBars[currentIndex].style.background = 'red';
        }
      }

      // الشريط الثالث (UserName Telegram)
      if (currentIndex === 2) {
        if (initDataUnsafe.user && initDataUnsafe.user.username) {
          progressBars[currentIndex].style.background = 'green';
          showConfetti();
          ratsScore += 2500;
          localStorage.setItem('ratsScore', ratsScore.toFixed(2));
        } else {
          progressBars[currentIndex].style.background = 'red';
        }

        // بعد انتهاء الشريط الثالث، يظهر زر Continue
        continueButton.style.display = 'inline-block';
        continueButton.classList.add('slide-up');
      }
    }, 5000);

    indexCheck++;
    setTimeout(fillNextBar, 5000);
  }
}

/**
 * عدّاد من 1000 إلى رقمٍ محدّد (للشريط الأول)
 */
function animateCountUp(targetNumber) {
  let startTime = null;
  const duration = 1000; 
  const startVal = 1000; 

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    let fraction = progress / duration;
    if (fraction > 1) fraction = 1;

    let currentValue = Math.round(startVal + (targetNumber - startVal) * fraction);
    const formattedValue = currentValue.toLocaleString('en-US');

    progressTitles[0].innerHTML = `
      <div class="icon-circle">
        <i class="fas fa-gift"></i>
      </div>
      <strong>Random Reward</strong> {  ${formattedValue}  }
    `;
    if (fraction < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

/**
 * إظهار تأثير الكشكشة (Confetti)
 */
function showConfetti() {
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100%';
  confettiCanvas.style.height = '100%';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '99999';
  document.body.appendChild(confettiCanvas);

  const myConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  });

  myConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    document.body.removeChild(confettiCanvas);
  }, 3000);
}

/**
 * عند الضغط على زر Continue
 */
continueButton.addEventListener('click', () => {
  continueButton.classList.add('shake');
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  setTimeout(() => {
    continueButton.classList.remove('shake');
  }, 500);

  localStorage.setItem('visitedCheckPage', 'true');
  document.getElementById('account-checking-page').style.display = 'none';
  showSplashAndThenMain();
});


/************************************************************/
/* (B) بقية الأكواد القديمة من سؤالك كما هي                */
/************************************************************/

/**
 * دالة جديدة لإظهار شاشة التحميل الأخضر 5 ثوانٍ
 * ثم إخفاؤها وإظهار الصفحة الرئيسية
 */
function showSplashAndThenMain() {
  const legacyBar = document.querySelector('.progress-bar-legacy');
  const legacyProgress = document.querySelector('.progress-bar-legacy .progress-legacy');
  const splashScreen = document.getElementById('splash-screen');
  
  legacyBar.style.display = 'block';
  splashScreen.style.display = 'block';
  legacyProgress.style.width = '0';

  setTimeout(() => {
    legacyProgress.style.width = '100%';
  }, 50);

  setTimeout(() => {
    splashScreen.style.display = 'none';
    legacyBar.style.display = 'none';
    showMain();
  }, 5000);
}

/* ======================================================================= */
/*  كل شيء أدناه لم يُلمس؛ هو نفسه كما في أكوادك القديمة                */
/* ======================================================================= */

// متغيرات اللعبة
let falconScore = 0;
let bombScore = 0;
let gameTime = 30.00; 
let countdownInterval;
let totalFalcons;
let totalBombs;

// [تعديل جديد] تعريف عدد الفستق
let totalPeanuts; // <-- الفستق
const fallSpeed = 400; 

/* تعريف مكافآت الأيام اليومية */
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

function prepareGame() {
  showLoader(() => {
    startGame();
  });
}

/* بدء اللعبة */
function startGame() {
  document.querySelector('header').classList.add('hidden');
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

  // [تعديل جديد] تحديد عدد الفستق
  totalPeanuts = Math.floor(Math.random() * (50 - 30 + 1)) + 30; 
  // مثلا بين 30 و 50 حبة فستق

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

/* توزيع الصقور والقنابل والفستق [تعديل] */
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

  // [تعديل جديد] توزيع الفستق
  const peanutInterval = gameTime / totalPeanuts;
  for (let k = 0; k < totalPeanuts; k++) {
    let spawnTime = k * peanutInterval;
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('peanut');
    }, spawnTime * 1000);
  }
}

/* إنهاء اللعبة */
function endGame() {
  clearInterval(countdownInterval);
  document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());

  showLoader(() => {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.remove('hidden');

    createStars();
    setInterval(moveStars, 50);

    document.getElementById('endFalconScore').textContent = falconScore;
    ratsScore += falconScore;
    localStorage.setItem('ratsScore', ratsScore.toFixed(2));
    document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));
    gameTime = 0;
  }, 2000);

  const overlay = document.getElementById('game-overlay');
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
  overlay.classList.add('shake');
  setTimeout(() => {
    overlay.classList.remove('shake');
  }, 300);
}

/**
 * إنشاء الأيقونة بالسقوط + الضغط
 * [تعديل] بحيث تتحول falcon -> squirrel
 *         bomb -> bomb (كما هي)
 *         peanut -> أيقونة فستق
 */
function createFallingEmoji(type) {
  if (gameTime <= 0) return;
  const gameOverlay = document.getElementById('game-overlay');
  const emojiEl = document.createElement('span');
  emojiEl.classList.add('falling-emoji');

  if (type === 'falcon') {
    // [تعديل] سنجاب
    emojiEl.innerHTML = '<i class="fas fa-squirrel"></i>';
    emojiEl.style.color = '#8B4513'; // بني
  } else if (type === 'bomb') {
    // القنبلة كما هي
    emojiEl.innerHTML = '<i class="fas fa-bomb"></i>';
    emojiEl.style.color = '#FF0000';
  } else if (type === 'peanut') {
    // [جديد] فستق
    emojiEl.innerHTML = '<i class="fas fa-peanut"></i>';
    emojiEl.style.color = '#A0522D'; // بني فاتح
  }

  const maxLeft = window.innerWidth - 50;
  emojiEl.style.left = `${Math.random() * maxLeft}px`;
  emojiEl.style.top = '-50px';

  emojiEl.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    if (gameTime <= 0) return;
    if (type === 'falcon' || type === 'peanut') {
      // السنجاب والفستق كلاهما يجمع النقاط
      falconScore++;
      document.getElementById('falconScore').textContent = falconScore;
    } else {
      // القنبلة
      bombScore++;
      falconScore = 0;
      document.getElementById('falconScore').textContent = falconScore;
      document.getElementById('bombScore').textContent = bombScore;
      bombEffect();
    }
    emojiEl.remove();
  }, { passive: false });

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

/* تأثير القنبلة */
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

/* أزرار شاشة النهاية */
document.getElementById('btn-new-round').addEventListener('click', () => {
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  if (cardsCount < 1) {
    showSuccessMessage('No cards available. Please collect your daily reward.');
    return;
  }
  cardsCount -= 1;
  localStorage.setItem('cardsCount', cardsCount);
  document.getElementById('cardsCount').textContent = cardsCount;
  showConfettiCustom('confetti-container'); 
  prepareGame();
});

document.getElementById('btn-back-home').addEventListener('click', () => {
  clearConfetti('confetti-container');
  showMain();
});

/* وظيفة نسخ رابط الدعوة */
let telegramUserId = null;
function copyInviteLink() {
  const botUsername = 'falcon_tapbot';
  const userId = telegramUserId; 
  if (!userId) {
    alert('Unable to retrieve your user ID. Please try again.');
    return;
  }
  const inviteLink = `https://t.me/${botUsername}/FALCON?startapp=${userId}`;
  navigator.clipboard.writeText(inviteLink).then(() => {
    showSuccessMessage('Invite link copied!');
  }).catch(err => {
    console.error('Failed to copy invite link: ', err);
    alert('Failed to copy the link. Please try again.');
  });
}

/* وظيفة مشاركة رابط الدعوة */
function shareInviteLink() {
  const inviteLink = `https://t.me/falcon_tapbot/FALCON?startapp=${telegramUserId}`; 
  if (navigator.share && telegramUserId) {
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
    alert('Share not supported on this browser or user ID not available.');
  }
}

/* وظيفة عرض رسالة النجاح */
function showSuccessMessage(message = 'Success') {
  const successMessage = document.createElement('div');
  successMessage.textContent = message;
  successMessage.classList.add('success-message');
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 1000);
}

/* تنسيق الأرقام مع الفواصل */
function formatNumber(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const styledNumbers = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
    ',': ','
  };
  parts[0] = parts[0].split('').map(digit => styledNumbers[digit] || digit).join('');
  if (parts[1]) {
    parts[1] = parts[1].split('').map(digit => styledNumbers[digit] || digit).join('');
    return parts.join('.');
  }
  return parts[0];
}

/* تنسيق الوقت */
function formatTimerDigits(value) {
  const styledNumbers = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵', '.': '.'
  };
  return value.toString().split('').map(digit => styledNumbers[digit] || digit).join('');
}

/* دالة التنقل بين الصفحات مع تأثير التحميل */
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
      initSnowEffect();
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

/* زر Play Falcon */
function handlePlayFalcon() {
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

/* تهيئة الـ 9 أيام */
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
          showConfettiCustom('confetti-container-login');
          if (navigator.vibrate) navigator.vibrate(200);

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
        } else {
          showSuccessMessage('This day is already claimed!');
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

/* دالة عرض الكشكشة */
function showConfettiCustom(containerId) {
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

/* دالة إزالة الكشكشة */
function clearConfetti(containerId) {
  const confettiContainer = document.getElementById(containerId);
  if (!confettiContainer) return;
  const canvases = confettiContainer.querySelectorAll('canvas');
  canvases.forEach(canvas => canvas.remove());
}

/* تهيئة Telegram WebApp + أمور أخرى عند DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
  const ratsScoreElement = document.getElementById("ratsScore");
  const cardsCountElement = document.getElementById("cardsCount");

  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
  ratsScoreElement.textContent = formatNumber(ratsScore.toFixed(2));

  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  cardsCountElement.textContent = cardsCount;

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
        button.blur();
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        showSuccessMessage('Points claimed successfully!');
      }
    });
  });

  // تسجيل الدخول اليومي
  initializeDailyLogin();

  // تعطيل الضغط المطوّل على الصور
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', event => event.preventDefault());
  });

  // منع النسخ
  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });

  // قراءة user.id من Telegram WebApp (إذا موجود)
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    telegramUserId = window.Telegram.WebApp.initDataUnsafe.user
                     ? window.Telegram.WebApp.initDataUnsafe.user.id
                     : null;
    if (telegramUserId) {
      fetch('https://alisaad11.pythonanywhere.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: telegramUserId })
      })
      .then(response => response.json())
      .then(data => {
        console.log('User ID sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error sending user ID:', error);
      });
    }
  } else {
    console.warn('Telegram Web Apps API not found.');
  }

  // تأثير Ripple للأزرار
  const rippleButtons = document.querySelectorAll('.ripple-button');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
});

/* نجوم شاشة النهاية */
function createStars() {
  const starsContainer = document.getElementById('stars-container');
  while (starsContainer.firstChild) {
    starsContainer.removeChild(starsContainer.firstChild);
  }
  const starCount = 200; 
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    starsContainer.appendChild(star);
  }
}

function moveStars() {
  const stars = document.querySelectorAll('#stars-container .star');
  stars.forEach(star => {
    const currentTop = parseFloat(star.style.top);
    const newTop = (currentTop + 0.1) % 100;
    star.style.top = `${newTop}vh`;
  });
}
