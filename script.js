/************************************************************/
/* سكربت تساقط الثلوج */
/************************************************************/
function initSnowEffect() {
  const canvas = document.getElementById('snow');
  if (!canvas) return; // تأكد من وجود الكانفاس
  const ctx = canvas.getContext('2d');
  resizeCanvas();

  const snowflakes = [];
  const numSnowflakes = Math.floor(canvas.width / 10); // عدد الثلوج يعتمد على عرض الشاشة

  // إنشاء الثلوج
  for (let i = 0; i < numSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.7 + 0.3,
    });
  }

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snow => {
      ctx.beginPath();
      ctx.arc(snow.x, snow.y, snow.size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      snow.y += snow.speed;

      // إذا خرج الثلج من الشاشة، إعادته للأعلى
      if (snow.y > canvas.height) {
        snow.y = -snow.size;
        snow.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawSnow);
  }

  drawSnow();

  // إعادة ضبط الكانفاس عند تغيير حجم الشاشة
  window.addEventListener('resize', () => {
    resizeCanvas();
    snowflakes.length = 0; // إعادة إنشاء الثلوج بعد تغيير الحجم

    const newNumSnowflakes = Math.floor(canvas.width / 10);
    for (let i = 0; i < newNumSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.7 + 0.3,
      });
    }
  });
}

/************************************************************/
/* تنقل بين الصفحات + Loader */
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
    document.getElementById('login-daily-page').classList.add('hidden'); /* إخفاء Login Daily */
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
    setActiveNav('main');

    // تهيئة تأثير الثلوج عند عرض الصفحة الرئيسية
    initSnowEffect();
  });
}

function showFriends() {
  showLoader(() => {
    document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.remove('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('login-daily-page').classList.add('hidden'); /* إخفاء Login Daily */
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
    document.getElementById('login-daily-page').classList.add('hidden'); /* إخفاء Login Daily */
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
    setActiveNav('collab');
  });
}

function showLeaderboard() {
  showLoader(() => {
    // منطق صفحة Leaderboard (إذا تم تنفيذها)
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
    document.getElementById('login-daily-page').classList.remove('hidden'); /* إظهار Login Daily */
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
/* قبل بدء اللعبة */
/************************************************************/
function prepareGame() {
  showLoader(() => {
    startGame();
  });
}

/************************************************************/
/* متغيرات اللعبة */
/************************************************************/
let falconScore = 0;
let bombScore = 0;
let ratsScore = 0.00; // متغير النقاط الرئيسية
let gameTime = 30.00; // مدة اللعبة
let countdownInterval;
let totalFalcons;
let totalBombs;
const fallSpeed = 400; // زيادة سرعة السقوط للبكسل لكل ثانية لجعل الحركة أكثر سلاسة

/************************************************************/
/* تعريف مكافآت الأيام اليومية */
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
/* بدء اللعبة */
/************************************************************/
function startGame() {
  document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
  document.getElementById('game-overlay').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('friends-page').classList.add('hidden');
  document.getElementById('collab-page').classList.add('hidden');
  document.getElementById('login-daily-page').classList.add('hidden'); /* إخفاء Login Daily */
  document.getElementById('end-game-screen').classList.add('hidden');

  falconScore = 0;
  bombScore = 0;
  // ratsScore is persistent, retrieve from localStorage
  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
  // cardsCount is persistent, retrieve from localStorage
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  document.getElementById('cardsCount').textContent = cardsCount;
  gameTime = 30.00;
  document.getElementById('falconScore').textContent = falconScore; // أظهر العدد فقط
  document.getElementById('bombScore').textContent = bombScore; // أظهر العدد فقط
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
  }, 100); // كل 100 مللي ثانية
}

/************************************************************/
/* توزيع الصقور والقنابل */
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
/* إنهاء اللعبة */
/************************************************************/
function endGame() {
  clearInterval(countdownInterval);
  document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());
  document.getElementById('game-overlay').classList.add('hidden');
  document.getElementById('end-game-screen').classList.remove('hidden');

  // إضافة تأثير الاهتزاز عند انتهاء الجولة
  const overlay = document.getElementById('game-overlay');
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
  overlay.classList.add('shake');
  setTimeout(() => {
    overlay.classList.remove('shake');
  }, 300);

  // استدعاء الكشكشة باستخدام مكتبة canvas-confetti
  showConfetti('confetti-container');

  // إضافة falconScore إلى ratsScore
  ratsScore += falconScore;
  localStorage.setItem('ratsScore', ratsScore.toFixed(2));
  document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));

  gameTime = 0; // منع أي عمليات إضافية بعد انتهاء اللعبة
}

