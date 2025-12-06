// DOM（ページ）が読み込まれたら実行
window.addEventListener("DOMContentLoaded", function() {

    // コンストラクタ
    let nameValue = "";
    let shukketuValue = "";
    let yoteiValue = "";
    let boardgameValue = "";
    let yuushiValue = "";
    const message = document.getElementById('message'); // ポケモンがしゃべるメッセージ要素
    document.getElementById('yotei-ele').style.display = "none"; // 予定を非表示
    document.getElementById('boardgame-ele').style.display = "none"; // ボドゲ希望を非表示
    document.getElementById('yuushi-ele').style.display = "none"; // 有志を非表示
    document.getElementById('err-name').style.display = "none"; // エラーメッセージを非表示
    document.getElementById('err-shukketu').style.display = "none"; // エラーメッセージを非表示
    document.getElementById('err-yotei').style.display = "none"; // エラーメッセージを非表示
    document.getElementById('err-yuushi').style.display = "none"; // エラーメッセージを非表示
    document.getElementById('kaito-text').style.display = "none"; // 送信完了メッセージを非表示

    // 名前の入力ボックスに値が入ったら実行
    document.getElementById("name").addEventListener("input", function() {
        nameValue = this.value;
        console.log("名前：", nameValue);
    });

    // 出欠のラジオボタンが選択されたら実行
    document.querySelectorAll('input[name="shukketu"]').forEach(function(radio){
        radio.addEventListener('change', function() {
            shukketuValue = this.value;
            console.log("出欠：", shukketuValue);

            // ラジオボタンの選択状態で要素を動的に制御
            if (shukketuValue === "yes") { // 出席の場合
                document.getElementById('yotei-ele').style.display = "none"; // 予定を非表示
                document.getElementById('boardgame-ele').style.display = "block"; // ボドゲ希望を表示
                document.getElementById('yuushi-ele').style.display = "block"; // 有志を表示
                message.textContent = 'ボドゲ！　ボドゲ！'; // ポケモンがしゃべるメッセージ要素
            } else if (shukketuValue === "horyu") { // 保留の場合
                document.getElementById('yotei-ele').style.display = "block"; // 予定を表示
                document.getElementById('boardgame-ele').style.display = "block"; // ボドゲ希望を表示
                document.getElementById('yuushi-ele').style.display = "block"; // 有志を表示
                message.textContent = 'アラタメテ コベツデ カクニンスルゾー'; // ポケモンがしゃべるメッセージ要素
            } else { // "no"または未選択の場合
                document.getElementById('yotei-ele').style.display = "none"; // 予定を非表示
                document.getElementById('boardgame-ele').style.display = "none"; // ボドゲ希望を表示
                document.getElementById('yuushi-ele').style.display = "none"; // 有志を非表示
            }
        });
    });

    // 予定の入力ボックスに値が入ったら実行
    document.getElementById("yotei").addEventListener("input", function() {
        yoteiValue = this.value;
        console.log("予定：", yoteiValue);
    });

    // ボドゲ希望の入力ボックスに値が入ったら実行
    document.getElementById("boardgame").addEventListener("input", function() {
        boardgameValue = this.value;
        console.log("ボドゲ希望：", boardgameValue);

        // ポケモンがしゃべるメッセージ要素
        if (shukketuValue !== "horyu") { // 保留のメッセージを優先
            message.textContent = boardgameValue + '!?';
        }
    });

    // 有志のラジオボタンが選択されたら実行
    document.querySelectorAll('input[name="yuushi"]').forEach(function(radio){
        radio.addEventListener('change', function() {
            yuushiValue = this.value;
            console.log("有志：", yuushiValue);

            // ポケモンがしゃべるメッセージ要素
            if (shukketuValue !== "horyu") { // 保留のメッセージを優先
                if (yuushiValue === "yes") {
                    message.textContent = 'ウタウゾー';
                } else {
                    message.textContent = 'アソブゾー';
                }
            }
        });
    });

    // 送信ボタンが押されたら実行
    document.getElementById('sosin-btn').addEventListener('click', function() {
        console.log("送信日時:", new Date().toLocaleString());
        
        // 入力チェック
        if (!nameValue) {
            document.getElementById('err-name').style.display = "block"; // エラーメッセージを表示
            return;
        } else { document.getElementById('err-name').style.display = "none"; }
        if (!shukketuValue) {
            document.getElementById('err-shukketu').style.display = "block"; // エラーメッセージを表示
            return;
        } else { document.getElementById('err-shukketu').style.display = "none"; }
        if (shukketuValue === "yes" || shukketuValue === "horyu" ) {
            if (!yuushiValue) {
                document.getElementById('err-yuushi').style.display = "block"; // エラーメッセージを表示
                return;
            }
        } else { document.getElementById('err-yuushi').style.display = "none"; }
        if (shukketuValue === "horyu") {
            if (!yoteiValue) {
                document.getElementById('err-yotei').style.display = "block"; // エラーメッセージを表示
                return;
            }
        } else { document.getElementById('err-yuushi').style.display = "none"; }
        
        // スプレッドシートに送信する情報（送信データ用に加工）
        const shukketuSendValue = shukketuValue === "yes" ? "〇" : shukketuValue === "no" ? "×" : "保留";
        const boardgameSendValue = !boardgameValue ? "なし" : boardgameValue;
        const yuushiSendValue = yuushiValue === "yes" ? "〇" : yuushiValue === "no" ? "×" : "";
        const data = {
            password: "16greeEventPassword", // GAS 側と同じ簡易パスワード
            time: new Date().toLocaleString(),
            name: nameValue,
            shukketu: shukketuSendValue,
            yotei: yoteiValue,
            boardgame: boardgameSendValue,
            yuushi: yuushiSendValue
        };

        // 送信完了メッセージを表示 ※実際にはここでは送信されていないが、処理に時間がかかるので申し訳程度の時間稼ぎ
        document.getElementById('sosin-text').style.display = "none"; // 送信ぼたんを非表示
        document.getElementById('kaito-text').style.display = "block"; // 送信完了メッセージを非表示

        // GASを経由してスプレットシートに書き込み
        fetch("https://script.google.com/macros/s/AKfycbwyV9sdscHVFiM2yhPWSsdcdULAblqEdBcxRbbxnejkx-v5xndIG2MBGpnfkWV6uoEI/exec", {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.status === "success") {
                console.log("送信完了");
                // ホームに戻る
                window.location.href = 'main.html';
            }
        })
        .catch(err => {
            console.error("Error:", err);
        });
    });

});
