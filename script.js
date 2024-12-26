/************************************************************/
/* دوال التنقل بين الصفحات + شاشة التحميل                  */
/************************************************************/
function showLoader(callback) {
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';
  setTimeout(() => {
    loader.style.display = 'none';
    if (typeof callback === 'function') {
      callback();
    }
  }, 1000);
}

function showMain() {
  showLoader(() => {
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
  });
}

function showFriends() {
  showLoader(() => {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.remove('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
  });
}

function showCollab() {
  showLoader(() => {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.remove('hidden');
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');
  });
}

/************************************************************/
/* إعداد قبل بدء اللعبة: شاشة تحميل لثانيتين ثم البدء      */
/************************************************************/
function prepareGame() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';
  setTimeout(() => {
    loader.style.display = 'none';
    startGame();
  }, 2000);
}

/************************************************************/
/* متغيرات اللعبة                                          */
/************************************************************/
let falconScore = 0;
let bombScore = 0;
let gameTime = 5.00;   // مؤقت اللعبة (5 ثوانٍ للاختبار) - عدّله لاحقاً ل30.00
let countdownInterval;
let totalFalcons;
let totalBombs;

/************************************************************/
/* بدء اللعبة: جدولة الصقور والقنابل + عداد الوقت          */
/************************************************************/
function startGame() {
  document.getElementById('game-overlay').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('friends-page').classList.add('hidden');
  document.getElementById('collab-page').classList.add('hidden');
  document.getElementById('end-game-screen').classList.add('hidden');

  // إعادة ضبط النقاط والوقت
  falconScore = 0;
  bombScore = 0;
  gameTime = 5.00; // للاختبار - عدّله إلى 30.00 لاحقاً
  document.getElementById('falconScore').textContent = falconScore;
  document.getElementById('bombScore').textContent = bombScore;
  document.getElementById('timer').textContent = gameTime.toFixed(2);

  // تحديد كم عدد الصقور والقنابل بشكل عشوائي
  totalFalcons = Math.floor(Math.random() * (250 - 150 + 1)) + 150; // 150~250
  totalBombs   = Math.floor(Math.random() * (50 - 20 + 1)) + 20;   // 20~50

  scheduleEmojis();

  // تشغيل العداد ينقص كل 0.1 ثانية
  countdownInterval = setInterval(() => {
    gameTime -= 0.1;
    if (gameTime <= 0) {
      gameTime = 0;
      endGame();
    }
    document.getElementById('timer').textContent = gameTime.toFixed(2);
  }, 100);
}

/************************************************************/
/* توزيع الصقور والقنابل على مدى زمن اللعبة                */
/************************************************************/
function scheduleEmojis() {
  for (let i = 0; i < totalFalcons; i++) {
    let spawnTime = Math.random() * 5.0; 
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('🦅');
    }, spawnTime * 1000);
  }

  for (let j = 0; j < totalBombs; j++) {
    let spawnTime = Math.random() * 5.0; 
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('💣');
    }, spawnTime * 1000);
  }
}

/************************************************************/
/* نهاية اللعبة: إظهار شاشة النهاية                        */
/************************************************************/
function endGame() {
  clearInterval(countdownInterval);
  const emojis = document.querySelectorAll('.falling-emoji');
  emojis.forEach(emoji => emoji.remove());

  // إخفاء واجهة اللعبة
  document.getElementById('game-overlay').classList.add('hidden');
  // إظهار شاشة النهاية
  document.getElementById('end-game-screen').classList.remove('hidden');

  // تعبئة نتيجة الصقور والقنابل
  document.getElementById('endFalconScore').textContent = falconScore;
  document.getElementById('endBombScore').textContent = bombScore;
}

/************************************************************/
/* إنشاء الإيموجي المتساقط + عند الضغط عليه                */
/************************************************************/
function createFallingEmoji(type) {
  const gameOverlay = document.getElementById('game-overlay');
  const emojiEl = document.createElement('span');
  emojiEl.classList.add('falling-emoji');
  emojiEl.textContent = type;

  const maxLeft = window.innerWidth - 50;
  const randomLeft = Math.floor(Math.random() * maxLeft);
  emojiEl.style.left = randomLeft + 'px';
  emojiEl.style.top = '-50px';

  // عند الضغط على الإيموجي
  emojiEl.addEventListener('click', () => {
    if (type === '🦅') {
      falconScore++;
      document.getElementById('falconScore').textContent = falconScore;
    } else {
      // ضغط قنبلة
      bombScore++;
      falconScore = 0; // تصفير عدد الصقور
      document.getElementById('bombScore').textContent = bombScore;
      document.getElementById('falconScore').textContent = falconScore;
      bombEffect();
    }
    emojiEl.remove();
  });

  gameOverlay.appendChild(emojiEl);

  // تحريك الإيموجي للأسفل
  let currentTop = -50;
  function fall() {
    if (gameOverlay.classList.contains('hidden') || gameTime <= 0) {
      emojiEl.remove();
      return;
    }
    currentTop += 2.5;
    emojiEl.style.top = currentTop + 'px';

    if (currentTop > window.innerHeight + 50) {
      emojiEl.remove();
      return;
    }
    requestAnimationFrame(fall);
  }
  requestAnimationFrame(fall);
}

/************************************************************/
/* تأثير القنبلة: اهتزاز + خلفية حمراء                     */
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
/* أزرار المهام (Start -> Wait... -> Claim -> ✓) + نسخ/فتح رابط */
/************************************************************/
document.querySelectorAll('.action-btn').forEach(function (button) {
  button.addEventListener('click', function () {
    const taskName = button.parentNode.querySelector('h3').textContent.trim();
    
    if (button.textContent.trim() === 'Start') {
      // مهمة 1: Put 🦅 next to your name => نسخ 🦅
      if (taskName === "Put 🦅 next to your name") {
        navigator.clipboard.writeText('🦅').catch(() => {});
      }
      // مهمة 2: Follow Telegram Channel => https://t.me/fake
      else if (taskName === "Follow Telegram Channel") {
        window.open('https://t.me/fake', '_blank');
      }
      // مهمة 3: Follow us on X => https://t.me/faker
      else if (taskName === "Follow us on X") {
        window.open('https://t.me/faker', '_blank');
      }
      // مهمة 4: Boost Channel => https://t.me/faaker
      else if (taskName === "Boost Channel") {
        window.open('https://t.me/faaker', '_blank');
      }

      // بعد تنفيذ الإجراء، نغيّر النص إلى Wait...
      button.textContent = 'Wait...';
      // بعد 10 ثوانٍ -> Claim
      setTimeout(() => {
        button.textContent = 'Claim';
        button.classList.remove('start-btn');
        button.classList.add('claim-btn');
      }, 10000);

    } else if (button.textContent.trim() === 'Claim') {
      // إذا كان النص Claim => يصبح ✓
      button.textContent = '✓';
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  });
});

/************************************************************/
/* أزرار شاشة النهاية                                      */
/************************************************************/
// زر "New Round"
document.getElementById('btn-new-round').addEventListener('click', () => {
  prepareGame();
});
// زر "Return Home"
document.getElementById('btn-back-home').addEventListener('click', () => {
  showMain();
});
// زر "Share Link Bot"
document.getElementById('btn-share-link').addEventListener('click', () => {
  alert('Share Link Bot clicked!');
});
