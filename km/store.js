document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("product-grid");

  if (!grid) {
    console.error("product-grid 要素が見つかりません。");
    return;
  }

  try {
    const res = await fetch("shops.json");
    if (!res.ok) throw new Error("shops.json の取得に失敗しました");

    const shops = await res.json();

    shops.forEach(shop => {
      const card = document.createElement("a");
      card.href = `store-detail.html?shop=${shop.id}`;
      card.className = "product-card";
      card.innerHTML = `
        <img src="${shop.image}" alt="${shop.name}の画像">
        <h3>${shop.id}<br>【${shop.name}】</h3>
        <p class="class-pr">${shop.catch}</p>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error("店舗データの読み込みに失敗しました:", error);
    grid.innerHTML = "<p>店舗情報の取得に失敗しました。</p>";
  }
});
