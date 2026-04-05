function copyMail() {
    // スクレイピングに引っかからないよう難読化のつもり
    const d = "gmail.com";
    const name = "kenta";
    navigator.clipboard.writeText(name + "." + "tanaka" + "." + "j" + "@" + d);
}

function copyAddress(lang) {
    if (lang === "ja") {
        const address1 = "〒671-2280";
        const address2 = "兵庫県姫路市書写2167";
        navigator.clipboard.writeText(`${address1} ${address2}`);
    } else {
        const address1 = "2167 Shosha,";
        const address2 = "Himeji, Hyogo 671-2280 Japan";
        navigator.clipboard.writeText(`${address1} ${address2}`);
    }
}

function copyPhone(lang) {
    if (lang === "ja") {
        let phone = "06-6879-7267";
        navigator.clipboard.writeText(phone);
    } else {
        let phone = "+81-6-6879-7267";
        navigator.clipboard.writeText(phone);
    }
}
