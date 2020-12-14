import MediaPlayer from "../../MediaPlayer";
import Ads, { Ad } from "./Ads";

class AdsPlugin {
  private ads: Ads;
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private currentAd: Ad;
  private adsContainer: HTMLElement;
  constructor() {
    this.ads = Ads.getInstance();
    this.adsContainer = document.createElement("div");
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.player.container.appendChild(this.adsContainer);
    this.media = this.player.media;
    this.media.addEventListener("timeupdate", this.handleTimeUpdate);
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    if (currentTime % 30 === 0) {
      this.renderAd();
    }
  }
  private renderAd() {
    if (this.currentAd) {
      return;
    }
    const ad = this.ads.getAd();
    this.currentAd = ad;
    this.adsContainer.innerHTML = `
    <style>.ads {
        padding: 4px;
        padding-right: 8px;
        background: white;
        width: 80%;
      
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .ads__link {
        display: flex;
        color: inherit;
        text-decoration: inherit;
      }
      
      .ads__img {
        width: 80px;
        min-width: 80px;
        height: 80px;
        margin-right: 16px;
      }
      
      .ads__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .ads__title {
        margin: 0;
      }
      .ads__body {
        margin: 0;
      } </style>
    <div class="ads">
    <a  class="ads__link" href="${this.currentAd.url}" target="_blank">
      <img class="ads__img" src="${this.currentAd.imageUrl}" />
      <div class="ads__info">
        <h5 class="ads__title">${this.currentAd.title}</h5>
        <p class="ads__body">${this.currentAd.body}</p>
      </div>
    </a>
  </div>
    `;

    setTimeout(() => {
      this.currentAd = null;
      this.adsContainer.innerHTML = "";
    }, 10000);
  }
}

export default AdsPlugin;
