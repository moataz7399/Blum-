import { TonConnectUI } from "@tonconnect/ui";

const tonConnectUI = new TonConnectUI({
    manifestUrl: "https://moataz7399.github.io/repository-name/tonconnect-manifest.json"
});

document.getElementById("connect-wallet").addEventListener("click", async () => {
    try {
        await tonConnectUI.modal.open();
        const wallet = tonConnectUI.wallet;
        if (wallet) {
            document.getElementById("wallet-info").innerText = `✅ تم الربط بمحفظة: ${wallet.account}`;
        }
    } catch (error) {
        console.error("❌ فشل الاتصال بالمحفظة", error);
    }
});
