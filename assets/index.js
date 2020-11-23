import MediaPlayer from "./MediaPlayer.js";
import AutoPlay from "./plugins/AutoPlay.js";

const video = document.querySelector("video");
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay()],
});
const PlayButton = document.querySelector("#play-pause-btn");
const MuteButtton = document.querySelector("#mute-unmute-btn");
PlayButton.onclick = () => player.togglePlay();
MuteButtton.onclick = () => player.mute();
