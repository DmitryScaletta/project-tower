import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('tiles', 'tilemaps/brick.png');
    this.load.tilemapTiledJSON('map', 'tilemaps/map.json');

    this.load.spritesheet('player', 'img/player.png', {
      frameWidth: 24,
      frameHeight: 26,
    });

    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
    // this.add.text(100, 100, 'loading fonts...');

    // this.load.image('loaderBg', 'img/loader-bg.png');
    // this.load.image('loaderBar', 'img/loader-bar.png');

    WebFont.load({
      google: {
        families: ['Neucha:cyrillic,latin'],
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
