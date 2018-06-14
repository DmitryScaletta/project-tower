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

export const updatePlayerHp = (_this) => {
  const cutWidth = getHpWidth(_this.player.data.hp, _this.hp);
  _this.hp.frame.cutWidth = cutWidth;
  _this.hp.frame.updateUVs();
  _this.hp.setDisplaySize(cutWidth, _this.hp.height);
};

export const createHud = (_this) => {
  const HP_COORDS = { x: 65, y: 25 };

  const hpLabel = _this.add.image(20, 25, 'hud-hp-label');
  const hpBg = _this.add.image(HP_COORDS.x, HP_COORDS.y, 'hud-hp-empty');
  _this.hp = _this.add.image(HP_COORDS.x, HP_COORDS.y, 'hud-hp-full');

  hpLabel
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);
  hpBg
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);
  _this.hp
    .setScrollFactor(0, 0)
    .setOrigin(0, 0);

  if (process.env.NODE_ENV === 'development') {
    _this.coords = _this.add.text(28, 76, '');
    _this.coords.setScrollFactor(0, 0);
    _this.coords.setShadow(0, 0, 'rgba(0,0,0,0.8)', 5);
    _this.coords.setFontStyle('bold');
    _this.coords.setFontSize(20);
  }
};

export const handleUpdateHud = (_this) => {
  if (process.env.NODE_ENV === 'development') {
    const { x, y } = _this.player;
    _this.coords.setText(`x: ${Math.round(x)}, y: ${Math.round(y)}`);
  }
};
