window.onload = function () {
    const clockCanvas = document.getElementById('clock');
    const clockCtx = clockCanvas.getContext('2d');
    const calendarCanvas = document.getElementById('calendar');
    const calendarCtx = calendarCanvas.getContext('2d');

    const clockWidth = clockCanvas.width;
    let clockHeight = clockCanvas.height;
    const calendarWidth = calendarCanvas.width;
    const calendarHeight = calendarCanvas.height;

    const aspectRatio = 3 / 4;

    function getClockFontSize() {
        return clockWidth * 0.2;
    }

    function adjustClockCanvasHeight() {
        const fontSize = getClockFontSize();
        clockHeight = fontSize * 1.5;
        clockCanvas.height = clockHeight;
    }

    function getCalendarFontSize() {
        return calendarHeight * 0.2;
    }

    String.prototype.replaceString = function (placeholder, value) {
        return this.split(placeholder).join(value);
    };

    let userTimeFormat = '$h:$m:$s';
    let userDateFormat = '$y | $m | $d | $w';
    let userLocale = 'en-us';
    let showClock, showDate = true;

    window.wallpaperPropertyListener = {
        applyUserProperties: function (properties) {
            if (properties.showclock) {
                showClock = properties.showvisualizer.value;
            }
            if (properties.showDate) {
                showDate = (properties.showdate.value);
            }
            if (properties.timeformat) {
                userTimeFormat = (properties.timeformat.value);
            }
            if (properties.dateformat) {
                userDateFormat = (properties.dateformat.value);
            }
            if (properties.locale) {
                userLocale = properties.locale.value;
            }
        },
    };


    function drawClock() {
        const now = new Date();
        const time = userTimeFormat
        .replaceString('$h', String(now.getHours()).padStart(2, '0'))
        .replaceString('$H', String(now.getHours() % 12).padStart(2, '0'))
        .replaceString('$m', String(now.getMinutes()).padStart(2, '0'))
        .replaceString('$s', String(now.getSeconds()).padStart(2, '0'))
        .replaceString('$M', (now.getHours() >= 12) ? 'PM' : 'AM');
        

        adjustClockCanvasHeight();

        const fontSize = getClockFontSize();
        clockCtx.clearRect(0, 0, clockWidth, clockHeight);
        clockCtx.font = `${fontSize}px "JetBrains Mono", monospace`;
        clockCtx.textAlign = 'center';
        clockCtx.textBaseline = 'middle';
        clockCtx.fillStyle = '#ffffff';

        clockCtx.fillText(time, clockWidth / 2, clockHeight / 2);
    }

    function drawDate() {
        const now = new Date();
        const date = userDateFormat
        .replaceString('$y', String(now.getFullYear()))
        .replaceString('$Y', String(now.getFullYear() % 100))
        .replaceString('$m', String(now.getMonth() + 1).padStart(2, '0'))
        .replaceString('$MS', now.toLocaleString(userLocale, { month: 'short' }))
        .replaceString('$ML', now.toLocaleString(userLocale, { month: 'long' }))
        .replaceString('$d', String(now.getDate()).padStart(2, '0'))
        .replaceString('$w', now.toLocaleString(userLocale, { weekday: 'long' }))
        .replaceString('$W', now.toLocaleString(userLocale, { weekday: 'short' }));

        const fontSize = getCalendarFontSize();
        calendarCtx.clearRect(0, 0, calendarWidth, calendarHeight);
        calendarCtx.font = `${fontSize}px "JetBrains Mono", monospace`;
        calendarCtx.textAlign = 'center';
        calendarCtx.textBaseline = 'middle';
        calendarCtx.fillStyle = '#ffffff';

        
        calendarCtx.fillText(date, calendarWidth / 2, calendarHeight / 2);
    }

    drawClock();
    drawDate();
    setInterval(drawClock, 1000);
    setInterval(drawDate, 60000);
};
