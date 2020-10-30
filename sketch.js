const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var player,alien,ground;
var bg;
//lifes
var life = 3;
//groups
var alienGroup,bulletsGroup,alienBulletsGroup;
//score
var score = 0;
// gamestate
var gameState = 1;
//reset
var reset;

function preload(){
  bg = loadImage("galaxy.jpg");
  alImg = loadImage("alien.png");
  playerImg = loadImage("shooter.png");
  bulletsImg = loadImage("bullet.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  //player = new Player(200,180);
  //alien = new Alien(300,350);
  //creating groups
  alienGroup = new Group();
  bulletsGroup = new Group();
  alienBulletsGroup = new Group();
  //ground = new Ground(450,750,2170,280);
  bullets = new Bullets(500,300,2,2);
  player = createSprite(200,550);
  player.addImage(playerImg);
  player.scale = 0.7;
  Engine.run(engine);
}

function draw() {
  background(bg);  
  if(gameState === 1){
    //displaing bullets
    bullets.display();
    //movement of alien
    spawnAliens();
    //increasing score
    if(bulletsGroup.isTouching(alienGroup)){
      score = score+5;
      alienGroup.destroyEach();
    }
    playerLifes();
    // changing gamestate play to end
    if(life === 0){
      gameState = 0;
    }
  }
  if(gameState === 0){
    alienGroup.setVelocityXEach(0);
    textSize(65);
    fill("red");
    text ("GAMEOVER",100,displayHeight/2-50);
  }
 
  
  
  //displaing score and life
  textSize(35);
  fill("red");
  text("SCORE : "+score,displayWidth-200,50);
  text("LIFE : "+life,displayWidth-500,50);
  
  drawSprites();
}

function keyPressed(){
  if(keyCode === 32){
    spawnBullets();
  }
  if(keyCode === 38){
    player.y = player.y -25;
  }
  if(keyCode === 40){
    player.y = player.y +25;
  }
  if(keyCode === 39){
    player.x = player.x +25;
  }
  if(keyCode === 37){
    player.x = player.x -25;
  }
}

function spawnAliens(){
  if(frameCount% 60===0){
    var al = createSprite(displayWidth,500,20,30);
    al.addImage(alImg);
    al.y = Math.round(random(80,400));
    al.velocityX = -10;
    al.scale = 0.9;
    alienGroup.add(al);
  }
  
}

function spawnBullets(){
  var bullets = createSprite(player.x+90,player.y-54,4,3);
  bullets.velocityX = 30;
  bullets.addImage(bulletsImg);
  bullets.scale = 0.2;
  bulletsGroup.add(bullets);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
}


function playerLifes(){
  if(alienGroup.isTouching(player)){
    life = life-1;
  }
  

}

function playerMovement(){

}
