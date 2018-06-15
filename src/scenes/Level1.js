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
    this.createHud = createHud.bind(this);
    this.handleUpdateHud = handleUpdateHud.bind(this);
    this.updatePlayerHp = updatePlayerHp.bind(this);
    this.createPlayer = createPlayer.bind(this);
    this.createPlayer = createPlayer.bind(this);
    this.handleUpdatePlayer = handleUpdatePlayer.bind(this);
    this.createPlayerAnimations = createPlayerAnimations.bind(this);
    this.createKnight = createKnight.bind(this);
    this.handleUpdateKnight = handleUpdateKnight.bind(this);
    this.createKnightAnimations = createKnightAnimations.bind(this);


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

    this.createPlayerAnimations();
    this.createKnightAnimations();


    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
    };
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 40);

    this.createHud();
    this.updatePlayerHp();
  }


  update() {
    this.handleUpdatePlayer();
    this.knights.children.entries.forEach((knight) => {
      this.handleUpdateKnight(knight);
    });

    this.handleUpdateHud();
  }
}
