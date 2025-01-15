let albumCover = document.getElementById('albumCover');
let displayInfo = false;
let artistTitle = document.getElementById('artistTitle');
let songTitle = document.getElementById('songTitle');

function wallpaperMediaPropertiesListener(event){
    artistTitle.textContent = event.artist;
    console.log(artistTitle);
    songTitle.textContent = event.title;
    console.log(songTitle);
}

function wallpaperMediaPlaybackListener(event) {
    displayInfo = (event.state == window.wallpaperMediaIntegration.PLAYBACK_STOPPED) ? false : true;
    albumCover.width, albumCover.height = displayInfo ? 144 : 0;
}

function wallpaperMediaThumbnailListener(event){
    albumCover.src = (displayInfo) ? event.thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
}

window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
window.wallpaperRegisterMediaPlaybackListener(wallpaperMediaPlaybackListener);
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);