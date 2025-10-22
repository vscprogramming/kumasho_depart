// ['resize', 'DOMContentLoaded'].forEach(event => { window.addEventListener(event, () => resize_div()) });

// function resize_div() {
//     Object.assign(document.getElementById('all').style, {
//         width: `${window.innerWidth}px`,
//         height: `${window.innerHeight}px`
//     });
// }

var json_data, all_data = [];
let tab_select;

window.addEventListener('DOMContentLoaded', async () => {
    await json_load();
    await content_generation();
});

async function json_load() {
    try {
        const response = await fetch('products.json');

        if (response.ok) {
            json_data = await response.json();

            // データ構造変えちゃえ☆彡
            json_data.forEach((jd_row, i) => { all_data[i + 1] = jd_row });

            // console.log(all_data);

        } else {
            alert('データの読み込みに失敗しました。\n再読み込みします。');
            window.location.reload();
        }
    } catch (error) {
        alert('ネットワークエラーが発生しました。\n再読み込みします。');
        window.location.reload();
    }
}

function content_generation() {
    const company_count = all_data.length;  // 企業数
    // タブボタン生成
    const store_buttons = document.getElementById('store_buttons');

    for (let c = 0; c < company_count; c++) {
        if (c == 0) {
            const home_btn = Object.assign(document.createElement('button'), {
                className: 'home_btn',
                textContent: 'ホーム'
            });

            home_btn.dataset.index = c;
            store_buttons.appendChild(home_btn);
        } else {
            const tab_btns = Object.assign(document.createElement('button'), {
                className: 'tab_btns',
                textContent: all_data[c].com_name
            });

            tab_btns.dataset.index = c;
            store_buttons.appendChild(tab_btns);
        }
    }

    // 企業データの生成
    const products_window = document.getElementById('products_window');

    for (let c = 0; c < company_count; c++) {
        if (c == 0) {
            const content = Object.assign(document.createElement('div'), { classList: 'contents' });    // おおもと

            // タイトル類生成
            const company_title = Object.assign(document.createElement('div'), { classList: 'company_title' });

            const img = Object.assign(document.createElement('img'), {
                classList: 'company_img',
                src: 'img/home/home.png',
                alt: 'ホーム'
            });
            company_title.appendChild(img);

            const title_text = Object.assign(document.createElement('h1'), {
                className: 'title_text',
                textContent: 'ホーム'
            });
            company_title.appendChild(title_text);

            content.appendChild(company_title); // 最後

            // その他コンテンツ
            const info = document.createElement('div');
            Object.assign(info, { classList: 'info' });

            const info_text = document.createElement('div');
            Object.assign(info_text, {
                classList: 'info_text',
                innerHTML: `
                    <style>    
                        .text {
                            margin: 18px;
                            font-family: 'Noto Serif JP', serif;
                            font-weight: bolder;
                        }

                        .class { color: red; }
                    </style>

                    <div class="text">
                        <h2>第３８回 熊商デパート　事前販売商品一覧サイトです。</h2>
                        <h2>各企業のタブをクリックして、商品をご覧ください。</h2>
                        <h2>購入希望の方は、申し込みフォームにアクセスしてください。</h2>

                        <br><br><br>

                        <h2 class="warn">画像挿入が間に合っていなく、レイアウトが崩れている箇所があります。</h2>
                        <h2 class="warn">サイト公開までには画像を挿入します。ご了承ください</h2>
                    <div>
                `
            });
            info.appendChild(info_text);

            content.appendChild(info);
            products_window.appendChild(content);   // おおもと
        } else {
            const c_class = `${all_data[c].id[0]} - ${all_data[c].id[1]}`;
            const content = Object.assign(document.createElement('div'), { classList: 'contents' });    // おおもと
            content.dataset.index = c;

            // タイトル類生成
            const company_title = Object.assign(document.createElement('div'), { classList: 'company_title' });

            const img = Object.assign(document.createElement('img'), {
                classList: 'company_img',
                src: all_data[c].com_img,
                alt: all_data[c].com_name
            });
            company_title.appendChild(img);

            const title_text = Object.assign(document.createElement('h1'), {
                className: 'title_text',
                textContent: all_data[c].com_name
            });

            const title_class = Object.assign(document.createElement('h3'), {
                className: 'title_text',
                textContent: `担当クラス：${c_class}`
            });
            company_title.appendChild(title_text);
            company_title.appendChild(title_class);

            content.appendChild(company_title); // 最後

            // formへ飛ぶボタン
            const form_btn = Object.assign(document.createElement('button'), {
                onclick() { window.location.href = all_data[c].form_url },
                innerHTML: `${all_data[c].com_name}<br>注文フォームへ`,
                classList: 'form_btns'
            });
            content.appendChild(form_btn);  // 最後

            // 商品カード生成
            const products = Object.assign(document.createElement('div'), { classList: 'products' });   // グリッドおおもと

            for (let p = 0; p < all_data[c].products.length; p++) {
                const products_card = Object.assign(document.createElement('div'), { classList: 'products_card' });

                const products_img = Object.assign(document.createElement('img'), {
                    classList: 'products_img',
                    src: all_data[c].products[p].pro_img,
                    alt: all_data[c].products[p].pro_name
                });
                products_card.appendChild(products_img);

                const pro_info = Object.assign(document.createElement('div'), { classList: 'pro_info' });

                // 商品名
                const pro_title = Object.assign(document.createElement('h2'), {
                    classList: 'pro_title',
                    innerHTML: all_data[c].products[p].pro_name
                });
                pro_info.appendChild(pro_title);

                // 商品説明
                const pro_desc =Object.assign(document.createElement('p'), {
                    classList: 'pro_desc',
                    innerHTML: all_data[c].products[p].pro_desc
                });
                pro_info.appendChild(pro_desc);

                // 販売個数
                const stock = Object.assign(document.createElement('p'), {
                    classList: 'stock',
                    textContent: `販売数量：　${all_data[c].products[p].stock}`
                });
                pro_info.appendChild(stock);

                // 販売単価
                const price = Object.assign(document.createElement('h1'), {
                    classList: 'price',
                    textContent: `￥${all_data[c].products[p].price.toLocaleString()}`
                });
                pro_info.appendChild(price);

                products_card.appendChild(pro_info);
                products.appendChild(products_card);    // グリッドおおもと
            }

            content.appendChild(products);  // 最後
            products_window.appendChild(content);   // おおもと
        }
    }

    if (tab_select == null) {
        tab_select = 0;
        const first_tab = document.querySelector('#store_buttons button');
        if (first_tab) first_tab.click();
    } else if (tab_select >= 0 && tab_select < company_count) {
        document.querySelectorAll('#store_buttons button').forEach((btn, c) => { btn.classList.toggle('active_tab', c == tab_select) });
        document.querySelectorAll('.contents').forEach((div, c) => { div.classList.toggle('show', c == tab_select) });
    }
}

// タブ切り替え機構
document.getElementById('store_buttons').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        document.getElementById('products_window').scrollTop = 0;
        const index = event.target.dataset.index;
        tab_select = parseInt(index);
        document.querySelectorAll('#store_buttons button').forEach(btn => { btn.classList.remove('active_tab') });
        event.target.classList.add('active_tab');
        document.querySelectorAll('.contents').forEach((div, i) => { div.classList.toggle('show', i == index) });
        document.getElementById('store_modal_button').classList.remove('show');
        document.getElementById('left').classList.remove('show');
        document.getElementById('store_buttons').classList.remove('show');
    }
});

document.getElementById('store_modal_button').addEventListener('click', () => {
    document.getElementById('store_modal_button').classList.toggle('show');
    document.getElementById('left').classList.toggle('show');
    document.getElementById('store_buttons').classList.toggle('show');
});
