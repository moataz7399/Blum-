/************************************************************/
/* تنقل بين الصفحات + Loader                                */
/************************************************************/
function showLoader(callback) {
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';
  setTimeout(() => {
    loader.style.display = 'none';
    if (typeof callback === 'function') callback();
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
/* قبل بدء اللعبة                                           */
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
/* متغيرات اللعبة                                           */
/************************************************************/
let falconScore = 0;
let bombScore = 0;
let gameTime = 30.00; // مدة اللعبة
let countdownInterval;
let totalFalcons;
let totalBombs;
const fallSpeed = 3; // سرعة سقوط ثابتة

/************************************************************/
/* بدء اللعبة                                               */
/************************************************************/
function startGame() {
  document.getElementById('game-overlay').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('friends-page').classList.add('hidden');
  document.getElementById('collab-page').classList.add('hidden');
  document.getElementById('end-game-screen').classList.add('hidden');

  falconScore = 0;
  bombScore = 0;
  gameTime = 30.00; 
  document.getElementById('falconScore').textContent = falconScore;
  document.getElementById('bombScore').textContent = bombScore;
  document.getElementById('timer').textContent = gameTime.toFixed(2);

  totalFalcons = Math.floor(Math.random() * (150 - 100 + 1)) + 150;
  totalBombs = Math.floor(Math.random() * (20 - 10 + 1)) + 20;

  scheduleEmojis();

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
/* توزيع الصقور والقنابل                                   */
/************************************************************/
function scheduleEmojis() {
  const falconInterval = gameTime / totalFalcons;
  const bombInterval = gameTime / totalBombs;

  for (let i = 0; i < totalFalcons; i++) {
    let spawnTime = i * falconInterval;
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('🦅');
    }, spawnTime * 1000);
  }

  for (let j = 0; j < totalBombs; j++) {
    let spawnTime = j * bombInterval;
    setTimeout(() => {
      if (gameTime <= 0) return;
      createFallingEmoji('💣');
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
  document.getElementById('endFalconScore').textContent = falconScore;
  document.getElementById('endBombScore').textContent = bombScore;

  gameTime = 0; // منع أي عمليات إضافية بعد انتهاء اللعبة
}

/************************************************************/
/* إنشاء الإيموجي بالسقوط + الضغط                          */
/************************************************************/
function createFallingEmoji(type) {
  if (gameTime <= 0) return;

  const gameOverlay = document.getElementById('game-overlay');
  const emojiEl = document.createElement('span');
  emojiEl.classList.add('falling-emoji');

  // تحديد الصورة حسب النوع
  if (type === '🦅') {
    emojiEl.style.backgroundImage = "url('https://i.ibb.co/qdC3sPc/Picsart-24-12-26-16-25-14-117.png')";
  } else if (type === '💣') {
    emojiEl.style.backgroundImage = "url('https://i.ibb.co/st0V7gb/Picsart-24-12-26-16-26-53-669.png')";
  }

  // إضافة خصائص CSS للصورة
  emojiEl.style.backgroundSize = 'contain';
  emojiEl.style.backgroundRepeat = 'no-repeat';
  emojiEl.style.width = '50px'; // حجم الصورة
  emojiEl.style.height = '50px'; // حجم الصورة

  const maxLeft = window.innerWidth - 50;
  const randomLeft = Math.floor(Math.random() * maxLeft);
  emojiEl.style.left = randomLeft + 'px';
  emojiEl.style.top = '-50px';

  emojiEl.addEventListener('click', () => {
    if (gameTime <= 0) return;
    if (type === '🦅') {
      falconScore++;
      document.getElementById('falconScore').textContent = falconScore;
    } else {
      bombScore++;
      falconScore = 0;
      document.getElementById('bombScore').textContent = bombScore;
      document.getElementById('falconScore').textContent = falconScore;
      bombEffect();
    }
    emojiEl.remove();
  });

  gameOverlay.appendChild(emojiEl);

  let currentTop = -50;
  function fall() {
    if (gameTime <= 0 || gameOverlay.classList.contains('hidden')) {
      emojiEl.remove();
      return;
    }
    currentTop += fallSpeed; // سرعة ثابتة
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
  prepareGame();
});
document.getElementById('btn-back-home').addEventListener('click', () => {
  showMain();
});
document.getElementById('btn-share-link').addEventListener('click', () => {
  alert('Share Link Bot clicked!');
});

// وظيفة عرض رسالة النجاح
function showSuccessMessage() {
  // إنشاء الرسالة
  const successMessage = document.createElement('div');
  successMessage.textContent = 'Success';
  successMessage.classList.add('success-message');

  // إضافة الرسالة إلى الصفحة
  document.body.appendChild(successMessage);

  // إزالة الرسالة بعد ثانية واحدة
  setTimeout(() => {
    successMessage.remove();
  }, 1000);
}

function showConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  confettiContainer.classList.remove("hidden");

  // عدد الكشكشة
  const numberOfConfetti = 100;

  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // موقع عشوائي من الأطراف العلوية (يمين أو يسار)
    const startX = Math.random() > 0.5 ? -20 : window.innerWidth + 20;
    const startY = Math.random() * 100;

    // موقع النهاية العشوائي
    const endX = Math.random() * window.innerWidth;
    const endY = window.innerHeight + 50;

    // إضافة الألوان والتنسيق
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;

    // حركة القذف إلى الأعلى ثم السقوط
    const midX = window.innerWidth / 2 + (Math.random() * 200 - 100); // المنتصف
    const midY = 100; // أقرب نقطة في الأعلى
    const duration = Math.random() * 1.5 + 1; // مدة القذف
    const fallDuration = Math.random() * 2 + 2; // مدة السقوط

    confetti.style.transition = `transform ${duration}s ease-out`;
    confetti.style.transform = `translate(${midX - startX}px, ${midY - startY}px)`;

    confettiContainer.appendChild(confetti);

    // بعد القذف يبدأ السقوط
    setTimeout(() => {
      confetti.style.transition = `transform ${fallDuration}s linear`;
      confetti.style.transform = `translate(${endX - midX}px, ${endY - midY}px)`;

      // إزالة الكشكشة بعد انتهاء الحركة
      setTimeout(() => {
        confetti.remove();
      }, fallDuration * 1000);
    }, duration * 1000);
  }

  // إخفاء الحاوية بعد 5 ثوانٍ
  setTimeout(() => {
    confettiContainer.classList.add("hidden");
  }, 5000);
}

// استدعاء الكشكشة عند انتهاء الجولة
function endGame() {
  clearInterval(countdownInterval);
  document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());
  document.getElementById('game-overlay').classList.add('hidden');
  document.getElementById('end-game-screen').classList.remove('hidden');
  document.getElementById('endFalconScore').textContent = falconScore;
  document.getElementById('endBombScore').textContent = bombScore;

  // استدعاء الكشكشة
  showConfetti();
}

function formatTimerDigits(value) {
  const styledNumbers = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
  };
  return value.toString().split('').map(digit => styledNumbers[digit] || digit).join('');
}

// تحديث عرض الوقت مع التنسيق الجديد
setInterval(() => {
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    const currentTime = parseFloat(timerElement.textContent).toFixed(2);
    timerElement.textContent = formatTimerDigits(currentTime);
  }
}, 100);

// تحديث أزرار المهام
document.querySelectorAll('.action-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent.trim() === 'Start') {
      // تحويل الزر إلى Wait... ثم Claim
      button.textContent = 'Wait...';
      setTimeout(() => {
        button.textContent = 'Claim';
        button.classList.add('claim-btn');
      }, 10000);
    } else if (button.textContent.trim() === 'Claim') {
      // تحويل الزر إلى ✓ وإظهار رسالة النجاح
      button.textContent = '✓';
      button.classList.add('completed-btn');
      showSuccessMessage();
    }
  });
});
