
const BOOT_LINK_DEFAULT =new Map();
BOOT_LINK_DEFAULT.set("gemini", "https://gemini.google.com/app");
BOOT_LINK_DEFAULT.set("Youtube", "https://www.youtube.com/");
BOOT_LINK_DEFAULT.set("Music", "https://music.youtube.com/");
BOOT_LINK_DEFAULT.set("おひメモ", "https://scrapbox.io/princess-memo/%E3%81%8A%E3%81%B2%E3%83%A1%E3%83%A2");
BOOT_LINK_DEFAULT.set("メモ帳", "https://scrapbox.io/princess-memo/%E3%83%A1%E3%83%A2%E5%B8%B3");
BOOT_LINK_DEFAULT.set("第1サティアン","file:///C:/Users/h/%E3%83%9E%E3%82%A4%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB/web-dev/satyam/index.htm");
BOOT_LINK_DEFAULT.set("第7サティアン","file:///C:/Users/h/%E3%83%9E%E3%82%A4%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB/web-dev/alchemy/point-life/1/index.html");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.getElementById('boot_all').onclick = async function () {
    const isConfirmed = confirm("4つぐらい開くよ");
    //const isConfirmed = true ;
    if (isConfirmed) {

        for (const [key, value] of BOOT_LINK_DEFAULT) {
            window.open(value, key);
            await sleep(500);
        }


    } else {
        // キャンセルされた場合の処理（必要であれば）
        alert("キャンセルされました。");
    }
    return false;
}

var html = ``;

for (const [key, value] of BOOT_LINK_DEFAULT) {
    html += `<a href="${value}" target="_blank">${key}</a> / `
}


const links = document.getElementById("links");
links.innerHTML = html;
