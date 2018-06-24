import Phaser from 'phaser';

export default function createControls() {
  this.keys = {
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
    action: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    back: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
  };

  this.gamepad = null;
  this.input.gamepad.once('down', (pad) => { this.gamepad = pad; });

  this.controls = {
    left: () => this.keys.left.isDown || (this.gamepad && this.gamepad.left),
    right: () => this.keys.right.isDown || (this.gamepad && this.gamepad.right),
    up: () => this.keys.up.isDown || (this.gamepad && this.gamepad.up),
    down: () => this.keys.down.isDown || (this.gamepad && this.gamepad.down),
    jump: () => this.keys.jump.isDown || (this.gamepad && this.gamepad.A),
    fire: () => this.keys.fire.isDown || (this.gamepad && this.gamepad.X),
    action: () => this.keys.action.isDown || (this.gamepad && this.gamepad.Y),
    enter: () => this.keys.enter.isDown || (this.gamepad && this.gamepad.A),
    back: () => this.keys.back.isDown || (this.gamepad && this.gamepad.B),
  };
}
