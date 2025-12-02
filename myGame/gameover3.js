class gameover3 extends Phaser.Scene {
  constructor() {
    super({
      key: "gameover3",
    });
        // Put global variable here
}

   preload() {
        // load image
        this.load.image("gameoverImg", "assets/gameover.png");
            //  music
  this.load.audio("gameover","assets/gameover.mp3");
    }


    create() {
      console.log("*** gameover3 scene");

          this.music = this.sound
    .add("gameover",{
      loop : false,
    })

    this.gameover = this.music;

    this.music.play();

         window.heart = 3;

           // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

               // On spacebar event, restart game     
        spaceDown.on('down', function () {
            console.log('restart room2');

            this.scene.start('room2',
                // Optional parameters
                {

                }
            );
        }, this)
        

    // The image is automatically scaled to fit the frame
    let imgWidth = 2888;
    let imgHeight = 2668;
    let scaleX = this.cameras.main.width / imgWidth;
    let scaleY = this.cameras.main.height / imgHeight;
    let finalScale = Math.min(scaleX, scaleY);

        this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "gameoverImg"
    )
      .setOrigin(0.5)
      .setScale(finalScale);

        // Prevent pressing keys too quickly.
        this.restartCooldown = false;    

    }
    
  update() {
  }//////////// end of class update /////////////////

}//////////// end of class gameover3 /////////////////