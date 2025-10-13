// customer-vh-fix.js
// 動的ビューポート高さのフォールバック設定
/*
  setVh
  - 目的: ブラウザの実際のウィンドウ高さから CSS 変数 `--vh` を設定する。
  - 背景: モバイルブラウザではアドレスバー等の表示により `100vh` が不安定になるため、JS で正確な高さを計算して CSS 側で利用する。
  - 使用方法: CSS 内で `height: calc(var(--vh, 1vh) * 100)` のように参照します。
  - 更新タイミング: DOMContentLoaded, resize, orientationchange で更新。
*/
(function() {
  function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
  document.addEventListener('DOMContentLoaded', setVh);
  // 初回実行
  setVh();
})();
