




function updateText() {
    const myText = document.getElementById("myText");

    var front_rep = ``;
    var text = ``;
    var after_rep = ``;
    var pr = ``;
    var target_post = ``;

    front_rep = `@___I______7____`;

    let t = `${front_rep}${text}${after_rep}${pr}${target_post}`;

    //加工

    myText.value = t;
}

function initialize()
{
    {
        const pt = document.getElementById("purary_text");
        pt.value = '移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAaGDs';
    }

}


initialize();

const checkbox = document.getElementById("purary");

checkbox.addEventListener('change', function () {
    if (this.checked) {
        //const myText = document.getElementById("myText");
        //myText.value = TEMPLATE;
        updateText();
    } else {
        const myText = document.getElementById("myText");
        myText.value = "";
    }
});