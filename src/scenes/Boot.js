import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }


  preload() {
    this.load.spritesheet('tileset', 'tileset.png', { frameWidth: 64, frameHeight: 64 });
    this.load.atlas('player', 'player/player.png', 'player/player.json');
    this.load.atlas('knight', 'enemy/knight.png', 'enemy/knight.json');

    this.load.image('hud-hp-label', 'images/hud-hp-label.png');
    this.load.image('hud-hp-empty', 'images/hud-hp-empty.png');
    this.load.image('hud-hp-full', 'images/hud-hp-full.png');

    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);

    WebFont.load({
      google: {
        families: ['Neucha'],
      },
      active: this.fontsLoaded,
    });
  }


  update() {
    if (this.fontsReady) {
      this.scene.start('SplashScene');
    }
  }


  fontsLoaded() {
    this.fontsReady = true;
  }
}
