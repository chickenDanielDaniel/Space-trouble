const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var spaceship,alien,bgd,ground
var spaceshipImg,alienImg,bgdImg
var aliens = [];
var bullets = [];


function preload(){
  spaceshipImg = loadImage("spaceship.png");
  ailenImg = loadImage("images.jpeg");
  bgdImg = loadImage("Space.jpeg");
}




function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  bgd = createSprite(400, 200, 50, 50);
  bgd.addImage(bgdImg);
  bgd.velocityY = 10;
  bgd.scale = 5;
  
  spaceship = createSprite(windowWidth/2,windowHeight/2+300,1,1);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.4

  var ground_options={
    isStatic:true
  }
  ground = Matter.Bodies.rectangle(width/2,height,width,10,ground_options);
  World.add(world,ground)
}

function draw() {
  background(255,255,255); 

  Engine.update(engine);

  if(bgd.y > 900){
    bgd.y = bgd.height/2
  }
  if(keyIsDown(LEFT_ARROW)){
    spaceship.x -= 12
  }
  if(keyIsDown(RIGHT_ARROW)){
    spaceship.x += 12
  }
  if(keyIsDown(UP_ARROW)){
    spaceship.y -= 5
  }
  if(keyIsDown(DOWN_ARROW)){
    spaceship.y += 5
  }
  
  for(var i = 0; i < bullets.length; i++){
    showBullets(bullets[i], i);
    if(collided(aliens[i],spaceship) == true){
      World.remove(world,aliens[i].body)
      delete aliens[i]

      gameOver();
    }
  }
  drawSprites();

  showAliens();
 
}
function showAliens() {
  if (aliens.length > 0) {
    if (
      aliens[aliens.length - 1] === undefined ||
      aliens[aliens.length - 1].body.position.y > height
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var alien = new Alien(random(0,width), 0, 170, 170, position);

      aliens.push(alien);
    }

    for (var i = 0; i < aliens.length; i++) {
      if (aliens[i]) {
        Matter.Body.setVelocity(aliens[i].body, {
          x: 0,
          y: 10
        });

        aliens[i].display();
      } 
    }
  } else {
    var alien = new Alien(random(0,width), 0, 170, 170, -60);
    aliens.push(alien);
  }
}
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var bullet = new Bullet(spaceship.x,spaceship.y)
    bullets.push(bullet)
  }
}
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    bullets[bullets.length-1].shoot();
  }
}
function showBullets(bullet, index){
  if(bullet){
    bullet.display();
    if(bullet.body.position.y<0){
      World.remove(world,bullets[index].body)
      delete bullets[index]
    }
  }
}

function collided(body,sprite){
  if(body!=null){
  
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<80){
      return true
    }else{
      return false
    }
  
   }
}

function gameOver(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vhv.rs%2Fviewpic%2FTihwbhx_spaceship-clipart-green-alien-alien-ship-cartoon-png%2F&psig=AOvVaw2WgEpVEtFwAHdsqFR-AuRJ&ust=1635322853069000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOi8icHS5_MCFQAAAAAdAAAAABAL",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

