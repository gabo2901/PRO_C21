var path, dog, cash, sword;
var pathImg, dogImg, dogImg2, cashImg, swordImg;
var cashCollection = 0;
var cashG, swordGroup;
var gover

var PLAY = 1;
var END = 0;
var gameState = 1;
//perro consiguiendo dinero para pagar sus deudas 
function preload() {
  pathImg = loadImage("fondo.png");
  dogImg = loadAnimation("dog1.png", "dog2.png");
  dogImg2 = loadAnimation("explode.png");
  cashImg = loadImage("cash.png");
  swordImg = loadImage("sword.png");
  gover = loadImage("gameOver.png");

}

function setup() {

  createCanvas(600, 400);


  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityX = -4;


  dog = createSprite(70, 580, 20, 20);
  dog.addAnimation("dogrunning", dogImg);
  dog.scale = 0.8;


  cashG = new Group();
  swordGroup = new Group();

}

function draw() {

  if (gameState === PLAY) {
    background(0);
    dog.y = World.mouseY;

    edges = createEdgeSprites();
    dog.collide(edges);


    if (path.x < 0) {
        path.x = path.width / 2;
      }

    createCash();
    createSword();

    if (cashG.isTouching(dog)) {
      cashG.destroyEach();
      cashCollection = cashCollection + 50;
    }
    if (swordGroup.isTouching(dog)){
     gameState = END;

    }

    } else {
      if (gameState === END) {
        
        dog.addAnimation("DOG_EXPLODES", dogImg2);

        cashG.destroyEach();
        swordGroup.destroyEach();

        cashG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);


        over = createSprite(300, 200, 20, 20);
        over.addAnimation("gameover", gover);
        over.scale = 0.7

        path.velocityX = 0;
        dog.velocityY = 0;
        
        
       

      }
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Dinero: " + cashCollection, 10, 30);
  }


function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(550,Math.round(random(50, 250)));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityX = -3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}


function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(550,Math.round(random(50, 350)));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityX = -3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}