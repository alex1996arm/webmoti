const querystring = require('querystring');
const quickconnect = require('rtc-quickconnect');
const crel = require('crel');
const capture = require('rtc-capture');
const attach = require('rtc-attach');
const qsa = require('fdom/qsa');
const plugins = [require('rtc-plugin-temasys')];

// create containers for our local and remote video
const local = crel('div', { class: 'local' });
const remote = crel('div', { class: 'remote' });
const peerMedia = {};
const midScreen = document.getElementById("mid-screen");
const smallScreen = document.getElementById("small-screen");



// once media is captured, connect
capture({ audio: false, video: true }, { plugins: plugins }, function(err, localStream) {
  if (err) {
    return console.error('could not capture media: ', err);
  }

  // render the local media
  attach(localStream, { plugins: plugins }, function(err, el) {
    local.appendChild(el);
  });

  // initiate connection
  quickconnect('https://138.197.165.173:80/', { room: 'contest', plugins: plugins })
  // broadcast our captured media to other participants in the room
    .addStream(localStream)
    // when a peer is connected (and active) pass it to us for use
    .on('call:started', function(id, pc, data) {
      attach(pc.getRemoteStreams()[0], { plugins: plugins }, function(err, el) {
        if (err) return;

        el.dataset.peer = id;
        remote.appendChild(el);
      });
    })
    // when a peer leaves, remove teh media
    .on('call:ended', function(id) {
      qsa('*[data-peer="' + id + '"]', remote).forEach(function(el) {
        el.parentNode.removeChild(el);
      });
    });
});

/* extra code to handle dynamic html and css creation */

// add some basic styling
document.head.appendChild(crel('style', [
  '.local { position: absolute;  right: 150px; }',
  '.local video { max-width: 600px; }'
].join('\n')));

// add the local and remote elements
document.body.appendChild(local);
document.body.appendChild(remote);






window.onload = function() {
  // alert(lodash.kebabCase('FOO Bar'));
// alert(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));
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



