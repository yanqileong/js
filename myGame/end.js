class end extends Phaser.Scene {
  constructor() {
    super({
      key: "end",
    });
  }

  // Receive data from room2 or other scenarios
  init(data) {
    this.player = data.player;
  }

  preload() {
    // load image
    this.load.image("endImg", "assets/end.png");
  }

  create() {
    console.log("*** end scene");

    // The image is automatically scaled to fit the frame
    let imgWidth = 2888;
    let imgHeight = 2668;
    let scaleX = this.cameras.main.width / imgWidth;
    let scaleY = this.cameras.main.height / imgHeight;
    let finalScale = Math.max(scaleX, scaleY);

    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "endImg")
      .setOrigin(0.5)
      .setScale(finalScale);

    // Prevent pressing keys too quickly.
    this.input.once("pointerdown", () => {
      this.scene.start("room1", { player: null, health: 3 });
    });
  }
} //////////// end of class end /////////////////
