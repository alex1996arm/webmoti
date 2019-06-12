const midScreen = document.getElementById("mid-screen");
const smallScreen = document.getElementById("small-screen");

window.onload = function() {

  const video = document.getElementById("video_id");

  // Buttons functionality
  const playButton = document.getElementById("play-pause");
  const muteButton = document.getElementById("mute");
  const fullscreen = document.getElementById("full-screen");

  // Sliders (Volume && seek-bar)
  const seekBar = document.getElementById("seek-bar");
  const volumeBar = document.getElementById("volume-bar");

  // EVENT LISTENER FOR PLAY BUTTON
  playButton.addEventListener("click", function(){
    if(video.paused == true){ video.play();
      playButton.innerHTML = "Pause";
    }else{ video.pause();
      playButton.innerHTML = "Play";
    }});

  // EVENT LISTENER FOR MUTE BUTTON
  muteButton.addEventListener("click", function(){
    if(video.muted == false){ video.mute=true;
      muteButton.innerHTML = "UnMute";
    }else{ video.mute=false;
      muteButton.innerHTML = "Mute";
    }});

  // FULLSCREEN
  fullscreen.addEventListener("click", function() {
    if (video.requestFullscreen) { video.requestFullscreen(); }
    else if (video.mozRequestFullScreen) { video.mozRequestFullScreen(); }
    else if (video.webkitRequestFullscreen) { video.webkitRequestFullscreen();
    }});
  document.getElementById("video_id").controls = false;
};

midScreen.onclick = function(){
  document.getElementById('video-container').style.width = "100%";
};


smallScreen.onclick = function(){
  document.getElementById('video-container').style.width = "50%";
};
