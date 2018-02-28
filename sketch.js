var canvaswidth = 600*2;
var canvasheight = 480*1.5;
var rectx = 100;    //default x position
var recty = canvasheight-30;    //default y position
var lineangle = 0;    //default angle
var powerpercent = 0;   //default percent
var powerbool = true;
var toward = 60;    //const aangle text position
var cosxlineanglepower = 0;
var sinylineanglepower = 0;
var Xthrowblock = 0;
var Ythrowblock = 0;
var lockmovewhenthrowing = false;

function setup() {
  createCanvas(canvaswidth, canvasheight);
  angleMode(DEGREES)
}

function draw() {
  background(255, 180, 210);
  
  //Position========================================
  
  rect(rectx, recty, 30, 30);
  
  
  //Angle========================================
  
  push();
  translate(rectx+15, recty+15);
  
  
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
  pop();
  
  //Power=========================================
  
  rect(0, 0, powerpercent*(canvaswidth/100), 60);
  textSize(32);
  text(powerpercent, 30, 60);
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
  
  //Throw=========================================
  
  throwfunc();
  
  //Keyboard========================================
  
  if(!lockmovewhenthrowing){    //if block is throwing, it can't action
    if(keyIsDown(37)){  //left
      rectx -= 2;
      if(rectx < 0){
        rectx = 0;
      }
      if(toward > 0){
        toward = -toward;
      }
    }
    if(keyIsDown(39)){  //right
      rectx += 2;
      if(rectx > canvaswidth - 30){
        rectx = canvaswidth - 30;
      }
      if(toward < 0){
        toward = -toward;
      }
    }
    if(keyIsDown(38)){  //up
      lineangle += 1;
      if(lineangle > 90){
        lineangle = 90;
      }
    }
    if(keyIsDown(40)){  //down
      lineangle -= 1;
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
        powerpercent += 1;
      }else{
        powerpercent -= 1;
      }
    }
  }
  
}



function keyReleased() {
  if(!lockmovewhenthrowing){    //if block is throwing, it can't action
    if (keyCode === 32) {
      cosxlineanglepower = cos(lineangle)*powerpercent/5;
      sinylineanglepower = sin(lineangle)*powerpercent/5;
      Xthrowblock = rectx + 15;
      Ythrowblock = recty + 15;
      lockmovewhenthrowing = true;
    }
  }
  return false; // prevent any default behavior
}

function throwfunc(){
  if(lockmovewhenthrowing){
    if(toward > 0){
      Xthrowblock += cosxlineanglepower;
    }else{
      Xthrowblock -= cosxlineanglepower;
    }
    Ythrowblock += -(sinylineanglepower);
    sinylineanglepower -= 0.1;
    ellipse(Xthrowblock, Ythrowblock, 35, 35);
  }
  if(Xthrowblock < 0 || Xthrowblock > canvaswidth || Ythrowblock > canvasheight){
    resetthrow(); 
  }
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

