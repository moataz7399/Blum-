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
const fallSpeed = 5; // سرعة سقوط ثابتة

/************************************************************/
/* بدء اللعبة                                               */
/************************************************************/
function startGame() {
  document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
  document.getElementById('game-overlay').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('friends-page').classList.add('hidden');
  document.getElementById('collab-page').classList.add('hidden');
  document.getElementById('end-game-screen').classList.add('hidden');

  falconScore = 0;
  bombScore = 0;
  // ratsScore is persistent, retrieve from localStorage
  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
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
  // حذف تحديث النقاط في شاشة نهاية اللعبة
  // document.getElementById('endFalconScore').textContent = formatNumber(falconScore);
  // document.getElementById('endBombScore').textContent = formatNumber(bombScore);

  // استدعاء الكشكشة
  showConfetti();

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

  // إعداد خصائص CSS
  emojiEl.style.width = '50px';
  emojiEl.style.height = '50px';

  // وضع الإيموجي في مكان عشوائي على المحور الأفقي
  const maxLeft = window.innerWidth - 50;
  emojiEl.style.left = `${Math.random() * maxLeft}px`;
  emojiEl.style.top = '-50px';

  // عند الضغط على الإيموجي
  emojiEl.addEventListener('click', () => {
    if (gameTime <= 0) return;

    if (type === '🦅') {
      falconScore++;
      document.getElementById('falconScore').textContent = falconScore; // فقط تحديث الرقم
    } else {
      bombScore++;
      falconScore = 0; // إعادة الصقور إلى الصفر عند القنبلة
      document.getElementById('falconScore').textContent = falconScore; // تحديث عدد الصقور
      document.getElementById('bombScore').textContent = bombScore; // تحديث عدد القنابل
      bombEffect(); // استدعاء تأثير القنبلة
    }

    emojiEl.remove(); // إزالة الإيموجي من الشاشة
  });

  // إضافة الإيموجي إلى الشاشة
  gameOverlay.appendChild(emojiEl);

  // تحريك الإيموجي للأسفل بسرعة ثابتة
  let currentTop = -50;
  const interval = setInterval(() => {
    currentTop += fallSpeed;
    emojiEl.style.top = `${currentTop}px`;

    // إزالة الإيموجي إذا خرج من الشاشة
    if (currentTop > window.innerHeight) {
      emojiEl.remove();
      clearInterval(interval);
    }
  }, 16); // تحديث كل 16ms (حوالي 60 إطاراً في الثانية)
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

/************************************************************/
/* وظيفة نسخ رابط الدعوة                                      */
/************************************************************/
function copyInviteLink() {
  const inviteLink = 'https://example.com/invite'; // ضع رابط الدعوة الحقيقي هنا
  navigator.clipboard.writeText(inviteLink).then(() => {
    showSuccessMessage('Invite link copied!');
  }).catch(err => {
    console.error('Failed to copy invite link: ', err);
  });
}

/************************************************************/
/* وظيفة مشاركة رابط الدعوة                                      */
/************************************************************/
function shareInviteLink() {
  const inviteLink = 'https://example.com/invite'; // ضع رابط الدعوة الحقيقي هنا
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
/* وظيفة عرض رسالة النجاح                                    */
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
/* دالة تنسيق الأرقام مع الفواصل والرموز الخاصة              */
/************************************************************/
function formatNumber(num) {
  // إضافة الفواصل
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // تحويل إلى رموز خاصة
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

/************************************************************/
/* دالة تنسيق الوقت                                        */
/************************************************************/
function formatTimerDigits(value) {
  const styledNumbers = {
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵', '.': '.'
  };
  return value.toString().split('').map(digit => styledNumbers[digit] || digit).join('');
}

/************************************************************/
/* دالة التنقل بين الصفحات مع تأثير التحميل                  */
/************************************************************/
function handleNavClick(page) {
  showLoader(() => {
    // إخفاء جميع الأقسام
    document.querySelector('header').classList.add('hidden'); // إخفاء الهيدر
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('friends-page').classList.add('hidden');
    document.getElementById('collab-page').classList.add('hidden');
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('end-game-screen').classList.add('hidden');

    // إظهار الصفحة المطلوبة
    if (page === 'main') {
      document.querySelector('header').classList.remove('hidden'); // إظهار الهيدر
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
/* شغل شاشة الافتتاح                                      */
/************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress-bar .progress");
  const splashScreen = document.getElementById("splash-screen");
  const ratsScoreElement = document.getElementById("ratsScore");

  // استرجاع النقاط من localStorage
  ratsScore = parseFloat(localStorage.getItem('ratsScore')) || 0.00;
  ratsScoreElement.textContent = formatNumber(ratsScore.toFixed(2));

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
        
        // إضافة تأثير الاهتزاز عند الضغط على Claim
        if (navigator.vibrate) {
          navigator.vibrate(200); // الاهتزاز لمدة 200 مللي ثانية
        }

        // عرض رسالة النجاح
        showSuccessMessage('Points claimed successfully!');
      }
    });
  });
});

/************************************************************/
/* دالة عرض الكشكشة                                        */
/************************************************************/
function showConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  confettiContainer.classList.remove("hidden");

  // عدد الكشكشة
  const numberOfConfetti = 100; // يمكنك زيادة أو تقليل العدد حسب الرغبة

  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // تحديد نوع الكشكشة عشوائيًا
    const types = ['line', 'star', 'circle'];
    const type = types[Math.floor(Math.random() * types.length)];
    confetti.classList.add(type);

    // تحديد بداية الكشكشة من اليسار أو اليمين فقط
    const sides = ['left', 'right'];
    const side = sides[Math.floor(Math.random() * sides.length)];

    let startX, startY, translateX;

    if (side === 'left') {
      // بداية من اليسار، تتحرك نحو اليمين
      startX = Math.random() * window.innerWidth * 0.2; // 20% من العرض من اليسار
      translateX = Math.random() * 200 + 100; // حركة جانبية عشوائية نحو اليمين بين 100 و300 بيكسل
    } else {
      // بداية من اليمين، تتحرك نحو اليسار
      startX = window.innerWidth - (Math.random() * window.innerWidth * 0.2); // 20% من العرض من اليمين
      translateX = -(Math.random() * 200 + 100); // حركة جانبية عشوائية نحو اليسار بين -100 و-300 بيكسل
    }

    startY = Math.random() * window.innerHeight * 0.2; // 20% من الارتفاع من الأعلى

    // تحديد الموقع الابتدائي
    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;

    // إضافة الألوان والتنسيق
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (type !== 'star') {
      confetti.style.backgroundColor = color;
    }

    // إضافة الإيموجي إلى الكشكشة إذا كان نوع نجمة أو دائرة
    if (type === 'star') {
      confetti.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      confetti.style.backgroundColor = color;
    }

    // إضافة الكشكشة إلى الحاوية
    confettiContainer.appendChild(confetti);

    // إعداد متغيرات CSS للتحريك
    const translateY = window.innerHeight + 100; // لضمان سقوط الكشكشة خارج الشاشة

    confetti.style.setProperty('--translateX', `${translateX}px`);
    confetti.style.setProperty('--translateY', `${translateY}px`);
  }

  // إزالة الكشكشة بعد انتهاء الحركة
  setTimeout(() => {
    confettiContainer.classList.add("hidden");
  }, 2000); // بعد 2 ثانية (مدة الأنيميشن)
}
