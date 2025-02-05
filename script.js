// تهيئة RichAds باستخدام API Key
window.richads = {
  apiKey: '5edd319545c77dc2a3a4b0345a572d2b9d86c0f3ae166d7c19ce463ec7ad03c3',
  options: {
    format: 'rewarded', // نوع الإعلان (مكافأة)
    placement: 'center', // مكان ظهور الإعلان
  },
};

// تحميل SDK الخاص بـ RichAds
const script = document.createElement('script');
script.src = 'https://cdn.richads.com/sdk.js';
script.async = true;
document.head.appendChild(script);

// دالة لعرض الإعلان
function showAd() {
  const adContainer = document.getElementById('ad-container');

  // إظهار الحاوية
  adContainer.style.display = 'flex';

  // محاولة عرض الإعلان باستخدام RichAds
  if (window.richads && typeof window.richads.showAd === 'function') {
    window.richads.showAd({
      onSuccess: () => {
        adContainer.innerHTML = 'تم عرض الإعلان بنجاح!';
      },
      onError: (error) => {
        adContainer.innerHTML = `حدث خطأ: ${error.message}`;
      },
    });
  } else {
    adContainer.innerHTML = 'تعذر تحميل الإعلان. حاول مرة أخرى.';
  }
}

// إضافة حدث النقر على الزر
document.getElementById('show-ad-button').addEventListener('click', showAd);
