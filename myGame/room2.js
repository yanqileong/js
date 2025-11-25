class room2 extends Phaser.Scene {
  constructor() {
    super({ key: "room2" });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.health = data.health ?? 3;
  }

  preload() {
    // this is the exported JSON map file
    this.load.tilemapTiledJSON("room2", "assets/garden.tmj");

    this.load.spritesheet("cat", "assets/cat.png", {
      frameWidth: 62,
      frameHeight: 62.25,
    });

    this.load.spritesheet("chicken1", "assets/chicken.png", {
      frameWidth: 27.5,
      frameHeight: 32,
    });

    this.load.spritesheet("chicken2", "assets/chicken.png", {
      frameWidth: 27.5,
      frameHeight: 32,
    });

    this.load.spritesheet("chicken3", "assets/chicken.png", {
      frameWidth: 27.5,
      frameHeight: 32,
    });
    this.load.spritesheet("chicken4", "assets/chicken.png", {
      frameWidth: 27.5,
      frameHeight: 32,
    });

    this.load.spritesheet("bird1", "assets/bird.png", {
      frameWidth: 435.5,
      frameHeight: 327,
    });
    this.load.spritesheet("bird2", "assets/bird2.png", {
      frameWidth: 393.5,
      frameHeight: 355,
    });

    this.load.image("heart", "assets/heart.png");
    this.load.spritesheet("chicken5", "assets/chicken2.png", {
      frameWidth: 259,
      frameHeight: 259,
    });

    this.load.image("pipoyaing", "assets/pipoya.png");
    this.load.image("villageing", "assets/village32x32.png");

      // load audios
    this.load.audio("collect", "assets/collect.mp3");
  }
  create() {
    console.log("*** room2 scene");

      //sound effects
    this.collectSnd = this.sound.add("collect");

    // Create the map from main
    let map = this.make.tilemap({
      key: "room2",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaing");
    let villageingTile = map.addTilesetImage("village32x32", "villageing");

    let Tileaway = [pipoyaTiles, villageingTile];

    // Load in layers by layers
    this.groundLayer = map.createLayer("groundLayout", Tileaway, 0, 0);
    this.wallLayer = map.createLayer("wallLayout", Tileaway, 0, 0);
    this.itemLayer = map.createLayer("itemLayout", Tileaway, 0, 0);

    // Enable Layer Collisions
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.itemLayer.setCollisionByExclusion(-1, true);

    let chicken1 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "chicken1"
    );
    let chicken2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "chicken2"
    );
    let chicken3 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "chicken3"
    );
    let chicken4 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "chicken4"
    );

    this.anims.create({
      key: "cat-right2",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 7,
        end: 8,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-up2",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 10,
        end: 11,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-down2",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 0,
        end: 2,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-left2",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 3,
        end: 5,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "chickenup",
      frames: this.anims.generateFrameNumbers("chicken1", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "chickenleft",
      frames: this.anims.generateFrameNumbers("chicken3", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "chickenmiddle",
      frames: this.anims.generateFrameNumbers("chicken2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "chickenright",
      frames: this.anims.generateFrameNumbers("chicken4", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "birddown",
      frames: this.anims.generateFrameNumbers("bird1", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "birdup",
      frames: this.anims.generateFrameNumbers("bird2", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.chicken1 = this.physics.add
      .sprite(398, 614, "chicken1")
      .play("chickenup")
      .setScale(2);
    this.chicken2 = this.physics.add
      .sprite(460, 1066, "chicken3")
      .play("chickenleft")
      .setScale(2);
    this.chicken3 = this.physics.add
      .sprite(762, 786, "chicken2")
      .play("chickenmiddle")
      .setScale(2);
    this.chicken4 = this.physics.add
      .sprite(1124, 572, "chicken4")
      .play("chickenright")
      .setScale(2);

    this.bird1 = this.physics.add
      .sprite(622, 694, "bird1")
      .setScale(0.3)
      .setFrame(1); // Initially to the right.

    this.bird2 = this.physics.add
      .sprite(594, 948, "bird2")
      .setScale(0.3)
      .setFrame(1); // Initially to the down

    this.bird1Tween = this.tweens.add({
      targets: this.bird1,
      x: 980, // target x
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

    this.bird2Tween = this.tweens.add({
      targets: this.bird2,
      y: this.bird2.y + 200, // to down 200
      yoyo: true,
      repeat: -1,
      duration: 1500,
      ease: "Sine.easeInOut",
      onUpdate: (tween, target) => {
        let prevY = target.prevY ?? target.y; // Save the last y
        if (target.y > prevY) {
          target.setFrame(0); // Down frame
        } else if (target.y < prevY) {
          target.setFrame(1); // Up frame
        }
        target.prevY = target.y; // Updated last time y
      },
    });
    this.player = this.physics.add.sprite(400, 400, "cat").setScale(1);

    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.itemLayer);

    this.cursors = this.input.keyboard.createCursorKeys();

    // === HUD Display ===
    this.collectedChicken = 0;

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
      .image(600, 45, "chicken5")
      .setScrollFactor(0)
      .setScale(0.3)
      .setDepth(9999);

    this.chickenText = this.add
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
      [this.chicken1, this.chicken2, this.chicken3, this.chicken4],
      this.collectChicken,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      [this.bird1, this.bird2],
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

    // //this.input.once('pointerdown', function(){
    // var spaceDown = this.input.keyboard.addKey('THREE');

    // spaceDown.on(
    //   "down",
    //   function () {
    //     console.log("3 pressed, goto main");
    //     this.scene.start("main");
    //   },
    //   this
    // );
  } /////////////////// end of create //////////////////////////////

  update() {
    let speed = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("cat-left2", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("cat-right2", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("cat-up2", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("cat-down2", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }

    if (
      this.player.x > 240 &&
      this.player.x < 403 &&
      this.player.y > 313 &&
      this.player.y < 330
    ) {
      console.log("Go back to room1 scene");
      this.scene.start("room1", {
        player: this.player,
      });
    }
    //  console.log("X:", this.player.x, "Y:", this.player.y);
  } /////////////////// end of update //////////////////////////////

  collectChicken(player, chicken) {
    chicken.disableBody(true, true); // hide chicken
     this.collectSnd.play();
    this.collectedChicken++;
    this.chickenText.setText("x " + this.collectedChicken);

    // collect all the chicken
    if (this.collectedChicken >= 4) {
      // 4 represents total number of chickens.
      this.scene.start("end", {
        player: this.player,
        health: this.health,
      });
    }
  }

  playerHit(player, bird) {
    if (this.invincible || bird.isHit) return; // Dual determination

    bird.isHit = true;
    this.time.delayedCall(1000, () => {
      bird.isHit = false;
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
      this.scene.start("gameover3");
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

  // Function back to room1
  room1(player, tile) {
    console.log("Function to back to room1 scene");
    this.scene.start("room1", {
      player: this.player,
      health: this.health,
    });
  }
  end(player, tile) {
    console.log("Function to back to woeld scene");
    if (this.collectedChicken >= 4) {
      this.scene.start("end", {
        player: this.player,
        health: this.health,
        collectedChicken: this.collectedChicken,
      });
    }
  }
} //////////// end of class room2 /////////////////
