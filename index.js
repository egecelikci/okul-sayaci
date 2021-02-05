const url =
  "https://raw.githubusercontent.com/egecelikci/okul-sayaci/data/data.json";
const https = require("https");
https.get(url, (res) => {
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });
  res.on("end", () => {
    const data = JSON.parse(body);
    const now = new Date();
    const start = new Date(data.start);
    const end = new Date(data.end);
    const progressOfThisYear = (now - start) / (end - start);
    const days = Math.floor((end - now) / (1000 * 60 * 60 * 24));
    function generateProgressBar() {
      const progressBarCapacity = 30;
      const passedProgressBarIndex = parseInt(
        progressOfThisYear * progressBarCapacity
      );
      const progressBar = Array(progressBarCapacity)
        .fill("▁")
        .map((value, index) => (index < passedProgressBarIndex ? "█" : value))
        .join("");
      return `${progressBar}`;
    }

    const readMe = `# okul-sayaci

Okulun başlamasına veya bitmesine ne kadar kaldığını ilerleme çubuğu ve geri sayım şeklinde gösteren minimalist ve basit bir site.

### web (credits: [hugovk/year-progress-bar](https://github.com/hugovk/year-progress-bar))

https://egecelikci.github.io/okul-sayaci

### düz metin (credits: [ebrugulec/year-progress](https://github.com/ebrugulec/year-progress))

okulların ${(data.situtation) ? "bitmesine" : "başlamasına"} ${days} gün kaldı, 👉 ${generateProgressBar()} ${(progressOfThisYear * 100).toFixed(2)} %`;

    console.log(readMe);
  });
});
