//定数

//描画処理

const HORIZONTAL_LINE = 4;//4
const VERTICAL_LINE = 2;//2
const BLOCK_MAX = 4;
const START_FREE_TEST_TUBE = 2;
const START_USE_TEST_TUBE = HORIZONTAL_LINE * VERTICAL_LINE - START_FREE_TEST_TUBE;

const COLORS = ["none", "blue", "red", "yellow", "green", "yellow_green", "palevioletred", "purple"];


function convertTo2DArrayFrom(array, length) {
    return Array.from({ length: Math.ceil(array.length / length) }, (_, i) =>
        array.slice(i * length, (i + 1) * length)
    );
}

//実データ

class GameData {
    static pick_index = 0;
    static pick_array = [];
    static block_datas = [[]];

    Initialized() {
        var arr = [];
        // 内部生成
        {
            for (let i = 0; i < START_USE_TEST_TUBE; i++) {
                for (let j = 0; j < BLOCK_MAX; j++) {
                    arr.push(i + 1);
                }
            }
        }
        // シャッフルアルゴリズム（Fisher-Yates shuffle）
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 要素の入れ替え
        }

        //空の試験管追加
        {
            for (let i = 0; i < BLOCK_MAX * START_FREE_TEST_TUBE; i++) {
                arr.push(0);
            }
        }

        //２次元配列加工
        this.block_datas = convertTo2DArrayFrom(arr, BLOCK_MAX);

    }

};

let game_data = new GameData();
game_data.Initialized();

function UpdateScreen() {


    var test_tube_num = 0;
    var html = ``;
    game_data.block_datas.forEach(row => {

        //html += `<div class="test_tube ${test_tube_num}">
        html += `<div class="test_tube">
                `;

        html += `<div class="space">
<div class="hidden">█<br></div>
<div class="hidden">█<br></div>
<div class="hidden">█<br></div>
<div class="hidden">█<br></div>
                </div>
                `

        html += `<div class="unit unit${0}">
                `
        row.forEach(element => {

            if (element === 0) {
                html += `<div class="hidden">█<br></div>
                    `;
            } else {
                html += `<div class="${COLORS[element]}">█<br></div>
                    `;
            }


        });


        html += `</div>
            </div>
            `;

        test_tube_num += 1;
    });


    const game_screen = document.getElementById("game_screen");
    game_screen.innerHTML = html;

    const debug_log = document.getElementById("debug_log");

    if (false) {
        debug_log.textContent = html;
    } else {
        var aa = "";

        aa += "OK、ブラクラゲット。<br>";
        aa += "　　　　　　　　　　∧＿∧<br>";
        aa += "　　　　 ∧＿∧ 　（´<_｀ ）　流石だよな俺ら。<br>";
        aa += "　　　（　´_ゝ`）/　　 ⌒i<br>";
        aa += "　　 ／　　　＼./ 　　|　|<br>";
        aa += "　　/　　 　/￣￣￣￣/　|<br>";
        aa += "＿_(__ﾆつ/　 FMV　 / .| .|＿＿＿＿<br>";
        aa += "　　　 ＼/＿＿＿＿/　（u　⊃<br>";
        debug_log.innerHTML = aa;
    }

}




//入力対応
UpdateScreen();
//


const container = document.getElementById("game_screen");

container.addEventListener("click", function(event) {
    if (event.target.classList.contains("unit0")) {
      alert(event.target + "がクリックされました！");
      // ここにクリックされたときの処理を記述します
    }
  });
