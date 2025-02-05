document.addEventListener('DOMContentLoaded', function() {
  const adContainer = document.getElementById('ad-container');
  const apiKey = '5edd319545c77dc2a3a4b0345a572d2b9d86c0f3ae166d7c19ce463ec7ad03c3';

  const script = document.createElement('script');
  script.src = `https://richads.com/api.js?api_key=${apiKey}`;
  script.onload = function() {
    if (window.RichAds) {
      const ad = window.RichAds.createAd({
        container: adContainer,
        adType: 'banner', // يمكنك تغيير نوع الإعلان هنا
        adSize: '300x250', // يمكنك تغيير حجم الإعلان هنا
      });
      ad.load();
    }
  };
  document.body.appendChild(script);
});
