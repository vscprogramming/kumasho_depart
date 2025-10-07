document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const shopId = params.get("shop");

  const messages = {
    loading: "読み込み中...",
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
        document.body.innerHTML = `<p>${messages.shopNotFound}</p>`;
        return;
      }

      // 店舗情報の表示
      document.getElementById("shop-name").textContent = `【${shop.name}】`;
      document.getElementById("shop-catch").textContent = shop.catch;

      const shopImage = document.getElementById("shop-image");
      shopImage.src = shop.image;
      shopImage.alt = `${shop.name}の店舗写真`;
      shopImage.onerror = () => {
        shopImage.src = "no-image.png";
      };

      document.getElementById("shop-pr").innerHTML = shop.pr.join("<br>");

      // 混雑状況の表示
      const crowdElement = document.getElementById("cs");
      crowdElement.textContent = "ただいまの混雑状況: 取得中...";

      // 混雑状況取得用 GAS URL
      const crowdUrl = "https://script.google.com/macros/s/AKfycbwT4gS9ZQtDncvbyyHzZewqI-CprzojeoZjXc9jbJ1f1GdyTr611mi9Ja1FSZn7dVtI/exec";

      fetch(crowdUrl)
        .then(response => {
          if (!response.ok) throw new Error("混雑状況の取得に失敗しました");
          return response.json();
        })
        .then(data => {
          const crowdInfo = data.find(item => item.company_name?.trim() === shop.company_name?.trim());
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
            } else if (status.includes("非営業")){
              message = "ただいま営業しておりません。";
              color = "purple";
            } else{
              message="混雑状況の詳細は不明です。"
            }  

            crowdElement.innerHTML = `ただいまの混雑状況: ${status}<br>（${message}）`;
            crowdElement.style.color = color;
          } else {
            crowdElement.textContent = "ただいまの混雑状況: データなし";
            crowdElement.style.color = "gray";
          }
        })
        .catch(error => {
          console.error("混雑状況取得エラー:", error);
          crowdElement.textContent = "ただいまの混雑状況: 取得失敗";
          crowdElement.style.color = "gray";
        });


      // 商品カードの表示
      const productList = document.getElementById("product-list");
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

      // モーダル処理
      const modal = document.getElementById("modal");
      const modalBody = document.getElementById("modal-body");
      const modalClose = document.getElementById("modal-close");

      const closeModal = () => {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      };

      document.querySelector(".show-status").addEventListener("click", () => {
        modal.classList.remove("hidden");
        document.body.classList.add("modal-open");
  // 検索UI初期化・非表示
  const searchInput = document.getElementById("product-search");
  searchInput.value = "";
  searchInput.style.display = "none";
  const modalProductList = document.getElementById("modal-product-list");
  modalProductList.innerHTML = `<p>${messages.loading}</p>`;

        fetch(shop.gasUrl)
          .then(response => {
            if (!response.ok) throw new Error("GASレスポンスが不正です");
            return response.json();
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

            // 商品リスト描画関数
            function renderProducts(products) {
              if (products.length > 0) {
                const companyHeader = `<h3 style="margin-top: 1em;">${shop.company_name}</h3>`;
                const productList = products.map(item => {
                  const isSoldOut = item.sales === "完売";
                  return `
                    <div class="item" style="
                      margin-bottom: 16px;
                      padding: 8px;
                      background-color: ${isSoldOut ? '#eee' : '#fff'};
                      border-bottom: 1px solid #ccc;
                    ">
                      <strong>${item.pdname}</strong><br>
                      価格: ¥${Number(item.price || 0).toLocaleString()}<br>
                      販売状況: <span style="color:${isSoldOut ? 'red' : 'black'};">${item.sales}</span>
                    </div>
                  `;
                }).join('');
                modalProductList.innerHTML = companyHeader + productList;
              } else {
                modalProductList.innerHTML = `<p>${messages.notFound}</p>`;
              }
            }

            // 初期表示 & 検索窓表示
            renderProducts(matchedProducts);
            searchInput.style.display = "block";

            // 検索イベント
            searchInput.addEventListener("input", function() {
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
            modalProductList.innerHTML = `<p>${messages.fetchError}</p>`;
          });
      });

      modalClose.addEventListener("click", closeModal);
      
      window.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
      });
    })
    .catch(error => {
      console.error("shops.jsonの読み込みに失敗しました:", error);
      document.body.innerHTML = `<p>${messages.shopLoadError}</p>`;
    });
});
