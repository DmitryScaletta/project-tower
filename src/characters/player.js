import Phaser from 'phaser';


export function createPlayer(_params) {
  const defaultParams = {
    startingPosition: { x: 100, y: 600 },
    isAttacking: false,
    hp: 100,
    damage: 25,
    speed: 1,
  };
  const params = { ...defaultParams, ..._params };

  const player = this.physics.add.sprite(params.startingPosition.x, params.startingPosition.y, 'player');

  player.setBounce(0.01);
  player.setCollideWorldBounds(true);
  player.setDepth(1);
  player.body.setSize(player.width - 45, player.height - 21);
  player.data = params;

  return player;
}


export function handleUpdatePlayer() {
  if (this.player.data.hp <= 0) {
    if (!this.player.data._stopDeadAnimation) {
      this.player.body.setVelocityX(0);
      this.player.anims.play('dead', true);
      setTimeout(() => { this.player.data._stopDeadAnimation = true; }, 500);
    }
    return;
  }

  if (this.keys.fire.isDown && this.player.body.onFloor()) {
    if (!this.player.data.isAttacking) {
      this.player.data.isAttacking = true;
      setTimeout(() => {
        this.knights.children.entries.forEach((knight) => {
          if (
            knight.active &&
            Phaser.Math.Distance.Between(this.player.x, this.player.y, knight.x, knight.y) < 96
          ) {
            knight.data.hp -= this.player.data.damage;
          }
        });
        this.player.data.isAttacking = false;
      }, 500);
    }
    this.player.anims.play('attack', true);
    this.player.body.setVelocityX(0);
  }

  if (this.player.data.isAttacking) return;

  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200 * this.player.data.speed);
    if (this.player.body.onFloor()) {
      this.player.anims.play('walk', true);
    }
    this.player.flipX = true;
  } else
  if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(200 * this.player.data.speed);
    if (this.player.body.onFloor()) {
      this.player.anims.play('walk', true);
    }
    this.player.flipX = false;
  } else
  if (this.player.body.onFloor() && !this.keys.fire.isDown) {
    this.player.body.setVelocityX(0);
    this.player.anims.play('idle', true);
  }
  if (this.cursors.up.isDown && this.player.body.onFloor()) {
    this.player.body.setVelocityY(-700);
  }
  if (!this.player.body.onFloor()) {
    this.player.anims.play('jump', true);
  }
}


export function createPlayerAnimations() {
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Walk_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Run_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Jump_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Attack_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: 'dead',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Dead_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'Idle_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
  });
}
