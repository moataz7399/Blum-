/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  background: url('https://i.ibb.co/tqmh1BZ/IMG.jpg') center/cover no-repeat; /* رابط الخلفية */
  background-attachment: fixed; /* يجعل الخلفية ثابتة أثناء التمرير */
  margin: 0;
  padding: 0;
  color: #fff; /* لون النص */
  min-height: 100vh; /* لتغطية الشاشة بالكامل */
  display: flex;
  flex-direction: column;
}

/* شاشة الافتتاح */
#splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000; /* خلفية سوداء */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* أعلى العناصر */
}

/* صورة شاشة الافتتاح */
.splash-image {
  max-width: 80%;
  height: auto;
  border-radius: 10px; /* تقويس الحواف */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

/* شريط التحميل */
.progress-bar {
  position: relative;
  width: 80%;
  height: 5px;
  background: #555; /* خلفية شريط التحميل */
  border-radius: 5px;
  margin-top: 20px; /* مسافة أسفل الصورة */
  overflow: hidden;
}

.progress-bar .progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: #00ff00; /* لون الشريط الأخضر */
  transition: width 5s linear; /* انتقال يستغرق 5 ثوانٍ */
}

/* تصميم المربع الجديد */
.friends-table {
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.8); /* لون خلفية شفاف */
  border: 2px solid #fff; /* إطار أبيض */
  border-radius: 10px; /* تقويس الزوايا */
  width: 90%; /* عرض المربع */
  height: calc(100vh - 300px); /* يمتد من أسفل كلمة "Share Invite Link" إلى أسفل الشاشة */
  margin: 0 auto; /* توسيط المربع */
  padding: 20px; /* مسافة داخلية */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* ظل المربع */
  overflow-y: auto; /* تفعيل التمرير العمودي إذا امتلأ المحتوى */
}

/* نصوص داخل المربع */
.friends-table p {
  color: #fff; /* لون النص */
  font-size: 1.2rem; /* حجم النص */
  text-align: center; /* محاذاة النص */
}

#confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ffc107;
  border-radius: 50%;
  animation: confetti-animation 5s ease-in-out forwards;
  will-change: transform; /* تحسين الأداء */
}

@keyframes confetti-animation {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(0, 100vh) rotate(720deg);
    opacity: 0;
  }
}

/* توهج */
header .glow-text,
#game-overlay .score-panel p,
#end-game-screen .stats-line {
  text-shadow: 0 0 3px rgba(255,255,255,0.7),
               0 0 6px rgba(255,255,255,0.5);
}

.glow-text {
  text-shadow: none;
}

.hidden {
  display: none !important;
}

