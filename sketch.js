//variable===============================================
var landheight = 150;

var canvaswidth = 600*2;
var canvasheight = 480*1.5;
var rectsize = 30;
var rectx = 100;    //default x position
var recty = canvasheight - rectsize - landheight;    //default y position
var lineangle = 0;    //default angle
var throwballsize = 35;

var movespeed = 2;
var turnanglespeed = 1;
var xspeedconst = 5;
var yspeedconst = 5;
var gravity = 0.1;
var powerbarspeed = 0.75;

//const==================================================
var powerpercent = 0;   //default percent
var powerbool = true;
var toward = 60;    //const angle text position
var cosxlineanglepower = 0;
var sinylineanglepower = 0;
var Xthrowblock = 0;
var Ythrowblock = 0;
var lockmovewhenthrowing = false;

//matter.js
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Constraint = Matter.Constraint;

var engine;
var world;
var boxes = [];

var ground;


function setup() {
  createCanvas(canvaswidth, canvasheight);
  
  
  //matter
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(canvaswidth/2, canvasheight - landheight/2, canvaswidth, landheight, options);
  World.add(world, ground);
}

function draw() {
  background(255, 180, 210);
  
  //land
  
  push();
  stroke(255);
  fill(color('#b8f1ed'));
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, landheight);
  pop();
  
  //Position========================================
  
  rect(rectx, recty, rectsize, rectsize);
  
  //Angle========================================
  
  push();
  angleMode(DEGREES);
  translate(rectx+(rectsize/2), recty+(rectsize/2));
  
  
  if(toward > 0){   //toward right
    textSize(32);
    text(lineangle, 45, 10);
    rotate(-lineangle);
  }else{    //toward left
    textSize(32);
    text(lineangle, -75, 10);
    rotate(lineangle);
  }
  line(0, 0, toward, 0);
  angleMode(RADIANS);
  pop();
  
  //Power=========================================
  
  rect(0, 0, ceil(powerpercent)*(canvaswidth/100), 60);
  textSize(32);
  text(ceil(powerpercent), 30, 60);
  textSize(18);
  text('0', 0, 30);
  text('1', 1*(canvaswidth/10), 30);
  text('2', 2*(canvaswidth/10), 30);
  text('3', 3*(canvaswidth/10), 30);
  text('4', 4*(canvaswidth/10), 30);
  text('5', 5*(canvaswidth/10), 30);
  text('6', 6*(canvaswidth/10), 30);
  text('7', 7*(canvaswidth/10), 30);
  text('8', 8*(canvaswidth/10), 30);
  text('9', 9*(canvaswidth/10), 30);
  text('10', 9.8*(canvaswidth/10), 30);
  
  //Monitor Block if stop or out of canvas=========================================
  if(boxes.length > 0){
    if(boxes[boxes.length-1].MonitorBlockStopOrOut()){
      resetthrow();
    }
  }
  
  //Keyboard========================================
  
  if(!lockmovewhenthrowing){    //if block is throwing, it can't action
    if(keyIsDown(37)){  //left
      rectx -= movespeed;
      if(rectx < 0){
        rectx = 0;
      }
      if(toward > 0){
        toward = -toward;
      }
    }
    if(keyIsDown(39)){  //right
      rectx += movespeed;
      if(rectx > canvaswidth - 30){
        rectx = canvaswidth - 30;
      }
      if(toward < 0){
        toward = -toward;
      }
    }
    if(keyIsDown(38)){  //up
      lineangle += turnanglespeed;
      if(lineangle > 90){
        lineangle = 90;
      }
    }
    if(keyIsDown(40)){  //down
      lineangle -= turnanglespeed;
      if(lineangle < 0){
        lineangle = 0;
      }
    }
    if(keyIsDown(32)){  //space
      if(powerpercent > 100){
        powerbool = !powerbool;
      }
      if(powerpercent < 0){
        powerbool = !powerbool;
        powerpercent = 0;
      }
      if(powerbool){
        powerpercent += powerbarspeed;
      }else{
        powerpercent -= powerbarspeed;
      }
    }
  }
  for(var i = 0 ; i < boxes.length; i++){
    boxes[i].show();
  }
}

function mousePressed(){
  boxes.push(new Box(mouseX, mouseY, 20, 20));
}

function keyReleased() {
  
  if(!lockmovewhenthrowing){    //if block is throwing, it can't action
    if (keyCode === 32) {
      push();
      angleMode(DEGREES);
      cosxlineanglepower = cos(lineangle)*ceil(powerpercent);
      sinylineanglepower = sin(lineangle)*ceil(powerpercent);
      Xthrowblock = rectx + (rectsize/2);
      Ythrowblock = recty + (rectsize/2);
      lockmovewhenthrowing = true;
      
      if(toward > 0){
        cosxlineanglepower = cosxlineanglepower;   
      }else{
        cosxlineanglepower = -cosxlineanglepower;
      }
      angleMode(RADIANS);
      pop();
      boxes.push(new Box(Xthrowblock, Ythrowblock, throwballsize, throwballsize, cosxlineanglepower, sinylineanglepower));
    }
  }
  
  return false; // prevent any default behavior
}

function resetthrow(){
  setTimeout(function(){
      lockmovewhenthrowing = false;   //re can move
      powerpercent = 0;   //re default
      powerbool = true;   //re default
      Xthrowblock = 0;   //re default
      Ythrowblock = 0;   //re default
    },0);
}

