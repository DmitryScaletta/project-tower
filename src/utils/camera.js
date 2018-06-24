export default function createCamera() {
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  this.cameras.main.startFollow(this.player);
  this.cameras.main.setFollowOffset(0, 40);
}
