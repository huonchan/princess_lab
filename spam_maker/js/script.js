

class TargetSelector {
    static #targetMap  = new Map();;

    #result_html = "";//the resulting string

    Initialized() {
        //TargetSelector.#targetMap = new Map();
        TargetSelector.#targetMap.set("凍結済誰か", { id: "a", flag:false });
        TargetSelector.#targetMap.set("公カス", { id: "____I_____5____" ,flag:false});
        TargetSelector.#targetMap.set("ホック", { id: "gomi_dummy" ,flag:false});

    }

    updateText() {
        var html = `

        `;

        TargetSelector.#targetMap.forEach((item, key) => {
            html +=
                `
                <label for="${item['id']}">${key}</label>
                <input type="checkbox" id="${item['id']}" class="${item['id']}" value="${key}">
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


    static getTarget()
    {
        var r ="";
        TargetSelector.#targetMap.forEach((item,key) => {
            if( item['flag'] === true )
            {
                r +=`@${item['id']}\n\r`;
            }
        });

        return r;
    }


    static attachEventListener() {
        //入力対応
        const container = document.getElementById("target_list");
        
        TargetSelector.#targetMap.forEach((item, key) => {
            container.addEventListener("change", function (event) {
                if (event.target.classList.contains(`${item['id']}`)) {
                    console.log(event.target.value + "が" + (event.target.checked ? "チェックされました" : "チェックが外されました"));
                    
                    item['flag'] = event.target.checked;
                    //alert(`${item['id']}がクリックされました`);

                    const dbg =  document.getElementById("debug_log");
                    dbg.textContent = TargetSelector.getTarget();
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

/*

class SpamMessage {

    #messageMap = new Map();

    #result_html = "";//the resulting string

    Initialized() {
        this.messageMap = new Map();

        this.messageMap.set("TikTokLite", { id: "TikTokLite", message: "PR TikTok Liteにログインをして、お友達と一緒に報酬をGETしよう！https://t.co/olwycUERySlue1" });
        this.messageMap.set("プラリー", { id: "プラリー", message: "移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAa8NU" });

    }

    updateText() {
        var html = `

        `;

        this.messageMap.forEach((item, key) => {
            html += `
            <div>
                <input type="checkbox" id="${item['id']}" value="false">
                <label for="${item['id']}">${key}</label>
                <textarea type="text" id="${item['id']}_message" cols="50" rows="3">${item['message']}</textarea>
            </div>
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


    addEventListner() {
        

    }

}

**/

//
{
    let t = new TargetSelector();
    t.Initialized();
    t.updateText();

    const d = document.getElementById("target_list");
    d.innerHTML = t.getHtml();

    const dbg =  document.getElementById("debug_log");
    dbg.textContent =  t.getHtml();

    TargetSelector.attachEventListener();
}
//
{
    /*shine = new SpamMessage();
    shine.Initialized();
    shine.updateText();

    const d = document.getElementById("insert_text_list");
    d.innerHTML = shine.getHtml();*/
}





/*
const add_pr = document.getElementById("add_pr");
checkbox.addEventListener('change', function () {
    if (this.checked) {
        //const myText = document.getElementById("myText");
        //myText.value = TEMPLATE;
        updateText();
    } else {
        const myText = document.getElementById("myText");
        myText.value = "";
    }
});*/



