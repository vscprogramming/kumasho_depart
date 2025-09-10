const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const app = express();
const PORT = 5503;
let reservations = [];

const classItems = {
  "1-A": { "焼きそば": 300, "ジュース": 150 },
  "1-B": { "たこ焼き": 350, "アイス": 200 },
  "2-A": { "カレー": 400, "ラムネ": 120 }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { name, class: className, item, quantity } = req.body;
  const unitPrice = classItems[className]?.[item] || 0;
  const total = unitPrice * parseInt(quantity);

  reservations.push({ name, class: className, item, quantity, unitPrice, total });
  res.send(<p>予約完了！合計金額：${total}円</p><a href="/">戻る</a>);
});

app.get('/export', (req, res) => {
  const classGroups = {};

  reservations.forEach(entry => {
    const className = entry.class;
    if (!classGroups[className]) classGroups[className] = [];
    classGroups[className].push(entry);
  });

  const outputDir = path.join(__dirname, 'data');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  for (const className in classGroups) {
    const parser = new Parser({
      fields: ["name", "class", "item", "quantity", "unitPrice", "total"]
    });
    const csv = parser.parse(classGroups[className]);
    const filePath = path.join(outputDir, ${className}.csv);
    fs.writeFileSync(filePath, csv, 'utf8');
  }

  res.send(<p>クラス別CSV（合計金額付き）を出力しました！</p><a href="/">戻る</a>);
});

app.listen(PORT, () => {
  console.log(http://localhost:${PORT} でサーバー起動中);
});
