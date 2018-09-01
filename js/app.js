// Enemies our player must avoid
let crash ="";
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 75;
    this.height = 75;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //make sure that enemies won't be hidden behind the canvas
    if (this.x > 475) {
        this.x = 0;

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Character = function (){
  this.sprite='images/char-boy.png';
  this.x = 200;
  this.y=400;
  this.width = 50;
  this.height = 50;

};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

const myDialog = function(name){
  this.name = name;

};

let winner = new myDialog('Winner!!!');
let loser = new myDialog ("Game Over!!!")

myDialog.prototype.render = function(){
  ctx.font = "80px Arial";
    if (crash){
      ctx.fillText(this.name,25, 350);
    }else{
        ctx.fillText(this.name,100, 350);
      };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(10,50,100);
let enemy2=new Enemy(10,145,75);
let enemy3 = new Enemy(10,225,100);
let allEnemies = [];
allEnemies.push (enemy1, enemy2, enemy3);
// Place the player object in a variable called player
const player = new Character;

Character.prototype.update = function(dt) {

  for(let i = 0; i < allEnemies.length; i++) {
      this.handleCollision(allEnemies[i]);
  }
};

// I was researching else if statements I found this on stack overflow https://stackoverflow.com/questions/8812814/javascript-is-there-a-limit-to-else-if-statements
// it recommended using a switch statement instead of else if
Character.prototype.handleInput = function(input) {

    switch (input) {

        case 'up':
              if(this.y>0){
                this.y -= 30;

                break;
              } else {
                break;
          };
        case 'down':
             if(this.y<430){
               this.y += 30;
               break;
             };
        case 'left':
              if(this.x>10){
                this.x -= 25;
                break;
      };
        case 'right':
            if(this.x<400){
            this.x += 25;
            break;
          };
        case '':
            this.x = this.x;
            break;
    };

};

//This code is slightly modified but taken from here https://www.w3schools.com/graphics/tryit.asp?filename=trygame_obstacle_hit

Character.prototype.handleCollision = function(otherobj){
  let playerLeft = this.x;
  let playerRight = this.x + (this.width);
  let playerTop = this.y;
  let playerBottom = this.y + (this.height);
  let otherleft = otherobj.x;
  let otherright = otherobj.x + (otherobj.width);
  let othertop = otherobj.y;
  let otherbottom = otherobj.y + (otherobj.height);
  crash = true;

  if ((playerBottom < othertop) || (playerTop > otherbottom) || (playerRight < otherleft) || (playerLeft > otherright)) {
      crash = false;
    };

//   if (crash){
//     //alert ("GAME OVER!")
//     loser.render();
//     setTimeout(lost, 500);
//     function lost(){
//
//     location.reload();
//   };
// };
  return crash;

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
