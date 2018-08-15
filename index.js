let width = window.innerWidth
let height = window.innerHeight
let gravity = 200

let player_height = 75
let player_width = 75
let player_start_x = 100
let player_start_y = 400
let player_speed = 5

let enemy_height = 70
let enemy_width = 70
let enemy_speed = 5

//Points added per enemy beat
let pointsPerEnemy = 5

let enemy_difficulty = 50

let score = 0
let lives = 3


let player
let enemies = []
let cursors
let scoreText
let livesText
let state = 'play'
let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


function withinBounds(x, y, direction) {
  if(direction == 'left'){
    return x - player_speed > 0
  }else if(direction == 'right'){
    return x + player_speed < width - player_width
  }else if(direction == 'up'){
    return y - player_speed > 0
  }else if(direction == 'down'){
    return y + player_speed < height - player_height
  }

}

let game = new Phaser.Game(config);


function preload ()
{

    this.load.image('bg', 'assets/bg/bg.png');
    this.load.image('player', 'assets/players/p7.png')
    this.load.image('enemy', 'assets/players/p4.png')
}

function create ()
{
    let bg = this.add.image(width/2, height/2, 'bg');
    bg.setDisplaySize(width, height)

    player = this.add.sprite(player_start_x, player_start_y, 'player');
    player.setOrigin(0,0)
    player.setDisplaySize(player_width, player_height)

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    livesText = this.add.text(300, 16, 'Lives: 3', { fontSize: '32px', fill: '#FFF' });

}

function update(){
  if(state == 'play'){
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown && withinBounds(player.x, player.y, 'left')){
        console.log('left')
        player.x += player_speed * -1
    }

    if (cursors.right.isDown && withinBounds(player.x, player.y, 'right')){
        console.log('right')
        player.x += player_speed
    }

    if(cursors.up.isDown && withinBounds(player.x, player.y, 'up')){
        console.log('up')
        player.y += player_speed * -1
    }

    if(cursors.down.isDown && withinBounds(player.x, player.y, 'down')){
        console.log('down')
        player.y += player_speed
    }

    let random = Math.random() * 1000

    if(random < enemy_difficulty){
      let enemy = this.add.sprite(width + enemy_width + 10, 40 + (Math.random() * (height - 80) ), 'enemy')
      enemy.setOrigin(0,0)
      enemy.setDisplaySize(enemy_width, enemy_height)
      enemy.flipX = true
      enemies.push(enemy)
      console.log('enemy created')
    }

    for(let i = 0; i < enemies.length; i++){

      if(player.y + player_height > enemies[i].y &&
        player.x + player_width  > enemies[i].x &&
        player.y < enemies[i].y + enemy_height &&
        player.x < enemies[i].x + enemy_width){
          console.log('HIT')
          lives--
          if(lives <= 0){
            this.add.text(width/2 - 300, height/2 - 100, 'GAME OVER\n Refresh to restart', { fontSize: '64px', fill: '#FFF' });
            state = 'over'
          }
          livesText.setText('Lives: '+ lives)
          enemies[i].destroy()
          enemies.splice(i, 1)

          break;
      }

      if(enemies[i].x <= -player_width -10){
        enemies[i].destroy()

        enemies.splice(i, 1)
        score += pointsPerEnemy;
        scoreText.setText('Score: ' + score);

      }else{
        enemies[i].x -= enemy_speed
      }

    }
  }
}
