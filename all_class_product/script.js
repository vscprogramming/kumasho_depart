// --- オートスクロール機能 ---
(function () {
  const INACTIVITY_TIME = 5000; // 5秒
  const SCROLL_STEP = 2; // 1回のスクロール量(px)
  const SCROLL_INTERVAL = 20; // スクロール間隔(ms)
  let inactivityTimer = null;
  let autoScrollTimer = null;
  let isAutoScrolling = false;

  function startAutoScroll() {
    if (isAutoScrolling) return;
    isAutoScrolling = true;
    autoScrollTimer = setInterval(() => {
      // 最下部判定
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        window.scrollBy(0, SCROLL_STEP);
      }
    }, SCROLL_INTERVAL);
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    stopAutoScroll();
    inactivityTimer = setTimeout(() => {
      startAutoScroll();
    }, INACTIVITY_TIME);
  }

  // ユーザー操作イベント
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'].forEach(evt => {
    window.addEventListener(evt, resetInactivityTimer, { passive: true });
  });

  // 初期化
  resetInactivityTimer();
})();
// ...existing code...
const apiConfigs = [
  { url: "https://script.google.com/macros/s/AKfycbzHsNfnfnOqQpJaD-rSgHRGsfTcxfrA6i2X-O8JhlvKuHLd-SBO3-OTXc6RjEwnNswp/exec", className: "1-1" },
  { url: "https://script.google.com/macros/s/AKfycbyXwQXuoqOi2IvKuCxYI5sqi3Sz2CcuXAFH4etCKF_bT-bpJJ3q65K0mfSV2k6Bixb3oA/exec", className: "1-2" },
  { url: "https://script.google.com/macros/s/AKfycbzMAAW1BHqbmXCv3VK3PZZGTZlILpN2Idz0ejX-KwiC0taaUKehSrhzX6rsDjUokX3xMw/exec", className: "1-3" },
  { url: "https://script.google.com/macros/s/AKfycbz2xNt-rGReQ0E6UOpQ5V9uNyFfb5HSMKqUaa9g-99kExVJz3n8DKtysbmtK7GIIebn/exec", className: "1-4" },
  { url: "https://script.google.com/macros/s/AKfycbzNvt0g4hJI6ZIXOB5iuWFfcLk4aNHtzCTprHQpAangwuGe3r1vVkwZO8aiMuwLtKSHqQ/exec", className: "1-5" },
  { url: "https://script.google.com/macros/s/AKfycby4ijWRrgG4xcIeOHUoGq-nV5a4CUSHbovnFP5zlDyNyN4Omin1r-4caw08gMoZibhl/exec", className: "1-6" },
  { url: "https://script.google.com/macros/s/AKfycbyZJ2Wk9rsK0VHfUmq41gYMTmYoitdGNoW06cpockjkF6i1pgiYnrUySwN3id_mrK1X/exec", className: "1-7" },
  { url: "https://script.google.com/macros/s/AKfycbyl3lg13ygmc8xqAhMjsvtEcYd13GAA_FvGLcDQU2LXWCkZaVXpfNgJDX2-PxBFguJz/exec", className: "1-8" },
  { url: "https://script.google.com/macros/s/AKfycbwj43SO1avs2MCSOyoW3XMvX6VTADXYO7HFOsgs5d8mqE9qpXulVmimGHOxIbF__hf0Bw/exec", className: "1-9" },
  { url: "https://script.google.com/macros/s/AKfycbxnl4XompT1ZQlZhByBYitPlopkrSCUHOcO5VImTwmLIiU-886O_m6wCpHb13yjskLp/exec", className: "2-1" },
  { url: "https://script.google.com/macros/s/AKfycbyC285RKzw7FJvpHwKKgjhjWj8QjjJ5vFwvwIHAfqENUiRKZga0tGCclP1h1iKvZ4_yLQ/exec", className: "2-2" },
  { url: "https://script.google.com/macros/s/AKfycbxiO8OP0D1WIRNj_7Ik5EJaFaVo6lY0IZ34Azd6nFv1OwbrMtIympaKWAo8LofNSncjeg/exec", className: "2-3" },
  { url: "https://script.google.com/macros/s/AKfycbw0dGht80ag03xSmTLCfSpUamPnYmrPILEgHBrz0JO1RRaRIHhy6xuprgtEFiDM3ClJHA/exec", className: "2-4" },
  { url: "https://script.google.com/macros/s/AKfycbwKiEErOb1Vq5akQQYhnn01UprfUpJTUGiobnljq8Jql5miANCasut_bppOumXMQeB0/exec", className: "2-5" },
  { url: "https://script.google.com/macros/s/AKfycbwq_DMzG-GnyhOT7XwqhQ_13e3BA--RV7P4HdjfMeETomzRPwO8TH_XWdVJMesfCeq5/exec", className: "2-6" },
  { url: "https://script.google.com/macros/s/AKfycbwP0lWskCDnE2jEdJ7rc7-LTeEpPm6_sFAGoB8v5Nv4yFH5TLQ6gE9afAMaB5dSSV9K/exec", className: "2-7" },
  { url: "https://script.google.com/macros/s/AKfycbw0xmJy66CXDGQAU-qMrge3_b4dy4GM1oX0Xj8ZgYnLbI3baqQqLl6C7JRrO8rsA_Do/exec", className: "2-8" },
  { url: "https://script.google.com/macros/s/AKfycbzPHA0i_IGINSjDtkzW0ryAEkHP7mWvxl60hV6xUhmHYAWtaPT5V8-rDECxx-3LHwggzA/exec", className: "2-9" },
  { url: "https://script.google.com/macros/s/AKfycbzr6JvxmbbX8c1n54khjn8BfimxQy-PPvOmRv9P5KliiW9kdXhiapd2g6n-UEUzqft5/exec", className: "3-1" },
  { url: "https://script.google.com/macros/s/AKfycbwmFwc14PTykOw_jxMYKtqc96_6TidvyZYzuN5-XiYdq8dsRv9blKkWGU42-i2TNJoQDg/exec", className: "3-2" },
  { url: "https://script.google.com/macros/s/AKfycbxPrz7_fbgslp6n86uKT7kWfANSXyNv2n0wUL20QSH805MZDmeoaC7hmTXMhVOr2lGU6Q/exec", className: "3-3" },
  { url: "https://script.google.com/macros/s/AKfycbzvsrQzO0C9vzJ5TTgRA9zk05imKoYGjVzM0i-EWspbkyuDcc8kn3FI75FfYQufjIYbpA/exec", className: "3-4" },
  { url: "https://script.google.com/macros/s/AKfycbxS9YIopnCOHJdkm0XxNugd2dUm-37gIyiyIRXjbf0bPgCYsbe75nTQjDKofo-CUouX/exec", className: "3-5" },
  { url: "https://script.google.com/macros/s/AKfycbxiyi8kUs3zzSXr3OSgyhFF_Yf5Z1Y0G7vTLcNUIEXeQNHOk_vnTIW-fWP7CoCXtlHZ/exec", className: "3-6" },
  { url: "https://script.google.com/macros/s/AKfycbxUuxK-c3lBffnvs_nMSYqdEazTTpRGphiyq56oKJ_BWttojtzTDYpdTg6GUYPpDK3j/exec", className: "3-7" },
  { url: "https://script.google.com/macros/s/AKfycbxScIiePXzOq-D9SKt7j5KfHCxiaLsI_AcCzhOPDULYh8kZYHHuwnN69IMJrSP5pYN6/exec", className: "3-8" },
  { url: "https://script.google.com/macros/s/AKfycbyEHLBgehDKx2n8OztlXKV_V3c71krJc1dIgIE4mM8CdBIYvK6wZb_eb1oi98LzwQQqWw/exec", className: "3-9" }
];

