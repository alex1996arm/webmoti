document.getElementById("hithere").innerText="HELLOOOO";

window.onload = function() {

  var video = document.getElementById("video_id");

  // Buttons functionality
  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  const fullscreen = document.getElementById("full-screen");
  const midScreen = document.getElementById("Mid-Screen");
  const smallScreen = document.getElementById("Small-Screen");

  // Sliders (Volume && seek-bar)
  var seekBar = document.getElementById("seek-bar");
  var volumeBar = document.getElementById("volume-bar");

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

}


function midFunction(){
  document.getElementById("video-container").style.width = "100%";
}

function smallFunction(){
  document.getElementById("video-container").style.width="50%";
}
