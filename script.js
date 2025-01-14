// Ensure the Telegram WebApp API is loaded
window.onload = function () {
    if (window.Telegram.WebApp) {
        const initData = Telegram.WebApp.initDataUnsafe;

        // Get the "startapp" parameter from the URL
        const startAppID = initData.start_param;

        // Display the passed "startapp" ID in the page
        if (startAppID) {
            document.getElementById("startapp-id").textContent = startAppID;
        } else {
            document.getElementById("startapp-id").textContent = "No ID provided in URL.";
        }

        // Display current user information
        const user = initData.user;

        if (user) {
            document.getElementById("user-id").textContent = user.id || "Not available";
            document.getElementById("user-first-name").textContent = user.first_name || "Not available";
            document.getElementById("user-last-name").textContent = user.last_name || "Not available";
            document.getElementById("user-username").textContent = user.username || "Not available";
        } else {
            alert("User information is not available!");
        }
    } else {
        alert("Telegram WebApp API is not available!");
    }
};
