import MediaPlayer from "./MediaPlayer";
import AutoPlay from "./plugins/AutoPlay";
import AutoPause from "./plugins/AutoPause";
import AdsPlugin from "./plugins/ads";

const video = document.querySelector("video");
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlay(), new AutoPause(), new AdsPlugin()],
});
const PlayButton: HTMLElement = document.querySelector("#play-pause-btn");
const MuteButtton: HTMLElement = document.querySelector("#mute-unmute-btn");
PlayButton.onclick = () => player.togglePlay();
MuteButtton.onclick = () => player.mute();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .catch((error) => console.error(error.message));
}
