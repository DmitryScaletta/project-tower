import Phaser from 'phaser';


const getHpWidth = (hp) => {
  const hpBarWidth = 200;

  if (hp === 100) return hpBarWidth;
  if (hp <= 0) return 0;

  let finalWidth = Math.round((hpBarWidth * hp) / 100);

  if (finalWidth < 1 && finalWidth > 0) {
    finalWidth = 1;
  }

  return finalWidth;
};


export function updatePlayerInfo() {
  const width = getHpWidth(this.player.userData.hp);
  this.hpMask.clear();
  this.hpMask.fillStyle(0xf44336);
  this.hpMask.fillRect(0, 0, width, 16);

  this.flasks.setText(`FLASKS: ${this.player.userData.flasks}`);
}

export function createHud() {
  const HP_COORDS = { x: 65, y: 25 };

  const hpLabel = this.add.image(20, 25, 'hud-hp-label');
  const hpBottom = this.add.image(HP_COORDS.x, HP_COORDS.y, 'hud-hp-bottom');
  const hpTop = this.add.image(HP_COORDS.x, HP_COORDS.y, 'hud-hp-top');

  hpLabel
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);
  hpBottom
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);
  hpTop
    .setDepth(1)
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);

  this.hpMask = this.add.graphics(0, 0)
    .setScrollFactor(0, 0)
    .setPosition(HP_COORDS.x + 7, HP_COORDS.y + 7);

  this.flasks = this.add.text(27, 70, '');
  this.flasks.setScrollFactor(0, 0);
  this.flasks.setShadow(0, 0, 'rgba(0,0,0,0.8)', 5);
  this.flasks.setFontStyle('bold');
  this.flasks.setFontSize(20);
  this.flasks.setFontFamily('Arial, sans-serif');

  if (process.env.NODE_ENV === 'development') {
    this.coords = this.add.text(27, 110, '');
    this.coords.setScrollFactor(0, 0);
    this.coords.setShadow(0, 0, 'rgba(0,0,0,0.8)', 5);
    this.coords.setFontStyle('bold');
    this.coords.setFontSize(20);
  }

  const pause = () => {
    global.currentLevel = this.scene.key;
    this.scene.start('SplashScene');
  };

  this.input.keyboard.on('keydown_ESC', pause);
  this.input.gamepad.on('down', (pad, button) => {
    if (button.index === Phaser.Input.Gamepad.Configs.XBOX_360.START) {
      pause();
    }
  });
}


export function handleUpdateHud() {
  if (process.env.NODE_ENV === 'development') {
    const { x, y } = this.player;
    this.coords.setText(`x: ${Math.round(x)}, y: ${Math.round(y)}`);
  }
}
