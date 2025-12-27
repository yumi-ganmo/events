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

// 図鑑のメーターを生成
function meterUpdate() {
    const meters = document.querySelectorAll(".meter");
    const total = 15; // 共通の15コ

    meters.forEach(meter => {
    const hp = parseInt(getComputedStyle(meter).getPropertyValue("--hp")) || 0;

    for (let i = 0; i < total; i++) {
        const d = document.createElement("div");
        d.className = "dot" + (i < hp ? " filled" : "");
        meter.appendChild(d);
    }
    });
}

// DOM（ページ）が読み込まれたら実行
window.addEventListener("DOMContentLoaded", function() {

    // コンストラクタ
    const kageIconeElement = document.getElementById("kage-icon"); // アイコンボタン属性が付与される要素
    const richiIconeElement = document.getElementById("richi-icon"); // アイコンボタン属性が付与される要素
    const katouIconeElement = document.getElementById("katou-icon"); // アイコンボタン属性が付与される要素
    const muraIconeElement = document.getElementById("mura-icon"); // アイコンボタン属性が付与される要素
    const zukanElement = document.getElementById("zukan"); // 図鑑が代入される親要素
    let sugataFlg = 1; // 進化前か後か管理をするフラグ
    
    // 進化前後(1:前, 2:後)
    const kageSugata1 = "<p>No.0298</p><p>カゲニキ</p>\
                         <img src=\"../../image/kagesawa_01.png\" alt=\"カゲニキ1\" class=\"zukan\">";
    const kageSugata2 = "<p>(しんか)</p><p>カゲニキ </p>\
                        <img src=\"../../image/kagesawa_03.png\" alt=\"カゲニキ2\" class=\"zukan\">";
    const richiSugata1 = "<p>No.0052</p><p>リチさん</p>\
                         <img src=\"../../image/richi_01.png\" alt=\"リチさん1\" class=\"zukan\">";
    const richiSugata2 = "<p>(しんか)</p><p>リチさん</p>\
                        <img src=\"../../image/richi_03.png\" alt=\"リチさん2\" class=\"zukan\">";
    const katouSugata1 = "<p>No.0124</p><p>かとう</p>\
                         <img src=\"../../image/katou_01.png\" alt=\"かとう1\" class=\"zukan\">";
    const katouSugata2 = "<p>(しんか)</p><p>かとう</p>\
                        <img src=\"../../image/katou_02.png\" alt=\"かとう2\" class=\"zukan\">";
    const muraSugata1 = "<p>No.0195</p><p>むらまつ</p>\
                         <img src=\"../../image/muramatu_01.png\" alt=\"むらまつ1\" class=\"zukan\">";
    const muraSugata2 = "<p>(しんか)</p><p>むらまつ</p>\
                        <img src=\"../../image/muramatu_02.png\" alt=\"むらまつ2\" class=\"zukan\">";

    // カゲニキ：ルリリ15 29 14
    const kageZukan = "<div class=\"text-center back-white\" id=\"sugata\">" + 
                       kageSugata1 +
                      "</div>\
                       <div>\
                            <table>\
                                <tr>\
                                    <td class=\"zukan-t\">タイプ：</td>\
                                    <td class=\"zukan-t\">ノーマル フェアリー</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくせい：</td>\
                                    <td class=\"zukan-t\">あついしぼう</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">HP：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 7;\"></td> <!-- +4 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">こうげき：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 3;\"></td> <!-- +1 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">ぼうぎょ</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 4;\"></td> <!-- +1 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくこう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 5;\"></td> <!-- +3 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくぼう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 5;\"></td> <!-- +2 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">すばやさ：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 5;\"></td> <!-- +3 -->\
                                </tr>\
                            </table>\
                            <p>まるくて 大きな おなかには 成長に 必要な 栄養が たっぷりと 詰まっているのだ。</p>\
                       </div>";
    // リチさん：ニャース8
    const richiZukan = "<div class=\"text-center back-white\" id=\"sugata\">" + 
                        richiSugata1 +
                       "</div>\
                        <div>\
                            <table>\
                                <tr>\
                                    <td class=\"zukan-t\">タイプ：</td>\
                                    <td class=\"zukan-t\">ノーマル</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくせい：</td>\
                                    <td class=\"zukan-t\">ものひろい</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">HP：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 3;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">こうげき：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 3;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">ぼうぎょ</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 4;\"></td> <!-- +1 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくこう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 6;\"></td> <!-- +3 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくぼう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 6;\"></td> <!-- +3 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">すばやさ：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 7;\"></td> <!-- +1 -->\
                                </tr>\
                            </table>\
                            <div class=\"mimikkyu-sonyu\">\
                            <img src=\"../../image/mimikkyu.png\" alt=\"ミミッキュ\" class=\"mimikkyu\">\
                            <p>ミミッキュが 大好き。 夜な夜な 出かけては 落ちている ミミッキュを 拾い 集めて 帰ってくる。</p>\
                        </div>";
    // かとう：ルージュラ
    const katouZukan = "<div class=\"text-center back-white\" id=\"sugata\">" + 
                        katouSugata1 +
                       "</div>\
                        <div>\
                            <table>\
                                <tr>\
                                    <td class=\"zukan-t\">タイプ：</td>\
                                    <td class=\"zukan-t\">こおり エスパー</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくせい：</td>\
                                    <td class=\"zukan-t\">よちむ</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">HP：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 4;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">こうげき：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 3;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">ぼうぎょ</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 3;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくこう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 7;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくぼう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 6;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">すばやさ：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 6;\"></td>\
                                </tr>\
                            </table>\
                            <p>なきごえは まるで にんげんの ことばのように きこえるが いみは まったく りかいできない。</p>\
                        </div>";
    // むらまつ：ヌオー
    const muraZukan = "<div class=\"text-center back-white\" id=\"sugata\">" + 
                        muraSugata1 +
                      "</div>\
                       <div>\
                            <table>\
                                <tr>\
                                    <td class=\"zukan-t\">タイプ：</td>\
                                    <td class=\"zukan-t\">みず じめん</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくせい：</td>\
                                    <td class=\"zukan-t\">しめりけ</td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">HP：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 6;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">こうげき：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 7;\"></td> <!-- +2 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">ぼうぎょ</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 5;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくこう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 4;\"></td>\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">とくぼう：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 4;\"></td> <!-- +1 -->\
                                </tr>\
                                <tr>\
                                    <td class=\"zukan-t\">すばやさ：</td>\
                                    <td class=\"zukan-t meter\" style=\"--hp: 3;\"></td>\
                                </tr>\
                            </table>\
                            <p>のんびりとした 性格で 気ままに 遊んでは いつも 財布を 忘れている。</p>\
                       </div>";

    // 図鑑の初期値を設定
    kageIconeElement.classList.add("line_icon", "button");
    zukanElement.innerHTML = kageZukan;
    meterUpdate();
    

    // カゲニキアイコンが押されたら実行
    document.getElementById('kage-icon').addEventListener('click', function() {
        sugataFlg = 1;
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.add("line_icon", "button");
        richiIconeElement.classList.remove("line_icon", "button");
        katouIconeElement.classList.remove("line_icon", "button");
        muraIconeElement.classList.remove("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = kageZukan;
        meterUpdate();
    });
    // リチさんアイコンが押されたら実行
    document.getElementById('richi-icon').addEventListener('click', function() {
        sugataFlg = 1;
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.remove("line_icon", "button");
        richiIconeElement.classList.add("line_icon", "button");
        katouIconeElement.classList.remove("line_icon", "button");
        muraIconeElement.classList.remove("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = richiZukan;
        meterUpdate();
        
    });
    // かとうアイコンが押されたら実行
    document.getElementById('katou-icon').addEventListener('click', function() {
        sugataFlg = 1;
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.remove("line_icon", "button");
        richiIconeElement.classList.remove("line_icon", "button");
        katouIconeElement.classList.add("line_icon", "button");
        muraIconeElement.classList.remove("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = katouZukan;
        meterUpdate();
        
    });
    // むらまつアイコンが押されたら実行
    document.getElementById('mura-icon').addEventListener('click', function() {
        sugataFlg = 1;
        // 選択されたキャラにボタン属性を付与
        kageIconeElement.classList.remove("line_icon", "button");
        richiIconeElement.classList.remove("line_icon", "button");
        katouIconeElement.classList.remove("line_icon", "button");
        muraIconeElement.classList.add("line_icon", "button");
        // 選択されたキャラの図鑑に書き換え
        zukanElement.innerHTML = muraZukan;
        meterUpdate();
        
    });

    // すがたが押されたら実行
    zukanElement.addEventListener('click', function(e) {
        const clicked = e.target.closest('#sugata');
        if (!clicked) return; // #sugata 以外をクリックした場合は無視

        // 現在の選択キャラに応じて書き換え
        if (kageIconeElement.classList.contains("button")) {
            clicked.innerHTML = (sugataFlg === 1) ? kageSugata2 : kageSugata1;
        } else if (richiIconeElement.classList.contains("button")) {
            clicked.innerHTML = (sugataFlg === 1) ? richiSugata2 : richiSugata1;
        } else if (katouIconeElement.classList.contains("button")) {
            clicked.innerHTML = (sugataFlg === 1) ? katouSugata2 : katouSugata1;
        } else if (muraIconeElement.classList.contains("button")) {
            clicked.innerHTML = (sugataFlg === 1) ? muraSugata2 : muraSugata1;
        }

        // フラグ反転
        sugataFlg = (sugataFlg === 1) ? 2 : 1;
    });
});