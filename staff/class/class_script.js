const {class_name, class_number} = document.documentElement.dataset;
console.log(`${class_name}, ${class_number}`);
console.log(localStorage.getItem(`logged_${class_number}`));

const all_gas_url = new Map([
    ['1-1', ''],
    ['1-2', ''],
    ['1-3', ''],
    ['1-4', ''],
    ['1-5', ''],
    ['1-6', ''],
    ['1-7', ''],
    ['1-8', ''],
    ['1-9', ''],
    ['2-1', ''],
    ['2-2', ''],
    ['2-3', ''],
    ['2-4', ''],
    ['2-5', ''],
    ['2-6', ''],
    ['2-7', ''],
    ['2-8', ''],
    ['2-9', ''],
    ['3-1', ''],
    ['3-2', ''],
    ['3-3', ''],
    ['3-4', ''],
    ['3-5', ''],
    ['3-6', ''],
    ['3-7', ''],
    ['3-8', ''],
    ['3-9', 'https://script.google.com/macros/s/AKfycbxSYNTEBhCNPATOGIL61wiAi_SdxMNkApWpHTHVT8kPfQyueIDKLRMkvSuNsHh1ZVtfhw/exec']
]);

// 不正アクセス防止
if (!localStorage.getItem(`logged_${class_number}`)) {
    alert('不正なアクセスです。ログインページへ遷移します。');
    window.location.href = '../../home/home.html';
};

