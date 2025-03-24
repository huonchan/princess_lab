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

    //console.log("UpdateMessage :" + data.getText());
    //ツイートリンクにも反映

    const tweet = document.getElementById("tweet");
    tweet.innerHTML = `<a href="https://twitter.com/intent/tweet?text=${encodeURI(data.getText())}" target="_blank">攻撃開始</a>`;
}



class TargetSelector {
    #targetMap = new Map();

    #result_html = "";//the resulting string

    Initialized() {
        //TargetSelector.#targetMap = new Map();
        this.#targetMap.set("凍結済誰か", { id: "a", flag: false });
        this.#targetMap.set("公カス", { id: "____I_____5____", flag: true });
        this.#targetMap.set("ホック", { id: "gomi_dummy", flag: false });

    }

    updateText() {
        var html = `

        `;

        this.#targetMap.forEach((item, key) => {
            let checked = item['flag'] == true ? 'checked' : '' ;
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

    #selectKey ="";

    Initialized() {
        this.messageMap = new Map();

        this.messageMap.set("初期", {
            id: "Init", checked : 'checked'　, message: "人の嫌がる事を進んでやります🤓" });
        this.messageMap.set("TikTokLite",
             { id: "TikTokLite", checked:'', message: "TikTok Liteにログインをして、お友達と一緒に報酬をGETしよう！https://t.co/olwycUERyS" });
        this.messageMap.set("プラリー", {
             id: "Plary", checked:'', message: "移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAa8NU" });

    }

    updateText() {
        var html = `
            <form>
        `;

        this.messageMap.forEach((item, key) => {

            if( item['checked'] !== '' )
            {
                this.selectKey = key ;
            }

            html += `
            <div>
                <input type="radio" class = "spam_message_radio_button" , id="${item['id']}" name="options" value="${key}" ${item['checked']}>
                <label for="${item['id']}">${key}</label>
                <div>${item['message']}</div>
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

    getMessage()
    {
        if ( this.messageMap.has(this.selectKey) )
        {
            return this.messageMap.get(this.selectKey)['message'];
        }

        return 'none';
        
    }

    setSelectKey( s)
    {
        this.selectKey = s;
    }


    attachEventListener() {

        const container = document.getElementById("spam_message_list");

        container.addEventListener("change", function (event) {
            //if (event.target.classList.contains(`${item['id']}`)) {
            if (event.target.classList.contains(`spam_message_radio_button`)) {
                if (event.target.checked) {
                    //console.log(event.target.value + "が選択されました");

                    spamMessage.setSelectKey(event.target.value );

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