/* هيدر */
header {
  background: transparent; /* اجعل الهيدر شفافاً */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: none; /* إزالة الخط الفاصل */
}
.top-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* شاشة التحميل */
.loader {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #ddd;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* جسم الصفحة بالكامل */
body {
  background: url('https://i.ibb.co/1m2th6k/Picsart-24-12-26-13-54-43-713.jpg') center/cover no-repeat; /* رابط الخلفية */
  background-attachment: fixed; /* يجعل الخلفية ثابتة أثناء التمرير */
  color: #fff;
  margin: 0;
  padding: 0;
  height: 100vh; /* يغطي الشاشة بالكامل */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* المحتوى الرئيسي */
#main-content {
  flex: 1; /* يجعل المحتوى يمتد لملء الشاشة */
  text-align: center;
  padding-bottom: 70px;
}

/* صورة ورصيد */
.profile-section {
  margin-top: 20px;
}
.profile-icon {
  width: 120px; height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  border: 2px solid #fff;
}

/* عمودان جنباً لجنب بلا لف */
.two-columns {
  display: flex;
  flex-wrap: nowrap; /* لا يلف */
  justify-content: space-around;
  gap: 10px; /* مسافة بين العمودين */
  margin-top: 20px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* بطاقات أصغر */
.button-card {
  background: #1a1a1a;
  width: 140px; /* أصغر ليتسع العمودان في العرض دون تمرير */
  padding: 10px; 
  border-radius: 10px;
  margin: 0 auto;
  text-align: center;
}

.button-card h3 {
  font-size: 0.9rem;
  margin-bottom: 5px;
}
.button-card button {
  display: block;
  width: 100%;
  margin: 5px auto;
  padding: 8px;
  background: #fff; /* لون الخلفية الأبيض */
  color: #000;      /* لون النص الأسود */
  border: none; 
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold; /* اجعل النص غامقاً */
  transition: background 0.3s;
}
.button-card button:hover {
  background: #555;
}

/* زر Play */
.play-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.play-container .button-card {
  width: 140px;
  padding: 10px;
}

/* صفحة الأصدقاء */
.friends-section {
  text-align: center;
  margin-top: 20px;
}
.friends-section .profile-icon {
  display: block;
  margin: 0 auto;
}
.friends-buttons button {
  width: 80%;
  margin: 10px auto;
  padding: 15px 0;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}
.friends-buttons button:hover {
  background: #e5e5e5;
}

/* Collab */
.tasks-section {
  margin: 20px;
  max-height: calc(100vh - 150px); /* لضبط الارتفاع بناءً على ارتفاع الشاشة مع مراعاة الهيدر والفوتر */
  overflow-y: auto; /* لتفعيل التمرير العمودي */
  padding-right: 10px; /* إضافة مساحة داخلية للتمرير */
  scrollbar-width: thin; /* جعل شريط التمرير رفيعاً */
}

/* تخصيص شريط التمرير */
.tasks-section::-webkit-scrollbar {
  width: 8px;
}

.tasks-section::-webkit-scrollbar-thumb {
  background-color: #888; /* لون شريط التمرير */
  border-radius: 4px; /* تقويس الحواف */
}

.tasks-section::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* لون شريط التمرير عند التمرير عليه */
}
.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a1a;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.task-card img {
  width: 60px; height: 60px;
  border-radius: 5px;
  object-fit: cover;
}
.task-card div {
  flex-grow: 1;
  margin-left: 10px;
}
.task-card h3, 
.task-card p {
  color: #fff;
}

/* أزرار Start/Claim */
.start-btn {
  background: #fff;
  color: #000;
  border-radius: 9999px; 
  padding: 10px 30px;
  border: none;
  font-size: 1rem;
  transition: background 0.3s, color 0.3s;
}
.claim-btn {
  background: #007bff;
  color: #fff;
  border-radius: 9999px;
  padding: 10px 30px;
  border: none;
  font-size: 1rem;
  transition: background 0.3s, color 0.3s;
}

/* واجهة اللعبة */
#game-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #000 url("https://i.ibb.co/jfjCkVM/image.png") center/cover no-repeat;
  z-index: 9998; 
  overflow: hidden;
}

/* عدادات */
.score-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  pointer-events: none;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 0 5px #fff, 0 0 10px #ffc107;
}
.score-panel p {
  margin-bottom: 5px;
}
#falconScore, #bombScore {
  font-size: 1.4rem;
  color: #fff;
  text-shadow: 0 0 3px #fff, 0 0 6px #ff0, 0 0 10px #ff0;
}

.timer-panel {
  position: absolute;
  top: 10px; right: 15px;
  pointer-events: none;
}
.timer-panel p {
  font-size: 2rem; 
  font-weight: bold;
  text-shadow: 0 0 4px #fff, 0 0 8px #fff, 0 0 12px #fff;
}

.falling-emoji {
  position: absolute;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
}

.timer-panel p {
  font-family: 'Poppins', sans-serif; /* يمكنك اختيار خط يدعم التنسيق */
  unicode-bidi: bidi-override;
  font-variant-numeric: tabular-nums;
}

