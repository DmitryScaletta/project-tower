import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }


  preload() {
    this.load.tilemapTiledJSON('menu', 'levels/menu.json');
    this.load.tilemapTiledJSON('level1', 'levels/level1.json');

    this.load.spritesheet('tileset', 'tileset.png', { frameWidth: 64, frameHeight: 64 });
    this.load.atlas('player', 'player/player.png', 'player/player.json');
    this.load.atlas('knight', 'enemy/knight.png', 'enemy/knight.json');

    this.load.image('hud-hp-label', 'images/hud-hp-label.png');
    this.load.image('hud-hp-empty', 'images/hud-hp-empty.png');
    this.load.image('hud-hp-full', 'images/hud-hp-full.png');

    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);

    const { config } = this.sys.game;
    const halfWidth = config.width / 2;
    const halfHeight = config.height / 2;

    this.add.text(halfWidth, halfHeight, 'Loading...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: 40,
    }).setOrigin(0.5, 0.5);

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
