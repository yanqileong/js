class room1 extends Phaser.Scene {
  constructor() {
    super({ key: "room1" });

    // Put global variable here
  }

  init(data) {
    this.player = data.player;
    this.health = data.health ?? 3;
  }

  preload() {
    // this is the exported JSON map file
    this.load.tilemapTiledJSON("room1", "assets/kitchen.tmj");

    this.load.spritesheet("cat", "assets/cat.png", {
      frameWidth: 62,
      frameHeight: 62.25,
    });
    this.load.spritesheet("carrot1", "assets/carrot.png", {
      frameWidth: 29.5,
      frameHeight: 32,
    });

    this.load.spritesheet("carrot2", "assets/carrot.png", {
      frameWidth: 29.5,
      frameHeight: 32,
    });

    this.load.spritesheet("carrot3", "assets/carrot.png", {
      frameWidth: 29.5,
      frameHeight: 32,
    });
    this.load.spritesheet("carrot4", "assets/carrot.png", {
      frameWidth: 29.5,
      frameHeight: 32,
    });

    this.load.spritesheet("mouse1", "assets/mouse.png", {
      frameWidth: 114,
      frameHeight: 119,
    });
    this.load.spritesheet("mouse2", "assets/mouse.png", {
      frameWidth: 114,
      frameHeight: 119,
    });

    this.load.image("heart", "assets/heart.png");
    this.load.spritesheet("carrot5", "assets/carrot2.png", {
      frameWidth: 62,
      frameHeight: 62,
    });

    this.load.image("pipoyaing", "assets/pipoya.png");
    this.load.image("Genericing", "assets/1_Generic_32x32.png");
    this.load.image("kitchening", "assets/12_Kitchen_32x32.png");
    this.load.image("Bedrooming", "assets/4_Bedroom_32x32.png");
  }

  create() {
    console.log("*** room1 scene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "room1",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaing");
    let GenericingTiles = map.addTilesetImage("1_Generic_32x32", "Genericing");
    let kitcheningTile = map.addTilesetImage("12_Kitchen_32x32", "kitchening");
    let BedroomingTile = map.addTilesetImage("4_Bedroom_32x32", "Bedrooming");

    let Tileaway = [
      pipoyaTiles,
      GenericingTiles,
      kitcheningTile,
      BedroomingTile,
    ];

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayout", Tileaway, 0, 0);
    this.wallLayer = map.createLayer("wallLayout", Tileaway, 0, 0);
    this.itemLayer = map.createLayer("itemLayout", Tileaway, 0, 0);
    this.itemLayer2 = map.createLayer("itemLayout2", Tileaway, 0, 0);
    this.itemLayer3 = map.createLayer("itemLayout3", Tileaway, 0, 0);

    // # Enable Layer Collisions
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.itemLayer.setCollisionByExclusion(-1, true);
    this.itemLayer2.setCollisionByExclusion(-1, true);
    this.itemLayer3.setCollisionByExclusion(-1, true);

    let carrot1 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "carrot1"
    );
    let carrot2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "carrot2"
    );
    let carrot3 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "carrot3"
    );
    let carrot4 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "carrot4"
    );

    this.anims.create({
      key: "cat-right1",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 7,
        end: 8,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-up1",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 10,
        end: 11,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-down1",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 0,
        end: 2,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-left1",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 3,
        end: 5,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "carrotup",
      frames: this.anims.generateFrameNumbers("carrot1", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "carrotleft",
      frames: this.anims.generateFrameNumbers("carrot2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "carrotmiddle",
      frames: this.anims.generateFrameNumbers("carrot3", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "carrotright",
      frames: this.anims.generateFrameNumbers("carrot4", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "mousedown",
      frames: this.anims.generateFrameNumbers("mouse1", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "mouseup",
      frames: this.anims.generateFrameNumbers("mouse2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.carrot1 = this.physics.add
      .sprite(1068, 482, "carrot1")
      .play("carrotup")
      .setScale(2);
    this.carrot2 = this.physics.add
      .sprite(174, 1006, "carrot2")
      .play("carrotleft")
      .setScale(2);
    this.carrot3 = this.physics.add
      .sprite(612, 930, "carrot3")
      .play("carrotmiddle")
      .setScale(2);
    this.carrot4 = this.physics.add
      .sprite(1028, 1002, "carrot4")
      .play("carrotright")
      .setScale(2);

    this.mouse1 = this.physics.add
      .sprite(138, 760, "mouse1")
      .setScale(0.5)
      .setFrame(1); // Initially to the right.

    this.mouse2 = this.physics.add.sprite(926, 308, "mouse2").setScale(0.5);

    // 设置巡逻范围
    this.mouse1MinX = 138; // Left boundary
    this.mouse1MaxX = 300; // right boundary
    this.mouse1Speed = 60;
    this.mouse1Direction = 1; // 1=right, -1=left

    // Mouse 2 chase player.
    this.mouseSpeed = 60;
    this.mouse2Chasing = true;

    this.player = this.physics.add.sprite(400, 400, "cat").setScale(1);

    //     // Bring player from previous scene
    // this.player = this.add.existing(this.player);
    // this.physics.add.existing(this.player);

    // // Set spawn position for room1
    // this.player.setPosition(400, 400);
    // this.player.setScale(1);
    // this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.itemLayer2);
    this.physics.add.collider(this.player, this.itemLayer3);

    this.cursors = this.input.keyboard.createCursorKeys();

    // === HUD Display ===
    // this.health = 3;
    this.collectedCarrot = 0;

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
      .image(600, 45, "carrot5")
      .setScrollFactor(0)
      .setScale(0.6)
      .setDepth(9999);

    this.carrotText = this.add
      .text(640, 38, "x 0", {
        fontSize: "24px",
        fill: "#000000ff",
        fontFamily: "Arial",
      })
      .setScrollFactor(0)
      .setDepth(9999);

    // === Overlap Detection ===
    this.physics.add.overlap(
      this.player,
      [this.carrot1, this.carrot2, this.carrot3, this.carrot4],
      this.collectCarrot,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      [this.mouse1, this.mouse2],
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
    // var spaceDown = this.input.keyboard.addKey("TWO");

    // spaceDown.on(
    //   "down",
    //   function () {
    //     console.log("2 pacebar pressed, goto room2");
    //     this.scene.start("room2");
    //   },
    //   this
    // );
  } /////////////////// end of create //////////////////////////////

  update() {
    let speed = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("cat-left1", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("cat-right1", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("cat-up1", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("cat-down1", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }

    if (
      this.player.x > 20 &&
      this.player.x < 100 &&
      this.player.y > 250 &&
      this.player.y < 320
    ) {
      console.log("Go back to world scene");
      this.scene.start("world", { player: this.player });
    }

    // Calculate the distance from mouse 2 to mouse 1
    const distanceToMouse1 = Phaser.Math.Distance.Between(
      this.mouse2.x,
      this.mouse2.y,
      this.mouse1.x,
      this.mouse1.y
    );

    const stopDistance = 10;

    if (this.mouse2Chasing) {
      if (distanceToMouse1 > stopDistance) {
        this.physics.moveToObject(this.mouse2, this.player, 60);
      } else {
        this.mouse2.setVelocity(0, 0);
        this.mouse2Chasing = false;
      }
    }

    if (
      this.player.x > 1163 &&
      this.player.x < 1249 &&
      this.player.y > 1176 &&
      this.player.y < 1278
    ) {
      console.log("Go to level3");
      this.scene.start("level3", { player: this.player });
    }

    // mouse1 patrolling left and right
    if (this.mouse1Direction === 1) {
      this.mouse1.setVelocityX(this.mouse1Speed);
      this.mouse1.setFrame(1); // to right
      if (this.mouse1.x >= this.mouse1MaxX) this.mouse1Direction = -1;
    } else {
      this.mouse1.setVelocityX(-this.mouse1Speed);
      this.mouse1.setFrame(0); // to left
      if (this.mouse1.x <= this.mouse1MinX) this.mouse1Direction = 1;
    }

    // console.log("X:", this.player.x, "Y:", this.player.y);
  } /////////////////// end of update //////////////////////////////

  collectCarrot(player, carrot) {
    carrot.disableBody(true, true); // Hide carrot
    this.collectedCarrot++;
    this.carrotText.setText("x " + this.collectedCarrot);
  }

  playerHit(player, mouse) {
    if (this.invincible || mouse.isHit) return; // Dual Detection

    mouse.isHit = true;
    this.time.delayedCall(1000, () => {
      mouse.isHit = false;
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
      this.scene.start("gameover2");
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

  // Function back to world
  world(player, tile) {
    console.log("Function to back to world scene");
    this.scene.start("world", {
      player: this.player,
      health: this.health,
    });
  }

  // Function level3
  level3(player, tile) {
    console.log("Function to jump to level3 scene");
    this.scene.start("level3");
  }
} //////////// end of class room1 /////////////////
