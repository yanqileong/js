class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    // Preload any images here
    // Preload any sound and music here
    // this.load.audio('ping', 'assets/ping.mp3');
    // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    this.load.image("level1Img", "assets/level1.png");
  }

  create() {
    console.log("*** level1 scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");

        this.scene.start(
          "world",
          // Optional parameters
          {}
        );
      },
      this
    );

    // The image is automatically scaled to fit the frame
    let imgWidth = 2888;
    let imgHeight = 2668;
    let scaleX = this.cameras.main.width / imgWidth;
    let scaleY = this.cameras.main.height / imgHeight;
    let finalScale = Math.max(scaleX, scaleY);

    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "level1Img")
      .setOrigin(0.5)
      .setScale(finalScale);

    // Prevent pressing keys too quickly.
    this.restartCooldown = false;

    // // Add any text in the main page
    // this.add.text(90, 600, "Press spacebar to continue", {
    //   font: "30px Courier",
    //   fill: "#FFFFFF",
    // });

    // Create all the game animations here
  }
} //////////// end of class level1 /////////////////