/* اهتزاز */
.shake {
  animation: shake 0.3s;
}
@keyframes shake {
  0%   { transform: translate(0,0); }
  20%  { transform: translate(-10px,0); }
  40%  { transform: translate(10px,0); }
  60%  { transform: translate(-10px,0); }
  80%  { transform: translate(10px,0); }
  100% { transform: translate(0,0); }
}
.bomb-image {
  background: #000 url("https://i.ibb.co/R0SKJqJ/image.png") center/cover no-repeat !important;
}

/* نهاية اللعبة */
.end-game-screen {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #000; 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.end-content {
  text-align: center;
}
.gift-emoji {
  font-size: 4rem;
  margin-bottom: 20px;
}
.stats-line {
  font-size: 1.4rem;
  margin: 10px 0;
  font-weight: bold;
  text-shadow: 0 0 3px #fff, 0 0 6px #fff;
}
.line-text {
  margin-right: 5px;
}
.buttons-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%; 
  max-width: 320px;
  margin: 0 auto;
}
#end-game-screen button {
  display: block; /* يجعل الأزرار على صفوف منفصلة */
  width: 90%; /* عرض الزر بالنسبة للمساحة الكلية */
  max-width: 450px; /* تحديد عرض أقصى أكبر */
  padding: 20px 40px; /* تكبير المساحة الداخلية للزر */
  margin: 15px auto; /* مركزية الأزرار مع مسافة بينها */
  font-size: 1.6rem; /* تكبير حجم النص */
  color: #000; /* لون النص */
  background-color: #fff; /* لون الخلفية */
  border: none; /* إزالة الحدود */
  border-radius: 30px; /* زيادة استدارة الحواف */
  font-weight: bold; /* جعل النص غامق */
  text-align: center; /* محاذاة النص إلى الوسط */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* إضافة ظل */
  transition: all 0.3s ease-in-out; /* تأثيرات سلسة عند التمرير */
}

#end-game-screen button:hover {
  background-color: #ddd; /* تغيير لون الخلفية عند التمرير */
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4); /* تعزيز الظل عند التمرير */
  transform: scale(1.05); /* تكبير بسيط عند التمرير */
}

/* فوتر */
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #1a1a1a; /* لون خلفية الفوتر */
  border-top: 2px solid #fff; /* إضافة خط فوق الفوتر */
  z-index: 1000;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.bottom-nav a {
  color: #888;
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s;
}

.bottom-nav a i {
  font-size: 1.5rem; /* حجم الأيقونة */
  margin-bottom: 5px;
}

.bottom-nav a:hover {
  color: #fff; /* لون النص عند التمرير */
}

.bottom-nav a.active {
  color: #fff; /* لون النص عند التفعيل */
}

.end-image {
  width: 150px; /* حجم الصورة */
  height: auto;
  margin-bottom: 20px; /* مسافة أسفل الصورة */
}

.icon {
  width: 30px; /* حجم الأيقونة */
  height: auto;
  margin-right: 10px; /* مسافة بين الأيقونة والنص */
  vertical-align: middle; /* محاذاة وسط الأيقونة مع النص */
}

.line-text {
  font-size: 1.4rem;
  margin-left: 5px; /* مسافة بين النص ورقم النتيجة */
}

.stats-line {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  font-weight: bold;
  text-shadow: 0 0 3px #fff, 0 0 6px #fff;
}

/* تصميم رسالة النجاح */
.success-message {
  position: fixed;
  bottom: 20px; /* تظهر في أسفل الشاشة */
  left: 50%; /* تظهر في وسط الصفحة أفقيًا */
  transform: translateX(-50%);
  background-color: #28a745; /* لون الخلفية أخضر */
  color: #fff; /* لون النص أبيض */
  font-size: 16px; /* حجم الخط */
  font-weight: bold; /* الخط غامق */
  padding: 10px 20px; /* مساحة داخلية */
  border-radius: 10px; /* الحواف مقوسة */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* ظل خفيف */
  z-index: 1000; /* ضمان ظهورها فوق العناصر الأخرى */
  opacity: 0.9; /* شفافية خفيفة */
  pointer-events: none; /* لا يمكن التفاعل معها */
}
