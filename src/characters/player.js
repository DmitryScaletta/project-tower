import Phaser from 'phaser';
import createAnimations from '../helpers/createAnimations';

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
    flasks: 3,
  };
  const params = { ...defaultParams, ..._params };

  if (global.player) {
    params.hp = global.player.hp;
    params.flasks = global.player.flasks;
  }

  const player = this.physics.add.sprite(params.startingPosition.x, params.startingPosition.y, 'player');

  player.setBounce(0.01);
  player.setCollideWorldBounds(true);
  player.setDepth(1);
  player.body.setSize(player.width - 45, player.height - 21);
  global.player = params;

  if (!this._playerAnimationsCreated) {
    createAnimations.call(this, animations, 'player');
    this._playerAnimationsCreated = true;
  }


  const heal = () => {
    if (
      !global.player.isAttacking &&
      this.player.body.onFloor() &&
      global.player.flasks > 0
    ) {
      global.player.flasks -= 1;
      global.player.hp += 25;
      if (global.player.hp > 100) {
        global.player.hp = 100;
      }
      this.updatePlayerInfo();
    }
  };

  this.input.keyboard.on('keydown_Q', heal);
  this.input.gamepad.on('down', (pad, button) => {
    if (button.index === Phaser.Input.Gamepad.Configs.XBOX_360.RB) {
      heal();
    }
  });

  return player;
}


export function handleUpdatePlayer() {
  if (global.player.hp <= 0) {
    if (!global.player._stopDeadAnimation) {
      this.player.body.setVelocityX(0);
      this.player.anims.play('dead', true);
      setTimeout(() => {
        global.player._stopDeadAnimation = true;
      }, 500);
    } else
    if (!this._toMainMenu) {
      setTimeout(() => {
        global.location.reload();
      }, 1000);
      this._toMainMenu = true;
    }

    return;
  }

  if (this.controls.fire() && this.player.body && this.player.body.onFloor()) {
    if (!global.player.isAttacking) {
      global.player.isAttacking = true;
      setTimeout(() => {
        this.knights.children.entries.forEach((knight) => {
          if (
            knight.active &&
            Phaser.Math.Distance.Between(this.player.x, this.player.y, knight.x, knight.y) < 96
          ) {
            knight.userData.hp -= global.player.damage;
          }
        });
        global.player.isAttacking = false;
      }, 500);
    }
    this.player.anims.play('attack', true);
    this.player.body.setVelocityX(0);
  }

  if (global.player.isAttacking) return;

  if (this.controls.left()) {
    this.player.body.setVelocityX(-200 * global.player.speed);
    if (this.player.body && this.player.body.onFloor()) {
      this.player.anims.play('walk', true);
    }
    this.player.flipX = true;
  } else
  if (this.controls.right()) {
    this.player.body.setVelocityX(200 * global.player.speed);
    if (this.player.body && this.player.body.onFloor()) {
      this.player.anims.play('walk', true);
    }
    this.player.flipX = false;
  } else
  if (this.player.body && this.player.body.onFloor() && !this.controls.fire()) {
    this.player.body.setVelocityX(0);
    this.player.anims.play('idle', true);
  }
  if (this.controls.jump() && this.player.body && this.player.body.onFloor()) {
    this.player.body.setVelocityY(-700);
  }
  if (this.player.body && !this.player.body.onFloor()) {
    this.player.anims.play('jump', true);
  }
}
