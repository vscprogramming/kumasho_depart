const {class_name, class_number} = document.documentElement.dataset;
console.log(`${class_name}, ${class_number}`);
console.log(localStorage.getItem(`logged_${class_number}`));

const all_gas_url = new Map([
    ['1-1', 'https://script.google.com/macros/s/AKfycbzrGDAfgsDU5wQl3wW6QzokWE7Sm3YnM-n3IR9RX90OlNoWmCnH7zyV6jk7MnsWBK8M/exec'],
    ['1-2', 'https://script.google.com/macros/s/AKfycbzjRYlB5w1fK2nFJhqz1myy7RahOqQFoG63iqHq08j6tvewpbKmmlebiCCqr18-ZxvX6A/exec'],
    ['1-3', 'https://script.google.com/macros/s/AKfycbz2R8MK3B76df53AdmPeFKxW0f-MkxmewER6T-wwY8WaC9rD6ypWBWtBPbkcbGsG5e9tQ/exec'],
    ['1-4', 'https://script.google.com/macros/s/AKfycbzJnTClzBWGy_Pm-GY8p9VxtaAnqqruIrHafi-Q9wq-esDEpU2pnlO91KDLXE-jbLtD/exec'],
    ['1-5', 'https://script.google.com/macros/s/AKfycbysWD4QYrPIGeATXcUtY_BSZny4JShp64C5we6tTklol0ARfGxc2f7_P-jwUPevK52EMA/exec'],
    ['1-6', 'https://script.google.com/macros/s/AKfycbytKhfBRORFPC9mof4w0NHEuqADk2iIya48JGn0xaAhhlCweGceUsFdZjM9iLqaVFRN/exec'],
    ['1-7', 'https://script.google.com/macros/s/AKfycbzsrwcVsAipe1Qaj0Bf_ebsX-Qp7LUpXO5IVfSqZ8dvw30hV2DUzEnt8IYz_xyLVAxu/exec'],
    ['1-8', 'https://script.google.com/macros/s/AKfycbymPFhdWibEbLT7KXQUr_UAg_lR4nOY9qJiRnAzcnREzRGLFnnO4oTyGDw6nKkaAEoj/exec'],
    ['1-9', 'https://script.google.com/macros/s/AKfycbwW6Bd03h9hHbifbi1WgbYTUe97GL_G-4-8_DX11bZWn85hLfa_y7uyN6Sj2ioAcczPWQ/exec'],
    ['2-1', 'https://script.google.com/macros/s/AKfycbx4CXcdNsaEU4nZ7eEeUCCuDkiRpyidMtHAuSY4OgTBVzqyoEGjv5EJreKON-gvpwBJ/exec'],
    ['2-2', 'https://script.google.com/macros/s/AKfycbxt1kgPgF595hYUXPZcAl-0a3enZrTGwjLnR4Q_hOohqp6GWz63cDIL9iVfIDExAcq3Ng/exec'],
    ['2-3', 'https://script.google.com/macros/s/AKfycbxXqkb8KI1cfCHWKVULjHM24H5_PXg3wGvO8TqKajiX3a9ouENoYsfgE2hTgS5IaTLs3A/exec'],
    ['2-4', 'https://script.google.com/macros/s/AKfycbx6w4N2vviF2BZiqlFXhNINA0cJd43tfMlcLKvY-Q9z8PHvan0yhU-eDEN6ywvib6ziMg/exec'],
    ['2-5', 'https://script.google.com/macros/s/AKfycbxCk9vN5vm6q2uCJEduc5KDfs_9lcGj3SlWNLzbmiXd1bslTbBz98OCFDNSNE35Fi8h/exec'],
    ['2-6', 'https://script.google.com/macros/s/AKfycbzRFyTPLdJE1gKm8ER9tEbQGzSKWmncz-XDnDsrvw0RxkAWLP-BGmibKaWUpJ34WDjU/exec'],
    ['2-7', 'https://script.google.com/macros/s/AKfycbwnSXOXzz9x7QKrqKZvqTOo2NV9zhkUETeeF8RlCGlcNTxoKQ3PgBmwTUhLCWQ14B42/exec'],
    ['2-8', 'https://script.google.com/macros/s/AKfycbyGaZhmzRajTQAhHjmws_90cROJyGuK3SE-HXIxjjKx8PGoO1L6HgemuG1utWLML5Za/exec'],
    ['2-9', 'https://script.google.com/macros/s/AKfycbwXwJsXWnk315alH5K22R1Mt3HaMStkfv2FXwJuaS1DiPsHJD-pfFMykI2Oi4k3i6BSwA/exec'],
    ['3-1', 'https://script.google.com/macros/s/AKfycbzCvCziusL-GdB26YWdwRA26I3kVF7eDJspK8Q2fN1wep6kS5to_8ategUERdPid97n/exec'],
    ['3-2', 'https://script.google.com/macros/s/AKfycbx1gjtu_aVq1YixIulMIwFrp75VlZTBvM3jgAn51TyIlG4G5XtQ3Nh0FguRPaj1vFH2XQ/exec'],
    ['3-3', 'https://script.google.com/macros/s/AKfycbzpFPkWr6y-SvFuTIBxrziAjdkal5L0Obn71NLbIuXIn-fWTgeq_cDwmfZOccZWbl-V/exec'],
    ['3-4', 'https://script.google.com/macros/s/AKfycbzgT9vXYIkH1OH-EA8FJKEMEKaSnhwJR1CbHUvz38HjIvPufr6_mLLr5SO70kb16_EFTg/exec'],
    ['3-5', 'https://script.google.com/macros/s/AKfycbxb3Xdz0Ffx4o_8fl9YhNE4dTf9F328g6P00Pv9BZ-K97CET33T7wQRw3XNLOovJkVK/exec'],
    ['3-6', 'https://script.google.com/macros/s/AKfycbwzpA861UFnp23VpBpsJi5QRfVJx7kaBKUujJcjidPmLSHiaOm0sJYgjvHjyesr6UmU/exec'],
    ['3-7', 'https://script.google.com/macros/s/AKfycbyUdq7pVqebVflENxobaxbFX9SL9XTEm-W52CdgILMvCK4-IjJaiAmljuL1Vnoj34EL/exec'],
    ['3-8', 'https://script.google.com/macros/s/AKfycbzzR8gp5ANqc-RUguwx8bsACOxLZJYDGA3LjEzfGrFsZ1Rp63Hv1jrn9P3c1PjMlR2k/exec'],
    ['3-9', 'https://script.google.com/macros/s/AKfycbw5dUn9N6EaJjr5CbIJR9In9rY4t0Ute7Img5oNuLoD3y18kMRh2alcX2OaT9K7xxDqTQ/exec']
]);