let allProducts = [];
let currentDisplayMode = `all`;

async function fetchFromGAS(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("取得失敗:", url, error);
    return [];
  }
}

function parseProducts(rawData, className) {
  const products = [];
  let currentStore = '';

  rawData.forEach(item => {
    if (item.company_name) {
      currentStore = item.company_name;
    } else if (item.pdname || item.price || item.sales) {
      products.push({
        name: item.pdname ?? "未入力",
        price: item.price ?? "未入力",
        status: item.sales ?? "未入力",
        store: currentStore,
        class: className
      });
    }
  });

  return products;
}

function formatPrice(value) {
  const num = Number(value);
  return isNaN(num) ? value : num.toLocaleString('ja-JP');
}

function getStatusClass(status) {
  const trimmed = status.trim();
  switch (trimmed) {
    case '販売中': return 'status-on-sale';
    case '完売': return 'status-sold-out';
    case '仕入準備中': return 'status-prep';
    case '残りわずか': return 'status-limited';
    default: return '';
  }
}

function displayData(dataArray) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  if (dataArray.length === 0) {
    container.innerHTML = '<tr><td colspan="5">商品データが見つかりませんでした。</td></tr>';
    return;
  }

  dataArray.forEach(({ name, price, status, store, class: className }) => {
    const row = document.createElement('tr');
    const statusClass = getStatusClass(status);
    const rowClass = status.trim() === '完売' ? 'row-sold-out' : '';
    row.className = rowClass;

    row.innerHTML = `
      <td>${store}</td>
      <td>${className}</td>
      <td>${name}</td>
      <td>¥${formatPrice(price)}</td>
      <td class="${statusClass}">${status}</td>
    `;

    container.appendChild(row);
  });
}

