const class_name = localStorage.getItem('class_name'), class_number = localStorage.getItem('class_number');

// console.debug(`${class_name}, ${class_number}`);
// console.debug(`logged_${class_number}: ${localStorage.getItem(`logged_${class_number}`)}`);

// 不正アクセス防止
if (!localStorage.getItem(`logged_${class_number}`)) {
    alert('不正なアクセスです。ログインページへ遷移します。');
    window.location.href = '../home/home.html';
}

// 半角数字を全角に
const fw_cn = ((num) => {
    const number = ['１', '２', '３', '４', '５', '６', '７', '８', '９'];
    let result = '';
    for (let c of String(num)) result += number[parseInt(c) - 1];
    return result;
})(class_number);

// console.debug(`full_width_class_number: ${fw_cn}`);

['page_title', 'title_display'].forEach(e_id => { document.getElementById(e_id).textContent = `${fw_cn[0]}年${fw_cn[1]}組` });

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

const gas_url_post = all_gas_url.get(class_name);
const gas_url_get = `${gas_url_post}?sheet=${encodeURIComponent(class_name)}`;

// console.debug(`get用：${gas_url_get}`);
// console.debug(`post用：${gas_url_post}`);

var json_data, all_data = [];   // データ最適化前・後
var json_data_cs;   // 混雑状況
var company_count = 0;  // 企業数の集計
var tab_contents_div;   // タブコンテンツ
var indexOf, start_indexOf; // 混雑状況用
let tab_select = null;  // タブ用変数
var search_text = new Array(10).fill(null);    // 検索窓に入力された値を保存する配列

window.addEventListener('DOMContentLoaded', async () => {
    // 要素処理を一括適用
    element_process.forEach(element_process => { document.getElementById(element_process.element_id).addEventListener(element_process.event, element_process.handler) });

    document.getElementById('loading').style.display = 'flex';  // ローディング表示

    if (gas_url_get != null || gas_url_post != null) {
        await gas_loading_cs();   // gas（混雑状況）の読み取り
        await gas_Loading(gas_url_get); // gas読み込み
        await content_generation(gas_url_post);    // コンテンツ生成
    } else {
        alert('データの読み込みに失敗しました。ログインページに遷移します。');
        window.location.href = '../home/home.html';
    }

    document.getElementById('loading').style.display = 'none';
});

async function gas_loading_cs() {
    let retry_count = 1;
    while (retry_count <= 3) {
        try {
            const response = await fetch(`https://script.google.com/macros/s/AKfycbwT4gS9ZQtDncvbyyHzZewqI-CprzojeoZjXc9jbJ1f1GdyTr611mi9Ja1FSZn7dVtI/exec?sheet=${encodeURIComponent('cs')}`);

            if (response.ok) {
                json_data_cs = await response.json();
                
                // console.debug(json_data_cs);

                return;
            } else {
                alert(`読み込みエラーが発生しました。\n再試行します。\n（${retry_count}/3, cs load error）`);
                retry_count++;
            }
        } catch (error) {
            alert(`ネットワークエラーが発生しました。\n再試行します。\n（${retry_count}/3, cs net error）`);
            retry_count++;
        }

    }

    alert('営業状況データが読み取れませんでした。\nネットワーク接続をもう一度確認して再読み込みして下さい。\nこの表示が何度も表示される場合は開発者にお問い合わせください。\nOKをクリックすると再読み込みを行います。');
    window.location.reload();
}

async function gas_Loading(get) {
    let retry_count = 1;

    while (retry_count <= 3) {
        try {
            const response = await fetch(get);

            if (response.ok) {
                json_data = await response.json();
                all_data = [];
                company_count = 0;

                // 扱いやすいデータ構造に変換
                json_data.forEach(jd_row => {
                    all_data[company_count] = { company_name: '', products: { pdname: [], sales: [] } };

                    if ('company_name' in jd_row && jd_row.company_name != null) {
                        all_data[company_count].company_name = jd_row.company_name;
                        company_count++;
                    }

                    if ('pdname' in jd_row && 'sales' in jd_row && jd_row != null && jd_row.pdname != '') {
                        all_data[company_count - 1].products.pdname.push(jd_row.pdname);
                        all_data[company_count - 1].products.sales.push(jd_row.sales);
                    }
                });

                // console.debug('all_data: ');
                // console.debug(all_data);

                return;
            } else {
                alert(`読み込みエラーが発生しました。\n再試行します。\n（${retry_count}/3, all load error）`);
                retry_count++;
            }
        } catch (error) {
            alert(`ネットワークエラーが発生しました。\n再試行します。\n（${retry_count}/3, all net error）`);
            retry_count++;
        }
    }

    alert('全商品データが読み取れませんでした。\nネットワーク接続をもう一度確認して再読み込みして下さい。\nこの表示が何度も表示される場合は開発者にお問い合わせください。\nOKをクリックすると再読み込みを行います。');
    window.location.reload();
}

