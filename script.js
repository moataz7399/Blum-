document.addEventListener("DOMContentLoaded", async () => {
    const connectButton = document.getElementById("connectButton");
    const walletStatus = document.getElementById("walletStatus");

    const tonConnect = new TonConnect();

    connectButton.addEventListener("click", async () => {
        try {
            const result = await tonConnect.connect();
            if (result) {
                walletStatus.innerText = "✅ متصل بالمحفظة!";
            } else {
                walletStatus.innerText = "❌ فشل الاتصال.";
            }
        } catch (error) {
            console.error("خطأ أثناء الربط:", error);
            walletStatus.innerText = "⚠️ حدث خطأ أثناء الاتصال.";
        }
    });
});
