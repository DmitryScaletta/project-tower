import Phaser from 'phaser';
import { knights } from '../utils/level1';
import { createHud, handleUpdateHud, updatePlayerInfo } from '../utils/hud';
import createControls from '../utils/controls';
import createCamera from '../utils/camera';
import { createPlayer, handleUpdatePlayer } from '../characters/player';
import { createKnight, handleUpdateKnight } from '../characters/knight';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }


  create() {
    this.createHud = createHud.bind(this);
    this.handleUpdateHud = handleUpdateHud.bind(this);
    this.updatePlayerInfo = updatePlayerInfo.bind(this);
    this.createControls = createControls.bind(this);
    this.createCamera = createCamera.bind(this);
    this.createPlayer = createPlayer.bind(this);
    this.createPlayer = createPlayer.bind(this);
    this.handleUpdatePlayer = handleUpdatePlayer.bind(this);
    this.createKnight = createKnight.bind(this);
    this.handleUpdateKnight = handleUpdateKnight.bind(this);


    // map
    this.map = this.make.tilemap({ key: 'level1' });

    const tiles = this.map.addTilesetImage('tileset');
    this.cloudsLayer = this.map.createStaticLayer('clouds', tiles, 0, 0);
    this.groundLayer = this.map.createDynamicLayer('ground', tiles, 0, 0);
    this.groundLayer.setCollisionByExclusion([-1]);
    this.buildingsLayer = this.map.createStaticLayer('buildings', tiles, 0, 0);
    this.decorationLayer = this.map.createStaticLayer('decoration', tiles, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;


    // player
    this.player = this.createPlayer({
      startingPosition: { x: 100, y: 700 },
      hp: 100,
    });
    this.physics.add.collider(this.groundLayer, this.player);


    // knights
    this.knights = this.add.group();
    knights.forEach(params => this.knights.add(this.createKnight(params)));
    this.physics.add.collider(this.groundLayer, this.knights);

    this.createControls();
    this.createCamera();
    this.createHud();
    this.updatePlayerInfo();

    this.input.keyboard.on('keydown_E', () => {
      if (
        this.player.x > 295 &&
        this.player.x < 320 &&
        this.player.y > 2600 &&
        this.player.y < 2700
      ) {
        console.log('to level 2');
        this.scene.switch('Level2');
      }
    });
  }


  update() {
    this.handleUpdatePlayer();
    this.knights.children.entries.forEach((knight) => {
      this.handleUpdateKnight(knight);
    });

    this.handleUpdateHud();
  }
}
