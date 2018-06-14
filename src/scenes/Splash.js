import Phaser from 'phaser';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashScene' });
  }

  // preload() {
  //   this.load.image('study', 'img/study.png');
  // }

  create() {
    // this.add.image(640, 400 * 1.2, 'study');

    this.add
      .text(640, 400 * 0.8, 'Добро пожаловать в Phaser', {
        // fontFamily: 'Neucha',
        fontFamily: 'Arial, sans-serif',
        fontSize: 56,
        color: '#fff',
      })
      .setOrigin(0.5, 0.5);

    this.input.on('pointerup', this.start);
  }

  // update() {}

  start() {
    this.scene.start('Level1');
  }
}
