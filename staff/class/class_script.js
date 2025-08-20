const {class_name, class_number} = document.documentElement.dataset;
console.log(`${class_name}, ${class_number}`);
console.log(localStorage.getItem(`logged_${class_number}`));

const all_gas_url = new Map([
    ['1-1', 'https://script.google.com/macros/s/AKfycbzHsNfnfnOqQpJaD-rSgHRGsfTcxfrA6i2X-O8JhlvKuHLd-SBO3-OTXc6RjEwnNswp/exec'],
    ['1-2', 'https://script.google.com/macros/s/AKfycbyXwQXuoqOi2IvKuCxYI5sqi3Sz2CcuXAFH4etCKF_bT-bpJJ3q65K0mfSV2k6Bixb3oA/exec'],
    ['1-3', 'https://script.google.com/macros/s/AKfycbzMAAW1BHqbmXCv3VK3PZZGTZlILpN2Idz0ejX-KwiC0taaUKehSrhzX6rsDjUokX3xMw/exec'],
    ['1-4', 'https://script.google.com/macros/s/AKfycbz2xNt-rGReQ0E6UOpQ5V9uNyFfb5HSMKqUaa9g-99kExVJz3n8DKtysbmtK7GIIebn/exec'],
    ['1-5', 'https://script.google.com/macros/s/AKfycbzNvt0g4hJI6ZIXOB5iuWFfcLk4aNHtzCTprHQpAangwuGe3r1vVkwZO8aiMuwLtKSHqQ/exec'],
    ['1-6', 'https://script.google.com/macros/s/AKfycby4ijWRrgG4xcIeOHUoGq-nV5a4CUSHbovnFP5zlDyNyN4Omin1r-4caw08gMoZibhl/exec'],
    ['1-7', 'https://script.google.com/macros/s/AKfycbyZJ2Wk9rsK0VHfUmq41gYMTmYoitdGNoW06cpockjkF6i1pgiYnrUySwN3id_mrK1X/exec'],
    ['1-8', 'https://script.google.com/macros/s/AKfycbyl3lg13ygmc8xqAhMjsvtEcYd13GAA_FvGLcDQU2LXWCkZaVXpfNgJDX2-PxBFguJz/exec'],
    ['1-9', 'https://script.google.com/macros/s/AKfycbwj43SO1avs2MCSOyoW3XMvX6VTADXYO7HFOsgs5d8mqE9qpXulVmimGHOxIbF__hf0Bw/exec'],
    ['2-1', 'https://script.google.com/macros/s/AKfycbxnl4XompT1ZQlZhByBYitPlopkrSCUHOcO5VImTwmLIiU-886O_m6wCpHb13yjskLp/exec'],
    ['2-2', 'https://script.google.com/macros/s/AKfycbyC285RKzw7FJvpHwKKgjhjWj8QjjJ5vFwvwIHAfqENUiRKZga0tGCclP1h1iKvZ4_yLQ/exec'],
    ['2-3', 'https://script.google.com/macros/s/AKfycbxiO8OP0D1WIRNj_7Ik5EJaFaVo6lY0IZ34Azd6nFv1OwbrMtIympaKWAo8LofNSncjeg/exec'],
    ['2-4', 'https://script.google.com/macros/s/AKfycbw0dGht80ag03xSmTLCfSpUamPnYmrPILEgHBrz0JO1RRaRIHhy6xuprgtEFiDM3ClJHA/exec'],
    ['2-5', 'https://script.google.com/macros/s/AKfycbwKiEErOb1Vq5akQQYhnn01UprfUpJTUGiobnljq8Jql5miANCasut_bppOumXMQeB0/exec'],
    ['2-6', 'https://script.google.com/macros/s/AKfycbwq_DMzG-GnyhOT7XwqhQ_13e3BA--RV7P4HdjfMeETomzRPwO8TH_XWdVJMesfCeq5/exec'],
    ['2-7', 'https://script.google.com/macros/s/AKfycbwP0lWskCDnE2jEdJ7rc7-LTeEpPm6_sFAGoB8v5Nv4yFH5TLQ6gE9afAMaB5dSSV9K/exec'],
    ['2-8', 'https://script.google.com/macros/s/AKfycbw0xmJy66CXDGQAU-qMrge3_b4dy4GM1oX0Xj8ZgYnLbI3baqQqLl6C7JRrO8rsA_Do/exec'],
    ['2-9', 'https://script.google.com/macros/s/AKfycbzPHA0i_IGINSjDtkzW0ryAEkHP7mWvxl60hV6xUhmHYAWtaPT5V8-rDECxx-3LHwggzA/exec'],
    ['3-1', 'https://script.google.com/macros/s/AKfycbzr6JvxmbbX8c1n54khjn8BfimxQy-PPvOmRv9P5KliiW9kdXhiapd2g6n-UEUzqft5/exec'],
    ['3-2', 'https://script.google.com/macros/s/AKfycbwmFwc14PTykOw_jxMYKtqc96_6TidvyZYzuN5-XiYdq8dsRv9blKkWGU42-i2TNJoQDg/exec'],
    ['3-3', 'https://script.google.com/macros/s/AKfycbxPrz7_fbgslp6n86uKT7kWfANSXyNv2n0wUL20QSH805MZDmeoaC7hmTXMhVOr2lGU6Q/exec'],
    ['3-4', 'https://script.google.com/macros/s/AKfycbzvsrQzO0C9vzJ5TTgRA9zk05imKoYGjVzM0i-EWspbkyuDcc8kn3FI75FfYQufjIYbpA/exec'],
    ['3-5', 'https://script.google.com/macros/s/AKfycbxS9YIopnCOHJdkm0XxNugd2dUm-37gIyiyIRXjbf0bPgCYsbe75nTQjDKofo-CUouX/exec'],
    ['3-6', 'https://script.google.com/macros/s/AKfycbxiyi8kUs3zzSXr3OSgyhFF_Yf5Z1Y0G7vTLcNUIEXeQNHOk_vnTIW-fWP7CoCXtlHZ/exec'],
    ['3-7', 'https://script.google.com/macros/s/AKfycbxUuxK-c3lBffnvs_nMSYqdEazTTpRGphiyq56oKJ_BWttojtzTDYpdTg6GUYPpDK3j/exec'],
    ['3-8', 'https://script.google.com/macros/s/AKfycbxScIiePXzOq-D9SKt7j5KfHCxiaLsI_AcCzhOPDULYh8kZYHHuwnN69IMJrSP5pYN6/exec'],
    ['3-9', 'https://script.google.com/macros/s/AKfycbyEHLBgehDKx2n8OztlXKV_V3c71krJc1dIgIE4mM8CdBIYvK6wZb_eb1oi98LzwQQqWw/exec']
]);

