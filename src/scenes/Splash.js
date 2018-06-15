import Phaser from 'phaser';

const COLOR_MAIN = '#fdd835';
const COLOR_WHITE = '#fff';
const CONTROLS_TEXT =
`LEFT - Move left
RIGHT - Move right
UP - Jump
X - Attack
E - Use
ESC - Pause`;
const CREDITS_TEXT =
`PROJECT TOWER

Author: DmitryScaletta
GitHub: github.com/DmitryScaletta
Email: dmitryscaletta@mail.ru`;


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashScene' });
  }


  // preload() {}


  create() {
    const { config } = this.sys.game;
    const halfWidth = config.width / 2;
    const halfHeight = config.height / 2;

    // background
    this.map = this.make.tilemap({ key: 'menu' });

    const tiles = this.map.addTilesetImage('tileset');
    this.groundLayer = this.map.createStaticLayer('ground', tiles, 0, 0);
    this.buildingsLayer = this.map.createStaticLayer('buildings', tiles, 0, 0);
    this.decorationLayer = this.map.createStaticLayer('decoration', tiles, 0, 0);


    // logo
    this.logo = this.add.text(halfWidth, halfHeight * 0.3, 'PROJECT TOWER', {
      fontSize: 120,
      fontFamily: 'Neucha, sans-serif',
      fontStyle: 'bold',
      color: COLOR_MAIN,
    })
      .setOrigin(0.5, 0.5)
      .setShadow(0, 0, 'rgba(0,0,0,0.8)', 7);


    // back hint
    this.backHint = this.add.text(50, 50, 'ESC - Back', {
      fontSize: 30,
      fontFamily: 'Neucha, sans-serif',
      fontStyle: 'bold',
      color: COLOR_WHITE,
    })
      .setOrigin(0, 0)
      .setShadow(0, 0, 'rgba(0,0,0,0.8)', 5)
      .setVisible(false);


    // info
    this.info = this.add.text(halfWidth, halfHeight * 0.9, '', {
      fontSize: 30,
      fontFamily: 'Neucha, sans-serif',
      fontStyle: 'bold',
      color: COLOR_WHITE,
    })
      .setOrigin(0.5, 0.5)
      .setShadow(0, 0, 'rgba(0,0,0,0.8)', 5)
      .setVisible(false);


    // menu
    const menuItems = ['PLAY', 'CONTROLS', 'CREDITS'];
    let offsetY = 295;
    this.selectedItem = 0;
    this.additionalPage = false;

    const menu = menuItems.map((title) => {
      const item = this.add.text(115, offsetY, title, {
        fontSize: 60,
        fontFamily: 'sans-serif',
        fontStyle: 'bold',
        color: COLOR_WHITE,
      })
        .setOrigin(0, 0.5)
        .setShadow(0, 0, 'rgba(0,0,0,0.8)', 5);

      offsetY += 100;

      return item;
    });

    this.menu = this.add.group();
    this.menu.addMultiple(menu);

    this.toggleAdditionalPage = () => {
      const toggler = !this.additionalPage;
      this.additionalPage = toggler;
      this.backHint.setVisible(toggler);
      this.info.setVisible(toggler);
      this.logo.setVisible(!toggler);
      this.buildingsLayer.setVisible(!toggler);
      this.decorationLayer.setVisible(!toggler);
      this.menu.toggleVisible();
    };

    this.onPlay = () => this.scene.start('Level1');
    this.onControls = () => {
      this.toggleAdditionalPage();
      this.info.setText(CONTROLS_TEXT);
    };
    this.onCredits = () => {
      this.toggleAdditionalPage();
      this.info.setText(CREDITS_TEXT);
    };

    this.updateMenu();

    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      back: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    };

    this.delay = false;
    this.makeDelay = () => {
      this.delay = true;
      setTimeout(() => { this.delay = false; }, 200);
    };
  }


  update() {
    if (this.delay) return;

    if (!this.additionalPage && this.keys.enter.isDown) {
      switch (this.selectedItem) {
        case 0: this.onPlay(); break;
        case 1: this.onControls(); break;
        case 2: this.onCredits(); break;
        default: break;
      }
      this.makeDelay();
    }

    if (this.additionalPage && this.keys.back.isDown) {
      this.toggleAdditionalPage();
      this.makeDelay();
    }

    if (
      !this.additionalPage &&
      this.keys.up.isDown &&
      this.selectedItem !== 0
    ) {
      this.selectedItem -= 1;
      this.updateMenu();
      this.makeDelay();
    }

    if (
      !this.additionalPage &&
      this.keys.down.isDown &&
      this.selectedItem !== this.menu.children.entries.length - 1
    ) {
      this.selectedItem += 1;
      this.updateMenu();
      this.makeDelay();
    }
  }


  updateMenu() {
    this.menu.children.entries.forEach((item, i) => {
      item.setColor(i === this.selectedItem ? COLOR_MAIN : COLOR_WHITE);
      item.setFontSize(i === this.selectedItem ? 65 : 60);
    });
  }
}
