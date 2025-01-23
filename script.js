/************************************
 * Telegram WebApp إعدادات
 ************************************/
// التأكد من جاهزية Telegram WebApp
Telegram.WebApp.ready();

// الحصول على بيانات المستخدم من Telegram WebApp
const initDataUnsafe = Telegram.WebApp.initDataUnsafe;

/************************************
 * الأكواد السابقة المتعلقة بالشرائط
 ************************************/
const progressBars = document.querySelectorAll('.progress-fill');
const progressTitles = document.querySelectorAll('.progress-title');
const continueButton = document.getElementById('continueButton');

let index = 0;

/**
 * ملء كل شريط بشكل متسلسل كل 5 ثوانٍ.
 */
function fillNextBar() {
  if (index < progressBars.length) {
    // ملء الشريط بالكامل
    progressBars[index].style.width = '100%';

    const currentIndex = index;

    // بعد 5 ثوانٍ من بدء التعبئة
    setTimeout(() => {
      // اهتزاز بسيط
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      /******** الشريط الأول (Random Reward) ********/
      if (currentIndex === 0) {
        // يتحول للون الأخضر
        progressBars[currentIndex].style.background = 'green';
        // تشغيل الكشكشة (Confetti)
        showConfetti();
        // عداد من 1000 إلى رقم عشوائي
        const randomNumber = Math.floor(Math.random() * 9001) + 1000;
        animateCountUp(randomNumber);
      }

      /******** الشريط الثاني (Telegram Premium) ********/
      else if (currentIndex === 1) {
        // التحقق من كون المستخدم مشتركًا في Telegram Premium
        if (initDataUnsafe.user && initDataUnsafe.user.is_premium) {
          // لو عنده اشتراك بريميوم → أخضر + كشكشة
          progressBars[currentIndex].style.background = 'green';
          showConfetti();
        } else {
          // لا يوجد اشتراك بريميوم → أحمر بدون كشكشة
          progressBars[currentIndex].style.background = 'red';
        }
      }

      /******** الشريط الثالث (UserName Telegram) ********/
      if (currentIndex === 2) {
        // التحقق من وجود اسم مستخدم (username)
        if (initDataUnsafe.user && initDataUnsafe.user.username) {
          // لديه Username → أخضر + كشكشة
          progressBars[currentIndex].style.background = 'green';
          showConfetti();
        } else {
          // لا يوجد username → أحمر بدون كشكشة
          progressBars[currentIndex].style.background = 'red';
        }
        
        // إظهار زر Continue مع تأثير الانزلاق
        continueButton.style.display = 'inline-block';
        continueButton.classList.add('slide-up');
      }

    }, 5000);

    // الانتقال للشريط التالي بعد 5 ثوانٍ
    index++;
    setTimeout(fillNextBar, 5000);
  }
}

/**
 * عداد من 1000 إلى رقم محدد خلال ثانية واحدة
 */
function animateCountUp(targetNumber) {
  let startTime = null;
  const duration = 1000; // 1 ثانية
  const startVal = 1000; // يبدأ من 1000

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    let fraction = progress / duration;
    if (fraction > 1) fraction = 1;

    let currentValue = Math.round(startVal + (targetNumber - startVal) * fraction);
    // تنسيق الرقم بالفواصل
    const formattedValue = currentValue.toLocaleString('en-US');

    // تحديث الشريط الأول: فقط الرقم داخل الأقواس
    progressTitles[0].innerHTML = `<strong>Random Reward</strong> {  ${formattedValue}  }`;

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
  confetti({
    particleCount: 100, // عدد الجزيئات
    spread: 70,        // زاوية الانتشار
    origin: { y: 0.6 } // الموقع العمودي للنثر
  });
}

// بدء التعبئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fillNextBar);

/************************************
 * زر Continue (اهتزاز عند الضغط)
 ************************************/
continueButton.addEventListener('click', () => {
  continueButton.classList.add('shake');
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  setTimeout(() => {
    continueButton.classList.remove('shake');
  }, 500);
});

/************************************
 * إضافة ستايل اهتزاز (Shake Animation)
 ************************************/
const style = document.createElement('style');
style.innerHTML = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
  }
  .shake {
    animation: shake 0.5s;
  }
`;
document.head.appendChild(style);
