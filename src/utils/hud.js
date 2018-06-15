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


export function updatePlayerHp() {
  const width = getHpWidth(this.player.data.hp);
  this.hpMask.clear();
  this.hpMask.fillStyle(0xf44336);
  this.hpMask.fillRect(0, 0, width, 16);
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

  if (process.env.NODE_ENV === 'development') {
    this.coords = this.add.text(28, 76, '');
    this.coords.setScrollFactor(0, 0);
    this.coords.setShadow(0, 0, 'rgba(0,0,0,0.8)', 5);
    this.coords.setFontStyle('bold');
    this.coords.setFontSize(20);
  }
}


export function handleUpdateHud() {
  if (process.env.NODE_ENV === 'development') {
    const { x, y } = this.player;
    this.coords.setText(`x: ${Math.round(x)}, y: ${Math.round(y)}`);
  }
}
