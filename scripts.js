window.onload = function onLoad() {
    var line = new ProgressBar.Line('#progress', {
        color: '#e82132',
        trailColor: '#646464'
    });

    $.getJSON("https://ege.codes/veriler/okul-sayaci.json", function(data) {
        function progress() {
            var now = new Date();
            var start = new Date(data.start);
            var end = new Date(data.end);
            var done = (now - start) / (end - start);
            var distance = (end - now);
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
            document.getElementById("percent").innerHTML = done * 100 + "%";
            document.getElementById("countdown").innerHTML = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye.`;
            return done;
        }
        line.animate(progress()); // Number from 0.0 to 1.0

        setInterval(update, 1000);

        function update() {
            line.set(progress());
        }
    });
};