async function content_generation(post) {
    // 再読み込み用に初期化
    document.getElementById('total_display').innerHTML = '';

    // 全体の商品数・完売数を集計
    let all_products_count = 0, all_sales_count = 0;    // すべての商品数, すべての完売数
    let company_products_count, company_sales_count;    // 企業ごとの商品数, 企業ごとの完売数
    let search_count = 0;   // 絞り込み商品のカウント
    let ps_count = { products_count: [], sales_count: [] }; // 商品数・完売数

    for (let c = 0; c < all_data.length; c++) {
        company_products_count = 0;
        company_sales_count = 0;

        for (let p = 0; p < all_data[c].products.pdname.length; p++) {
            all_products_count++;
            company_products_count++;

            if (all_data[c].products.sales[p] === '完売' || all_data[c].products.sales[p] === '仕入準備中') {
                all_sales_count++;
                company_sales_count++;
            }
        }

        ps_count.products_count.push(company_products_count);
        ps_count.sales_count.push(company_sales_count);
    }

    // console.debug(`企業数: ${company_count}`)
    // console.debug(`商品数: ${all_products_count}`);
    // console.debug(`完売数: ${all_sales_count}`);
    // console.debug('ps_count: ');
    // console.debug(ps_count);

    // 全体の商品数・完売数を表示
    const total_display = Object.assign(document.createElement('p'), {
        id: 'total_display_text',
        innerHTML: `企業数：${company_count}　／　商品数合計：${all_products_count}　／　完売数合計：${all_sales_count}`
    });

    document.getElementById('total_display').appendChild(total_display);

    // 現在の時間を取得
    const date = new Date();

    const now_time = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hours: date.getHours(),
        minutes: String(date.getMinutes()).padStart(2, '0'),
        seconds: String(date.getSeconds()).padStart(2, '0')
    };

    const time_display = Object.assign(document.createElement('p'), {
        id: 'time_display_text',
        innerHTML: `最終更新： ${now_time.year}/${now_time.month}/${now_time.date}　${now_time.hours}:${now_time.minutes}:${now_time.seconds}`
    });

    document.getElementById('total_display').appendChild(time_display);

    // 再読み込み用に初期化
    ['tab_buttons', 'tab_contents'].forEach(e_id => { document.getElementById(e_id).innerHTML = '' });

    // タブの生成
    for (let c = 0; c < company_count; c++) {
        if (c == 0) start_indexOf = json_data_cs.findIndex(obj => obj.company_name === `${all_data[c].company_name}`);
        indexOf = json_data_cs.findIndex(obj => obj.company_name === `${all_data[c].company_name}`);

        // console.debug(`index: ${indexOf}, ${start_indexOf}`);

        // タブ
        const tab_btns = document.createElement('button');
        tab_btns.textContent = all_data[c].company_name;
        tab_btns.dataset.t_index = c;
        document.getElementById('tab_buttons').appendChild(tab_btns);

        // 内容
        tab_contents_div = document.createElement('div');
        tab_contents_div.className = 'tab_content';
        tab_contents_div.dataset.t_index = c;
        tab_contents_div.style.maxHeight = `${window.innerHeight - 132.6}px`;
        if (c === 0) tab_contents_div.classList.add('show');

        // 企業ごとの商品数・完売数・混雑状況プルダウンの表示
        const company_total_display = Object.assign(document.createElement('div'), {
            className: 'company_total_display',
            id: 'company_total_display'
        });

        // 企業名
        const company_total_display_text_company_name = Object.assign(document.createElement('p'), {
            className: 'company_total_display_text_company_name',
            textContent: all_data[c].company_name
        });

        // 企業ごとの商品数・完売数
        const company_total_display_text_products = Object.assign(document.createElement('p'), {
            className: 'company_total_display_text_products',
            textContent: `（　商品数：${ps_count.products_count[c]}　／　完売数：${ps_count.sales_count[c]}　）`
        });

        // 混雑状況プルダウン
        const crowd_status_text = Object.assign(document.createElement('p'), {
            className: 'crowd_status_text',
            innerHTML: '営業状況：　'
        });

        const crowd_status = Object.assign(document.createElement('select'), { className: 'crowd_status_pulldown' });

        ['空き', 'やや混雑', '混雑', '非営業'].forEach(status => {
            const pulldown_option_cs = Object.assign(document.createElement('option'), {
                value: status,
                text: status,
            });

            crowd_status.appendChild(pulldown_option_cs);
        });

        crowd_status.style.backgroundColor = json_data_cs[indexOf].crowd_status === '空き' ? '#aae' : json_data_cs[indexOf].crowd_status === 'やや混雑' ? '#ffa' : json_data_cs[indexOf].crowd_status === '混雑' ? '#eaa' : '#c79cff';
        crowd_status.selectedIndex = json_data_cs[indexOf].crowd_status === '空き' ? 0 : json_data_cs[indexOf].crowd_status === 'やや混雑' ? 1 : json_data_cs[indexOf].crowd_status === '混雑' ? 2 : 3;
        crowd_status.dataset.c_index = indexOf;

        company_total_display.appendChild(company_total_display_text_company_name);
        company_total_display.appendChild(company_total_display_text_products);
        company_total_display.appendChild(document.createElement('br'));
        company_total_display.appendChild(crowd_status_text);
        company_total_display.appendChild(crowd_status);

        company_total_display.dataset.t_index = c;
        company_total_display_text_products.dataset.t_index = c;

        // テーブルの作成
        const tab_contents_table = document.createElement('table');    // テーブル全体

        // thead部分
        const tab_contents_table_thead = document.createElement('thead');    // テーブルのヘッド
        const tab_contents_table_thead_row = document.createElement('tr');    // テーブル行

        ['商品名', '販売状況'].forEach(text => {
            const tab_contents_table_thead_th = document.createElement('th');
            tab_contents_table_thead_th.textContent = text;
            tab_contents_table_thead_row.appendChild(tab_contents_table_thead_th);
        });

        tab_contents_table_thead.appendChild(tab_contents_table_thead_row);
        tab_contents_table.appendChild(tab_contents_table_thead);

        // tbody部分
        const tab_contents_table_tbody = document.createElement('tbody');

        search_count = 0;

        for (let p = 0; p < all_data[c].products.pdname.length; p++) {
            const tab_contents_table_tbody_tr = document.createElement('tr');

            // 商品名
            const tab_contents_table_tbody_td_pdname = document.createElement('td');
            tab_contents_table_tbody_td_pdname.textContent = all_data[c].products.pdname[p];
            tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_pdname);

            // プルダウン生成（販売状況）
            const tab_contents_table_tbody_td_sales = document.createElement('td');

            const tab_contents_table_tbody_td_sales_pulldown = Object.assign(document.createElement('select'), { className: 'tab_contents_table_tbody_td_sales_pulldown' });

            ['販売中', '残りわずか', '仕入準備中', '完売'].forEach(sales => {
                const pulldown_option = Object.assign(document.createElement('option'), {
                    value: sales,
                    text: sales,
                });

                tab_contents_table_tbody_td_sales_pulldown.appendChild(pulldown_option);
            });

            tab_contents_table_tbody_td_sales_pulldown.style.backgroundColor = all_data[c].products.sales[p] === '販売中' ? '#aae' : all_data[c].products.sales[p] === '残りわずか' ? '#ffa' : all_data[c].products.sales[p] === '仕入準備中' ? '#aea' : '#eaa';
            tab_contents_table_tbody_td_sales_pulldown.selectedIndex = all_data[c].products.sales[p] === '販売中' ? 0 : all_data[c].products.sales[p] === '残りわずか' ? 1 : all_data[c].products.sales[p] === '仕入準備中' ? 2 : 3;

            tab_contents_table_tbody_td_sales_pulldown.dataset.p_index = `${c}-${p}`;  // プルダウン番地を入力（post用）

            tab_contents_table_tbody_td_sales.appendChild(tab_contents_table_tbody_td_sales_pulldown);
            tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_sales);

            // 検索窓に入力されてるか
            if (search_text[c] != null) {
                // 絞り込み
                if (all_data[c].products.pdname[p].includes(search_text[c])) {
                    tab_contents_table_tbody.appendChild(tab_contents_table_tbody_tr);
                    search_count++;
                }

                document.getElementById('search_icon').classList.add('searched');
                document.getElementById('search_button').classList.add('searched');
            } else {
                // 標準
                document.getElementById('search_icon').classList.remove('searched');
                document.getElementById('search_button').classList.remove('searched');
                tab_contents_table_tbody.appendChild(tab_contents_table_tbody_tr);
            }
        }

        // table入力処理
        if (tab_contents_table_tbody.childNodes.length === 0) {
            const notFound = document.createElement('tr');

            const td = Object.assign(document.createElement('td'), {
                id: 'not_found',
                classList: 'not_found',
                colSpan: 2,
                textContent: '該当する商品が見つかりませんでした。'
            });

            notFound.appendChild(td);
            tab_contents_table.appendChild(notFound);
        } else {
            tab_contents_table.appendChild(tab_contents_table_tbody);
        }

        tab_contents_div.appendChild(company_total_display);
        tab_contents_div.appendChild(tab_contents_table);
        document.getElementById('tab_contents').appendChild(tab_contents_div);

        if (search_text[c] != null) {
            const searched_text = Object.assign(document.createElement('p'), {
                classList: 'searched_text',
                textContent: search_count == 0 ? `「${search_text[c].trim()}」で検索中：商品が見つかりませんでした` : `「${search_text[c].trim()}」で検索中：${search_count}件見つかりました`
            });

            document.querySelector(`.company_total_display[data-t_index="${c}"`).appendChild(searched_text);
        }
    }

    // 初期表示タブの設定・自動再読み込み時のタブ移動制限
    if (tab_select == null) {
        tab_select = 0;
        const first_tab = document.querySelector('#tab_buttons button');
        if (first_tab) first_tab.click();
    } else if (tab_select >= 0 && tab_select < company_count) {
        document.querySelectorAll('#tab_buttons button').forEach((btn, c) => { btn.classList.toggle('active_tab', c == tab_select) });
        document.querySelectorAll('.tab_content').forEach((div, c) => { div.classList.toggle('show', c == tab_select) });

        // console.debug(`tab_select: ${tab_select}`);
    }

    // 検索見た目適用
    if (search_text[tab_select] != null) {
        // 検索時
        document.getElementById('search_icon').classList.add('searched');
        document.getElementById('search_button').classList.add('searched');
    } else {
        // 標準
        document.getElementById('search_icon').classList.remove('searched');
        document.getElementById('search_button').classList.remove('searched');
    }

    // 混雑状況プルダウン変更時　ここから
    document.querySelectorAll('.crowd_status_pulldown').forEach(pulldown => {
        pulldown.addEventListener('change', async (event) => {
            const pulldown_dataset_cs = event.target.dataset.c_index;

            // console.debug(`${pulldown_dataset_cs}(${Number(pulldown_dataset_cs) + 1}社目)`);

            // ローカルデータの更新
            json_data_cs[pulldown_dataset_cs].crowd_status = document.querySelector(`[data-c_index="${pulldown_dataset_cs}"]`).value;
            document.querySelector(`[data-c_index="${pulldown_dataset_cs}"]`).style.backgroundColor = json_data_cs[pulldown_dataset_cs].crowd_status === '空き' ? '#aae' : json_data_cs[pulldown_dataset_cs].crowd_status === 'やや混雑' ? '#ffa' : json_data_cs[pulldown_dataset_cs].crowd_status === '混雑' ? '#eaa' : '#c79cff';

            // console.debug(json_data_cs);

            // gasへpostリクエスト
            // console.debug(pulldown_dataset_cs);
            // console.debug(json_data_cs[pulldown_dataset_cs].crowd_status);

            const gas_post_data_cs = new URLSearchParams({
                company_number: pulldown_dataset_cs,
                crowd_status: json_data_cs[pulldown_dataset_cs].crowd_status
            });

            // console.debug(gas_post_data_cs);
            let retry_count = 1;
            while (retry_count <= 3) { 
                try {
                    const response = await fetch('https://script.google.com/macros/s/AKfycbwT4gS9ZQtDncvbyyHzZewqI-CprzojeoZjXc9jbJ1f1GdyTr611mi9Ja1FSZn7dVtI/exec', {
                        method: 'POST',
                        body: gas_post_data_cs
                    });

                    // console.debug(response);

                    if (response.ok) {
                        const result = await response.text();

                        if (result == 'OK') {
                            return;
                        } else {
                            alert(`販売状況の更新に失敗しました。\n再試行します。\n（${retry_count}/3, cs update error）`);
                            retry_count++;
                        }
                    } else {
                        alert(`販売状況の更新に失敗しました。\n再試行します。\n（${retry_count}/3, cs update error）`);
                        retry_count++;
                    }
                } catch (error) {
                    alert(`ネットワークエラーが発生しました。\n再試行します。\n（${retry_count}/3, cs update net error）`);
                    retry_count++;
                }
            }

            alert('営業状況の更新に失敗しました。\nネットワーク接続をもう一度確認して再読み込みして下さい。\nこの表示が何度も表示される場合は開発者にお問い合わせください。\nOKをクリックすると再読み込みを行います。');
            window.location.reload();
        });
    });

    // 販売状況プルダウン変更時 ここから
    document.querySelectorAll('.tab_contents_table_tbody_td_sales_pulldown').forEach(pulldown => {
        pulldown.addEventListener('change', async (event) => {
            const pulldown_dataset = event.target.dataset.p_index;
            const pulldown_c = parseInt(pulldown_dataset[0]), pulldown_p = parseInt(pulldown_dataset.slice(2));

            // console.debug(`${pulldown_dataset}(${parseInt(pulldown_dataset[0]) + 1}社目, ${parseInt(pulldown_dataset.slice(2)) + 1}番目の商品)`);

            // ローカルデータの更新
            all_data[pulldown_c].products.sales[pulldown_p] = document.querySelector(`[data-p_index="${pulldown_dataset}"]`).value;
            document.querySelector(`[data-p_index="${pulldown_dataset}"]`).style.backgroundColor = all_data[pulldown_c].products.sales[pulldown_p] === '販売中' ? '#aae' : all_data[pulldown_c].products.sales[pulldown_p] === '残りわずか' ? '#ffa' : all_data[pulldown_c].products.sales[pulldown_p] === '仕入準備中' ? '#aea' : '#eaa';

            // console.debug(all_data);

            all_sales_count = 0;

            for (let c = 0; c < all_data.length; c++) {
                company_products_count = 0;
                company_sales_count = 0;

                for (let p = 0; p < all_data[c].products.pdname.length; p++) {
                    company_products_count++;

                    if (all_data[c].products.sales[p] === '完売' || all_data[c].products.sales[p] === '仕入準備中') {
                        all_sales_count++;
                        company_sales_count++;
                    }
                }

                ps_count.sales_count[c] = company_sales_count;
                const company_total_display_text_update = document.querySelector(`.company_total_display_text_products[data-t_index="${c}"]`);
                if (company_total_display_text_update) company_total_display_text_update.innerHTML = `（　商品数：${ps_count.products_count[c]}　／　完売数：${company_sales_count}　）`;
            }

            total_display.innerHTML = `企業数：${company_count}　／　商品数合計：${all_products_count}　／　完売数合計：${all_sales_count}`;

            // console.debug(`企業数: ${company_count}`);
            // console.debug(`商品数: ${all_products_count}`);
            // console.debug(`完売数: ${all_sales_count}`);
            // console.debug('ps_count: ');
            // console.debug(ps_count);

            // gasへpostリクエスト
            const gas_post_data = new URLSearchParams({
                company_number: pulldown_c,
                product_number: pulldown_p,
                sales: all_data[pulldown_c].products.sales[pulldown_p]
            });

            let retry_count = 1;
            while (retry_count <= 3) {
                try {
                    const response = await fetch(post, {
                        method: 'POST',
                        body: gas_post_data
                    });

                    if (response.ok) {
                        const result = await response.text();

                        if (result == 'OK') {
                            return;
                        } else {
                            alert(`販売状況の更新に失敗しました。\n再試行します。\n（${retry_count}/3, all update error）`);
                            retry_count++;
                        }
                    } else {
                        alert(`販売状況の更新に失敗しました。\n再試行します。\n（${retry_count}/3, all update error）`);
                        retry_count++;
                    }
                } catch (error) {
                    alert(`ネットワークエラーが発生しました。\n再試行します。\n（${retry_count}/3, all update net error）`);
                    retry_count++;
                }

                alert('販売状況の更新に失敗しました。\nネットワーク接続をもう一度確認して再読み込みして下さい。\nこの表示が何度も表示される場合は開発者にお問い合わせください。\nOKをクリックすると再読み込みを行います。');
                window.location.reload();
            }
        });
    });
}

