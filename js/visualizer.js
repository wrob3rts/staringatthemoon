window.wallpaperRegisterAudioListener((audioData) => {
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const numBars = 24;
    const spaceBetween = 10;
    const barWidth = (width / numBars) - (numBars - 1) * spaceBetween / numBars;
    const restingHeight = 0.0125;
    const amplitude = 1.5;

    const totalBarWidth = numBars * barWidth + (numBars - 1) * spaceBetween;
    const offsetX = (width - totalBarWidth) / 2;

    let barHeights = Array(numBars).fill(0);
    let audioHeight = Array(64).fill(0);

    for (let i = 0; i < 64; i++) {
        const value1 = audioData[i] || 0;
        const value2 = audioData[i + 24] || 0;
        audioHeight[i] = Math.max(((value1 + value2) / 2), restingHeight) * height * amplitude;
    }

    for (let i = 0; i < numBars; i++) {
        const start = Math.floor(i * 64 / numBars);
        const end = Math.ceil((i + 1) * 64 / numBars);
        const segment = audioHeight.slice(start, end);
        barHeights[i] = segment.reduce((sum, val) => sum + val, 0) / segment.length;
    }

    for (let i = 0; i < numBars; i++) {
        const x = offsetX + i * (barWidth + spaceBetween);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, height - barHeights[i], barWidth, barHeights[i]);
    }
});
