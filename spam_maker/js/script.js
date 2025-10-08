/*function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '">' + url + '</a>';
    });
  }*/

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s<]+[^\s<.,:;"')\]>])/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
}

function countCharacters(text) {
    let count = 0;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);

    if (urls) {
        count += urls.length * 12;
        text = text.replace(urlRegex, ""); // URLを除外
    }

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if ((charCode >= 0x00 && charCode < 0x81) ||
            (charCode === 0xf0) ||
            (charCode >= 0xff61 && charCode <= 0xffdc) ||
            (charCode >= 0xffe8 && charCode <= 0xffee)) {
            count += 1; // 半角文字
        } else {
            count += 1; // 全角文字
        }
    }
    return count;
}


class SpamShotgunData {

    #result_text = "";//the resulting string

    front_rep = "";//top target reply
    inner_text = "";//spam message
    after_rep = ""; //after target reply
    pr = ""; //append end [PR] serial
    imageUrl = ""; //append image url
    target_post = "";// repost attack target post

    Initialized() {
        //todo:use later
    }


    updateText() {
        this.#result_text =
            `${this.front_rep}

${this.inner_text}
${this.after_rep}

${this.pr}

${this.target_post}

${this.imageUrl}
`;
    }

    getText() {
        return this.#result_text;
    }

}

let data = new SpamShotgunData();


function messageUpdate() {

    data.front_rep = targetSelector.getTarget();
    data.inner_text = spamMessage.getMessage();


    data.updateText();
    const spam_text = document.getElementById("spam_text");
    spam_text.innerHTML = data.getText();

    //文字数も更新
    const char_count = document.getElementById("char_count");
    char_count.textContent = `文字数:${countCharacters(data.getText())}`;

    //console.log("UpdateMessage :" + data.getText());
    //ツイートリンクにも反映

    const tweet = document.getElementById("tweet");
    tweet.innerHTML = `<a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(data.getText())}" target="_blank">攻撃開始</a>`;


}



class TargetSelector {
    #targetMap = new Map();

    #result_html = "";//the resulting string

    Initialized() {
        //TargetSelector.#targetMap = new Map();
        this.#targetMap.set("凍結済誰か", { id: "a", flag: false });
        this.#targetMap.set("公カス", { id: "____I_____5____", flag: false });
        this.#targetMap.set("ホック", { id: "gomi_dummy", flag: false });
        this.#targetMap.set("Eカス", { id: "elonmusk", flag: true });
        this.#targetMap.set("Xカス公式", { id: "x", flag: false });

    }

    updateText() {
        var html = `

        `;

        this.#targetMap.forEach((item, key) => {
            let checked = item['flag'] == true ? 'checked' : '';
            html +=
                `
                <label for="${item['id']}">${key}</label>
                <input type="checkbox" id="${item['id']}" class="${item['id']}" value="${key}" ${checked}>
            `;
        });

        this.result_html =
            `
            ${html}
        `;
    }

    getHtml() {
        return this.result_html;
    }


    getTarget() {
        var r = "";
        this.#targetMap.forEach((item, key) => {
            if (item['flag'] === true) {
                r += `@${item['id']} `;
            }
        });
        //console.log(`TargetList getTarget ${r}`);
        return r;
    }


    attachEventListener() {
        //入力対応
        const container = document.getElementById("target_list");

        this.#targetMap.forEach((item, key) => {
            container.addEventListener("change", function (event) {
                if (event.target.classList.contains(`${item['id']}`)) {
                    console.log(event.target.value + "が" + (event.target.checked ? "チェックされました" : "チェックが外されました"));

                    item['flag'] = event.target.checked;
                    //alert(`${item['id']}がクリックされました`);

                    data.updateText();

                    messageUpdate();

                }
            });
        });

        /*const container = document.getElementById("target_list");
        container.addEventListener("change", function(event) {
            if (event.target.classList.contains("gomi_dummy")) {
              console.log(event.target.value + "が" + (event.target.checked ? "チェックされました" : "チェックが外されました"));
              // ここにチェックボックスの状態が変更されたときの処理を記述します
            }
          });*/
    }
}

let targetSelector = new TargetSelector();

class SpamMessage {

    #messageMap = new Map();

    #result_html = "";//the resulting string

    #selectKey = "";

