import Phaser from 'phaser';

import gameConfig from './config';

import BootScene from './scenes/Boot';
import SplashScene from './scenes/Splash';
import Level1 from './scenes/Level1';
import Level2 from './scenes/Level2';

const config = {
  ...gameConfig,
  scene: [
    BootScene,
    SplashScene,
    Level1,
    Level2,
  ],
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

window.game = new Game();
