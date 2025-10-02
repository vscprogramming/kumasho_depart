const crowdUrl = "https://script.googleusercontent.com/a/macros/g.bears.ed.jp/echo?user_content_key=AehSKLjTBZ6qY3SGiGmr1EgEKzrpbr635MZG_fM75h59TcFzt0E8G47YPtdd40xQsCVqusSMHsRSkU0SO1DYf8yTlsT9YXXF9rRfBm-X-uPC_2WaZnhEUjIGR4pV1uEm-t53wtNdAoXpvfOWVVIaoxyKcSdv5nkjOJ98SrahQ-1BU0E8cVQjOZ-GYJoBTYXUGxKFEr1EvPbejbQ6ktMI-wVXEIjnWCAPK5I_aTR3obKpQECLIv_GyMFujgx8MehRqlfItKDCqu2VQGZGjXhTvVHplN3dsYCopNhzKwrRrNrOl-ZNZXvFSnE&lib=MAdEE3doohcxWfv6P4X-ZtiKctFh_LT3R";

let crowdMap = new Map();

async function fetchCrowdStatus() {
  try {
    const res = await fetch(crowdUrl);
    if (!res.ok) throw new Error("混雑状況の取得に失敗しました");
    const crowdData = await res.json();

    crowdData.forEach(item => {
      if (item.company_name && item.crowd_status) {
        crowdMap.set(item.company_name.trim(), item.crowd_status.trim());
      }
    });
  } catch (error) {
    console.error("混雑状況取得エラー:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("product-grid");
  if (!grid) {
    console.error("product-grid 要素が見つかりません。");
    return;
  }

  await fetchCrowdStatus();

  try {
    const res = await fetch("shops.json");
    if (!res.ok) throw new Error("shops.json の取得に失敗しました");

    const shops = await res.json();

    shops.forEach(shop => {
      const status = crowdMap.get(shop.company_name?.trim()) || "データなし";

      let message = "";
      let color = "black";

      if (status.includes("空き")) {
        message = "ゆったりとお買い物いただけます";
        color = "lightgreen";
      } else if (status.includes("やや混雑")) {
        message = "少し混み合っています";
        color = "orange";
      } else if (status.includes("混雑")) {
        message = "現在大変混み合っています";
        color = "red";
      } else if (status.includes("非営業")) {
        message = "営業していません";
        color = "purple";
      } else {
        message = "混雑状況不明";
        color = "gray";
      }

      const card = document.createElement("a");
      card.href = `store-detail.html?shop=${shop.id}`;
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = shop.image;
      img.alt = `${shop.name}の画像`;
      img.loading = "lazy";

      const title = document.createElement("h3");
      title.innerHTML = `${shop.id}<br>【${shop.name}】`;

      const catchCopy = document.createElement("p");
      catchCopy.className = "class-pr";
      catchCopy.textContent = shop.catch;

      const crowdText = document.createElement("p");
      crowdText.style.color = color;
      crowdText.style.fontWeight = "bold";
      crowdText.innerHTML = `混雑状況: ${status}<br>（${message}）`;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(catchCopy);
      card.appendChild(crowdText);

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("店舗データの読み込みに失敗しました:", error);
    grid.innerHTML = "<p>店舗情報の取得に失敗しました。</p>";
  }
});
