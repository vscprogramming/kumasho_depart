# 熊商デパート — 開発メモ

---

## 主要ファイル（目的と編集注意）

- `customer.html`
  - 目的: サイトのトップページ（イントロ/ナビ）。
  - 編集時の注意: 表示や配色は `customer.css` を編集。スクリプトの挙動を変える場合は `customer-vh-fix.js`, `store.js`, `store-detail.js` を確認。

- `store.html`
  - 目的: 店舗一覧ページ。`shops.json` を読み込みカードで表示。
  - 編集時の注意: レンダリング・再試行ロジックは `store.js`。グリッドやカードは `customer.css` の `.product-grid` / `.product-card` を編集。

- `store-detail.html`
  - 目的: 各店舗の詳細ページ。店舗画像、PR、商品一覧、モーダルによる全商品表示を提供。
  - 編集時の注意: モーダル要素ID は `modal`, `modal-content`, `modal-body`, `modal-close`。モーダルの読み込みは GAS から取得するため `store-detail.js` の fetch ロジックを確認。

- `event.html`, `map.html`
  - 目的: イベント・マップページのテンプレート。
  - 編集時の注意: イベントや地図APIを導入する場合はここにスクリプトを追加。動的データを利用する場合は `store.js` の fetch+retry を参考に。

- `customer.css`
  - 目的: 全体のスタイル（ヘッダー、グリッド、カード、モーダル等）。
  - 編集時の注意: モーダル関連スタイルはファイル下部に集約されています。モバイル向けの `--vh` フォールバックを利用しているので、レイアウト変更は各ブレークポイントを確認して適用する。

- `store.js`
  - 目的: `shops.json` を読み込み、店舗カードを生成する。混雑情報は GAS から取得してカードに非同期で反映。
  - 編集時の注意: `fetchWithRetry` や `renderSkeletons`、`showRetryBanner` といったヘルパーがあります。DOM の ID を変えるとスクリプト側も合わせる必要あり。

- `store-detail.js`
  - 目的: 店舗詳細を読み込み、モーダルで全商品を表示する処理を含む。フォーカストラップや非破壊エラーバナー等のユーティリティを含む。
  - 編集時の注意: 商品リストは DOM を生成する方針（innerHTML を乱用しない）。GAS エンドポイントを編集する場合はここを修正。

- `customer-vh-fix.js`
  - 目的: モバイルブラウザの動的なビューポート高さに対応するため、CSS変数 `--vh` を設定する。

- `shops.json`
  - 目的: 初期データの静的 JSON。将来的には API に移行することを推奨。

---
# shops.json の説明

このファイルは店舗データの配列です。JSON のためコメントは直接書けないため、構造説明をこの markdown に記載しています。

各オブジェクトのフィールド例:
- id: 店舗ID（例: "1-1-1"）
- name: 店舗名
- catch: キャッチコピー
- image: 店舗画像パス
- pr: PR 文の配列（表示に use する場合があり）
- products: 商品配列（各商品は name, price, image など）
- company_name: GAS 等で使う企業名の一致キー
- gasUrl: その店舗の詳細商品を取得する GAS のエンドポイント URL

編集時の注意:
- JSON の構造を変更する場合は `store.js` と `store-detail.js` のパース処理を合わせて変更してください。
- 画像パスや GAS URL を更新する際は正しい URL/パス形式になっているか確認してください。
