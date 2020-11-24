var WIN=2;
var PLAY=1;
var END=0;
var themeSound;
var energy,energyImage,energyGroup;
var gameState=PLAY;
var spiderman,bulb,sideLightImage;
var spidermanAnimation,bulbImage,spdermanRunning,spidermanJumping;
var ground,gameOver,gameOverImage,win,winImage,restart,restartImage;
var venom,goblin,goblinImage,venomAttack,villan1Group,vulture,vultureImage,villan3Group;
var web,webGroup,webImage;
var Score;
var helicarrier,helicarrierImage,homeGroup;
function preload(){
  spidermanAnimation=loadAnimation("spider1.png","spider2.png","spider3.png","spider4.png","spider5.png","spider6.png","spider7.png","spider8.png","spider9.png");
  
  sideLightImage=loadImage("glow.png");
  themeSound=loadSound("sound.mp3");
  vultureImage=loadImage("vulture.png");
  
  spidermanJumping=loadAnimation("spidermanj.png","spidermanj2.png","spidermanj3.png","spidermanj4.png","spidermanj5.png","spidermanj6.png","spidermanj7.png","spidermanj8.png","spidermanj9.png","spidermanj10.png","spidermanj11.png")
  restartImage=loadImage("restart.png")
  venomAttack=loadAnimation("venom1.jpg","venom2.jpg","venom3.jpg","venom4.jpg","venom5.jpg","venom6.jpg","venom7.jpg","venom8.jpg","venom9.jpg","venom10.jpg")
  
  goblinImage=loadImage("goblin.png")
bulbImage=loadImage("bulb.jpg"); 
 gameOverImage=loadImage("gameover.png")
   webImage=loadImage("web.png");
  helicarrierImage=loadImage("shield.png");
  winImage=loadImage("win.png");
  energyImage=loadImage("blue.png");
}


