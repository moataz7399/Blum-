function copyLink() {
         const userId = Telegram.WebApp.initDataUnsafe.user.id;
         const link = `https://t.me/FALCON_tapbot/FALCON?startapp=${userId}`;
         navigator.clipboard.writeText(link).then(() => {
             alert("تم نسخ الرابط بنجاح!");
         });
     }

     const urlParams = new URLSearchParams(window.location.search);
     const originalUserId = urlParams.get('startapp');
     const currentUserId = Telegram.WebApp.initDataUnsafe.user.id;

     if (originalUserId && currentUserId) {
         fetch('/track-user', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ originalUserId, currentUserId })
         });
     }

     fetch('/get-users')
         .then(response => response.json())
         .then(data => {
             const userList = document.getElementById('user-list');
             data.users.forEach(user => {
                 const li = document.createElement('li');
                 li.textContent = user.username;
                 userList.appendChild(li);
             });
         });
