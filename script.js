// Ensure the Telegram WebApp API is loaded
window.onload = function () {
    if (window.Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;

        // Populate user information if available
        if (user) {
            document.getElementById("user-id").textContent = user.id || "Not available";
            document.getElementById("user-first-name").textContent = user.first_name || "Not available";
            document.getElementById("user-last-name").textContent = user.last_name || "Not available";
            document.getElementById("user-username").textContent = user.username || "Not available";

            // Set user photo if available
            if (user.photo_url) {
                document.getElementById("user-photo").src = user.photo_url;
            } else {
                document.getElementById("user-photo").alt = "No photo available";
            }
        } else {
            alert("User information is not available!");
        }
    } else {
        alert("Telegram WebApp API is not available!");
    }
};
