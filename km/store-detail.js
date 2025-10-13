
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const shopId = params.get("shop");

  const messages = {
    loading: "",
    notFound: "対象の企業の商品データが見つかりません。（キャッシュ済みデータを使用）",
    fetchError: "データの取得に失敗しました。サーバーが混雑している可能性があります。しばらくしてから再度お試しください。",
    shopNotFound: "店舗情報が見つかりません。",
    shopLoadError: "店舗データの読み込みに失敗しました。"
  };

  fetch("shops.json")
    .then(response => {
      if (!response.ok) throw new Error("shops.jsonの取得に失敗しました");
      return response.json();
    })
    .then(shops => {
      const shop = shops.find(s => String(s.id) === shopId);

      if (!shop) {
        // ページ全体を書き換えないよう、エラーバナーを表示する
        showError(messages.shopNotFound);
        return;
      }

      // 店舗情報の表示（要素が見つからない場合は安全にフォールバック）
      const elShopName = document.getElementById("shop-name");
      if (elShopName) {
        elShopName.textContent = `【${shop.name}】`;
      } else {
        console.warn('shop-name 要素が見つかりません。');
      }

      const elShopCatch = document.getElementById("shop-catch");
      if (elShopCatch) {
        elShopCatch.textContent = shop.catch || '';
      } else {
        console.warn('shop-catch 要素が見つかりません。');
      }

      const shopImage = document.getElementById("shop-image");
      if (shopImage) {
        try {
          shopImage.src = shop.image || 'no-image.png';
          shopImage.alt = `${shop.name}の店舗写真`;
        } catch (err) {
          console.warn('shop-image の設定中にエラー:', err);
          shopImage.src = 'no-image.png';
        }
        shopImage.onerror = () => {
          shopImage.src = "no-image.png";
        };
      } else {
        console.info('shop-image 要素が存在しないため画像表示はスキップします。');
      }

      const elShopPr = document.getElementById("shop-pr");
      if (elShopPr) {
        elShopPr.innerHTML = Array.isArray(shop.pr) ? shop.pr.join("<br>") : (shop.pr || '');
      } else {
        console.warn('shop-pr 要素が見つかりません。');
      }

      // 混雑状況の表示
      const crowdElement = document.getElementById("cs");
      if (crowdElement) {
        crowdElement.textContent = "ただいまの混雑状況: 取得中...";
      } else {
        console.warn('混雑表示用要素 (cs) が見つかりません。');
      }

      // 混雑状況取得用 GAS URL
      const crowdUrl = "https://script.google.com/macros/s/AKfycbwT4gS9ZQtDncvbyyHzZewqI-CprzojeoZjXc9jbJ1f1GdyTr611mi9Ja1FSZn7dVtI/exec";

      fetch(crowdUrl)
        .then(response => {
          if (!response.ok) throw new Error("混雑状況の取得に失敗しました");
          return response.json();
        })
        .then(data => {
          try {
            const crowdInfo = Array.isArray(data) ? data.find(item => item.company_name?.trim() === shop.company_name?.trim()) : null;
            if (crowdElement) {
              if (crowdInfo && crowdInfo.crowd_status) {
                const status = crowdInfo.crowd_status.trim();
                let message = "";
                let color = "black";

                if (status.includes("空き")) {
                  message = "ゆっくりとお買い物いただけます";
                  color = "lightgreen";
                } else if (status.includes("やや混雑")) {
                  message = "少し混み合っています。時間に余裕を持ってお越しください";
                  color = "orange";
                } else if (status.includes("混雑")) {
                  message = "現在大変混み合っています。お時間に注意してご来店ください";
                  color = "red";
                } else if (status.includes("非営業")) {
                  message = "ただいま営業しておりません。";
                  color = "#faf";
                } else {
                  message = "混雑状況の詳細は不明です。"
                }

                crowdElement.innerHTML = `ただいまの混雑状況: ${status}<br>（${message}）`;
                crowdElement.style.color = color;
              } else {
                crowdElement.textContent = "ただいまの混雑状況: データなし";
                crowdElement.style.color = "gray";
              }
            } else {
              console.info('crowdElement が存在しないため混雑表示はスキップしました。');
            }
          } catch (err) {
            console.error('混雑状況処理中にエラー:', err);
          }
        })
        .catch(error => {
          console.error("混雑状況取得エラー:", error);
          if (crowdElement) {
            crowdElement.textContent = "ただいまの混雑状況: 取得失敗";
            crowdElement.style.color = "gray";
          }
        });


      // 商品カードの表示
      const productList = document.getElementById("product-list");
      if (!productList) {
        console.warn('product-list 要素が見つかりません。商品カード描画をスキップします。');
      } else if (!Array.isArray(shop.products)) {
        console.warn('shop.products が配列ではないため描画できません。');
      } else {
        shop.products.forEach(p => {
          const card = document.createElement("div");
          card.className = "product-card";

          const img = document.createElement("img");
          img.src = p.image;
          img.alt = p.name;
          img.onerror = () => {
            img.src = "no-image.png";
          };

          const body = document.createElement("div");
          body.className = "product-card-body";
          body.innerHTML = `
          <h3>${p.name}</h3>
          <p class="product-price">¥${Number(p.price).toLocaleString()}</p>
        `;

          card.appendChild(img);
          card.appendChild(body);
          productList.appendChild(card);
        });
      }

      // モーダル処理
      const modal = document.getElementById("modal");
      const modalBody = document.getElementById("modal-body");
      const modalClose = document.getElementById("modal-close");
      // フォーカス用変数
      let lastFocusedElement = null;

      // フォーカストラップを有効にする関数
      /*
        trapFocus(container)
        - 目的: モーダルを開いた際に Tab キーの移動をモーダル内に制限する（フォーカスをトラップする）。
        - 引数: container - トラップ対象の DOM 要素（通常はモーダル）
        - 返り値: イベントリスナーを解除する関数（呼ぶとトラップを解除できる）
      */
      function trapFocus(container) {
        const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusable = Array.from(container.querySelectorAll(focusableSelectors)).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
        if (focusable.length === 0) return null;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        function handleKey(e) {
          if (e.key !== 'Tab') return;
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }

        container.addEventListener('keydown', handleKey);
        return () => container.removeEventListener('keydown', handleKey);
      }

      const closeModal = () => {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
        // フォーカス復帰
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
        // フォーカストラップ解除
        if (typeof releaseTrap === 'function') releaseTrap();
      };

      let releaseTrap = null;

      const showStatusBtn = document.querySelector(".show-status");
      if (!showStatusBtn) {
        console.warn('show-status ボタンが見つかりません。モーダル機能は無効化されます。');
      } else {
        let modalBusy = false;
        showStatusBtn.addEventListener("click", (e) => {
          if (modalBusy) {
            console.info('モーダルは既に読み込み中です。二重オープンを防ぎます。');
            return;
          }
          modalBusy = true;
          // 開く前にトリガー要素を覚えておく
          lastFocusedElement = e.currentTarget || document.activeElement;
          if (!modal) {
            console.error('モーダル要素が DOM 上に見つかりません。処理を中断します。');
            modalBusy = false;
            return;
          }
          modal.classList.remove("hidden");
          document.body.classList.add("modal-open");

          // 検索UI初期化・非表示
          const searchInput = document.getElementById("product-search");
          if (searchInput) {
            try { searchInput.value = ""; searchInput.style.display = "none"; } catch (err) { console.warn('searchInput 初期化エラー', err); }
          } else {
            console.warn('product-search 要素が見つかりません。検索機能は無効化されます。');
          }
          const modalProductList = document.getElementById("modal-product-list");
          // 読み込み中表示は DOM で挿入
          if (!modalProductList) {
            console.error('modal-product-list が見つかりません。モーダル内容を表示できません。');
            // 障害時はモーダルオーバーレイを閉じる
            const existingOverlay = document.getElementById('modal-loading-full');
            if (existingOverlay) existingOverlay.style.display = 'none';
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            modalBusy = false;
            return;
          }
          modalProductList.innerHTML = ""; // clear
          const loadingP = document.createElement('p');
          loadingP.textContent = messages.loading || '読み込み中...';
          modalProductList.appendChild(loadingP);

          // バックドロップクリックで閉じる
          modal.addEventListener('click', function backdropHandler(evt) {
            if (evt.target === modal) closeModal();
          });

          // フォーカスをモーダル内の最初のフォーカス可能要素へ移す
          // （検索入力が表示された後に呼ぶが、とりあえずモーダル内を探す）
          setTimeout(() => {
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
            const focusable = modal.querySelectorAll(focusableSelectors);
            if (focusable.length) {
              focusable[0].focus();
            } else {
              // フォーカスが取れない場合は閉じるボタンへ
              modalClose.focus();
            }
          }, 50);

          // フォーカストラップを有効化
          releaseTrap = trapFocus(modal);

          // モーダル全画面の loading overlay を追加
          modal.classList.add('modal-loading--active');
          // create or show full overlay element
          let fullOverlay = document.getElementById('modal-loading-full');
          if (!fullOverlay) {
            fullOverlay = document.createElement('div');
            fullOverlay.id = 'modal-loading-full';
            fullOverlay.className = 'modal-loading modal-loading--full';
            fullOverlay.setAttribute('role', 'status');
            fullOverlay.setAttribute('aria-live', 'polite');

            const spin = document.createElement('div');
            spin.className = 'spinner';
            fullOverlay.appendChild(spin);

            const msg = document.createElement('div');
            msg.className = 'loading-message';
            msg.textContent = '読み込み中です。※ネットワークの状況により読み込みに時間がかかる可能性があります';
            fullOverlay.appendChild(msg);

            modal.appendChild(fullOverlay);
          } else {
            fullOverlay.style.display = 'flex';
          }

          // 内部の fetchWithRetry (local implementation)
          /*
            fetchWithRetryLocal(url, retries, timeout)
            - 目的: モーダル内で使用する小さな fetch+retry ラッパー。
            - 引数: url, retries (最大リトライ回数), timeout (ミリ秒)
            - 戻り値: 成功時は JSON を返す。最終的に失敗すると例外を投げる。
          */
          async function fetchWithRetryLocal(url, retries = 2, timeout = 180000) {
            for (let i = 0; i <= retries; i++) {
              const controller = new AbortController();
              const id = setTimeout(() => controller.abort(), timeout);
              try {
                const res = await fetch(url, { signal: controller.signal });
                clearTimeout(id);
                if (!res.ok) throw new Error('network');
                return await res.json();
              } catch (err) {
                clearTimeout(id);
                if (i === retries) throw err;
                await new Promise(r => setTimeout(r, 400 * (i + 1)));
              }
            }
          }

          // debug logging: ensure gasUrl exists and is a string
          if (!shop.gasUrl) {
            console.warn('shop.gasUrl が未設定です。モーダル内データ取得はスキップします。', shop);
            modalProductList.innerHTML = '';
            const p = document.createElement('p');
            p.textContent = messages.notFound;
            modalProductList.appendChild(p);
            if (fullOverlay) fullOverlay.style.display = 'none';
            modal.classList.remove('modal-loading--active');
            modalBusy = false;
            return;
          }

          console.info('fetching GAS data for modal from:', shop.gasUrl);

          fetchWithRetryLocal(shop.gasUrl, 2, 180000)
            .then(response => {
              // already parsed by fetchWithRetryLocal
              return response;
            })
            .then(data => {
              if (!Array.isArray(data)) throw new Error("GASデータ形式が不正です");

              let currentCompany = "";
              const matchedProducts = [];

              data.forEach(item => {
                if (item.company_name) {
                  currentCompany = item.company_name.trim();
                } else if (currentCompany === shop.company_name.trim() && item.pdname) {
                  matchedProducts.push(item);
                }
              });

              // 商品リスト描画関数（innerHTML を使わず DOM を生成）
              /*
                renderProducts(products)
                - 目的: モーダル内の商品配列を受け取り、DOM ノードを生成して表示する。
                - 引数: products - 商品オブジェクトの配列
                - 備考: innerHTML を極力使わないことで XSS リスクを低減している。
              */
              function renderProducts(products) {
                modalProductList.innerHTML = "";
                if (products.length > 0) {
                  const header = document.createElement('h3');
                  header.style.marginTop = '1em';
                  header.textContent = shop.company_name;
                  modalProductList.appendChild(header);

                  products.forEach(item => {
                    const isSoldOut = item.sales === "完売";
                    const itemWrap = document.createElement('div');
                    itemWrap.className = 'item';
                    itemWrap.style.marginBottom = '16px';
                    itemWrap.style.padding = '8px';
                    itemWrap.style.backgroundColor = isSoldOut ? '#eee' : '#fff';
                    itemWrap.style.borderBottom = '1px solid #ccc';

                    const title = document.createElement('strong');
                    title.textContent = item.pdname || '(名称不明)';
                    itemWrap.appendChild(title);

                    const br = document.createElement('br');
                    itemWrap.appendChild(br);

                    const price = document.createElement('div');
                    price.textContent = `価格: ¥${Number(item.price || 0).toLocaleString()}`;
                    itemWrap.appendChild(price);

                    const sales = document.createElement('div');
                    sales.textContent = `販売状況: ${item.sales || '不明'}`;
                    sales.style.color = isSoldOut ? 'red' : 'black';
                    itemWrap.appendChild(sales);

                    modalProductList.appendChild(itemWrap);
                  });
                } else {
                  const p = document.createElement('p');
                  p.textContent = messages.notFound;
                  modalProductList.appendChild(p);
                }
              }

              // 初期表示 & 検索窓表示
              renderProducts(matchedProducts);
              searchInput.style.display = "block";

              // hide full overlay
              if (fullOverlay) fullOverlay.style.display = 'none';
              modal.classList.remove('modal-loading--active');
              // allow reopening / retries
              modalBusy = false;

              // 検索イベント
              searchInput.addEventListener("input", function () {
                const keyword = this.value.trim();
                const filtered = matchedProducts.filter(item =>
                  item.pdname && item.pdname.includes(keyword)
                );
                if (filtered.length > 0) {
                  renderProducts(filtered);
                } else {
                  modalProductList.innerHTML = '<p>該当する商品はありません。</p>';
                }
              });
            })
            .catch(error => {
              console.error("GASデータ取得エラー:", error);
              if (fullOverlay) fullOverlay.style.display = 'none';
              modal.classList.remove('modal-loading--active');
              modalProductList.innerHTML = "";
              const p = document.createElement('p');
              p.textContent = messages.fetchError;
              modalProductList.appendChild(p);
              // add retry button inside modal
              const retryBtn = document.createElement('button');
              retryBtn.textContent = '再試行';
              retryBtn.style.display = 'block';
              retryBtn.style.margin = '12px auto';
              retryBtn.addEventListener('click', () => {
                retryBtn.disabled = true;
                // rerun the click handler to fetch again
                document.querySelector('.show-status').click();
              });
              modalProductList.appendChild(retryBtn);
              // allow retrying/opening again
              modalBusy = false;
            });
        });
      }

      modalClose.addEventListener("click", closeModal);

      // Esc で閉じる（既存）
      window.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
      });
    })
    .catch(error => {
      console.error("shops.jsonの読み込みに失敗しました:", error);
      showError(messages.shopLoadError);
    });

  // --- ヘルパー: 非破壊のエラーバナー表示 ---
  /*
    showError(msg)
    - 目的: ページの主要領域に非破壊でエラーバナーを表示する（document.body を書き換えない）。
    - 引数: msg - 表示するメッセージ文字列
  */
  function showError(msg) {
    // メイン領域に挿入するが、無ければ body の先頭に追加
    const container = document.querySelector('main') || document.body;
    let banner = document.getElementById('error-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'error-banner';
      banner.setAttribute('role', 'alert');
      banner.style.background = '#ffe8e8';
      banner.style.color = '#800';
      banner.style.padding = '12px';
      banner.style.margin = '8px 0';
      banner.style.border = '1px solid #f5c2c2';
      banner.style.borderRadius = '4px';
      // insert at top of container
      container.insertBefore(banner, container.firstChild);
    }
    banner.textContent = msg;
  }
});
