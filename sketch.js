//Global Variables
var player, player_running;
var bananaImage, bananaGroup;
var invisibleGround;
var obstacleImage, obstacleGroup;
var back, backImage;
var score;


function preload(){
  backImage = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_01.png", "Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  

}
function setup() {
  createCanvas(400, 400);
  
  back = createSprite(100,200);
  back.addImage(backImage);  
  back.x = back.width/2;
  back.velocityX = -5;
  
  player = createSprite(50, 360, 20, 20);
  player.addAnimation("monkeyrun", player_running);
  player.scale = 0.10;
  
  invisibleGround = createSprite(200, 365, 400, 10);
  invisibleGround.visible=false;

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw(){ 
  background(220);
 if (back.x < 0) {
   back.x = back.width/2;
   }
  
  player.collide(invisibleGround);
  player.velocityY = player.velocityY + 0.8;

 if (keyDown("space") && player.y >= 300) {
   player.velocityY = -12;
   } 
  
  food();
  stone();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");  
  text("Score: " + score, 250, 50);
  
  switch(score) {
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14;
      break;
    case 30: player.scale=0.16;
      break;
    case 40: player.scale=0.18;
      break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(player)) {
     player.scale = 0.10;
    score = 0;
     }
  
  if(bananaGroup.isTouching(player)) {
     score = score+2;
    bananaGroup.destroyEach();
  }
}

function food() {
 if (frameCount % 80 === 0) {
  var banana = createSprite(400, 320, 40, 10);
  banana.y = Math.round(random(200,250));
  banana.addImage(bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -5;
  
  banana.lifetime = 80;
  
  bananaGroup.add(banana);
    
  }
}

function stone() {
 if (frameCount % 300 === 0) {
  var obstacle = createSprite(400, 335, 40, 10);
  obstacle.addAnimation("Stone", obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -5;
  
  obstacle.lifetime = 80;
  
  obstacleGroup.add(obstacle);
  }
}