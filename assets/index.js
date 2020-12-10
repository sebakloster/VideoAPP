import MediaPlayer from "./MediaPlayer.js";
import AutoPlay from "./plugins/AutoPlay.js";
import AutoPause from "./plugins/AutoPause.js";

const video = document.querySelector("video");
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay(), new AutoPause()],
});
const PlayButton = document.querySelector("#play-pause-btn");
const MuteButtton = document.querySelector("#mute-unmute-btn");
PlayButton.onclick = () => player.togglePlay();
MuteButtton.onclick = () => player.mute();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .catch((error) => console.error(error.message));
}
