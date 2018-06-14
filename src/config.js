import Phaser from 'phaser';
import packageJson from '../package.json';

export default {
  width: 1280,
  height: 720,
  // zoom: 1,
  // resolution: 1,
  type: Phaser.AUTO,
  title: 'Project Tower',
  url: packageJson.homepage,
  version: packageJson.version,
  input: {
    keyboard: true,
    mouse: true,
    touch: false,
    gamepad: true,
  },
  disableContextMenu: true,
  fps: {
    min: 10,
    target: 60,
  },
  pixelArt: false,
  backgroundColor: 0x72c9cf,
  loader: {
    // baseURL: '',
    path: 'assets/',
    maxParallelDownloads: 6,
    // crossOrigin: 'anonymous',
    // timeout: 0
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: process.env.NODE_ENV === 'development',
    },
  },
};
