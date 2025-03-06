function navigate(event, page) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    history.pushState({ page }, "", "/" + page); // تغيير الرابط في المتصفح
    loadPage(page); // تحميل المحتوى المناسب
}

function loadPage(page) {
    const content = document.getElementById("content");
    const pages = {
        home: "مرحبًا بك في الصفحة الرئيسية!",
        support: "هذه صفحة الدعم الفني، كيف يمكننا مساعدتك؟",
        about: "من نحن؟ نحن شركة متخصصة في تطوير الويب!"
    };
    content.innerHTML = pages[page] || "الصفحة غير موجودة!";
}

// التعامل مع الرجوع والتقديم في المتصفح
window.onpopstate = function(event) {
    loadPage(event.state ? event.state.page : "home");
};

// تحميل الصفحة الصحيحة عند فتح الموقع مباشرة
const path = window.location.pathname.replace("/", "");
loadPage(path || "home");
