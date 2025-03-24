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
    static pick_index ;
    static pick_array ;
    static block_datas = [[]];

    constructor() {
        this.pick_index = -1;
        this.pick_array = [];
    }

    Initialized() 
    {

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

    onTap( select_idx )
    {
        this.pick_index = select_idx ;
        for(let i = 0 ; i < this.block_datas[select_idx].length ; i++ )
        {
            this.pick_array.push(this.block_datas[select_idx][i]);
            //this.pick_array.push(1);
            this.block_datas[select_idx][i]= 0;
        }
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

        //試験管上部描画
        if( game_data.pick_index == test_tube_num )//ピックアップ中
        {
            html += `<div class="space">`;
            for (let i = 0; i < BLOCK_MAX; i++) {
                if( i < game_data.pick_array.length )
                {
                    html += `<div class="${COLORS[game_data.pick_array[i]]}">█<br></div>`;
                    //html += `<div class="blue">█<br></div>`;
                }else
                {
                    html += `<div class="hidden">█<br></div>`;
                }
            }
            html += `</div>`;
        }else
        {
            html += `<div class="space">
            <div class="hidden">█<br></div>
            <div class="hidden">█<br></div>
            <div class="hidden">█<br></div>
            <div class="hidden">█<br></div>
            </div>
            `
        }
        
        //試験管内部描画
        html += `<div class="unit unit${test_tube_num}">
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


UpdateScreen();

//入力対応
const container = document.getElementById("game_screen");

let MAX_INDEX = game_data.block_datas.length;
for (let i = 0; i < MAX_INDEX; i++) {
    container.addEventListener("click", function (event) {
        if (event.target.classList.contains(`unit${i}`)) {
            //alert(`${i}がクリックされました`);
            let SELECT_IDX = i;

            game_data.onTap(SELECT_IDX);

            UpdateScreen();

        }
    });
}

