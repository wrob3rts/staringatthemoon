let albumCover = document.getElementById('albumCover');
let displayAlbumArt = true;
let displaySongTitle = true;
let displayArtistName = true;
let playPause = false;
let artistTitle = document.getElementById('artistTitle');
let songTitle = document.getElementById('songTitle');

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if(properties.showalbumart) {
            displayAlbumArt = properties.showalbumart.value;
        }
        if(properties.showsongtitle) {
            displaySongTitle = properties.showsongtitle.value;
        }
        if(properties.showartistname) {
            displayArtistName = properties.showartistname.value;
        }
    }
}

function wallpaperMediaPropertiesListener(event){
    artistTitle.textContent = displayArtistName ? event.artist : "";
    songTitle.textContent = displaySongTitle ? event.title : "";
}

function wallpaperMediaPlaybackListener(event) {
    playPause = (event.state == window.wallpaperMediaIntegration.PLAYBACK_STOPPED && !displayInfo) ? false : true;
    albumCover.width, albumCover.height = (albumCover != null && playPause) ? 144 : 0;
}

function wallpaperMediaThumbnailListener(event){
    albumCover.src = event.thumbnail != null ? event.thumbnail : "../img/clear.png";
}

window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
window.wallpaperRegisterMediaPlaybackListener(wallpaperMediaPlaybackListener);
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);