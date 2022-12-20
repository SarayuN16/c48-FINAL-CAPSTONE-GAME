var fox;
var road;
var rockgroup;
var startingbg;

var gameState = "start";

var lifeSpan, lifeSpan2, lifeSpan3;
var lifeImg;

var treasure;

let engine;
let world;


function preload()
{
    foxImg = loadImage("fox.png");
    roadImg = loadImage("road.jpg");
    rocksImg = loadImage("rockobstacle.png");
    startingbg = loadImage("startingbg1.webp");
    lifeImg = loadImage("lifespan.png");
    treasureImg= loadImage("treasure1.png");
    
}



function setup()
{
    createCanvas(windowWidth, windowHeight);


    road = createSprite(displayWidth/2,windowHeight-300,windowWidth,1);
    road.addImage("road",roadImg);
    road.velocityX = -2;
    road.scale = 6.2;
    road.x = windowWidth/2;

    fox = createSprite(100,600,10,10);
    fox.addImage("fox",foxImg);
    fox.scale=0.1

    treasure = createSprite(1350,100,10,10);
    treasure.addImage("treasure",treasureImg);
    treasure.scale=0.3

    lifeSpan = createSprite(1000,100,10,10);
    lifeSpan.addImage("lifeSpan",lifeImg);
    lifeSpan.scale=0.2

    lifeSpan2 = createSprite(1100,100,10,10);
    lifeSpan2.addImage("lifeSpan",lifeImg);
    lifeSpan2.scale=0.2

    lifeSpan3 = createSprite(1200,100,10,10);
    lifeSpan3.addImage("lifeSpan",lifeImg);
    lifeSpan3.scale=0.2;


    rockgroup = createGroup();

   
}

function draw()
{
    background(startingbg);
    //image(startingbg,0,0,displayWidth+80,displayHeight);

    push();
    imageMode(CENTER);


    if (road.x < windowWidth/3+150){
        road.x=windowWidth/2;
    }

    pop();

    if(keyDown(LEFT_ARROW))
    {
        fox.x-=5;
    }

    if(keyDown(RIGHT_ARROW))
    {
        fox.x-=-5
    }

    if(keyDown(DOWN_ARROW))
    {
        fox.y-=-5
    }

    if(keyDown(UP_ARROW))
    {
        fox.y-=5
    }

    spawnRocks();

    if(fox.isTouching(rockgroup))
    {
        lifeSpan.visible=false;
        fox.x = 200;
    }

    if(fox.isTouching(rockgroup) && lifeSpan.visible==false)
    {
        lifeSpan2.visible=false;
        fox.x = 200;
        //console.log("l2")
    }

    if(fox.isTouching(rockgroup) && lifeSpan.visible==false && lifeSpan2.visible==false)
    {
        lifeSpan3.visible=false;
        fox.x = 200;
    }

    if(lifeSpan3.visible==false){
        gameState= "end";
        swal({
            title: "Game Over!",
            text: "You lost all of your lives :(",
            icon: "error",
            button: "Ok"
          })
    }

    if(fox.isTouching(treasure))
    {
        gameState == "end";
        swal({
            title: "Game Over!",
            text: "YOU COLLECTED THE TREASURE!!",
            icon: "success",
            button: "Yay!"
          })
    }

    if(gameState == "end")
    {
        road.velocityX = 0;
        rockgroup.destroyEach();
    }

    
    
    drawSprites();
}


function spawnRocks(){
    if (frameCount % 100 === 0){
        var rand = Math.round(random(200,800));
        var rocks = createSprite(1800,rand,10,10);
        rocks.addImage("rocks",rocksImg);

        //var rand= Math.round(random(1));
        rocks.velocityX = -2;
        rocks.scale=0.2;
        rocks.lifetime = 1000;
        rockgroup.add(rocks);
    }
}

