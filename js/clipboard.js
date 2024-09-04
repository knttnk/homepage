function copyMail() {
    // スクレイピングに引っかからないよう難読化のつもり
    const d = "eom" + "." + "mech" + "." + "eng" + "." + "osak" + "a-" + "u." + "ac" + "." + "j" + "p";
    const name = "kenta";
    navigator.clipboard.writeText(
        name + "." + "tanaka" + "@" + d
    );
}

function copyAddress(lang) {
    if (lang === "ja") {
        let address1 = "〒565-0871";
        let address2 = "大阪府吹田市山田丘２−１ M4棟 505号室";
        navigator.clipboard.writeText(
            `${address1} ${address2}`
        );
    } else {
        let address1 = "#505 M4 2-1 Yamadaoka,";
        let address2 = "Suita, Osaka 565-0871, Japan";
        navigator.clipboard.writeText(
            `${address1} ${address2}`
        );
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
