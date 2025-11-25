var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 30,
    height: 32 * 30,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH
},
    backgroundColor: '#82d0ec',
    pixelArt: true,
    scene: [main, story, level1, level2, level3, world, room1,room2, gameover1,gameover2, gameover3, end]
};

var game = new Phaser.Game(config);