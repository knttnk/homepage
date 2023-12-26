function copyMail() {
    // スクレイピングに引っかからないよう難読化のつもり
    const d = "eom" + "." + "mech" + "." + "eng" + "." + "osak" + "a-" + "u." + "ac" + "." + "j" + "p";
    const name = "kenta";
    navigator.clipboard.writeText(
        name + "." + "tanaka" + "@" + d
    );
}

function copyAddress() {
    let address1 = i18next.t('contact.address1');
    let address2 = i18next.t('contact.address2');
    navigator.clipboard.writeText(
        `${address1} ${address2}`
    );
}

function copyPhone() {
    let phone = i18next.t('contact.phone1');
    navigator.clipboard.writeText(phone);
}
