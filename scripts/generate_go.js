const fs = require("fs");
const path = require("path");

const brands = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/brands.json"), "utf8"));
console.log("Brands parsed successfully. Total count:", brands.length);

const goDir = path.join(__dirname, "../content/go");
if (!fs.existsSync(goDir)) {
  fs.mkdirSync(goDir, { recursive: true });
}

brands.forEach(b => {
  const content = `---
title: "正在安全跳转至 ${b.name}"
slug: "${b.slug}"
type: "go"
layout: "single"
---
`;
  fs.writeFileSync(path.join(goDir, `${b.slug}.md`), content, "utf8");
});

console.log("Generated go pages count:", fs.readdirSync(goDir).length);
