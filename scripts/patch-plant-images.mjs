import fs from "fs";

const path = "lib/data.ts";
let c = fs.readFileSync(path, "utf8");

const re =
  /id: "([^"]+)",[\s\S]*?thumbnailUrl: TRANSPARENT_PIXEL,\s*\n\s*imageUrl: TRANSPARENT_PIXEL,/g;

let n = 0;
c = c.replace(re, (match, id) => {
  n++;
  return match
    .replace("thumbnailUrl: TRANSPARENT_PIXEL,", `thumbnailUrl: plantImage("${id}"),`)
    .replace("imageUrl: TRANSPARENT_PIXEL,", `imageUrl: plantImage("${id}"),`);
});

fs.writeFileSync(path, c);
console.log(`Patched ${n} plants`);
