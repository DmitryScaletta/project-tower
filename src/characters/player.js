import Phaser from 'phaser';
import createAnimations from '../utils/createAnimations';

const animations = [
  {
    key: 'walk',
    prefix: 'Walk_',
    frameRate: 10,
    repeat: -1,
  },
  {
    key: 'run',
    prefix: 'Run_',
    frameRate: 10,
    repeat: -1,
  },
  {
    key: 'jump',
    prefix: 'Jump_',
    frameRate: 8,
    repeat: -1,
  },
  {
    key: 'attack',
    prefix: 'Attack_',
    frameRate: 20,
    repeat: -1,
  },
  {
    key: 'dead',
    prefix: 'Dead_',
    frameRate: 10,
  },
  {
    key: 'idle',
    prefix: 'Idle_',
    frameRate: 10,
  },
];


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
  player.userData = params;

  if (!this._playerAnimationsCreated) {
    createAnimations.call(this, animations, 'player');
    this._playerAnimationsCreated = true;
  }

  return player;
}


export function handleUpdatePlayer() {
  if (this.player.userData.hp <= 0) {
    if (!this.player.userData._stopDeadAnimation) {
      this.player.body.setVelocityX(0);
      this.player.anims.play('dead', true);
      setTimeout(() => { this.player.userData._stopDeadAnimation = true; }, 500);
    }
    return;
  }

  if (this.controls.fire() && this.player.body.onFloor()) {
    if (!this.player.userData.isAttacking) {
      this.player.userData.isAttacking = true;
      setTimeout(() => {
        this.knights.children.entries.forEach((knight) => {
          if (
            knight.active &&
            Phaser.Math.Distance.Between(this.player.x, this.player.y, knight.x, knight.y) < 96
          ) {
            knight.userData.hp -= this.player.userData.damage;
          }
        });
        this.player.userData.isAttacking = false;
      }, 500);
    }
    this.player.anims.play('attack', true);
    this.player.body.setVelocityX(0);
  }

  if (this.player.userData.isAttacking) return;

  if (this.controls.left()) {
    this.player.body.setVelocityX(-200 * this.player.userData.speed);
    if (this.player.body.onFloor()) {
      this.player.anims.play('walk', true);
    }
    this.player.flipX = true;
  } else
  if (this.controls.right()) {
    this.player.body.setVelocityX(200 * this.player.userData.speed);
    if (this.player.body.onFloor()) {
      this.player.anims.play('walk', true);
    }
    this.player.flipX = false;
  } else
  if (this.player.body.onFloor() && !this.controls.fire()) {
    this.player.body.setVelocityX(0);
    this.player.anims.play('idle', true);
  }
  if (this.controls.jump() && this.player.body.onFloor()) {
    this.player.body.setVelocityY(-700);
  }
  if (!this.player.body.onFloor()) {
    this.player.anims.play('jump', true);
  }
}
