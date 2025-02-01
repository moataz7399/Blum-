// استيراد TON Connect SDK
const { TonConnect } = window.tonconnect;

const tonConnect = new TonConnect();
const connectButton = document.getElementById("connect-wallet");

connectButton.addEventListener("click", async () => {
    try {
        const wallet = await tonConnect.connectWallet();
        alert("تم الاتصال بالمحفظة: " + wallet.address);
    } catch (error) {
        console.error("خطأ في الاتصال:", error);
    }
});