// その他の処理等
const element_process = [
    {   // 検索開く
        element_id: 'search_button',
        event: 'click',
        handler: () => {
            document.getElementById('search_input').value = search_text[tab_select];
            document.getElementById('search_modal_back').classList.add('show');
        }
    },
    {   // 検索実行
        element_id: 'search_form',
        event: 'submit',
        handler: async (event) => {
            event.preventDefault();
            if (document.getElementById('search_input').value === '') search_text[tab_select] = null;
            else search_text[tab_select] = document.getElementById('search_input').value.trim();

            // console.debug(search_text);

            document.getElementById('search_modal_back').classList.remove('show');
            await content_generation(gas_url_post);
        } 
    },
    {   // 検索閉じる
        element_id: 'search_close_button',
        event: 'click',
        handler: () => document.getElementById('search_modal_back').classList.remove('show')
    },
    {   // 全ての検索リセット
        element_id: 'search_all_reset',
        event: 'click',
        handler: async () => {
            document.getElementById('search_input').value = '';
            search_text = new Array(10).fill(null);

            // console.debug(search_text);

            document.getElementById('search_modal_back').classList.remove('show');
            document.getElementById('search_icon').classList.remove('searched');
            document.getElementById('search_button').classList.remove('searched');
            await content_generation(gas_url_post);
        }
    },
    {   // 店舗ごとの検索リセット
        element_id: 'search_reset',
        event: 'click',
        handler: async () => {
            document.getElementById('search_input').value = '';
            search_text[tab_select] = null;

            // console.debug(search_text);

            document.getElementById('search_modal_back').classList.remove('show');
            document.getElementById('search_icon').classList.remove('searched');
            document.getElementById('search_button').classList.remove('searched');
            await content_generation(gas_url_post);
        }
    },
    {   // リロード
        element_id: 'reload_button',
        event: 'click',
        handler: () => window.location.reload()
    },
    {   // ログアウト確認
        element_id: 'logout_button',
        event: 'click',
        handler: () => document.getElementById('logout_modal_back').classList.add('show')
    },
    {   // ログアウトキャンセル
        element_id: 'cancel_button',
        event: 'click',
        handler: () => document.getElementById('logout_modal_back').classList.remove('show')
    },
    {   // ログアウト
        element_id: 'ok_button',
        event: 'click',
        handler: () => {
            localStorage.removeItem(`logged_${class_number}`);
            window.location.href = '../home/home.html';
        }
    },
    {   // タブの切り替え機構
        element_id: 'tab_buttons',
        event: 'click',
        handler: (event) => {
            if (event.target.tagName === 'BUTTON') {
                const index = event.target.dataset.t_index;
                tab_select = parseInt(index);
                document.querySelectorAll('#tab_buttons button').forEach(btn => { btn.classList.remove('active_tab') });
                event.target.classList.add('active_tab');
                document.querySelectorAll('.tab_content').forEach((div, i) => { div.classList.toggle('show', i == index) });
            }

            // console.debug(`tab_select: ${tab_select}`);

            // 検索見た目適用
            if (search_text[tab_select] != null) {
                // 検索時
                document.getElementById('search_icon').classList.add('searched');
                document.getElementById('search_button').classList.add('searched');
            } else {
                // 標準
                document.getElementById('search_icon').classList.remove('searched');
                document.getElementById('search_button').classList.remove('searched');
            }
        }
    }
];

// 自動再読み込み
window.onload = () => {
    setInterval(async () => {
        // スクロール位置の保存
        let scroll_tops = [];
        document.querySelectorAll('.tab_content').forEach((div, i) => { scroll_tops[i] = div.scrollTop; });

        // 自動再読み込み処理
        await gas_loading_cs();
        await gas_Loading(gas_url_get);
        await content_generation(gas_url_post);

        document.querySelectorAll('.tab_content').forEach((div, i) => {
            if (typeof scroll_tops[i] === 'number') div.scrollTop = scroll_tops[i];
        });
    }, (Math.floor(Math.random() * (180 - 60 + 1) + 60) * 1000));
}

window.addEventListener('resize', () => document.querySelectorAll('.tab_content').forEach(div => { div.style.maxHeight = `${window.innerHeight - 132.6}px` }));
