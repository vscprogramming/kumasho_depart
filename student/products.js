function resize_div() {
    const window_width = window.innerWidth;
    const window_height = window.innerHeight;

    // タイトルdiv
    Object.assign(document.getElementById('title').style, {
        width: `${window_width}px`,
        height: `${window_height * 0.07}px`,
        fontSize: `2.6vmin`
    });

    // 店舗・商品表示（最上）
    Object.assign(document.getElementById('store').style, {
        width: `${window_width}px`,
        height: `${window_height - window_height * 0.07}px`
    });

    // 店舗選択タブ
    Object.assign(document.getElementById('store_tab').style, {
        width: '17%',
        height: `${window_height - window_height * 0.07}px`
    });

    // 商品一覧
    Object.assign(document.getElementById('products_window').style, {
        width: `83%`,
        height: `${window_height - window_height * 0.07}px`
    });
}

['resize', 'DOMContentLoaded'].forEach(event => {
    window.addEventListener(event, () => resize_div())
});
