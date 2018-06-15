const getHpWidth = (playerHp, hp) => {
  if (playerHp === 100) return hp.width;

  const border = 7;
  let cutWidth = 0;

  if (playerHp > 0) {
    const width = hp.width - (border * 2);
    cutWidth = Math.round((width * playerHp) / 100);

    if (cutWidth < 1 && cutWidth > 0) {
      cutWidth = 1;
    }

    cutWidth += border;
  }

  return cutWidth;
};

export function updatePlayerHp() {
  const cutWidth = getHpWidth(this.player.data.hp, this.hp);
  this.hp.frame.cutWidth = cutWidth;
  this.hp.frame.updateUVs();
  this.hp.setDisplaySize(cutWidth, this.hp.height);
}

export function createHud() {
  const HP_COORDS = { x: 65, y: 25 };

  const hpLabel = this.add.image(20, 25, 'hud-hp-label');
  const hpBg = this.add.image(HP_COORDS.x, HP_COORDS.y, 'hud-hp-empty');
  this.hp = this.add.image(HP_COORDS.x, HP_COORDS.y, 'hud-hp-full');

  hpLabel
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);
  hpBg
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);
  this.hp
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);

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
