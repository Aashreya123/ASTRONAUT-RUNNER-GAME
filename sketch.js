var bgImg, star1Img, star2Img, shootingImg
var aster1Img, aster2Img, astronautImg, spaceImg, gameoverImg, gameover, restartImg, restart;
var score=0;
var life = 3;

function preload(){
  bgImg = loadImage("background.jpg");
  star1Img = loadImage("Star1.png");
  star2Img = loadImage("Star2.png");
  shootingImg = loadImage("shootingStar.png");
  aster1Img = loadImage("Asteroid1.png");
  aster2Img = loadImage("Asteroid2.png");
  astronautImg = loadImage("Astronaut.png");
  spaceImg = loadImage("spaceship.png");
  bg1Img = loadImage("background.jpg");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}

function setup (){
  createCanvas (displayWidth-120, displayHeight-140)
  bg = createSprite(width/2,height/2)
  bg.addImage(bgImg)
  bg.scale= 0.4
  bg.velocityX = -2

  bg1 = createSprite(width,height/2)
  bg1.addImage(bg1Img)
  bg1.scale= 0.4
  bg1.velocityX = -2

  astronaut = createSprite(100, height-100)
  astronaut.addImage(astronautImg)
  astronaut.scale = 0.4;

  star1g = createGroup()
  star2g = createGroup()

  enemyG = createGroup()

  spaceship = createSprite(displayWidth-300, displayHeight-200)
  spaceship.addImage(spaceImg)
  spaceship.visible = false

  gameover = createSprite(displayWidth/2, displayHeight/2)
  gameover.addImage(gameoverImg)
  gameover.scale = 0.8;
  gameover.visible = false

  restart = createSprite(displayWidth/2, displayHeight/2-300)
  restart.addImage(restartImg)
  restart.scale = 0.5;
  restart.visible = false

}

function draw (){
  background(0)
  drawSprites()

  textSize(30)
  fill ("white")
  text("Score : "+score, 100, 100)

  createEnemy()

  if(frameCount %100 === 0){
    var select = Math.round(random(1,2))
      if(select === 1){
        createStars1()
      }
      else{
        createStars2()
      }
    }

  edges = createEdgeSprites()
  astronaut.bounceOff(edges[0])
  astronaut.bounceOff(edges[1])
  astronaut.bounceOff(edges[2])
  astronaut.collide(edges[3])

  if (keyDown("up")){
    astronaut.velocityY = -10;
  }

 astronaut.velocityY += 0.5;

  if(bg.x<0){
    bg.x = width/2
  }

  if(bg1.x<width/2){
    bg1.x = width
  }

  if (keyDown("right")){
    astronaut.x += 2;
  }

  if (astronaut.isTouching(enemyG)){
    astronaut.visible = false
    gameover.visible = true
    restart.visible = true
    enemyG.destroyEach()
    life--
  }

  for(var i = 0; i<star1g.length; i++){



  if (star1g.get(i).isTouching(astronaut)){
    score = score+100
    star1g.get(i).destroy()
  }
}

for(var i = 0; i<star2g.length; i++){



  if (star2g.get(i).isTouching(astronaut)){
    score = score+50
    star2g.get(i).destroy()
  }
}

if (score >= 100){
  spaceship.visible = true
  if(astronaut.isTouching(spaceship)){
    astronaut.destroy()
    spaceship.x = displayWidth/2
    spaceship.y = displayHeight/2
    
  }
}


}

function createStars1 (){
 
    var star = createSprite(width, random(50, height/2+100))
    star.velocityX = -2
    star.scale = 0.1
    star.lifetime = width/2

    star.addImage(star1Img)
    star1g.add(star)
  
  }


function createStars2 (){
  
    var star = createSprite(width, random(50, height/2+100))
    star.velocityX = -2
    star.scale = 0.3
    star.lifetime = width/2

     star.addImage(star2Img)
     star2g.add(star)

}

function createEnemy (){
  if (frameCount % 250 === 0){
    enemy = createSprite(displayWidth,50)
    enemy.scale = 0.5;
    var position = Math.round(random(1,2))
    enemy.velocityX = -4
    enemy.velocityY = 2
    var select = Math.round(random(1,3))
    if (select === 1){
      enemy.addImage(aster1Img)
    }
    else if(select === 2){
      enemy.addImage(aster2Img)
    }
    else{
      enemy.addImage(shootingImg)
    }

    enemy.lifetime = displayWidth/4
    enemyG.add(enemy)
  }
}