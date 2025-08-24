const class_options = {
    1: [
        { value: '11', text: '1組' },
        { value: '12', text: '2組' },
        { value: '13', text: '3組' },
        { value: '14', text: '4組' },
        { value: '15', text: '5組' },
        { value: '16', text: '6組' },
        { value: '17', text: '7組' },
        { value: '18', text: '8組' },
        { value: '19', text: '9組' }
    ],
    2: [
        { value: '21', text: '1組' },
        { value: '22', text: '2組' },
        { value: '23', text: '3組' },
        { value: '24', text: '4組' },
        { value: '25', text: '5組' },
        { value: '26', text: '6組' },
        { value: '27', text: '7組' },
        { value: '28', text: '8組' },
        { value: '29', text: '9組' }
    ],
    3: [
        { value: '31', text: '1組' },
        { value: '32', text: '2組' },
        { value: '33', text: '3組' },
        { value: '34', text: '4組' },
        { value: '35', text: '5組' },
        { value: '36', text: '6組' },
        { value: '37', text: '7組' },
        { value: '38', text: '8組' },
        { value: '39', text: '9組' }
    ]
};

let id_pass = {
    id: [],
    password: []
};

function update_class_options(grade) {
    document.getElementById('password').value = '';
    const select = document.getElementById('class');
    select.innerHTML = '<option value="" disabled selected>クラスを選択</option>';

    class_options[grade].forEach(cl_opt => {
        const option = document.createElement('option');
        option.value = cl_opt.value;
        option.textContent = cl_opt.text;
        select.appendChild(option);
    });
};

window.addEventListener('DOMContentLoaded', async () => {
    // ローディングの表示
    document.getElementById('loading').style.display = 'flex';

    // ログイン状況のリセット
    for (let g = 1; g <= 3; g++) {
        for (let c = 1; c <= 9; c++) {
            localStorage.removeItem(`logged_${g}${c}`);
        };
    };

    // プルダウンリストの内容作成
    document.querySelectorAll('input[name="grade"]').forEach(radio => {
        radio.addEventListener('change', () => {
            update_class_options(radio.value);
        });
    });

    // プルダウンリストが変更されたとき、パスワード欄をリセット
    document.getElementById('class').addEventListener('change', () => {
        document.getElementById('password').value = '';
    });

    update_class_options(document.querySelector('input[name="grade"]:checked').value);

    // ユーザーID・パスワードの取得
    const response = await fetch('https://script.google.com/macros/s/AKfycbyG279JTr01s2ietRm8QoVsFoAkvJz0yvetyoXhGN6JZ9j_fKwaYDdqlN4qwiD-nZOQ/exec');

    if (response.ok) {
        const json_data = await response.json();
        console.log(json_data);

        // 扱いやすいデータ配列に変換
        json_data.forEach(json_data_row => {
            id_pass.id.push(json_data_row.class);
            id_pass.password.push(json_data_row.password);
        });
    } else {
        alert('ネットワークエラーが発生しました。\n再読み込みします。');
        window.location.reload();
    };

    // ローディングの非表示
    document.getElementById('loading').style.display = 'none';
});

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // ローディングの表示
    document.getElementById('loading').style.display = 'flex';

    // フォーム入力の値を取得
    const id = document.getElementById('class').value,
        password = document.getElementById('password').value;
    console.log(`class: ${id}, password: ${password}`);

    // id探索
    let found_index = id_pass.id.indexOf(id);

    // 認証処理（簡易的だから爆速やで）
    if (found_index !== -1) {
        if (password === id_pass.password[found_index]) {
            console.log('認証成功');
            localStorage.setItem(`logged_${id}`, 'true');
            localStorage.setItem(`class_name`, `${id[0]}-${id[1]}`);
            localStorage.setItem(`class_number`, id);
            // サイトに移動
            window.location.href = '../product_management/product_management.html';
        } else {
            console.error('パスワードが間違っています');
            alert('パスワードが間違っています。');
            document.getElementById('password').value = '';
            document.getElementById('loading').style.display = 'none';
        };
    } else {
        console.error('指定されたIDが見つかりません');
        alert('指定されたIDが見つかりません。');
        document.getElementById('loading').style.display = 'none';
    };
});