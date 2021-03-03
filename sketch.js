var background, backgroundImage
var ground
var ninja, ninjaImage
var JadePalace, JadePalaceImage
var Bcar, BcarImage
var Gcar, GcarImage
var Rock, RockImage
var Scroll, ScrollImage
var score = 0
var gameState = "play"
var flag=0
function preload() {
  backgroundImage = loadImage("Silicon Valley/background.jpg")
  ninjaImage = loadImage("Silicon Valley/Ninja2.png")
  JadePalaceImage = loadImage("Silicon Valley/jade palace.jpg")
  BcarImage = loadImage("Silicon Valley/BlueCar.png")
  GcarImage = loadImage("Silicon Valley/GreenCar.png")
  RockImage = loadImage("Silicon Valley/Rock.png")
  ScrollImage = loadImage("Silicon Valley/DragonScroll.jpg")
  panda = loadAnimation("Silicon Valley/p1.png", "Silicon Valley/p2.png", "Silicon Valley/p3.png")
}




function setup() {
  createCanvas(1000, 800);
if(flag === 0){
  background("black")
  textSize(50)
  fill("white")
  text("You are a panda, and your mission ",50,180 )
  text("should you choose to accept it is",50,230)
text("run to the Jade Palace avoiding all ",50,285)
text("obstacles and get the",50, 335)
textSize(80)
fill("gold")
text("GOLDEN SCROLL",50,430)
fill("white")
textSize(50)
text("Press the SPACE KEY to start the game",50,600)
text("Use the arrows to avoid obstacles & ",50,500)
text("the space key to jump over rocks",50,550)

  background = createSprite(500, 200, 800, 400)
  background.scale = 2
  background.addImage(backgroundImage)
  background.velocityY = -4
  BcarGroup = new Group()
  //Count = 0
  ground = createSprite(500, 750, 1000, 20);
  //ground.velocityY=4
  ground.visible = false
  ninja = createSprite(500, 600)
  ninja.addImage(ninjaImage)
  ninja.scale = 0.6
  ninja.setCollider("rectangle", 0, 0, 100, 300)
  background.visible = false
    ninja.visible = false
}
}
function draw() {
  if(keyDown("space")&& flag ===0){
flag=1
  }
  if(flag===1){
    background.visible = true
    ninja.visible = true
    flag = 2
  }
  if (gameState === "play" && flag === 2) {
    if (background.y < 0) {
      background.y = 200
    }
    cars()
    if (ninja.isTouching(BcarGroup)) {
      //BcarGroup.destroyEach()

      gameState = "end"
    }
    edges = createEdgeSprites()
    ninja.bounceOff(edges)
    drawSprites();
    if (score > 100) {
      background.destroy()
      gameState = "win"
flag = 3
    }

    if (keyDown("space")) {
      ninja.velocityX = 0;
      ninja.velocityY = -25;
    }
    ninja.velocityY = ninja.velocityY + 0.8
    ninja.collide(ground)
    if (keyDown(LEFT_ARROW)) {
      ninja.velocityX = -15;
      ninja.velocityY = 0;
    }
    if (keyDown(RIGHT_ARROW)) {
      ninja.velocityX = 6;
      ninja.velocityY = 0;
    }

    fill("white")
    textSize(50)
    text("score = " + score, 200, 50)
    score = score + Math.round(frameCount / 100)

  }
  if (gameState === "end") {
    BcarGroup.setVelocityXEach(0)
    textSize(100)
    textFont("Courier New")
    fill("red")

    text("Mission Failed", 100, 400)
  }
  if (gameState === "win"&& flag === 3) {
    flag=4
    
  }
  if(flag===4){
    console.log("hi")
    //background.visible = false
    //ninja.visible = false
        //background(JadePalaceImage)
        //ninja.destroy()
        b=createSprite(500,400,1000,800)
        b.depth = 100
        panda1 = createSprite(400, 750, 10, 10)
        panda1.addAnimation("panda", panda)
        console.log("hello")
  }
}

function cars() {
  if (frameCount % 100 == 0) {
    Bcar = createSprite(Math.round(random(250, 550)), 0)
    var r = Math.round(random(1, 2))
    if (r == 1) {
      Bcar.addImage(BcarImage)
      Bcar.scale = 0.6
      Bcar.setCollider("rectangle", 0, 0, 300, 200)
    }
    if (r == 2) {
      Bcar.addImage(GcarImage)
      Bcar.scale = 1.2
      Bcar.setCollider("rectangle", 0, 0, 150, 100)
    }
    Bcar.velocityY = 5
    BcarGroup.add(Bcar)

    ninja.depth = Bcar.depth + 1

  }
}


