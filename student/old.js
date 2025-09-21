['resize', 'DOMContentLoaded'].forEach(event => window.addEventListener(event, () => resize_div()));

function resize_div() {
    const window_width = window.innerWidth, window_height = window.innerHeight;

    // さらに親要素
    Object.assign(document.getElementById('all').style, {
        width: `100%`,
        height: `100%`,
        display: 'flex'
    });

    // 親要素
    Object.assign(document.getElementById('left').style, {
        width: `17%`,
        height: `100%`,
        display: 'flex',
        flexDirection: 'column'
    });

    // タイトルdiv
    Object.assign(document.getElementById('title').style, {
        width: `100%`,
        height: `${window_height * 0.07}px`,
        fontSize: `2.6vmin`,
        backgroundColor: '#333333'
    });

    // 店舗選択タブ
    Object.assign(document.getElementById('store_tab').style, {
        width: '100%',
        height: `${window_height - window_height * 0.07}px`,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: `${window_height - window_height * 0.07}px`,
        backgroundColor: '#7b1f29'
    });

    // 商品一覧
    Object.assign(document.getElementById('products_window').style, {
        width: `83%`,
        height: `${window_height}px`,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: `${window_height}px`,
        backgroundColor: '#fff7dc',
        color: '#000',
        display: 'flex',
        justifyContent: 'center'
    });
}

var json_data;
let tab_select;

window.addEventListener('DOMContentLoaded', async () => {
    // ローディング表示

    await json_load();
    await content_generation();

    // ローディング非表示
});

async function json_load() {
    try {
        const response = await fetch('products.json');  // データ読み込み

        if (response.ok) {
            json_data = await response.json();
            console.log(json_data);
        } else {
            alert('データの読み込みに失敗しました。\n再読み込みします。');
            window.location.reload();
        }
    } catch(error)  {
        alert('ネットワークエラーが発生しました。\n再読み込みします。');
        window.location.reload();
    }
}

async function content_generation() {

    const company_count = json_data.length; // 企業数

    // タブボタン（左）・内容生成
    for (let c = 0; c < company_count + 1; c++) {
        const products_window = document.getElementById('products_window');

        if (c == 0) {
            const home_btn = Object.assign(document.createElement('button'), {
                className: 'home_btn',
                textContent: 'ホーム'
            });

            home_btn.dataset.index = c;
            document.getElementById('store_tab').appendChild(home_btn);

            const tab_contents = document.createElement('div');
            tab_contents.classList.add('tab_content');
            tab_contents.dataset.index = c;
            tab_contents.classList.add('show');

            const home_title = document.createElement('div');
            home_title.classList = 'home_title';
            Object.assign(home_title.style, {
                width: '100%'
            });

            const home_title_text = Object.assign(document.createElement('h1'), {
                textContent: 'ホーム'
            });

            Object.assign(home_title_text.style, {
                textAlign: 'center',
                color: '#000',
                display: 'absolute',
                fontSize: '5vw',
                fontWeight: 'bolder',
                margin: 0,
                zIndex: 100
            });

            home_title.appendChild(home_title_text);
            tab_contents.appendChild(home_title);

            products_window.appendChild(tab_contents);  // 最後
        } else {
            // タブボタン
            const tab_btns = Object.assign(document.createElement('button'), {
                className: 'links',
                textContent: json_data[c - 1].name
            });

            tab_btns.dataset.index = c;
            document.getElementById('store_tab').appendChild(tab_btns);

            const products_count = json_data[c - 1].products.length;    // 商品数

            // タブの作成

            // タイトル
            const tab_contents = document.createElement('div');
            tab_contents.classList.add('tab_content');
            tab_contents.dataset.index = c - 1;

            const shops_title = document.createElement('div');
            shops_title.classList = 'shops_title';

            Object.assign(shops_title.style, {
                width: '100%',
                height: '50%',
                display: 'flex',
                flexDirection: 'column'
            });

            const title_text = Object.assign(document.createElement('h1'), {
                textContent: json_data[c - 1].name
            });

            Object.assign(title_text.style, {
                textAlign: 'center',
                color: '#fff',
                position: 'absolute',
                fontSize: '5vw',
                fontWeight: 'bolder',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%)',
                margin: 0,
                zIndex: 100
            });

            shops_title.appendChild(title_text);
            
            // 写真
            const img = document.createElement('img');
            Object.assign(img, {
                src: json_data[c - 1].img,
                alt: json_data[c - 1].name
            });

            Object.assign(img.style, {
                
                height: '100%',
                margin: 0,
                filter: 'brightness(60%)'
            });

            shops_title.appendChild(img);
            tab_contents.appendChild(shops_title);

            // カード生成
            
            const products = document.createElement('div');
            products.classList = 'products';

            Object.assign(products.style, {
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '18px'
            });
            

            for (let p = 0; p < products_count; p++) {
                const products_card = Object.assign(document.createElement('div'), {
                    classList: 'card',
                    textContent: json_data[c - 1].products[p].name
                });

                Object.assign(products_card.style, {
                    backgroundColor: '#66f',
                    textAlign: 'center',
                    width: '95%',
                    height: '100%'
                });

                products.appendChild(products_card);
            }

            tab_contents.appendChild(products);
            products_window.appendChild(tab_contents);  // 最後
        }
    }    

    if (tab_select == null) {
        tab_select = 0;
        const first_tab = document.querySelector('#store_tab button');
        if (first_tab) first_tab.click();
    } else if (tab_select >= 0 && tab_select < company_count) {
        document.querySelectorAll('#store_tab button').forEach((btn, c) => btn.classList.toggle('active_tab', c == tab_select));
        document.querySelectorAll('.tab_content').forEach((div, c) => div.classList.toggle('show', c == tab_select));
    }
}

// タブ切り替え機構
document.getElementById('store_tab').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const index = event.target.dataset.index;
        tab_select = parseInt(index);
        document.querySelectorAll('#store_tab button').forEach(btn => btn.classList.remove('active_tab'));   // ボタン見た目
        event.target.classList.add('active_tab'); // ボタンの見た目変更はできることもあります。
        document.querySelectorAll('.tab_content').forEach((div, i) => div.classList.toggle('show', i == index));
    }
});
