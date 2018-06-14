import Phaser from 'phaser';


export const createPlayer = (_this, _params) => {
  const defaultParams = {
    startingPosition: { x: 100, y: 600 },
    isAttacking: false,
    hp: 100,
    damage: 25,
    speed: 1,
  };
  const params = { ...defaultParams, ..._params };

  const player = _this.physics.add.sprite(params.startingPosition.x, params.startingPosition.y, 'player');

  player.setBounce(0.01);
  player.setCollideWorldBounds(true);
  player.setDepth(1);
  player.body.setSize(player.width - 45, player.height - 21);
  player.data = params;

  return player;
};


export const handleUpdatePlayer = (_this) => {
  if (_this.player.data.hp <= 0) {
    if (!_this.player.data._stopDeadAnimation) {
      _this.player.body.setVelocityX(0);
      _this.player.anims.play('dead', true);
      setTimeout(() => { _this.player.data._stopDeadAnimation = true; }, 500);
    }
    return;
  }

  if (_this.keys.fire.isDown && _this.player.body.onFloor()) {
    if (!_this.player.data.isAttacking) {
      _this.player.data.isAttacking = true;
      setTimeout(() => {
        _this.knights.children.entries.forEach((knight) => {
          if (
            knight.active &&
            Phaser.Math.Distance.Between(_this.player.x, _this.player.y, knight.x, knight.y) < 96
          ) {
            knight.data.hp -= _this.player.data.damage;
          }
        });
        _this.player.data.isAttacking = false;
      }, 500);
    }
    _this.player.anims.play('attack', true);
    _this.player.body.setVelocityX(0);
  }

  if (_this.player.data.isAttacking) return;

  if (_this.cursors.left.isDown) {
    _this.player.body.setVelocityX(-200 * _this.player.data.speed);
    if (_this.player.body.onFloor()) {
      _this.player.anims.play('walk', true);
    }
    _this.player.flipX = true;
  } else
  if (_this.cursors.right.isDown) {
    _this.player.body.setVelocityX(200 * _this.player.data.speed);
    if (_this.player.body.onFloor()) {
      _this.player.anims.play('walk', true);
    }
    _this.player.flipX = false;
  } else
  if (_this.player.body.onFloor() && !_this.keys.fire.isDown) {
    _this.player.body.setVelocityX(0);
    _this.player.anims.play('idle', true);
  }
  if (_this.cursors.up.isDown && _this.player.body.onFloor()) {
    _this.player.body.setVelocityY(-700);
  }
  if (!_this.player.body.onFloor()) {
    _this.player.anims.play('jump', true);
  }
};


export const createPlayerAnimations = (_this) => {
  _this.anims.create({
    key: 'walk',
    frames: _this.anims.generateFrameNames('player', {
      prefix: 'Walk_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  _this.anims.create({
    key: 'run',
    frames: _this.anims.generateFrameNames('player', {
      prefix: 'Run_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  _this.anims.create({
    key: 'jump',
    frames: _this.anims.generateFrameNames('player', {
      prefix: 'Jump_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 8,
    repeat: -1,
  });
  _this.anims.create({
    key: 'attack',
    frames: _this.anims.generateFrameNames('player', {
      prefix: 'Attack_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 20,
    repeat: -1,
  });
  _this.anims.create({
    key: 'dead',
    frames: _this.anims.generateFrameNames('player', {
      prefix: 'Dead_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
  });
  _this.anims.create({
    key: 'idle',
    frames: _this.anims.generateFrameNames('player', {
      prefix: 'Idle_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
  });
};
