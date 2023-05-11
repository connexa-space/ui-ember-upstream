import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import videojs from 'video.js';

export default class UpstreamPlayerComponent extends Component {
  @tracked playing = this.args.autoplay ?? false;
  @tracked muted = this.args.muted ?? true;

  @action
  loadM3U8() {
    let player = videojs(this.args.id, {
      controls: this.args.controls ?? false,
      loop: this.args.loop ?? false,
      autoplay: this.args.autoplay ?? false,
      muted: this.args.muted ?? true,
      preload: 'auto',
    });
  }

  @action
  playPause() {
    if (this.playing) {
      this.playing = false;
      videojs(this.args.id).pause();
    } else {
      this.playing = true;
      videojs(this.args.id).play();
    }
  }

  @action
  muteUnmute() {
    if (this.muted) this.muted = false;
    else this.muted = true;
    videojs(this.args.id).muted(this.muted);
  }

  @action
  restart() {
    videojs(this.args.id).currentTime(0);
  }
}