/************************************************************/
/* إنشاء الأيقونة بالسقوط + الضغط */
/************************************************************/
function createFallingEmoji(type) {
  if (gameTime <= 0) return;

  const gameOverlay = document.getElementById('game-overlay');
  const emojiEl = document.createElement('span');
  emojiEl.classList.add('falling-emoji');

  // تحديد الأيقونة حسب النوع
  if (type === 'falcon') {
    emojiEl.innerHTML = '<i class="fas fa-dove"></i>'; // أيقونة النسر
    emojiEl.style.color = '#FFD700'; // لون النسر
  } else if (type === 'bomb') {
    emojiEl.innerHTML = '<i class="fas fa-bomb"></i>'; // أيقونة القنبلة
    emojiEl.style.color = '#FF0000'; // لون القنبلة
  }

  // وضع الأيقونة في مكان عشوائي على المحور الأفقي
  const maxLeft = window.innerWidth - 50;
  emojiEl.style.left = `${Math.random() * maxLeft}px`;
  emojiEl.style.top = '-50px';

  // عند الضغط على الأيقونة باستخدام pointerdown
  emojiEl.addEventListener('pointerdown', (event) => {
    event.preventDefault(); // منع السلوك الافتراضي للنقرات المتعددة

    if (gameTime <= 0) return;

    if (type === 'falcon') {
      falconScore++;
      document.getElementById('falconScore').textContent = falconScore; // فقط تحديث الرقم
    } else {
      bombScore++;
      falconScore = 0; // إعادة الصقور إلى الصفر عند القنبلة
      document.getElementById('falconScore').textContent = falconScore; // تحديث عدد الصقور
      document.getElementById('bombScore').textContent = bombScore; // تحديث عدد القنابل
      bombEffect(); // استدعاء تأثير القنبلة
    }

    emojiEl.remove(); // إزالة الأيقونة من الشاشة
  }, { passive: false });

  // إضافة الأيقونة إلى الشاشة
  gameOverlay.appendChild(emojiEl);

  // استخدام requestAnimationFrame لتحسين الأداء
  let currentTop = -50;
  let lastTimestamp = null;

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    currentTop += (fallSpeed * delta) / 1000; // تعديل الحركة بناءً على الفرق الزمني

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
/* تأثير القنبلة */
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
/* أزرار شاشة النهاية */
/************************************************************/
document.getElementById('btn-new-round').addEventListener('click', () => {
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  if (cardsCount < 1) {
    showSuccessMessage('No cards available. Please collect your daily reward.');
    return;
  }

  // استهلاك كرت واحد لإعادة اللعب
  cardsCount -= 1;
  localStorage.setItem('cardsCount', cardsCount);
  document.getElementById('cardsCount').textContent = cardsCount;

  showConfetti('confetti-container'); // عرض الكشكشة عند الضغط على Play Again
  prepareGame();
});
document.getElementById('btn-back-home').addEventListener('click', () => {
  // إزالة الكشكشة قبل العودة إلى الصفحة الرئيسية
  clearConfetti('confetti-container');
  showMain();
});
document.getElementById('btn-share-link').addEventListener('click', () => {
  showConfetti('confetti-container'); // عرض الكشكشة عند الضغط على Share Link Bot
  alert('Share Link Bot clicked!');
});

/************************************************************/
/* وظيفة نسخ رابط الدعوة */
/************************************************************/
let telegramUserId = null; // متغير لتخزين معرف المستخدم

function copyInviteLink() {
  const botUsername = 'falcon_tapbot'; // اسم البوت الخاص بك (استخدم الحروف الصغيرة)
  const userId = telegramUserId; // يجب أن يحتوي على user_id الخاص بالمستخدم

  if (!userId) {
    alert('Unable to retrieve your user ID. Please try again.');
    return;
  }

  // إنشاء الرابط المطلوب بصيغة https://t.me/falcon_tapbot/FALCON?startapp=<user_id>
  const inviteLink = `https://t.me/${botUsername}/FALCON?startapp=${userId}`;

  // نسخ الرابط إلى الحافظة
  navigator.clipboard.writeText(inviteLink).then(() => {
    showSuccessMessage('Invite link copied!');
  }).catch(err => {
    console.error('Failed to copy invite link: ', err);
    alert('Failed to copy the link. Please try again.');
  });
}

/************************************************************/
/* وظيفة مشاركة رابط الدعوة */
/************************************************************/
function shareInviteLink() {
  const inviteLink = `https://t.me/falcon_tapbot/FALCON?startapp=${telegramUserId}`; // استخدم الرابط بالصيغة المطلوبة
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

/************************************************************/
/* وظيفة عرض رسالة النجاح */
/************************************************************/
function showSuccessMessage(message = 'Success') {
  // إنشاء الرسالة
  const successMessage = document.createElement('div');
  successMessage.textContent = message;
  successMessage.classList.add('success-message');

  // إضافة الرسالة إلى الصفحة
  document.body.appendChild(successMessage);

  // إزالة الرسالة بعد ثانية واحدة
  setTimeout(() => {
    successMessage.remove();
  }, 1000);
}

/************************************************************/
/* دالة تنسيق الأرقام مع الفواصل والرموز الخاصة */
/************************************************************/
function formatNumber(num) {
  // إضافة الفواصل
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // تحويل إلى رموز خاصة
  const styledNumbers = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟯', '8': '𝟴', '9': '𝟵',
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
/* دالة تنسيق الوقت */
/************************************************************/
function formatTimerDigits(value) {
  const styledNumbers = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵', '.': '.'
  };
  return value.toString().split('').map(digit => styledNumbers[digit] || digit).join('');
}

/************************************************************/
/* دالة التنقل بين الصفحات مع تأثير التحميل */
/************************************************************/
function handleNavClick(page) {
  if (page === 'loginDaily') {
    showLoginDaily();
    return;
  }

  showLoader(() => {
    // إخفاء جميع الأقسام
    document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('login-daily-page').classList.add('hidden'); /* إخفاء Login Daily */
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');

    // إظهار الصفحة المطلوبة
    if (page === 'main') {
      document.querySelector('header').classList.remove('hidden'); // إظهار الهيدر
      document.getElementById('main-content').classList.remove('hidden');
      setActiveNav('main');

      // تهيئة تأثير الثلوج عند عرض الصفحة الرئيسية
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

/************************************************************/
/* دالة التعامل مع زر Play Falcon وإدارة المكافآت اليومية */
/************************************************************/
function handlePlayFalcon() {
  let currentDay = parseInt(localStorage.getItem('currentDay')) || 1;
  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;

  if (cardsCount < 1) {
    showSuccessMessage('No cards available. Please collect your daily reward.');
    return;
  }

  // استهلاك كرت واحد للعب
  cardsCount -= 1;
  localStorage.setItem('cardsCount', cardsCount);
  document.getElementById('cardsCount').textContent = cardsCount;

  // بدء اللعبة
  prepareGame();
}

/************************************************************/
/* دالة تهيئة خانات الـ 9 أيام */
/************************************************************/
function initializeDailyLogin() {
  const dayItems = document.querySelectorAll('.day-item');

  // استرجاع حالة الأيام من localStorage
  let claimedDays = JSON.parse(localStorage.getItem('claimedDays')) || [];
  let lastClaimedDate = localStorage.getItem('lastClaimedDate') ? new Date(localStorage.getItem('lastClaimedDate')) : null;

  dayItems.forEach((dayItem, index) => {
    const dayNumber = index + 1;
    if (claimedDays.includes(dayNumber)) {
      // اليوم تم فتحه مسبقًا
      unlockDay(dayItem, true);
    } else {
      if (dayNumber === 1) {
        // اليوم الأول مفتوح دائمًا
        unlockDay(dayItem, false);
      } else {
        // باقي الأيام تحتاج إلى التحقق من مرور يوم منذ آخر فتح
        const previousDay = dayNumber - 1;
        if (claimedDays.includes(previousDay) && lastClaimedDate) {
          const today = new Date();
          const nextUnlockTime = new Date(lastClaimedDate);
          nextUnlockTime.setDate(nextUnlockTime.getDate() + 1);

          // مقارنة التواريخ باستخدام UTC لتجنب مشكلات المناطق الزمنية
          if (today.toDateString() === nextUnlockTime.toDateString() || today > nextUnlockTime) {
            unlockDay(dayItem, false);
          }
        }
      }
    }
  });

  // إضافة مستمعي الأحداث لخانات الأيام
  dayItems.forEach((dayItem, index) => {
    dayItem.addEventListener('click', () => {
      const dayNumber = index + 1;
      if (isDayUnlocked(dayNumber)) {
        if (!claimedDays.includes(dayNumber)) {
          // فتح الخانة
          unlockDay(dayItem, true); // تحديث الواجهة فورًا
          // عرض الكشكشة
          showConfetti('confetti-container-login');
          // اهتزاز الهاتف
          if (navigator.vibrate) {
            navigator.vibrate(200); // اهتزاز لمدة 200 مللي ثانية
          }
          // تحديث الحالة في localStorage
          claimedDays.push(dayNumber);
          localStorage.setItem('claimedDays', JSON.stringify(claimedDays));
          localStorage.setItem('lastClaimedDate', new Date().toISOString());

          // منح المكافأة اليومية
          const reward = dailyRewards[dayNumber - 1];
          if (reward) {
            ratsScore += reward.points;
            let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
            cardsCount += reward.cards; // زيادة الكروت حسب المكافأة اليومية
            localStorage.setItem('ratsScore', ratsScore.toFixed(2));
            localStorage.setItem('cardsCount', cardsCount);
            document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));
            document.getElementById('cardsCount').textContent = cardsCount;

            // تحديث اليوم التالي
            let currentDay = parseInt(localStorage.getItem('currentDay')) || 1;
            currentDay += 1;
            if (currentDay > dailyRewards.length) {
              currentDay = 1; // إعادة تعيين إلى اليوم الأول بعد اليوم التاسع
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

  /* 
    **تم إزالة مستمع الأحداث `touchstart` الذي يمنع التمرير 
    لأن ذلك كان يسبب مشكلة في شريط التمرير داخل خانة الهدية اليومية
  */
}

/************************************************************/
/* دالة فتح اليوم */
/************************************************************/
function unlockDay(dayItem, isCompleted) {
  const overlay = dayItem.querySelector('.overlay');
  if (overlay) {
    if (isCompleted) {
      overlay.innerHTML = '<i class="fas fa-check"></i>'; // أيقونة الصح
      overlay.classList.remove('hidden'); // إزالة فئة hidden لجعل overlay مرئيًا
      overlay.classList.add('completed');
    } else {
      overlay.classList.add('hidden'); // إخفاء التظليل وإيقونة القفل
    }
  }
}

/************************************************************/
/* دالة التحقق مما إذا كان اليوم مفتوحًا */
/************************************************************/
function isDayUnlocked(dayNumber) {
  const dayItem = document.querySelector(`.day-item[data-day="${dayNumber}"]`);
  if (!dayItem) return false;
  const overlay = dayItem.querySelector('.overlay');
  return (overlay && overlay.classList.contains('hidden')) || (overlay && overlay.classList.contains('completed'));
}

/************************************************************/
/* دالة عرض الكشكشة باستخدام مكتبة canvas-confetti */
/************************************************************/
function showConfetti(containerId) {
  const confettiContainer = document.getElementById(containerId);
  if (!confettiContainer) return;

  // إنشاء عنصر canvas داخل حاوية الكشكشة
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.width = confettiContainer.offsetWidth;
  canvas.height = confettiContainer.offsetHeight;
  confettiContainer.appendChild(canvas);

  // إنشاء كشكشة مخصصة باستخدام مكتبة canvas-confetti
  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
  myConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // إزالة عنصر canvas بعد انتهاء الكشكشة
  setTimeout(() => {
    confettiContainer.removeChild(canvas);
  }, 3000); // مدة عرض الكشكشة 3 ثوانٍ
}

/************************************************************/
/* دالة إزالة الكشكشة عند العودة إلى الصفحة الرئيسية */
/************************************************************/
function clearConfetti(containerId) {
  const confettiContainer = document.getElementById(containerId);
  if (!confettiContainer) return;

  // إزالة جميع عناصر canvas داخل حاوية الكشكشة
  const canvases = confettiContainer.querySelectorAll('canvas');
  canvases.forEach(canvas => canvas.remove());
}

/************************************************************/
/* شغل شاشة الافتتاح */
/************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress-bar .progress");
  const splashScreen = document.getElementById("splash-screen");
  const ratsScoreElement = document.getElementById("ratsScore");
  const cardsCountElement = document.getElementById("cardsCount");

  // استرجاع النقاط والكروت من localStorage
  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
  ratsScoreElement.textContent = formatNumber(ratsScore.toFixed(2));

  let cardsCount = parseInt(localStorage.getItem('cardsCount')) || 0;
  cardsCountElement.textContent = cardsCount;

  // املأ الشريط في 5 ثوانٍ
  setTimeout(() => {
    progress.style.width = "100%";
  }, 10);

  // بعد 5 ثوانٍ، أخفِ شاشة الافتتاح وعرض الصفحة الرئيسية
  setTimeout(() => {
    splashScreen.style.display = "none";
    showMain(); // عرض الصفحة الرئيسية بعد شاشة الافتتاح
    document.querySelector('.progress-bar').classList.add('hidden'); // إخفاء شريط التحميل
  }, 5000);

  // إضافة مستمعي الأحداث لأزرار المهام
  document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (button.textContent.trim() === 'Start') {
        // فتح الرابط المرتبط بالمهمة
        const link = button.getAttribute('data-link');
        if (link) {
          window.open(link, '_blank');
        }

        // تحويل الزر إلى Wait... ثم Claim
        button.textContent = 'Wait...';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = 'Claim';
          button.classList.add('claim-btn');
          button.classList.remove('start-btn');
          button.disabled = false;
        }, 10000); // انتظار 10 ثوانٍ
      } else if (button.textContent.trim() === 'Claim') {
        // الحصول على النقاط من السمة data-points
        const points = parseInt(button.getAttribute('data-points'), 10);
        if (isNaN(points)) return;

        // إضافة النقاط إلى ratsScore
        ratsScore += points;
        // حفظ النقاط في localStorage
        localStorage.setItem('ratsScore', ratsScore.toFixed(2));

        // تحديث عرض النقاط في الصفحة الرئيسية
        document.getElementById('ratsScore').textContent = formatNumber(ratsScore.toFixed(2));

        // تحويل الزر إلى ✓ وإظهار رسالة النجاح
        button.textContent = '✓';
        button.classList.add('completed-btn');
        button.classList.remove('claim-btn');
        button.disabled = true;
        
        // إزالة تأثير التحديد والنقر
        button.blur();

        // إضافة تأثير الاهتزاز عند الضغط على Claim
        if (navigator.vibrate) {
          navigator.vibrate(200); // الاهتزاز لمدة 200 مللي ثانية
        }

        // عرض رسالة النجاح
        showSuccessMessage('Points claimed successfully!');
      }
    });
  });

  // تهيئة خانات الـ 9 أيام
  initializeDailyLogin();

  /* منع قائمة السياق عند الضغط بزر الماوس الأيمن على الصور */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', event => event.preventDefault());
  });

  /* منع نسخ النصوص عبر منع التحديد */
  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });

  /* تهيئة Telegram Web Apps */
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();

    // استلام بيانات المستخدم من Telegram
    telegramUserId = window.Telegram.WebApp.initDataUnsafe.user ? window.Telegram.WebApp.initDataUnsafe.user.id : null;

    if (telegramUserId) {
      // إرسال معرف المستخدم إلى الخادم الخلفي
      fetch('https://alisaad11.pythonanywhere.com', { // استبدل بـ URL الخادم الخاص بك
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

  /* إضافة تأثير التموج والانضغاط للأزرار الفوتر */
  const rippleButtons = document.querySelectorAll('.ripple-button');

  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // إنشاء عنصر التموج
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      // حساب موقع التموج
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      // إضافة التموج إلى الزر
      button.appendChild(ripple);

      // إزالة التموج بعد انتهاء الرسوم المتحركة
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
});
