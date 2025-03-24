


class SpamShotgunData {

    #result_text = "";//the resulting string

    #front_rep;//top target reply
    #inner_text;//spam message
    #after_rep; //after target reply
    #pr; //append end [PR] serial
    #imageUrl; //append image url
    #targetPost;// repost attack target post

    Initialized() {
        //todo:use later
    }


    updateText() {
        this.front_rep = `@___I______7____`;

        this.result_text = `
        ${this.front_rep}
        ${this.inner_text}
        ${this.after_rep}
        ${this.pr}
        ${this.target_post}`;
    }

    getText() {
        return this.result_text
    }

}




let targetMap = new Map();
targetMap.set("凍結済誰か", { id: "a", });
targetMap.set("公カス", { id: "____I_____5____" });
targetMap.set("ホック", { id: "gomi_dummy" });

var html = `

        `;

targetMap.forEach((item, key) => {
    html +=
        `
                <label for="${item['id']}">${key}</label>
                <input type="checkbox" id="${item['id']}" value="false">
            `;
});

this.result_html =
    `
            ${html}
        `;

const d = document.getElementById("target_list");
d.innerHTML = html;
//入力対応
d.addEventListener("click", function (event) {

    targetMap.forEach((item, key) => {
        if (event.target.classList.contains(`${item['id']}`)) {
            alert(`${item['id']}がクリックされました`);
        }
    });

});



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
