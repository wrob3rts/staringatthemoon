let albumCoverArt = null;
albumCoverArt = document.getElementById('albumCoverArt');

function wallpaperMediaThumbnailListener(event){
    console.log(event.thumbnail); 
    albumCoverArt.src = event.thumbnail;
}

window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);