window.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('loading').style.display = 'flex';    // ローディング表示

    const gas_url_post = all_gas_url.get(class_name);
    const gas_url_get = gas_url_post + '?sheet=' + encodeURIComponent(class_name);
    console.log(`get用：${gas_url_get}`);
    console.log(`post用：${gas_url_post}`);

    if (!(gas_url_get == null || gas_url_post == null)) {
        // gas読み込み開始
        await this.fetch(gas_url_get)
            .then(response => response.json())

            .then(json_data => {
                console.log('json_data（元データ）:');
                console.log(json_data);

                // 扱いやすいデータ構造に変換
                const all_data = [];    // 全てのデータをまとめたオブジェクト
                let company_count = 0;    // 企業数の集計

                json_data.forEach(json_data_row => {
                    all_data[company_count] = {
                        company_name: '',
                        products: {
                            pdname: [],
                            price: [],
                            sales: []
                        }
                    };

                    if ('company_name' in json_data_row && json_data_row.company_name != null) {
                        all_data[company_count].company_name = json_data_row.company_name;
                        company_count++;
                    };

                    if ('pdname' in json_data_row && 'price' in json_data_row && 'sales' in json_data_row && json_data_row != null && json_data_row.pdname != '') {
                        all_data[company_count - 1].products.pdname.push(json_data_row.pdname);
                        all_data[company_count - 1].products.price.push(json_data_row.price);
                        all_data[company_count - 1].products.sales.push(json_data_row.sales);
                    };
                });

                console.log('all_data（整理後）: ');
                console.log(all_data);

                // 全体の商品数・完売数を集計
                let all_products_count = 0;    // すべての商品数
                let all_sales_count = 0;    // すべての完売数
                let company_products_count, company_sales_count;    // 企業ごとの商品数, 企業ごとの完売数

                let ps_count = {
                    products_count: [],
                    sales_count: []
                };

                for (let c = 0; c < all_data.length; c++) {
                    company_products_count = 0;
                    company_sales_count = 0;

                    for (let p = 0; p < all_data[c].products.pdname.length; p++) {
                        all_products_count++;
                        company_products_count++;

                        if (all_data[c].products.sales[p] === '完売') {
                            all_sales_count++;
                            company_sales_count++;
                        };
                    };

                    ps_count.products_count.push(company_products_count);
                    ps_count.sales_count.push(company_sales_count);
                };

                console.log('企業数, 商品数, 完売数');
                console.log(`${company_count}, ${all_products_count}, ${all_sales_count}`);
                console.log('ps_count: ');
                console.log(ps_count);

                // 全体の商品数・完売数を表示
                const total_display = Object.assign(this.document.createElement('p'), {
                    id: 'total_display_text',
                    innerHTML: `企業数：${company_count}　／　商品数：${all_products_count}　／　完売数：${all_sales_count}`
                });

                this.document.getElementById('total_display').appendChild(total_display);

                // タブの生成
                for (let c = 0; c < company_count; c++) {
                    // タブ
                    const tab_btns = this.document.createElement('button');
                    tab_btns.textContent = all_data[c].company_name;
                    tab_btns.dataset.index = c;
                    this.document.getElementById('tab_buttons').appendChild(tab_btns);

                    // 内容
                    const tab_contents_div = this.document.createElement('div');
                    tab_contents_div.classList.add('tab_content');
                    tab_contents_div.dataset.index = c;
                    if (c === 0) tab_contents_div.classList.add('show');

                    // 企業ごとの商品数・完売数の表示
                    const company_total_display = Object.assign(this.document.createElement('p'), {
                        classList: 'company_total_display_text',
                        id: 'company_total_display_text',
                        innerHTML: `<span class="company_total_display_text_company_name">${all_data[c].company_name}</span>（　商品数：${ps_count.products_count[c]}　／　完売数：${ps_count.sales_count[c]}　）`
                    });

                    company_total_display.dataset.index = c;

                    // テーブルの作成
                    const tab_contents_table = this.document.createElement('table');    // テーブル全体

                    // thead部分
                    const tab_contents_table_thead = this.document.createElement('thead');    // テーブルのヘッド
                    const tab_contents_table_thead_row = this.document.createElement('tr');    // テーブル行

                    ['商品名', '販売価格', '販売状況'].forEach(text => {
                        const tab_contents_table_thead_th = this.document.createElement('th');
                        tab_contents_table_thead_th.textContent = text;
                        tab_contents_table_thead_row.appendChild(tab_contents_table_thead_th);
                    });

                    tab_contents_table_thead.appendChild(tab_contents_table_thead_row);
                    tab_contents_table.appendChild(tab_contents_table_thead);

                    // tbody部分
                    const tab_contents_table_tbody = this.document.createElement('tbody');

                    for (let p = 0; p < all_data[c].products.pdname.length; p++) {
                        const tab_contents_table_tbody_tr = this.document.createElement('tr');

                        // 商品名
                        const tab_contents_table_tbody_td_pdname = this.document.createElement('td');
                        tab_contents_table_tbody_td_pdname.textContent = all_data[c].products.pdname[p];
                        tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_pdname);

                        // 販売価格
                        const tab_contents_table_tbody_td_price = this.document.createElement('td');
                        tab_contents_table_tbody_td_price.textContent = '￥' + parseInt(all_data[c].products.price[p]).toLocaleString();
                        tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_price);

                        // チェックボックス生成（販売状況）
                        const tab_contents_table_tbody_td_sales = this.document.createElement('td');

                        const tab_contents_table_tbody_td_sales_checkbox = Object.assign(this.document.createElement('input'), {
                            type: 'checkbox',
                            checked: all_data[c].products.sales[p] === '完売',
                            classList: 'tab_contents_table_tbody_td_sales_checkbox'
                        });

                        tab_contents_table_tbody_td_sales_checkbox.dataset.index = `${c}-${p}`  // チェックボックス番地を入力（post用）

                        const tab_contents_table_tbody_td_sales_checkbox_label = Object.assign(this.document.createElement('span'), {
                            textContent: tab_contents_table_tbody_td_sales_checkbox.checked ? '完売' : '販売中',
                            classList: tab_contents_table_tbody_td_sales_checkbox.checked ? 'soldout' : 'onsale'
                        });

                        tab_contents_table_tbody_td_sales_checkbox_label.style.fontWeight = 'bolder';

                        tab_contents_table_tbody_td_sales.appendChild(tab_contents_table_tbody_td_sales_checkbox);
                        tab_contents_table_tbody_td_sales.appendChild(tab_contents_table_tbody_td_sales_checkbox_label);
                        tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_sales);

                        // tbody入力処理
                        tab_contents_table_tbody.appendChild(tab_contents_table_tbody_tr);
                    };

                    // table入力処理
                    tab_contents_table.appendChild(tab_contents_table_tbody);
                    tab_contents_div.appendChild(company_total_display);
                    tab_contents_div.appendChild(tab_contents_table);
                    this.document.getElementById('tab_contents').appendChild(tab_contents_div);
                };

                // 初期表示タブの設定
                const first_tab = document.querySelector('.tab_buttons button');
                if (first_tab) first_tab.click();

                // checkboxクリック時 ここから
                this.document.querySelectorAll('.tab_contents_table_tbody_td_sales_checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', (e) => {
                        const checkbox_dataset = e.target.dataset.index;
                        console.log(checkbox_dataset);
                        const checkbox_c = parseInt(checkbox_dataset.charAt(0));
                        const checkbox_p = parseInt(checkbox_dataset.charAt(2));

                        Object.assign(this.document.querySelector(`[data-index="${checkbox_dataset}"]`).nextElementSibling, {
                            textContent: e.target.checked ? '完売' : '販売中',
                            classList: e.target.checked ? 'soldout' : 'onsale'
                        });

                        // ローカルデータの更新
                        all_data[checkbox_c].products.sales[checkbox_p] = e.target.checked ? '完売' : '販売中';
                        console.log(all_data);
                        all_sales_count = 0;

                        for (let c = 0; c < all_data.length; c++) {
                            company_sales_count = 0;

                            for (let p = 0; p < all_data[c].products.pdname.length; p++) {
                                company_products_count++;

                                if (all_data[c].products.sales[p] === '完売') {
                                    all_sales_count++;
                                    company_sales_count++;
                                };
                            };

                            ps_count.sales_count[c] = company_sales_count;
                            const company_total_display_text_update = this.document.querySelector(`.company_total_display_text[data-index="${c}"]`);
                            if (company_total_display_text_update) company_total_display_text_update.innerHTML = `<span class="company_total_display_text_company_name">${all_data[c].company_name}</span>（　商品数：${ps_count.products_count[c]}　／　完売数：${company_sales_count}　）`;
                        };

                        total_display.innerHTML = `企業数：${company_count}　／　商品数：${all_products_count}　／　完売数：${all_sales_count}`;
                        console.log('企業数, 商品数, 完売数');
                        console.log(`${company_count}, ${all_products_count}, ${all_sales_count}`);
                        console.log('ps_count: ');
                        console.log(ps_count);

                        // gasへpostリクエスト
                        const gas_post_data = new URLSearchParams({
                            company_number: checkbox_c,
                            product_number: checkbox_p,
                            sales: e.target.checked ? '完売' : '販売中'
                        });

                        console.log(`${checkbox_c}, ${checkbox_p}, ${e.target.checked ? '完売' : '販売中'}`);

                        this.fetch(gas_url_post, {method: 'POST', body: gas_post_data})
                            .then(response => response.text())
                            .then(result => {
                                if (result == 'NG') alert('スプレッドシートの更新に失敗しました。');
                            });
                    });
                });
            })

            .finally(() => {
                this.document.getElementById('loading').style.display = 'none';
            });
    } else {
        this.alert('データの読み込みに失敗しました。ログインページに遷移します。');
        this.window.location.href = '../../home/home.html';
    };
});

// その他の処理等
document.getElementById('reload_button').addEventListener('click', () => {
    window.location.reload()
});

document.getElementById('logout_button').addEventListener('click', () => {
    localStorage.removeItem(`logged_${class_number}`);
    window.location.href = '../../home/home.html';
});

document.getElementById('tab_buttons').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset.index;

        document.querySelectorAll('.tab_buttons button').forEach((btn, i) => {
            btn.classList.remove('active_tab');
        });

        e.target.classList.add('active_tab');

        document.querySelectorAll('.tab_content').forEach((div, i) => {
            div.classList.toggle('show', i == index);
        });
    };
});