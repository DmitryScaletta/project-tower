import Phaser from 'phaser';
import createAnimations from '../utils/createAnimations';


const animations = [
  {
    key: 'knight/idle',
    prefix: 'idle_',
    frameRate: 10,
    repeat: -1,
  },
  {
    key: 'knight/walk',
    prefix: 'walk_',
    frameRate: 10,
    repeat: -1,
  },
  {
    key: 'knight/attack',
    prefix: 'attack_',
    frameRate: 10,
    repeat: -1,
    repeatDelay: 300,
  },
  {
    key: 'knight/dead',
    prefix: 'die_',
    frameRate: 10,
  },
];


export function createKnight(_params = {}) {
  const defaultParams = {
    isAttacking: false,
    startingPosition: { x: 100, y: 100 },
    startingDirection: 'right',
    hp: 100,
    damage: 10,
    fireRate: 0.4,
    speed: 0.6,
    viewDistance: 500,
  };

  const params = { ...defaultParams, ..._params };

  const knight = this.physics.add.sprite(params.startingPosition.x, params.startingPosition.y, 'knight');

  if (params.startingDirection === 'left') {
    knight.flipX = true;
  }
  knight.setBounce(0.01);
  knight.setCollideWorldBounds(true);
  knight.body.setSize(knight.width - 138, knight.height - 84); // 108x54
  knight.userData = params;

  if (!this._knightAnimationsCreated) {
    createAnimations.call(this, animations, 'knight');
    this._knightAnimationsCreated = true;
  }

  return knight;
}


export function handleUpdateKnight(knight) {
  const rand = (min, max) => Math.round((Math.random() * (max - min)) + min);

  if (!knight.active) return;

  if (knight.userData.hp <= 0) {
    if (
      !knight.userData._startDeadAnimation &&
      !knight.userData._stopDeadAnimation
    ) {
      knight.userData._startDeadAnimation = true;
      knight.body.setVelocityX(0);
      knight.anims.play('knight/dead', true);
      setTimeout(() => {
        knight.userData._stopDeadAnimation = true;
        // add flask for player with 20% chance
        if (rand(0, 100) < 20) {
          this.player.userData.flasks += 1;
        }
      }, 500);
      setTimeout(() => {
        knight.visible = false;
        knight.active = false;
      }, 2500);
    }
    return;
  }

  const distanceBetweenPlayerAndNpc = Math.abs(this.player.x - knight.x);
  const playerAndNpcOnOneHight = Math.abs(this.player.y - knight.y) < 192;

  if (
    distanceBetweenPlayerAndNpc <= knight.userData.viewDistance &&
    playerAndNpcOnOneHight
  ) {
    if (distanceBetweenPlayerAndNpc < 64) {
      if (!knight.isAttacking) {
        const ANIMATION_LENGTH = 1000;
        const REPEAT_DELAY = 300;
        const delay = ANIMATION_LENGTH + REPEAT_DELAY;

        if (this.player.userData.hp <= 0) {
          knight.anims.play('knight/idle', true);
          return;
        }
        knight.isAttacking = true;

        // check hit
        setTimeout(() => {
          const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, knight.x, knight.y);
          if (distance < 96) {
            this.player.userData.hp -= knight.userData.damage;
            this.updatePlayerInfo();
          }
        }, delay - 500);

        // unset isAttacking flag
        setTimeout(() => { knight.isAttacking = false; }, delay);
      }
      knight.body.setVelocityX(0);
      knight.anims.play('knight/attack', true);
    } else
    if (!knight.isAttacking && this.player.x < knight.x) {
      knight.body.setVelocityX(-200 * knight.userData.speed);
      knight.anims.play('knight/walk', true);
      knight.flipX = true;
    } else
    if (!knight.isAttacking && this.player.x > knight.x) {
      knight.body.setVelocityX(200 * knight.userData.speed);
      knight.anims.play('knight/walk', true);
      knight.flipX = false;
    } else
    if (!knight.isAttacking) {
      knight.anims.play('knight/idle', true);
    }
  } else {
    knight.body.setVelocityX(0);
    knight.anims.play('knight/idle', true);
  }
}
