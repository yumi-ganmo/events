function showRestTime() {
    const now = new Date();
    const goal = new Date(2026, 3, 21);
  
    const restMillisecond = goal.getTime() - now.getTime();
    const day = Math.floor(restMillisecond / 1000 / 60 / 60 / 24);
    const hour = Math.floor(restMillisecond / 1000 / 60 / 60) % 24;
    const minute = Math.floor(restMillisecond / 1000 / 60) % 60;
    const second = Math.floor(restMillisecond / 1000) % 60;
  
    document.getElementById('day').textContent = day;
    document.getElementById('hour').textContent = hour;
    document.getElementById('minute').textContent = String(minute).padStart(2, '0');
    document.getElementById('second').textContent = String(second).padStart(2, '0');
}
setInterval(showRestTime, 1000);

// DOM（ページ）が読み込まれたら実行
window.addEventListener("DOMContentLoaded", function() {

    // コンストラクタ
    const kageIconeElement = document.getElementById("kage-icon"); // ボタン属性が付与される要素
    const richiIconeElement = document.getElementById("richi-icon"); // ボタン属性が付与される要素
    const katouIconeElement = document.getElementById("katou-icon"); // ボタン属性が付与される要素
    const muraIconeElement = document.getElementById("mura-icon"); // ボタン属性が付与される要素
    const zukanElement = document.getElementById("zukan"); // 図鑑が代入される親要素
    const kageZukan = "<div class=\"text-center  back-white slide-wrap\">\
                            <img src=\"../../image/kagesawa_01.png\" alt=\"カゲニキ1\" class=\"zukan\">\
                       </div>\
                       <div>\
                            <p>タイプ</p>\
                            <p>紹介文</p>\
                            <p>攻撃</p>\
                            <p>防御</p>\
                            <p>特攻</p>\
                       </div>";
    const richiZukan = "<div class=\"text-center  back-white slide-wrap\">\
                            <img src=\"../../image/richi_01.png\" alt=\"リチさん\" class=\"zukan\">\
                        </div>\
                        <div>\
                            <p>タイプ</p>\
                            <p>紹介文</p>\
                            <p>攻撃</p>\
                            <p>防御</p>\
                            <p>特攻</p>\
                        </div>";
    const katouZukan = "<div class=\"text-center  back-white slide-wrap\">\
                            <img src=\"../../image/katou_01.png\" alt=\"かとう\" class=\"zukan\">\
                        </div>\
                        <div>\
                            <p>タイプ</p>\
                            <p>紹介文</p>\
                            <p>攻撃</p>\
                            <p>防御</p>\
                            <p>特攻</p>\
                        </div>";
    const muraZukan = "<div class=\"text-center  back-white slide-wrap\">\
                            <img src=\"../../image/muramatu_01.png\" alt=\"むらまつ\" class=\"zukan\">\
                       </div>\
                       <div>\
                            <p>タイプ</p>\
                            <p>紹介文</p>\
                            <p>攻撃</p>\
                            <p>防御</p>\
                            <p>特攻</p>\
                       </div>";

    // 図鑑の初期値を設定
    kageIconeElement.classList.add("line_icon", "button");
    zukanElement.innerHTML = kageZukan;
    

    // カゲニキアイコンが押されたら実行
    document.getElementById('kage-icon').addEventListener('click', function() {
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.add("line_icon", "button");
        richiIconeElement.classList.remove("line_icon", "button");
        katouIconeElement.classList.remove("line_icon", "button");
        muraIconeElement.classList.remove("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = kageZukan;
    });
    // リチさんアイコンが押されたら実行
    document.getElementById('richi-icon').addEventListener('click', function() {
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.remove("line_icon", "button");
        richiIconeElement.classList.add("line_icon", "button");
        katouIconeElement.classList.remove("line_icon", "button");
        muraIconeElement.classList.remove("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = richiZukan;
        
    });
    // かとうアイコンが押されたら実行
    document.getElementById('katou-icon').addEventListener('click', function() {
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.remove("line_icon", "button");
        richiIconeElement.classList.remove("line_icon", "button");
        katouIconeElement.classList.add("line_icon", "button");
        muraIconeElement.classList.remove("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = katouZukan;
        
    });
    // むらまつアイコンが押されたら実行
    document.getElementById('mura-icon').addEventListener('click', function() {
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.remove("line_icon", "button");
        richiIconeElement.classList.remove("line_icon", "button");
        katouIconeElement.classList.remove("line_icon", "button");
        muraIconeElement.classList.add("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = muraZukan;
        
    });

});