function setup() {
  createCanvas(600,350);
  themeSound.loop();


  //giving score
   Score=0;
  
  spiderman = createSprite(510,160,60,20);
  spiderman.addAnimation("spidey",spidermanAnimation);
  ///spiderman.velocityX=-3;
  spiderman.scale=0.25;
  spiderman.setCollider("rectangle",0,0,295,250);
  spiderman.debug=false;
  
  ground=createSprite(300,340,600,17);
  
  gameOver=createSprite(300,120,1,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.7;
  
  win=createSprite(300,150,1,1);
  win.addImage(winImage);
  win.scale=0.7;
  
   restart=createSprite(300,230,1,10);
  restart.addImage(restartImage);
  restart.scale=0.1;
  
  //creating Groups
 villan1Group=new Group();
  bulbGroup=new Group();
  lightGroup=new Group();
  villan2Group=new Group();
   villan3Group=new Group();
  webGroup=new Group();
  homeGroup=new Group();
  energyGroup=new Group();
 
}

function draw() {
  background("black");
  
  fill("silver")
  textSize(20);
  text ("Score"+Score,40,80);

  if(gameState===PLAY){
    
    gameOver.visible=false;
    spiderman.visible=true;
  ground.visible=true;
    win.visible=false;
    restart.visible=false;
     ground.velocityX = 4;
   if (ground.x > 100){
      ground.x = ground.width/2;
    }
    
     if(keyDown("space")&& spiderman.y >=130){
    spiderman.velocityY=-12;
       
    spiderman.changeAnimation("spidey",spidermanJumping);
  }
    
    if(keyDown("s")){
      createWeb();
    }
 
    if (webGroup.isTouching(villan2Group)){
      villan2Group.destroyEach();
      webGroup.destroyEach();
    }
    
   if(energyGroup.isTouching(spiderman)){
      Score=Score+10;
      energyGroup.destroyEach();
      }
    
     // Adding spiderman gravity
  spiderman.velocityY = spiderman.velocityY + 0.8
  
    spiderman.collide(ground);
    
    //creates bulbs
  createbulbs();
 villan1();
    villan2();
    villan3();
  spawnlights();
    spawnHome();
    //spawning energy
    spawnEnergy();
    if (villan1Group.isTouching(spiderman)||villan2Group.isTouching(spiderman)||villan3Group.isTouching(spiderman)){
      gameState=END;
    }
    if (homeGroup.isTouching(spiderman)){
      gameState=WIN;
    }
    
  }
  
  if (gameState===END){
    win.visible=false;
    spiderman.visible=false;
    bulbGroup.destroyEach();
    villan1Group.destroyEach();
    villan2Group.destroyEach();
    villan3Group.destroyEach();
    webGroup.destroyEach();
    lightGroup.destroyEach();
    homeGroup.destroyEach();
    energyGroup.destroyEach();
    ground.visible=false;
    gameOver.visible=true;
    restart.visible=true;
    background("gold");
    if (keyDown("r")||(keyDown("R"))||(mousePressedOver(restart))){
     reset();
    }
  }
  
  if (gameState===WIN){
    
    restart.visible=true;
    win.visible=true;
     spiderman.visible=false;
    bulbGroup.destroyEach();
    villan1Group.destroyEach();
    villan2Group.destroyEach();
    villan3Group.destroyEach();
     webGroup.destroyEach();
    lightGroup.destroyEach();
    ground.visible=false;
    homeGroup.destroyEach();
    energyGroup.destroyEach();
   restart.y=250;
    restart.x=100;
     if (keyDown("r")||(keyDown("R"))||(mousePressedOver(restart))){
     reset();
       
     }
  }
   drawSprites();
 
}

function reset(){
  gameState=PLAY;
  
  Score=0;
}

function createbulbs(){
if (frameCount%120===0){
  bulb=createSprite(10,30,1,1);
  bulb.y=Math.round(random(10,15));
  bulb.addImage("light",bulbImage);
  bulb.scale=0.15;
  bulb.velocityX=1;
  bulb.lifetime=620;
  bulbGroup.add(bulb);
}
}

function villan1(){
if (frameCount%150===0){
  venom=createSprite(-20,295,12,12);
  venom.addAnimation("attack",venomAttack);
    venom.y = Math.round(random(296,296));
  venom.velocityX=5;
  venom.setCollider("rectangle",0,0,21,21);
  venom.debug=false;
  venom.scale=0.14;
  venom.depth = ground.depth;
    ground.depth = ground.depth + 1;
  venom.lifetime=620;
  villan1Group.add(venom);
}
}

function spawnlights   (){
    if (frameCount%100==0){
      light=createSprite(-30,200,12,1);
    light.addImage(sideLightImage);
      light.scale=0.5;
  light.y=Math.round(random(200,200));
      light.velocityX=4;
      light.lifetime=640;
      lightGroup.add(light);
    }
  
}

function villan2(){
  if (frameCount%450===0){
    goblin=createSprite(-20,280,1,1)
    goblin.addImage(goblinImage);
    goblin.y=Math.round(random(150,150));
    goblin.scale=0.5;
    goblin.velocityX=+(3+Score/40);
    villan2Group.add(goblin);
    goblin.lifetime=610; goblin.setCollider("rectangle",0,150,goblin.width,400);
    //goblin.debug=false;
  }
}

function createWeb(){
  web=createSprite(510,spiderman.y,1,1);
  web.addImage(webImage);
  web.scale=0.32;
  web.velocityX=-4;
  web.lifetime=300;
  webGroup.add(web);
}
function spawnHome(){
   if (frameCount%3000===0){
  helicarrier=createSprite(20,150,1,1);
  helicarrier.addImage(helicarrierImage);
  helicarrier.scale=0.4;
  helicarrier.y=Math.round(random(150,150));
  helicarrier.velocityX=+(5+Score/30);
  helicarrier.lifetime=610;
     homeGroup.add(helicarrier);
     
   }
}

function villan3(){
  if (frameCount%680===0){
    vulture=createSprite(20,280,1,1);
    vulture.addImage(vultureImage);
    vulture.scale=0.2;
     vulture.y=Math.round(random(80,80));
     vulture.velocityX=+(6+Score/50);
    vulture.lifetime=610;
    villan3Group.add(vulture);
  }
}

function spawnEnergy(){
  if (frameCount%60===0){
  energy=createSprite(120,2,2,2);
    energy.addImage(energyImage);
    energy.y=Math.round(random(250,100));
    energy.scale=0.02;
    energy.velocityX=4;
     energy.lifetime=610;
    energyGroup.add(energy);
  }
}