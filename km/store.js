
const crowdUrl = 'https://script.google.com/macros/s/AKfycbwT4gS9ZQtDncvbyyHzZewqI-CprzojeoZjXc9jbJ1f1GdyTr611mi9Ja1FSZn7dVtI/exec';

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

// fetchWithRetry
// - 目的: fetch をタイムアウト（AbortController）付きで実行し、失敗時にリトライする。
// - 引数:
//   url: 取得先 URL
//   options: fetch のオプション（headers 等）
//   retries: 最大リトライ回数（初回 + retries 回試行）
//   timeout: タイムアウト（ミリ秒）
// - 戻り値: 成功時はレスポンスの JSON を返す。最終的に失敗すると例外を投げる。
async function fetchWithRetry(url, options = {}, retries = 2, timeout = 8000) {
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (!res.ok) throw new Error('network');
      return await res.json();
    } catch (err) {
      clearTimeout(id);
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
}

function renderSkeletons(grid, count = 6) {
  grid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'skeleton-card';
    grid.appendChild(s);
  }
}

// renderSkeletons
// - 目的: データ取得中に表示するプレースホルダ（スケルトン）を grid に挿入する。
// - 引数:
//   grid: 挿入先の DOM 要素
//   count: スケルトンの個数（デフォルト 6）

function showRetryBanner(grid, onRetry) {
  let banner = document.getElementById('retry-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'retry-banner';
    banner.style.background = '#fff4e5';
    banner.style.padding = '10px';
    banner.style.margin = '8px 0';
    banner.style.border = '1px solid #ffd9a8';
    banner.style.borderRadius = '6px';
  }
  banner.innerHTML = '';
  const msg = document.createElement('span');
  msg.textContent = 'データの取得に失敗しました。';
  const btn = document.createElement('button');
  btn.textContent = '再試行';
  btn.style.marginLeft = '12px';
  btn.addEventListener('click', () => onRetry());
  banner.appendChild(msg);
  banner.appendChild(btn);

  const container = grid.parentElement || document.body;
  container.insertBefore(banner, grid);
}

// showRetryBanner
// - 目的: データ取得失敗時に再試行ボタンを含むバナーを表示する。
// - 引数:
//   grid: バナーを挿入する目印となる要素（通常は product-grid）
//   onRetry: 再試行時に呼ばれるコールバック

function removeRetryBanner() {
  const banner = document.getElementById('retry-banner');
  if (banner && banner.parentElement) banner.parentElement.removeChild(banner);
}

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("product-grid");
  if (!grid) {
    console.error("product-grid 要素が見つかりません。");
    return;
  }

  try {
    // show skeletons while fetching shops
    renderSkeletons(grid, 6);
    // Try multiple paths for shops.json to improve robustness (and give clearer logs)
    async function loadShopsWithFallback() {
      const candidates = ['shops.json', './shops.json', '/shops.json'];
      let lastErr = null;
      for (const p of candidates) {
        try {
          const data = await fetchWithRetry(p, {}, 1, 6000);
          console.info(`shops.json loaded from '${p}'`);
          return data;
        } catch (err) {
          lastErr = err;
          console.warn(`failed to fetch ${p}:`, err && err.message ? err.message : err);
        }
      }
      // one more direct try with plain fetch to capture non-JSON/network errors
      try {
        const r = await fetch('shops.json');
        if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
        return await r.json();
      } catch (err) {
        console.error('All attempts to load shops.json failed:', lastErr || err);
        throw lastErr || err;
      }
    }

    const shops = await loadShopsWithFallback();

    removeRetryBanner();
    grid.innerHTML = '';

    shops.forEach(shop => {
      const card = document.createElement("a");
      card.href = `store-detail.html?shop=${shop.id}`;
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = shop.image;
      img.alt = shop.name;
      img.loading = "lazy";

      const title = document.createElement("h3");
      title.appendChild(document.createTextNode(shop.id));
      title.appendChild(document.createElement('br'));
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `【${shop.name}】`;
      title.appendChild(nameSpan);

      const catchCopy = document.createElement("p");
      catchCopy.className = "class-pr";
      catchCopy.textContent = shop.catch;

      const crowdText = document.createElement("p");
      crowdText.className = 'crowd-text';
      crowdText.style.color = 'gray';
      crowdText.style.fontWeight = 'bold';
      crowdText.textContent = '混雑状況: 取得中...';

      card.dataset.company = shop.company_name || '';

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(catchCopy);
      card.appendChild(crowdText);

      grid.appendChild(card);
    });

    // fetch crowd data with retry and update cards
    fetchWithRetry(crowdUrl, {}, 2, 6000).then(crowdData => {
      crowdMap = new Map();
      crowdData.forEach(item => {
        if (item.company_name && item.crowd_status) {
          crowdMap.set(item.company_name.trim(), item.crowd_status.trim());
        }
      });

      document.querySelectorAll('.product-card').forEach(card => {
        const company = card.dataset.company?.trim();
        const crowdText = card.querySelector('.crowd-text');
        if (!crowdText) return;
        const status = crowdMap.get(company) || 'データなし';

        let message = '';
        let message2 = '';
        let color = 'black';
        if (status.includes('空き')) {
          message = 'ゆったりと';
          message2 = 'お買い物いただけます';
          color = '#1a1';
        } else if (status.includes('やや混雑')) {
          message = '少し混み合っています';
          color = 'orange';
        } else if (status.includes('混雑')) {
          message = '大変混み合っています';
          color = 'red';
        } else if (status.includes('非営業')) {
          message = '営業していません';
          color = 'purple';
        } else {
          message = '混雑状況不明';
          color = 'gray';
        }
        crowdText.style.color = color;
        if (status.includes('空き')) {
          crowdText.innerHTML = `混雑状況: ${status} <br>（${message}<br>${message2}）`;
        } else {
          crowdText.innerHTML = `混雑状況: ${status} <br>（${message}）`;
        }
      });
    }).catch(err => {
      console.error('混雑情報更新エラー:', err);
      showRetryBanner(grid, () => {
        removeRetryBanner();
        document.dispatchEvent(new Event('DOMContentLoaded'));
      });
    });

  } catch (error) {
    console.error("店舗データの読み込みに失敗しました:", error);
    renderSkeletons(grid, 0);
    showRetryBanner(grid, () => {
      removeRetryBanner();
      document.dispatchEvent(new Event('DOMContentLoaded'));
    });
  }
});
