window.onload = function onLoad() {
  var line = new ProgressBar.Line("#progress", {
    color: "#e82132",
    trailColor: "#646464",
  });

  fetch(
    "https://raw.githubusercontent.com/egecelikci/okul-sayaci/data/data.json",
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((data) => {
      function progress() {
        var now = new Date();
        var start = new Date(data.start);
        var end = new Date(data.end);

        var done = (now - start) / (end - start);
        var percentStr = (100.0 * done).toString();
        if (done < 0.1) {
          percentStr = percentStr.slice(0, 9);
        } else {
          percentStr = percentStr.slice(0, 10);
        }
        document.getElementById("percent").innerHTML = percentStr + "%";

        var difference = end - now;
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var days = Math.floor(difference / _day);
        var hours = Math.floor((difference % _day) / _hour);
        var minutes = Math.floor((difference % _hour) / _minute);
        var seconds = Math.floor((difference % _minute) / _second);
        document.getElementById(
          "countdown"
        ).innerHTML = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye.`;
        return done;
      }

      line.animate(progress()); // Number from 0.0 to 1.0

      setInterval(update, 16);

      function update() {
        line.set(progress());
      }
    });
};
