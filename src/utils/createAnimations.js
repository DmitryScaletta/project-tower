export default function createAnimations(animations = [], spriteName) {
  animations.forEach((animation) => {
    const {
      key,
      prefix,
      frameRate,
      repeat,
      repeatDelay,
    } = animation;

    if (this.anims.anims.entries[key]) return;

    this.anims.create({
      key,
      frames: this.anims.generateFrameNames(spriteName, {
        prefix,
        start: 1,
        end: 10,
        zeroPad: 2,
      }),
      frameRate,
      repeat,
      repeatDelay,
    });
  });
}
