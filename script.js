function calculate() {
    // 1. 入力値の取得
    const n1 = parseFloat(document.getElementById('num1').value); // 年利（例: 0.03）
    const n2 = parseFloat(document.getElementById('num2').value); // 期間（月）
    const n3 = parseFloat(document.getElementById('num3').value); // 借入額（万円）
    const n4 = parseFloat(document.getElementById('num4').value); // 残価（％）

    // 2. すべての数値が正しく入力されているかチェック
    // ※ n4 のチェックを追加しました
    if (!isNaN(n1) && !isNaN(n2) && !isNaN(n3) && !isNaN(n4)) {
        
        const r = n1 / 12; // 月利
        const m = n2 * 1; // 返済月数

        // 通常ローンの計算
        const W = (n3 * r) / (1 - (1 + r) ** -m) * 10000;
        const Wtotal = n3 * r*(m*(1+r)**m /(  (1 + r) ** m - 1)-1/r) * 10000;

        // 残価設定ローンの計算
        // 分母が0にならないかチェックする構造が望ましいです
        const denominator = (1 + r) ** -m - 1;
        let Wz = 0;
        if (denominator !== 0) {
            Wz = n3 * r * ((1 + r) ** m - (n4 / 100)) / ((1 + r) ** m - 1) * 10000;
            Wztotal = (n3 * r *m-n3*(1-n4/100)*(1-m*r/((1+r)**m-1))) * 10000;
        }

        // 3. 結果の表示
        // HTML側の id が「result1」「result2」など英数字であることを想定
        displayResult('result1', W);
        displayResult('result2', Wz);
        displayResult('result3', Wtotal);
        displayResult('result4', Wztotal);

    } else {
        alert("すべての項目に数値を入力してください");
    }
}

// 表示用補助関数（コードをスッキリさせるため）
function displayResult(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }
}