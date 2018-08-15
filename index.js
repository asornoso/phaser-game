let width = 1400
let height = 800
let gravity = 200

let player_height = 75
let player_width = 75
let player_start_x = 100
let player_start_y = 400
let player_speed = 5

let enemy_height = 70
let enemy_width = 70
let enemy_speed = 5

//Generate enemy every x milisecond
let enemy_generator = 80




let player
let enemies = []
let cursors
let time = 0

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

function incrementSeconds() {
  time += 1;
}

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

    timer = setInterval(incrementSeconds, 1);
}

function update(){
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

  if(time % enemy_generator == 0){
    let enemy = this.add.sprite(width + enemy_width + 10, 100 + (Math.random() * (height - 200) ), 'enemy')
    enemy.setOrigin(0,0)
    enemy.flipX = true
    enemies.push(enemy)
    console.log('enemy created')
  }

  for(let i = 0; i < enemies.length; i++){
    if(enemies[i].x <= -player_width -10){
      console.log(enemies[i])
      enemies[i].destory()
      enemies.splice(i, 1)
    }else{
      enemies[i].x -= enemy_speed
    }

  }
  console.log(enemies.length)


}
