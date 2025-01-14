// Ensure the Telegram WebApp API is loaded
window.onload = function () {
    let points = 0;

    // Get the "startapp" parameter from the URL
    if (window.Telegram.WebApp) {
        const initData = Telegram.WebApp.initDataUnsafe;
        const startAppID = initData.start_param;

        // Check if the startapp parameter exists and add 1000 points
        if (startAppID) {
            points += 1000;
            updatePoints();
        }
    } else {
        alert("Telegram WebApp API is not available!");
    }

    // Add event listener to the button
    const addPointsBtn = document.getElementById("add-points-btn");
    addPointsBtn.addEventListener("click", () => {
        points += 10;
        updatePoints();
    });

    // Function to update points on the page
    function updatePoints() {
        document.getElementById("points").textContent = points;
    }
};
