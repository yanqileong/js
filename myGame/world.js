class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory ?? [];
    this.health = data.health ?? 3;
  }

  preload() {
    // this is the exported JSON map file
    this.load.tilemapTiledJSON("world", "assets/livingroom.tmj");

    this.load.spritesheet("cat", "assets/cat.png", {
      frameWidth: 62,
      frameHeight: 62.25,
    });

    this.load.spritesheet("fish1", "assets/fish.png", {
      frameWidth: 47,
      frameHeight: 32,
    });

    this.load.spritesheet("fish2", "assets/fish.png", {
      frameWidth: 47,
      frameHeight: 32,
    });

    this.load.spritesheet("fish3", "assets/fish.png", {
      frameWidth: 47,
      frameHeight: 32,
    });
    this.load.spritesheet("fish4", "assets/fish.png", {
      frameWidth: 47,
      frameHeight: 32,
    });

    this.load.spritesheet("Broom1", "assets/Broom.png", {
      frameWidth: 140,
      frameHeight: 280,
    });

    this.load.spritesheet("Broom2", "assets/Broom.png", {
      frameWidth: 140,
      frameHeight: 280,
    });

    this.load.image("heart", "assets/heart.png");
    this.load.spritesheet("fish5", "assets/fish2.png", {
      frameWidth: 62,
      frameHeight: 62,
    });

    this.load.image("pipoyaing", "assets/pipoya.png");
    this.load.image("Genericing", "assets/1_Generic_32x32.png");
    this.load.image("livingrooming", "assets/2_LivingRoom_32x32.png");
    this.load.image("Bedrooming", "assets/4_Bedroom_32x32.png");

    // load audios
    this.load.audio("collect", "assets/collect.mp3");
    // this.load.audio("bgmusic", "assets/bgmusic.mp3");
  }

  create() {
    console.log("*** world scene");


    //Reset state
    this.invincible = false;

    //sound effects
    this.collectSnd = this.sound.add("collect");
    // this.mainSnd = this.sound.add("bgmusic", { loop: true, volume: 0.3 });
    // this.mainSnd.play();

    // Create the map from main
    let map = this.make.tilemap({
      key: "world",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaing");
    let GenericingTiles = map.addTilesetImage("1_Generic_32x32", "Genericing");
    let livingroomingTile = map.addTilesetImage(
      "2_LivingRoom_32x32",
      "livingrooming"
    );
    let BedroomingTile = map.addTilesetImage("4_Bedroom_32x32", "Bedrooming");

    let Tileaway = [
      pipoyaTiles,
      GenericingTiles,
      livingroomingTile,
      BedroomingTile,
    ];

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayout", Tileaway, 0, 0);
    this.itemLayer = map.createLayer("itemLayout", Tileaway, 0, 0);
    this.itemLayer2 = map.createLayer("itemLayout2", Tileaway, 0, 0);

    // # Enable Layer Collisions
    this.itemLayer.setCollisionByExclusion(-1, true);
    this.itemLayer2.setCollisionByExclusion(-1, true);

    // let groundLayer = map.createLayer(
    //   "groundLayer",
    //   [buildingTiles, streetTiles, pipoyaTiles],
    //   0,
    //   0
    // );

    // let streetLayer = map.createLayer(
    //   "streetLayer",
    //   [buildingTiles, streetTiles, pipoyaTiles],
    //   0,
    //   0
    // );

    // let treeLayer = map.createLayer(
    //   "treeLayer",
    //   [buildingTiles, streetTiles, pipoyaTiles],
    //   0,
    //   0
    // );

    // let buildingLayer = map.createLayer(
    //   "buildingLayer",
    //   [buildingTiles, streetTiles, pipoyaTiles],
    //   0,
    //   0
    // );

    // Add any text to the game
    // this.add.text(10, 10, "Add any text here", {
    //   font: "30px Courier",
    //   fill: "#00FFFF",
    // });

    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);

    //  let fire1  = map.findObject("objectLayer",(obj) => obj.name === "star");

    let fire2 = map.findObject("objectLayer", (obj) => obj.name === "fish1");
    let fire3 = map.findObject("objectLayer", (obj) => obj.name === "fish2");
    let fire4 = map.findObject("objectLayer", (obj) => obj.name === "fish3");
    let fire5 = map.findObject("objectLayer", (obj) => obj.name === "fish4");

    // this.fire1 = this.add.sprite(102, 434, 'star')

    this.anims.create({
      key: "cat-right",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 7,
        end: 8,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-up",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 10,
        end: 11,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-down",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 0,
        end: 2,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-left",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 3,
        end: 5,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "fishup",
      frames: this.anims.generateFrameNumbers("fish1", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "fishleft",
      frames: this.anims.generateFrameNumbers("fish2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "fishmiddle",
      frames: this.anims.generateFrameNumbers("fish3", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "fishright",
      frames: this.anims.generateFrameNumbers("fish4", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "Broomdown",
      frames: this.anims.generateFrameNumbers("Broom1", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "Broomup",
      frames: this.anims.generateFrameNumbers("Broom2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.fire2 = this.physics.add
      .sprite(1076, 468, "fish1")
      .play("fishup")
      .setScale(2);

    this.fire3 = this.physics.add
      .sprite(156, 874, "fish2")
      .play("fishleft")
      .setScale(2);

    this.fire4 = this.physics.add
      .sprite(614, 1152, "fish3")
      .play("fishmiddle")
      .setScale(2);

    this.fire5 = this.physics.add
      .sprite(1168, 990, "fish4")
      .play("fishright")
      .setScale(2);

    this.Broom1 = this.physics.add
      .sprite(200, 750, "Broom1")
      .setScale(0.5)
      .setFrame(1); // Initially to the right.

    // pink square
    this.Broom1.body.setSize(80, 150); // width and height
    this.Broom1.body.setOffset(30, 65); // setSize

    this.Broom2 = this.physics.add
      .sprite(750, 350, "Broom2")
      .setScale(0.5)
      .setFrame(1); // Initially to the right.

    //pink square
    this.Broom2.body.setSize(80, 150);
    this.Broom2.body.setOffset(30, 65);

    this.Broom1Tween = this.tweens.add({
      targets: this.Broom1,
      x: 370,
      yoyo: true,
      repeat: -1,
      duration: 1800,
      ease: "Sine.easeInOut",
      onUpdate: (tween, target) => {
        let prevX = target.prevX ?? target.x;
        if (target.x > prevX) {
          target.setFrame(1); // to right
        } else if (target.x < prevX) {
          target.setFrame(0); // to left
        }
        target.prevX = target.x; // Update previous frame x
      },
    });

    this.Broom2Tween = this.tweens.add({
      targets: this.Broom2,
      x: 900,
      yoyo: true,
      repeat: -1,
      duration: 1200,
      ease: "Sine.easeInOut",
      onUpdate: (tween, target) => {
        let prevX = target.prevX ?? target.x;
        if (target.x > prevX) {
          target.setFrame(1); // to right
        } else if (target.x < prevX) {
          target.setFrame(0); // to left
        }
        target.prevX = target.x; // Update previous frame x
      },
    });

    this.player = this.physics.add.sprite(400, 400, "cat").setScale(1);
    // .play("down");

    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.itemLayer2);

    // // Game Over
    // this.physics.add.overlap(this.player, this.Broom1, () => {
    //   console.log("Game Over! Hit by Broom1");
    //   this.scene.start("gameover");
    // });

    // this.physics.add.overlap(this.player, this.Broom2, () => {
    //   console.log("Game Over! Hit by Broom2");
    //   this.scene.start("gameover");
    // });
    this.cursors = this.input.keyboard.createCursorKeys();

    // === HUD Display ===
    this.health = 3;
    this.collectedFish = 0;

    this.hearts = this.add.group();
    for (let i = 0; i < this.health; i++) {
      let heart = this.add
        .image(50 + i * 40, 50, "heart")
        .setScrollFactor(0)
        .setScale(0.1)
        .setDepth(9999);
      this.hearts.add(heart);
    }

    this.add
      .image(600, 45, "fish5")
      .setScrollFactor(0)
      .setScale(1)
      .setDepth(9999);

    this.fishText = this.add
      .text(640, 38, "x 0", {
        fontSize: "24px",
        fill: "#000000ff",
        fontFamily: "Arial",
      })
      .setScrollFactor(0)
      .setDepth(9999);

    this.physics.add.overlap(
      this.player,
      [this.fire2, this.fire3, this.fire4, this.fire5],
      this.collectFish,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      [this.Broom1, this.Broom2],
      this.playerHit,
      null,
      this
    );

    // camera follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.player.setCollideWorldBounds(true);
    this.cameras.main.setZoom(1.0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    window.player = this.player;

    this.player.setCollideWorldBounds(true);

    //this.input.once('pointerdown', function(){
    // var spaceDown = this.input.keyboard.addKey("ONE");

    // spaceDown.on(
    //   "down",
    //   function () {
    //     console.log("1 pressed, goto room1");
    //     this.scene.start("room1");
    //   },
    //   this
    // );
  } /////////////////// end of create //////////////////////////////

  update() {
    let speed = 200;

    // Reset Speed
    this.player.setVelocity(0, 0);

    if (!this.invincible) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
        this.player.anims.play("cat-left", true);
      }
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.anims.play("cat-right", true);
      }
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-speed);
        this.player.anims.play("cat-up", true);
      }
      if (this.cursors.down.isDown) {
        this.player.setVelocityY(speed);
        this.player.anims.play("cat-down", true);
      }

      if (
        this.player.x > 553 &&
        this.player.x < 700 &&
        this.player.y > 1200 &&
        this.player.y < 1248
      ) {
        console.log("Go to room1 function");
        this.room1();
      }
    }
    // console.log("X:", this.player.x, "Y:", this.player.y);
  } /////////////////// end of update //////////////////////////////

  collectFish(player, fish) {
    fish.disableBody(true, true); // Hide Fish
    this.collectSnd.play();
    this.collectedFish++;
    this.fishText.setText("x " + this.collectedFish);
  }

  playerHit(player, broom) {
    if (this.invincible || broom.isHit) return; // Dual Detection

    broom.isHit = true;
    this.time.delayedCall(1000, () => {
      broom.isHit = false;
    });

    this.health--;
    this.updateHearts();

    this.invincible = true;
    player.setAlpha(0.5);
    player.setVelocity(0, 0);

    this.time.delayedCall(1000, () => {
      this.invincible = false;
      player.setAlpha(1);
    });

    if (this.health <= 0) {
      this.scene.start("gameover1");
    }
  }

  updateHearts() {
    // Clear the old heart display
    this.hearts.clear(true, true);

    // Redraw the hearts based on the current number of health points.
    for (let i = 0; i < this.health; i++) {
      let heart = this.add
        .image(50 + i * 40, 50, "heart")
        .setScrollFactor(0)
        .setScale(0.1)
        .setDepth(9999);
      this.hearts.add(heart);
    }
  }

  // Function level2
  room1(player, tile) {
    console.log("Function to jump to level2 scene");
    this.scene.start("level2", {
      player: this.player,
      health: this.health,
    });
  }
} //////////// end of class world /////////////////
