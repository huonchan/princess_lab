
const BOOT_LINK_DEFAULT =new Map();
BOOT_LINK_DEFAULT.set("第1サティアン","file:///C:/Users/h/%E3%83%9E%E3%82%A4%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB/web-dev/satyam/index.htm?search=#");
BOOT_LINK_DEFAULT.set("gemini", "https://gemini.google.com/app");
BOOT_LINK_DEFAULT.set("Youtube", "https://www.youtube.com/");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.getElementById('boot_all').onclick = async function () {
    //const isConfirmed = confirm("先にログイン確認用リンクでログイン状態確認とログイン処理しろ\n楽天くじ１５タブぐらい、マジで開くぞ？ｗ\nほんまにええんか？ｗ\nめんどくせー事になってもワイは知らんぞ？ｗ");
    const isConfirmed = true ;
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
    html += `<a href="${value}" target="_blank">${key}</a><br>`
}


const links = document.getElementById("links");
links.innerHTML = html;