    Initialized() {
        this.messageMap = new Map();

        this.messageMap.set("初期", {
            id: "Init", checked: 'checked',
            message: "人の嫌がる事を進んでやります🤓 あひゃひゃひゃテスト#$8!"
        });
        this.messageMap.set("TikTokLite",
            {
                id: "TikTokLite", checked: '',
                message: "TikTok Liteにログインをして、お友達と一緒に報酬をGETしよう！https://t.co/olwycUERyS"
            });

        this.messageMap.set("プラリー", {
            id: "Plary", checked: '',
            //message: "移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAa8NU"
            message: "移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAa8NU"
        });
        this.messageMap.set("マクロミル", {
            id: "Macromill", checked: '',
            message: "https://monitor.macromill.com/campaign/newcomer.html?entry_kbn=1862&int_id=Z44176446A スキマ時間でアンケートに答えてお小遣い稼ぎしませんか？コチラのURLから登録してアンケートに答えればボーナスポイントがもらえちゃう。マクロミルならアンケートの数が多くてポイントが貯まりやすい！"
        });

        this.messageMap.set("タウンWifi", {
            id: "TownWifi", checked: '',
            message: "ポイントが貯まるフリーWiFi自動接続アプリ #タウンWiFi で通信をお得に！貯めたポイントはギガや各種ポイントに交換できる！さっそく招待コード【3xPzw9AD】を使って5,000ptもらおう！https://townwifi.go.link/?adj_t=16d4kvc8"
        });

        this.messageMap.set("キューモニター", {
            id: "QueMonitor", checked: '',
            message: "簡単アンケート回答でポイントもGET！キューモニターになって、社会や企業に声を届けよう！コチラのURLから登録していただくと、ボーナスポイントプレゼント★ https://www.cue-monitor.jp/entry/pre_agree.html?mc=4136a014dabfb0ab22affc81545abd8e04435bed&sc=170848&kr=27"
        });

        this.messageMap.set("トリマ", {
            id: "TripMail", checked: '',
            //message: "移動するだけでマイルが貯まる　#トリマ　ってもう始めてる？まだ始めてないなら、招待コード【wtpsyRKxP】登録で5,000マイルもらえるよ！　https://mapfan.to/trip-mile"
            message: "移動するだけでマイルが貯まる　#トリマ　ってもう始めてる？招待コード【wtpsyRKxP】登録で5,000マイルもらえるよ！https://mapfan.to/trip-mile"
        });

        this.messageMap.set("サイバーパネル", {
            id: "CyberPanel", checked: '',
            message: "サイバーパネルでポイントをためて、あなたの声で社会を変えよう！ https://www.cyberpanel.jp/regist/index/c667cd87c520f70/03"
        });


        this.messageMap.set("Powl", {
            id: "Powl", checked: '',
            message: "ポイ活アプリなら【Powl】会員数600万人突破！貯まったポイントを好きなギフトに交換して日々の暮らしをもっとおトクに♪URLから「かんたん無料登録」でポイントをゲットしよう★招待コード：T86CSQ5XO33 https://app.adjust.com/1b25yopr_1b66s546"
        });


        this.messageMap.set("MoneyWalk", {
            id: "MonelWalk", checked: '',
            message: "[MoneyWalk]一日200ポイント、最も稼げるポイ活アプリ　貯まったポイントはAmazon、Rakutenなど様々な商品券に交換できます。友達から受け取ったリンクで始めると、2週間ポイントが2倍になります！https://gravitylabs.onelink.me/czwV/huy5pwcn?deep_link_sub1=65b5d2d4c43c0ef8b78e7993&deep_link_sub4=テコンダｰ朴&deep_link_value=step-booster-invitation-new"
        });

        this.messageMap.set("dummy", {
            id: "dmt", checked: '',
            message: ""
        });

    }

    updateText() {
        var html = `
            <form>
        `;

        this.messageMap.forEach((item, key) => {

            if (item['checked'] !== '') {
                this.selectKey = key;
            }

            html += `
            <div>
                <input type="radio" class = "spam_message_radio_button" , id="${item['id']}" name="options" value="${key}" ${item['checked']}>
                <label for="${item['id']}">${key}</label>
                <div>${linkify(item['message'])}</div>
            </div>
            `;
        });


        this.result_html =
            `
            ${html}

            </form>
        `;
    }

    getHtml() {
        return this.result_html;
    }

    getMessage() {
        if (this.messageMap.has(this.selectKey)) {
            return this.messageMap.get(this.selectKey)['message'];
        }

        return 'none';

    }

    setSelectKey(s) {
        this.selectKey = s;
    }


    attachEventListener() {

        const container = document.getElementById("spam_message_list");

        container.addEventListener("change", function (event) {
            //if (event.target.classList.contains(`${item['id']}`)) {
            if (event.target.classList.contains(`spam_message_radio_button`)) {
                if (event.target.checked) {
                    //console.log(event.target.value + "が選択されました");

                    spamMessage.setSelectKey(event.target.value);

                    data.updateText();
                    messageUpdate();
                }
            }
        });

    }

}

let spamMessage = new SpamMessage();

data.Initialized();
//
{



    targetSelector.Initialized();
    targetSelector.updateText();

    const d = document.getElementById("target_list");
    d.innerHTML = targetSelector.getHtml();

    //const dbg =  document.getElementById("debug_log");
    //dbg.textContent =  t.getHtml();

    targetSelector.attachEventListener();
}
//
{
    spamMessage.Initialized();
    spamMessage.updateText();

    const d = document.getElementById("spam_message_list");
    d.innerHTML = spamMessage.getHtml();

    spamMessage.attachEventListener();
}


//
{
    const image_url = document.getElementById("image_url");
    data.imageUrl = image_url.value;

    const attack_rp = document.getElementById("attack_rp");
    data.target_post = attack_rp.value;

    const add_pr = document.getElementById("add_pr");
    if (add_pr.checked) {
        data.pr = "PR";
    } else {
        data.pr = "";
    }

    data.updateText();
}

const attack_rp = document.getElementById("attack_rp");
attack_rp.addEventListener("input", function () {

    const attack_rp = document.getElementById("attack_rp");
    data.target_post = attack_rp.value;

    data.updateText();
    messageUpdate();


});



const add_pr = document.getElementById("add_pr");
add_pr.addEventListener('change', function () {
    if (this.checked) {
        data.pr = "PR";
    } else {
        data.pr = "";
    }
    data.updateText();
    messageUpdate();
});


data.updateText();
messageUpdate();
