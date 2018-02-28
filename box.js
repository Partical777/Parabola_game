var SpringPower = 5;

function Box(x,y,w,h,Xspeed,Yspeed){
  var options = {
    friction: 0.5,
    restitution: 0.4,
    
  }
  console.log(x+"&"+y);
  console.log(Xspeed+"&"+Yspeed);
    
  this.body = Bodies.rectangle(x,y,w,h,options);
  this.w = w;
  this.h = h;
  // World.add(world, this.body);
  var anchor = { x: x+Xspeed*SpringPower, y: y-Yspeed*SpringPower };
  var elastic = Constraint.create({
      pointA: anchor,
      bodyB: this.body,
      length: 50,
      stiffness: 0.01
    });
  World.add(world, this.body);
  World.add(world, elastic);
  var preBlock = this.body;   //create new Variable replace original Pointer
  
  var tmpX = 0;
  var tmpY = 0;
  //Monitor If the block stop
  // var tmpPassportForShow = true;
  
  var tmpPassportForShowSpring = true;    //Allow to spring
  var tmpPassportForMonitorBlockStopOrOut = true;
  
  
  this.show = function(){
    
    //Let it Spring
    if(tmpPassportForShowSpring && (this.body.position.x != x || this.body.position.y != y)){
      this.body = Bodies.rectangle(x,y,w,h,options);
      World.add(world, this.body);
      elastic.bodyB = this.body;
      tmpPassportForShowSpring = false;
    }
    
    //Monitor If the block stop
    /*
    if(tmpPassportForShow && (preBlock.position.x == tmpX) && (preBlock.position.y == tmpY)){
      console.log(Math.floor(preBlock.position.x));
      console.log(Math.floor(preBlock.position.y));
      tmpPassportForShow = false;
    }
    tmpX = preBlock.position.x;
    tmpY = preBlock.position.y;
    */
    
    var pos = preBlock.position;
    var angle = preBlock.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(125);
    rect(0, 0, this.w, this.h);
    pop();
  }
  
  //Monitor Block if stop or out of canvas
  this.MonitorBlockStopOrOut = function(){
    //if (X & Y in the canvas AND stop) || (X out of left hand side) || (X out of right hand side) || (Y out of bottom side)
    if(tmpPassportForMonitorBlockStopOrOut && (( Math.floor(preBlock.position.x) == tmpX && Math.floor(preBlock.position.y) == tmpY && Math.floor(preBlock.position.y) > 0 && Math.floor(preBlock.position.x) < height ) || (preBlock.position.x < 0) || (preBlock.position.x > width) || (preBlock.position.y > height))){
      tmpPassportForMonitorBlockStopOrOut = false;
      console.log("fuck");
      return true;
    }else{
      tmpX = Math.floor(preBlock.position.x);
      tmpY = Math.floor(preBlock.position.y);
      return false;
    }
  }
  
}