import Phaser from 'phaser';
import { knights } from '../utils/level1';
import { createHud, handleUpdateHud, updatePlayerHp } from '../utils/hud';
import { createPlayer, handleUpdatePlayer, createPlayerAnimations } from '../characters/player';
import { createKnight, handleUpdateKnight, createKnightAnimations } from '../characters/knight';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }


  // preload() {}


  create() {
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
    this.player = createPlayer(this, {
      startingPosition: { x: 100, y: 700 },
      hp: 100,
    });
    this.physics.add.collider(this.groundLayer, this.player);


    // knights
    this.knights = this.add.group();
    knights.forEach(params => this.knights.add(createKnight(this, params)));
    this.physics.add.collider(this.groundLayer, this.knights);

    createPlayerAnimations(this);
    createKnightAnimations(this);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
    };
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    createHud(this);
    updatePlayerHp(this);
  }


  update() {
    handleUpdatePlayer(this);
    this.knights.children.entries.forEach((knight) => {
      handleUpdateKnight(this, knight);
    });

    handleUpdateHud(this);
  }
}
