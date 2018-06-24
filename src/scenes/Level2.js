import Phaser from 'phaser';
// import { knights } from '../utils/level2';
import { createHud, handleUpdateHud, updatePlayerHp } from '../utils/hud';
import createControls from '../utils/controls';
import createCamera from '../utils/camera';
import { createPlayer, handleUpdatePlayer } from '../characters/player';
import { createKnight, handleUpdateKnight } from '../characters/knight';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2' });
  }


  create() {
    this.createHud = createHud.bind(this);
    this.handleUpdateHud = handleUpdateHud.bind(this);
    this.updatePlayerHp = updatePlayerHp.bind(this);
    this.createControls = createControls.bind(this);
    this.createCamera = createCamera.bind(this);
    this.createPlayer = createPlayer.bind(this);
    this.createPlayer = createPlayer.bind(this);
    this.handleUpdatePlayer = handleUpdatePlayer.bind(this);
    this.createKnight = createKnight.bind(this);
    this.handleUpdateKnight = handleUpdateKnight.bind(this);


    // map
    this.map = this.make.tilemap({ key: 'level2' });

    const tiles = this.map.addTilesetImage('tileset');
    this.background1Layer = this.map.createStaticLayer('background', tiles, 0, 0);
    this.ground1Layer = this.map.createDynamicLayer('ground', tiles, 0, 0);
    this.ground1Layer.setCollisionByExclusion([-1]);
    this.decoration1Layer = this.map.createStaticLayer('decoration', tiles, 0, 0);

    this.physics.world.bounds.width = this.ground1Layer.width;
    this.physics.world.bounds.height = this.ground1Layer.height;


    // player
    this.player = this.createPlayer({
      startingPosition: { x: 650, y: 2700 },
      hp: 100,
    });
    this.physics.add.collider(this.ground1Layer, this.player);


    // knights
    this.knights = this.add.group();
    // knights.forEach(params => this.knights.add(this.createKnight(params)));
    this.physics.add.collider(this.ground1Layer, this.knights);

    this.createControls();
    this.createCamera();
    this.createHud();
    this.updatePlayerHp();
  }


  update() {
    this.handleUpdatePlayer();
    this.knights.children.entries.forEach((knight) => {
      this.handleUpdateKnight(knight);
    });

    this.handleUpdateHud();

    if (
      this.controls.action()
    ) {
      this.scene.start('Level1');
    }
  }
}