function updateTimestamp() {
  const now = new Date();
  const formatted = now.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('last-updated').textContent = `最終更新：${formatted}`;
}

document.getElementById('status-filter').addEventListener('change', (e) => {
  const selected = e.target.value;
  const filtered = selected === 'すべて'
    ? allProducts
    : allProducts.filter(product => product.status.trim() === selected);
  displayData(filtered);
});

async function loadAllData() {
  const loading = document.getElementById('loading-message');
  loading.classList.remove('hidden');

  const fetchPromises = apiConfigs.map(async config => {
    const raw = await fetchFromGAS(config.url);
    return parseProducts(raw, config.className);
  });

  const results = await Promise.all(fetchPromises);
  allProducts = results.flat();

  loading.classList.add('hidden');
  displayData(allProducts);
  updateTimestamp();
}

loadAllData();

setInterval(() => {
  const scrollY = window.scrollY; // 現在のスクロール位置を記録

  loadAllData().then(() => {
    window.scrollTo(0, scrollY); // 再描画後に元の位置へスクロール
  });
}, 120000); // ← 120秒（必要に応じて調整可能）

document.getElementById('search-toggle').addEventListener('click', () => {
  document.getElementById('search-modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('search-modal').classList.add('hidden');
});

document.getElementById('search-button').addEventListener('click', () => {
  const keyword = document.getElementById('search-input').value.trim().toLowerCase();
  const status = document.getElementById('status-filter').value;

  const filtered = allProducts.filter(product => {
    const matchKeyword =
      product.name.toLowerCase().includes(keyword) ||
      product.store.toLowerCase().includes(keyword) ||
      product.class.toLowerCase().includes(keyword);

    const matchStatus = status === 'すべて' || product.status.trim() === status;

    return matchKeyword && matchStatus;
  });

  displayData(filtered);
  document.getElementById('search-modal').classList.add('hidden');
});


//おすすめ表示
async function fetchOsusumeList() {
  try {
    const response = await fetch('osusume.json');
    if (!response.ok) throw new Error(`おすすめJSON取得失敗: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("おすすめ商品の読み込み失敗:", error);
    return [];
  }
}

function filterOsusumeProducts(allProducts, osusumeList) {
  return allProducts.filter(product =>
    osusumeList.some(osu =>
      product.name.trim() === osu.name.trim() &&
      product.store.trim() === osu.store.trim() &&
      product.class.trim() === osu.class.trim()
    )
  );
}

function showSwitchingMessage() {
  const msg = document.getElementById('switching-message');
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 1000);
}

function toggleActiveButton(activeId) {
  document.getElementById('show-all').classList.remove('active');
  document.getElementById('show-osusume').classList.remove('active');
  document.getElementById(activeId).classList.add('active');
}

document.getElementById('show-all').addEventListener('click', () => {
  currentDisplayMode = 'all';
  showSwitchingMessage();
  displayData(allProducts);
  toggleActiveButton('show-all');
});

document.getElementById('show-osusume').addEventListener('click', async () => {
  currentDisplayMode = 'osusume';
  showSwitchingMessage();
  const osusumeList = await fetchOsusumeList();
  const filtered = filterOsusumeProducts(allProducts, osusumeList);
  displayData(filtered);
  toggleActiveButton('show-osusume');

});

async function loadAllData() {
  const loading = document.getElementById('loading-message');
  loading.classList.remove('hidden');

  try {
    const fetchPromises = apiConfigs.map(async config => {
      const raw = await fetchFromGAS(config.url);
      return parseProducts(raw, config.className);
    });

    const results = await Promise.all(fetchPromises);
    allProducts = results.flat();
    updateTimestamp();

    if (currentDisplayMode === 'osusume') {
      const osusumeList = await fetchOsusumeList();
      const filtered = filterOsusumeProducts(allProducts, osusumeList);
      displayData(filtered);
      toggleActiveButton('show-osusume');
    } else {
      displayData(allProducts);
      toggleActiveButton('show-all');
    }
  } catch (error) {
    console.error("データ読み込みエラー:", error);
    displayData([]);
  } finally {
    loading.classList.add('hidden'); // ← ここが重要
  }
}
