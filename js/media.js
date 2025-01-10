let albumCover = document.getElementById('albumCover');
let displayInfo = false;
let artistTitle = document.getElementById('artistTitle');
let songTitle = document.getElementById('songTitle');

function wallpaperMediaPropertiesListener(event){
    artistTitle.textContent = event.artist;
    songTitle.textContent = event.title;
}

function wallpaperMediaPlaybackListener(event) {
    displayInfo = (event.state == window.wallpaperMediaIntegration.PLAYBACK_STOPPED) ? false : true;
    albumCover.width, albumCover.height = displayInfo ? 192 : 0;
}

function wallpaperMediaThumbnailListener(event){
    albumCover.src = (displayInfo) ? event.thumbnail : null;
}

window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
window.wallpaperRegisterMediaPlaybackListener(wallpaperMediaPlaybackListener);
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);