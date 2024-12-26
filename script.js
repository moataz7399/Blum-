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
let gameTime = 5.00; // للاختبار
let countdownInterval;
let totalFalcons;
let totalBombs;

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
  gameTime = 5.00; 
  document.getElementById('falconScore').textContent = falconScore;
  document.getElementById('bombScore').textContent = bombScore;
  document.getElementById('timer').textContent = gameTime.toFixed(2);

  totalFalcons = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
  totalBombs   = Math.floor(Math.random() * (50 - 20 + 1)) + 20;

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
/* إنهاء اللعبة                                             */
/************************************************************/
function endGame() {
  clearInterval(countdownInterval);
  document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());
  document.getElementById('game-overlay').classList.add('hidden');
  document.getElementById('end-game-screen').classList.remove('hidden');
  document.getElementById('endFalconScore').textContent = falconScore;
  document.getElementById('endBombScore').textContent = bombScore;
}

/************************************************************/
/* إنشاء الإيموجي والسقوط + الضغط                          */
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

  emojiEl.addEventListener('click', () => {
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
/* أزرار (Start -> Wait... -> Claim -> ✓)                   */
/************************************************************/
document.querySelectorAll('.action-btn').forEach(button => {
  button.addEventListener('click', () => {
    const taskName = button.parentNode.querySelector('h3').textContent.trim();

    if (button.textContent.trim() === 'Start') {
      if (taskName === "Put 🦅 next to your name") {
        navigator.clipboard.writeText('🦅').catch(() => {});
      }
      else if (taskName === "Follow Telegram Channel") {
        window.open('https://t.me/fake', '_blank');
      }
      else if (taskName === "Follow us on X") {
        window.open('https://t.me/faker', '_blank');
      }
      else if (taskName === "Boost Channel") {
        window.open('https://t.me/faaker', '_blank');
      }

      button.textContent = 'Wait...';
      setTimeout(() => {
        button.textContent = 'Claim';
        button.classList.remove('start-btn');
        button.classList.add('claim-btn');
      }, 10000);

    } else if (button.textContent.trim() === 'Claim') {
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
document.getElementById('btn-new-round').addEventListener('click', () => {
  prepareGame();
});
document.getElementById('btn-back-home').addEventListener('click', () => {
  showMain();
});
document.getElementById('btn-share-link').addEventListener('click', () => {
  alert('Share Link Bot clicked!');
});
