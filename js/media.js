let albumCoverArt = document.getElementById('albumCoverArt');

function wallpaperMediaThumbnailListener(event) {
    if (albumCoverArt) {
        albumCoverArt.src = event.thumbnail;
    } else {
        console.error('albumCoverArt element not found.');
    }
}

window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);