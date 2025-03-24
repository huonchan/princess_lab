
class SpamShotgunData
{

    #result_text = "";//the resulting string

    #front_rep ;//top target reply
    #inner_text ;//spam message
    #after_rep ; //after target reply
    #pr ; //append end [PR] serial
    #imageUrl ; //append image url
    #targetPost ;// repost attack target post

    Initialized()
    {
        //todo:use later
    }


    updateText()
    {
        this.front_rep = `@___I______7____`;
    
        this.result_text = `
        ${this.front_rep}
        ${this.inner_text}
        ${this.after_rep}
        ${this.pr}
        ${this.target_post}`;
    }

    getText()
    {
        return this.result_text
    }
    
}


class TargetSelectorCreator
{

}


class SpamMessageCreator
{

    #messageMap = new Map();

    #result_html = "";//the resulting string

    Initialized()
    {
        this.messageMap.set("tiktoklite", "vaPR TikTok Liteにログインをして、お友達と一緒に報酬をGETしよう！https://t.co/olwycUERySlue1");
        this.messageMap.set("praly", "移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAa8NU");
    }

    updateText()
    {
        var html = ``;

        this.messageMap.array.forEach((value,key) => {
            html += `${key} <br>`;
        });

        this.result_html = 
        `
            ${html}
        `;
    }

}


function addEventListener() {
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
    });
}



function initialize() {
    {
        const pt = document.getElementById("purary_text");
        pt.value = '移動するだけのかんたんポイ活 #プラリー やってみない？5,000スコアもらえる招待コード【 BBSIXJ 】でお得に始めよう🎁アプリをインストールして受け取ってね！https://t.co/B6bMUAaGDs';
    }

}


initialize();
addEventListener();

