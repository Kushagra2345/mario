var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
function preload()
{
  marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.png");  
  flagAnimation=loadAnimation("images/Flag.png");
  coinImg=loadImage("images/coin.jpg")
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  coinGrp=new Group();
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      if (i%4===0){
      coin1=new Coin(countDistanceX+random(100,300))
      coinGrp.add(coin1.spt)
      
      }
      }
  }
  flag=createSprite(countDistanceX-150,height-320);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.09;
  flag.setCollider("rectangle",0,0,1100,6520);
}

function draw() {


  background('skyblue');
  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
          //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyDown("up") && mario.spt.velocityY===0) 
        {
          mario.jump();
        }

   }

   if (mario.spt.y>height || mario.spt.isTouching(obstacleGroup)){
     gameState=LOSE
   }
  if(gameState===LOSE)//END State
  {   
    mario.spt.setVelocity(0,0)
    obstacleGroup.destroyEach()
    textSize(30)
    fill("red")
    text("You Lose.....",mario.spt.x,50)
    mario.spt.pause()
  }

  if (mario.spt.isTouching(flag)){
    gameState=WIN

  }
  if(gameState===WIN)//WIN state
  { 
    textSize(30)
    fill("green")
    text("You Win!!!!!",mario.spt.x,50)
    mario.spt.setVelocity(0,0)
   }
  

   drawSprites();
}



