var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var divisions = [];
var particles = [];
var plinkos = [];

var divisionHeight=300;
var score = 0;
var turn = 0;
var PLAY = 2;
var END = 1;
var gameState = PLAY;
var scorer;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);
  
  //to make divisions with a gap of 80
  for(var i = 0; i < 800; i = i + 80 ) {
    divisions.push(new Divisions(i, 800 - 150, 5, 300));
  }

  //to make the dots at the gap of 50 (first line)
  for(var i = 80; i < 770; i = i + 50) {
    particles.push(new Plinko(i, 50));
  }

  //to make the dots at the gap of 50 (first line)
  for(var i = 50; i < 790; i = i + 50) {
    particles.push(new Plinko(i, 150));
  }
  
  //to make the dots at the gap of 50 (first line)
  for(var i = 80; i < 770; i = i + 50) {
    particles.push(new Plinko(i, 250));
  }

  //to make the dots at the gap of 50 (first line)
  for(var i = 50; i < 790; i = i + 50) {
    particles.push(new Plinko(i, 350));
  }

}
 
function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  Engine.update(engine);

  console.log(gameState);

   for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }

  for(var i = 20; i < 300; i = i + 80 ) {
    textSize(20);
    fill("white");
    text("500", i, 550);
  }

  for(var i = 340; i < 600; i = i + 80 ) {
    textSize(20);
    fill("white");
    text("100", i, 550);
  }

  for(var i = 660; i < 900; i = i + 80 ) {
    textSize(20);
    fill("white");
    text("200", i, 550);
  }

  //to display the dots on the screen
  for(var i = 0; i < particles.length; i++) {
    particles[i].display();
  }

  /*for (var j = 0; j < plinkos.length; j++) {
    plinkos[j].display();
  }*/

  if(scorer != null) {
    scorer.display();

    if(scorer.body.position.y < 500 && scorer.body.position.y > 495) {
      console.log("Hello");

      if(scorer.body.position.x < 300) {
        score = score + 500;
      }
    }
  }

  if(scorer != null) {
    if(scorer.body.position.y < 500 && scorer.body.position.y > 490) {
      if(scorer.body.position.x > 301 && scorer.body.position.x < 600) {
        score = score + 100;
      }
    }
  }

  if(scorer != null) {
    if(scorer.body.position.y < 500 && scorer.body.position.y > 495) {
      if(scorer.body.position.x > 601 && scorer.body.position.x < 900) {
        score = score + 200;      
      }
    }
  }

  if(scorer != null) {
    if(scorer.body.position.y < 780 && scorer.body.position.y > 775) {
      scorer = null;
    }
  }

  /*for (var j = 0; j < plinkos.length; j++) {
   
    plinkos[j].display();
  }*/



/*   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }*/
 
  /*for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }*/
   
   if(gameState === END && scorer === null) {
    textSize(50);
    fill("white");
    text("Game Over!", 250, height/2);

    textSize(30);
    text("Your Score was: " + score, 250, height/2 + 60)
  }
     
   if(turn >= 5) {
     gameState = END;
   }

}

function mousePressed() {
    if(gameState === PLAY) {
      turn++;
      // to make plinkos
      scorer = new Particle(mouseX, 0, 10);
      
    }
}