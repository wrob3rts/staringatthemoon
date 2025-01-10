const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let showVisualizer = true;
let numBars = 32;
let spaceBetween = 12;
let barWidth = (width / numBars) - (numBars - 1) * spaceBetween / numBars;
let restingHeight = 0.0125;
let amplitude = 1.5;

function updateDimensions() {
    width = canvas.width;
    height = canvas.height;
    barWidth = (width / numBars) - (numBars - 1) * spaceBetween / numBars;
}

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.showvisualizer) {
            showVisualizer = properties.showvisualizer.value;
        }
        if (properties.numberofbars) {
            numBars = parseInt(properties.numberofbars.value);
            updateDimensions();
        }
        if (properties.spacebetweenbars) {
            spaceBetween = parseInt(properties.spacebetweenbars.value);
            updateDimensions();
        }
        if (properties.restingheight) {
            restingHeight = parseInt(properties.restingheight.value);
        }
        if (properties.amplitude) {
            amplitude = parseInt(properties.amplitude.value);
        }
    },
};

window.wallpaperRegisterAudioListener((audioData) => {
    ctx.clearRect(0, 0, width, height);

    if (showVisualizer === true) {
        const totalBarWidth = numBars * barWidth + (numBars - 1) * spaceBetween;
        const offsetX = (width - totalBarWidth) / 2;

        let barHeights = Array(numBars).fill(0);
        let audioHeight = Array(64).fill(0);

        // Calculate audio heights
        for (let i = 0; i < 64; i++) {
            const value1 = audioData[i] || 0;
            const value2 = audioData[i + 64] || 0;
            audioHeight[i] = Math.max(((value1 + value2) / 2), restingHeight) * height * amplitude;
        }

        // Map audio heights to bars
        for (let i = 0; i < numBars; i++) {
            const start = Math.floor(i * 64 / numBars);
            const end = Math.ceil((i + 1) * 64 / numBars);
            const segment = audioHeight.slice(start, end);
            barHeights[i] = segment.reduce((sum, val) => sum + val, 0) / segment.length;
        }

        // Draw bars
        for (let i = 0; i < numBars; i++) {
            const x = offsetX + i * (barWidth + spaceBetween);
            const barHeight = barHeights[i];
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        }
    }
});