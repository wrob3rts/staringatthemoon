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

    function drawClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;

        adjustClockCanvasHeight();

        const fontSize = getClockFontSize();
        clockCtx.clearRect(0, 0, clockWidth, clockHeight);
        clockCtx.font = `${fontSize}px "JetBrains Mono", monospace`;
        clockCtx.textAlign = 'center';
        clockCtx.textBaseline = 'middle';
        clockCtx.fillStyle = '#ffffff';

        clockCtx.fillText(time, clockWidth / 2, clockHeight / 2);
    }

    function formatDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const weekday = now.toLocaleString('en-US', { weekday: 'long' });
        return `${year} | ${month} | ${day} | ${weekday}`;
    }

    function drawDate() {
        const fontSize = getCalendarFontSize();
        calendarCtx.clearRect(0, 0, calendarWidth, calendarHeight);
        calendarCtx.font = `${fontSize}px "JetBrains Mono", monospace`;
        calendarCtx.textAlign = 'center';
        calendarCtx.textBaseline = 'middle';
        calendarCtx.fillStyle = '#ffffff';

        const dateText = formatDate();
        calendarCtx.fillText(dateText, calendarWidth / 2, calendarHeight / 2);
    }

    drawClock();
    drawDate();
    setInterval(drawClock, 1000);
    setInterval(drawDate, 60000);
};