const gas_url_post = all_gas_url.get(class_name),
    gas_url_get = gas_url_post + '?sheet=' + encodeURIComponent(class_name);
console.log(`get用：${gas_url_get}`);
console.log(`post用：${gas_url_post}`);

// 不正アクセス防止
if (!localStorage.getItem(`logged_${class_number}`)) {
    alert('不正なアクセスです。ログインページへ遷移します。');
    window.location.href = '../../home/home.html';
};

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('loading').style.display = 'flex';    // ローディング表示

    if (!(gas_url_get == null || gas_url_post == null)) {
        await gas_Loading(gas_url_get, gas_url_post);    // gas読み込み
    } else {
        this.alert('データの読み込みに失敗しました。ログインページに遷移します。');
        this.window.location.href = '../../home/home.html';
    };

    this.document.getElementById('loading').style.display = 'none';
});

async function gas_Loading(get, post) {
    await this.fetch(get)
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

            // 再読み込み用に初期化
            document.getElementById('total_display').innerHTML = '';

            // 全体の商品数・完売数を集計
            let all_products_count = 0, all_sales_count = 0,    // すべての商品数, すべての完売数
                company_products_count, company_sales_count;    // 企業ごとの商品数, 企業ごとの完売数

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

            // 再読み込み用に初期化
            ['tab_buttons', 'tab_contents'].forEach(id => { document.getElementById(id).innerHTML = ''; });

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
                const tab_contents_table_thead = this.document.createElement('thead'),    // テーブルのヘッド
                    tab_contents_table_thead_row = this.document.createElement('tr');    // テーブル行

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

                    tab_contents_table_tbody_td_sales_checkbox.dataset.index = `${c}-${p}`;  // チェックボックス番地を入力（post用）

                    const tab_contents_table_tbody_td_sales_checkbox_label = Object.assign(this.document.createElement('span'), {
                        textContent: tab_contents_table_tbody_td_sales_checkbox.checked ? '完売' : '販売中',
                        classList: tab_contents_table_tbody_td_sales_checkbox.checked ? 'soldout' : 'onsale'
                    });

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
                checkbox.addEventListener('change', (event) => {
                    const checkbox_dataset = event.target.dataset.index;
                    console.log(checkbox_dataset);
                    const checkbox_c = parseInt(checkbox_dataset.charAt(0)), checkbox_p = parseInt(checkbox_dataset.charAt(2));

                    Object.assign(this.document.querySelector(`[data-index="${checkbox_dataset}"]`).nextElementSibling, {
                        textContent: event.target.checked ? '完売' : '販売中',
                        classList: event.target.checked ? 'soldout' : 'onsale'
                    });

                    // ローカルデータの更新
                    all_data[checkbox_c].products.sales[checkbox_p] = event.target.checked ? '完売' : '販売中';
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
                        sales: event.target.checked ? '完売' : '販売中'
                    });

                    console.log(`${checkbox_c}, ${checkbox_p}, ${event.target.checked ? '完売' : '販売中'}`);

                    this.fetch(post, { method: 'POST', body: gas_post_data })
                        .then(response => response.text())
                        .then(result => { if (result == 'NG') alert('スプレッドシートの更新に失敗しました。'); });
                });
            });
        });
};

// その他の処理等
document.getElementById('reload_button').addEventListener('click', () => {
    window.location.reload();
});

document.getElementById('logout_button').addEventListener('click', () => {
    // 将来的にはモーダルにする予定
    if (confirm('ログアウトしますか？')) {
        localStorage.removeItem(`logged_${class_number}`);
        window.location.href = '../../home/home.html';
    };
});

document.getElementById('tab_buttons').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const index = event.target.dataset.index;

        document.querySelectorAll('.tab_buttons button').forEach((btn) => {
            btn.classList.remove('active_tab');
        });

        event.target.classList.add('active_tab');
        
        document.querySelectorAll('.tab_content').forEach((div, i) => {
            div.classList.toggle('show', i == index);
        });
    };
});

window.onload = () => {
    setInterval(async () => {
        await gas_Loading(gas_url_get, gas_url_post);
    }, Math.floor(Math.random() * 31 + 30) * 1000);
};