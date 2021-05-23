var bg, bgImg;
var road, roadImg;
var invisible_ground;
var cyclist, cyclistImg;
var edges;
var coin, coinImg, coinScore, coinGrp;
var lifeImg, life, lifeScore, lifeGrp;
var energy_boosterImg, energy_booster, energy_boosterGrp;
var obstacle1,obstacle2, obstacle1Grp, obstacle1Img, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img;

function preload(){
 
  bgImg = loadImage("bg.jpg");
  roadImg = loadImage("road.jpg");
  
  cyclistImg = loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png","girl5.png","girl6.png");
  
  coinImg = loadImage("coin.png");
  lifeImg = loadImage("life.png");
  energy_boosterImg = loadImage("energy_booster.png");
  
  obstacle1Img = loadImage("traffic_cone.png");
  obstacle2Img = loadImage("box.png");
  //obstacle3Img = loadImage("dustbin.png");

  obstacle4Img = loadImage("barrier.png");
  obstacle5Img = loadImage("spikes1.png");
}



function setup() {
  createCanvas(800, 400);
  
  bg = createSprite(400,50,800,320);
  bg.addImage(bgImg);
  bg.scale = 3.45;
  bg.velocityX = -3;
  
  road = createSprite(400,360,800,80);
  road.addImage(roadImg);
  
  invisible_ground = createSprite(400,370,800,10);
  //invisible_ground.shapeColor = "blue";
  invisible_ground.visible = false;
  
  cyclist = createSprite(70,320,30,30);
  cyclist.addAnimation("riding",cyclistImg);
  //cyclist.debug = true;
  cyclist.setCollider("rectangle",0,0,50,100);
 
  coinGrp = new Group();
  lifeGrp = new Group();
  energy_boosterGrp = new Group();
  obstacle1Grp = new Group();
  
  coinScore = 0;
  lifeScore = 3;
}

function draw() {
  background("lightblue");
  
  if(bg.x<0){
    bg.x = bg.width/2
  }
  
  if(keyDown(UP_ARROW)){
    cyclist.velocityY = -12;
  }

  cyclist.velocityY += 0.6;
  
  /*if(cyclist.isTouching(coinGrp)){
     coinScore  += 1;
     coinGrp.destroyEach();
  }
  
  if(cyclist.isTouching(lifeGrp)){
    lifeGrp.destroyEach();
    lifeScore  += 1;
  }
  
  if(cyclist.isTouching(energy_boosterGrp)){
    energy_boosterGrp.destroyEach();
    bg.velocityX -= 1;
  }
  
  if(obstacle1Grp.isTouching(cyclist)){
    obstacle1Grp.destroyEach();
    lifeScore -= 1;
    bg.velocityX += 1;
  }*/
  
  spawnCoins();
  spawnLife();
  spawnEnergy_booster();
  spawnObstacles1();
  
  edges = createEdgeSprites();
  
  cyclist.collide(edges);
  cyclist.collide(invisible_ground);
  
 // console.log(bg.velocityX);
  
  drawSprites();
  
  image(coinImg,15,5);
  fill(0);
  textSize(25);
  text(" : " + coinScore,50,40);
  
  image(lifeImg,15,45);
  text(" : " + lifeScore,50,75);
  
}

function spawnCoins(){
  if(frameCount%400===0){
    coin = createSprite(990,230,50,50);
    //coin.velocityX = -2;
    coin.velocityX = bg.velocityX;
    coin.lifetime = 500;
    coin.addImage(coinImg);
    coinGrp.add(coin);
  }
}

function spawnLife(){
  if(frameCount%1000===0){
    life = createSprite(990,230,50,50);
    //life.velocityX = -2;
    life.velocityX = bg.velocityX;
    life.lifetime = 500;
    life.addImage(lifeImg);
    lifeGrp.add(life);
  }
}

function spawnEnergy_booster(){
  if(frameCount%700===0){
    energy_booster = createSprite(990,230,50,50);
    //energy_booster.velocityX = -2;
    energy_booster.velocityX = bg.velocityX;
    energy_booster.lifetime = 500;
    energy_booster.addImage(energy_boosterImg);
    energy_booster.scale = 0.2;
    energy_boosterGrp.add(energy_booster);
  }
}

function spawnObstacles1(){
  if(frameCount%350===0){
    obstacle1 = createSprite(990,370,50,50);
    //obstacle1.velocityX = -2;
    obstacle1.velocityX = bg.velocityX;
    obstacle1.scale = 1.5;
    obstacle1.lifetime = 500;
    //cyclist.y = obstacle1.y;
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1 : obstacle1.addImage(obstacle1Img);
      break;
      case 2 : obstacle1.addImage(obstacle2Img);
      break;
      //case 3 : obstacle1.addImage(obstacle3Img);
      //break;
      case 3 : obstacle1.addImage(obstacle4Img);
      break;
      case 4  : obstacle1.addImage(obstacle5Img);
      break;
      default : break;
     }
    obstacle1Grp.add(obstacle1);
  }
}