// 不正アクセス防止用　ここから

// 不正アクセス防止用　ここまで

window.addEventListener('DOMContentLoaded', async function() {
    // ローディング表示
    document.getElementById('loading').style.display = 'flex';

    const gas_url_post = all_gas_url.get(class_name);
    const gas_url_get = gas_url_post + '?sheet=' + encodeURIComponent(class_name);
    
    // URL確認
    console.log(`get用：${gas_url_get}`);
    console.log(`post用：${gas_url_post}`);

    if(!(gas_url_get == null || gas_url_post == null)) {
        // gas読み込み開始
        await this.fetch(gas_url_get)
            .then(response => response.json())

            .then(json_data => {
                console.log('json_data（元データ）:')
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

                    if('company_name' in json_data_row && json_data_row.company_name != null) {
                        all_data[company_count].company_name = json_data_row.company_name;
                        company_count++;
                    };

                    if('pdname' in json_data_row && 'price' in json_data_row && 'sales' in json_data_row && json_data_row != null && json_data_row.pdname != '') {
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

                for(let c = 0; c < all_data.length; c++) {
                    company_products_count = 0;
                    company_sales_count = 0;

                    for(let p = 0; p < all_data[c].products.pdname.length; p++) {
                        all_products_count++;
                        company_products_count ++;

                        if(all_data[c].products.sales[p] === "完売") {
                            all_sales_count++;
                            company_sales_count ++;
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

                for(let c = 0; c < company_count; c++) {
                    // タブ
                    const tab_btns = this.document.createElement('button');
                    tab_btns.textContent = all_data[c].company_name;
                    tab_btns.dataset.index = c;
                    this.document.getElementById('tab_buttons').appendChild(tab_btns);

                    // 内容
                    const tab_contents_div = this.document.createElement('div');
                    tab_contents_div.classList.add('tab_content');
                    tab_contents_div.dataset.index = c;
                    if(c === 0) tab_contents_div.classList.add('show');

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
                    const tab_contents_table_thead_row = this.document.createElement('tr');    // テーブル行（仮？）

                    ['商品名', '販売価格', '販売状況'].forEach(text => {
                        const tab_contents_table_thead_th = this.document.createElement('th');
                        tab_contents_table_thead_th.textContent = text;
                        tab_contents_table_thead_row.appendChild(tab_contents_table_thead_th);
                    });

                    tab_contents_table_thead.appendChild(tab_contents_table_thead_row);
                    tab_contents_table.appendChild(tab_contents_table_thead);

                    // tbody部分
                    const tab_contents_table_tbody = this.document.createElement('tbody');

                    for(let p = 0; p < all_data[c].products.pdname.length; p++) {
                        const tab_contents_table_tbody_tr = this.document.createElement('tr');

                        const tab_contents_table_tbody_td_pdname = this.document.createElement('td');
                        tab_contents_table_tbody_td_pdname.textContent = all_data[c].products.pdname[p];
                        tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_pdname);

                        const tab_contents_table_tbody_td_price = this.document.createElement('td');
                        tab_contents_table_tbody_td_price.textContent = '￥' + parseInt(all_data[c].products.price[p]).toLocaleString();
                        tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_price);

                        // チェックボックス生成（gaspost処理？）
                        const tab_contents_table_tbody_td_sales = this.document.createElement('td');
                        tab_contents_table_tbody_td_sales.textContent = all_data[c].products.sales[p];
                        tab_contents_table_tbody_tr.appendChild(tab_contents_table_tbody_td_sales);

                        // 最後
                        tab_contents_table_tbody.appendChild(tab_contents_table_tbody_tr);
                        // ここまで
                    };

                    // table入力処理
                    tab_contents_table.appendChild(tab_contents_table_tbody);
                    tab_contents_div.appendChild(company_total_display);
                    tab_contents_div.appendChild(tab_contents_table);
                    this.document.getElementById('tab_contents').appendChild(tab_contents_div);
                    // ここまで
                };

                const first_tab = document.querySelector(".tab_buttons button");
                if(first_tab) first_tab.click();
            })

            .finally(() => {
                this.document.getElementById('loading').style.display = 'none';
            });
    } else {
        this.alert('データの読み込みに失敗しました。ログインページに遷移します。');
        this.window.location.href = '../../home/home.html';
    };
});

// ボタン処理等　ここから
document.getElementById('reload_button').addEventListener('click', () => {
    window.location.reload();
});

document.getElementById('logout_button').addEventListener('click', () => {
    localStorage.removeItem(`logged_${class_number}`);
    window.location.href = '../../home/home.html';
});

document.getElementById('tab_buttons').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
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
// ボタン処理等　ここまで */