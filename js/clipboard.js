function copyMail() {
    // スクレイピングに引っかからないよう難読化のつもり
    const d = "eom" + "." + "mech" + "." + "eng" + "." + "osak" + "a-" + "u." + "ac" + "." + "j" + "p";
    const name = "kenta";
    navigator.clipboard.writeText(
        name + "." + "tanaka" + "@" + d
    );
}

function copyAddress() {
    navigator.clipboard.writeText(
        "〒565-0871 大阪府吹田市山田丘２−１ M4棟 505号室"
    );
}


function copyPhone() {
    navigator.clipboard.writeText(
        "06-6879-7267"
    );
}
