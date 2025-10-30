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

    for (let c = 1; c < company_count; c++) {
        const tab_btns = Object.assign(document.createElement('button'), {
            className: 'tab_btns',
            textContent: all_data[c].com_name
        });

        tab_btns.dataset.index = c;
        store_buttons.appendChild(tab_btns);
    }

    // 企業データの生成
    const products_window = document.getElementById('products_window');

    for (let c = 1; c < company_count; c++) {
        const o_store = new Map([
            [400, 'マーケティング部']
        ]);
        const c_class = Number(all_data[c].id) >= 400 ? o_store.get(Number(all_data[c].id)) : `${all_data[c].id[0]} - ${all_data[c].id[1]}`;
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
        Object.assign(title_text.style, { textShadow: `7px 7px 7px ${all_data[c].id[0] === '1' ? '#77f' : all_data[c].id[0] === '2' ? '#f77' : all_data[c].id[0] === '3' ? '#7f7' : '#f70'}` });

        const title_class = Object.assign(document.createElement('h3'), {
            className: 'title_text',
            textContent: `担当クラス・部：${c_class}`
        });
        Object.assign(title_class.style, { textShadow: `7px 7px 7px ${all_data[c].id[0] === '1' ? '#77f' : all_data[c].id[0] === '2' ? '#f77' : all_data[c].id[0] === '3' ? '#7f7' : '#f70'}` });
        company_title.appendChild(title_text);
        company_title.appendChild(title_class);

        content.appendChild(company_title); // 最後

        // formへ飛ぶボタン
        const form_btn = Object.assign(document.createElement('button'), {
            onclick() { window.open(all_data[c].form_url, '_blank') },
            innerHTML: `${all_data[c].com_name}<br>注文フォームへ`,
            classList: 'form_btns'
        });
        Object.assign(form_btn.style, {
            backgroundColor: all_data[c].id[0] === '1' ? '#77f' : all_data[c].id[0] === '2' ? '#f77' : all_data[c].id[0] === '3' ? '#7f7' : '#f70',
            color: all_data[c].id[0] === '3' ? '#333' : '#eee'
        });
        content.appendChild(form_btn);  // 最後

        // 商品カード生成
        const products = Object.assign(document.createElement('div'), { classList: 'products' });   // グリッドおおもと

        for (let p = 0; p < all_data[c].products.length; p++) {
            const products_card = Object.assign(document.createElement('div'), { classList: 'products_card' });
            Object.assign(products_card.style, { backgroundColor: all_data[c].id[0] === '1' ? '#eef' : all_data[c].id[0] === '2' ? '#fee' : all_data[c].id[0] === '3' ? '#efe' : '#ffe1c6' });

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
            const pro_desc = Object.assign(document.createElement('p'), {
                classList: 'pro_desc',
                innerHTML: all_data[c].products[p].pro_desc
            });
            Object.assign(pro_desc.style, { border: `${all_data[c].id[0] === '1' ? '#77f' : all_data[c].id[0] === '2' ? '#f77' : all_data[c].id[0] === '3' ? '#7f7' : '#f70'} solid 0.7px` });
            pro_info.appendChild(pro_desc);

            // 販売個数
            const stock = Object.assign(document.createElement('p'), {
                classList: 'stock',
                textContent: `${all_data[c].products[p].stock}`
            });
            pro_info.appendChild(stock);

            // 販売単価
            const price = Object.assign(document.createElement('h1'), {
                classList: 'price',
                textContent: typeof all_data[c].products[p].price === 'number' ? `￥${all_data[c].products[p].price.toLocaleString()}` : all_data[c].products[p].price
            });
            pro_info.appendChild(price);

            products_card.appendChild(pro_info);
            products.appendChild(products_card);    // グリッドおおもと


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
