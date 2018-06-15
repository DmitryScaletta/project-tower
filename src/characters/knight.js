import Phaser from 'phaser';


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
  knight.data = params;


  return knight;
}


export function handleUpdateKnight(knight) {
  if (!knight.active) return;

  if (knight.data.hp <= 0) {
    if (!knight.data._stopDeadAnimation) {
      knight.body.setVelocityX(0);
      knight.anims.play('knight/dead', true);
      setTimeout(() => { knight.data._stopDeadAnimation = true; }, 500);
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
    distanceBetweenPlayerAndNpc <= knight.data.viewDistance &&
    playerAndNpcOnOneHight
  ) {
    if (distanceBetweenPlayerAndNpc < 64) {
      if (!knight.isAttacking) {
        const ANIMATION_LENGTH = 1000;
        const REPEAT_DELAY = 300;
        const delay = ANIMATION_LENGTH + REPEAT_DELAY;

        if (this.player.data.hp <= 0) {
          knight.anims.play('knight/idle', true);
          return;
        }
        knight.isAttacking = true;

        // check hit
        setTimeout(() => {
          const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, knight.x, knight.y);
          if (distance < 96) {
            this.player.data.hp -= knight.data.damage;
            this.updatePlayerHp();
          }
        }, delay - 500);

        // unset isAttacking flag
        setTimeout(() => { knight.isAttacking = false; }, delay);
      }
      knight.body.setVelocityX(0);
      knight.anims.play('knight/attack', true);
    } else
    if (!knight.isAttacking && this.player.x < knight.x) {
      knight.body.setVelocityX(-200 * knight.data.speed);
      knight.anims.play('knight/walk', true);
      knight.flipX = true;
    } else
    if (!knight.isAttacking && this.player.x > knight.x) {
      knight.body.setVelocityX(200 * knight.data.speed);
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


export function createKnightAnimations() {
  this.anims.create({
    key: 'knight/idle',
    frames: this.anims.generateFrameNames('knight', {
      prefix: 'idle_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: 'knight/walk',
    frames: this.anims.generateFrameNames('knight', {
      prefix: 'walk_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'knight/attack',
    frames: this.anims.generateFrameNames('knight', {
      prefix: 'attack_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
    repeat: -1,
    repeatDelay: 300,
  });
  this.anims.create({
    key: 'knight/dead',
    frames: this.anims.generateFrameNames('knight', {
      prefix: 'die_',
      start: 1,
      end: 10,
      zeroPad: 2,
    }),
    frameRate: 10,
  });
}
