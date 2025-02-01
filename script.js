document.addEventListener("DOMContentLoaded", async function () {
    const button = document.getElementById("connect-wallet");
    const walletAddressText = document.getElementById("wallet-address");

    // تحميل مكتبة TON Connect
    const TonConnect = window["@tonconnect/sdk"].TonConnect;
    const tonConnect = new TonConnect();

    button.addEventListener("click", async () => {
        try {
            // عرض نافذة اختيار المحفظة
            const wallet = await tonConnect.connectWallet();
            console.log("محفظة متصلة:", wallet);
            
            // عرض عنوان المحفظة على الصفحة
            walletAddressText.textContent = "العنوان: " + wallet.account.address;
        } catch (error) {
            console.error("فشل الاتصال:", error);
            walletAddressText.textContent = "فشل الاتصال بالمحفظة!";
        }
    });
});
