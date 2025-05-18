void setup() {
  size(400, 400);
};


//frameRate(30);
noStroke();

var debugText = "initial text";


var keys = {};

void keyReleased() {
    debugText = "released";
    keys[keyCode] = false;
    console.log("Key Released (keyCode): " + keyCode);
};  

void keyPressed() {
    debugText = "pressed";
    keys[keyCode] = true;
    console.log("Key Pressed (keyCode): " + keyCode);
};  

var collide = function(obj1, obj2){
    return obj1.x + obj1.w > obj2.x &&
           obj1.x < obj2.x + obj2.w &&
           obj1.y + obj1.h > obj2.y &&
           obj1.y < obj2.y + obj2.h;        
};

var collideh = function(obj1, obj2){
    return obj1.x > obj2.x &&
           obj1.x + obj1.w < obj2.x + obj2.w;
       
};
var collidev = function(obj1, obj2){
    return obj1.y > obj2.y &&
           obj1.y + obj1.h < obj2.y + obj2.h;        
};


var Player = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.xspeed = 0;
    this.yspeed = 0;
    this.speedLimit = 1;
    this.friction = 0.05;
    
    };
Player.prototype.draw = function() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.w, this.h);
    
    /*
    fill(4, 0, 255);
    rect(this.x, this.y, this.w, this.h);
    fill(242, 242, 242);
    rect(this.x + this.w/8.22, this.y + this.h/11.82, this.w/1.23, this.h/1.23);
    
    fill(4, 0, 255);
    rect(this.x + this.w/4.09, this.y + this.h/3.14, this.w/5, this.h/5);
    rect(this.x + this.w/1.80, this.y + this.h/3.14, this.w/5, this.h/5);
    */

};
Player.prototype.speedLimits = function(speedmax){
        
    this.speedmax = speedmax;
        
    if(this.xspeed > this.speedmax){
        this.xspeed = this.speedmax;
    }    
    
    if(this.xspeed < -this.speedmax){
        this.xspeed = -this.speedmax;
    }    
    
    if(this.yspeed > this.speedmax){
        this.yspeed = this.speedmax;
    }    
    
    if(this.yspeed < -this.speedmax){
        this.yspeed = -this.speedmax;
    }

};
Player.prototype.move = function(up, down, left, right, speed){
    
    this.speedLimits(2);
    
    //round(this.xspeed * 10) / 10      is to fix an error
    this.x = this.x + round(this.xspeed * 10) / 10;
    this.y = this.y + round(this.yspeed * 10) / 10;
    
    
    if (keys[up] === true){
        this.yspeed -= speed;
    }
    
    if (keys[down] === true){
        this.yspeed += speed;
    }
    
    if (keys[left] === true){
        this.xspeed -= speed;
    }
    
    if (keys[right] === true){
        this.xspeed += speed;
    }
};
Player.prototype.update = function(friction){
    this.friction = friction;
    
    if(this.yspeed > 0) { 
        this.yspeed -= this.friction; 
    }
    if(this.yspeed < 0) { 
        this.yspeed += this.friction; 
    }    
    
    if(this.xspeed > 0) { 
        this.xspeed -= this.friction; 
    }
    if(this.xspeed < 0) { 
        this.xspeed += this.friction; 
    }
};
Player.prototype.limits = function(){
    if (this.x < 0){
        this.x = 0;
        this.xspeed = 0;
    }
    
    if (this.x > 0 + width - this.w){
        this.x = 0 + width - this.w ;
        this.xspeed = 0;
    }
    
    if (this.y < 0){
        this.y = 0;
        this.yspeed = 0;
    } 
    
    if (this.y > 0 + height - this.h){
        this.y = 0 + height - this.h ;
        this.yspeed = 0;
    }  
        
};
Player.prototype.die = function(){

};
Player.prototype.respawn = function(originX, originY){
    this.x = originX;
    this.y = originY;
    this.xspeed = 0;
    this.yspeed = 0;
    
};

var thePlayer = new Player(30, 350, 20, 20);

var Origin = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
Origin.prototype.draw = function() {
    fill(151, 117, 224);
    rect(this.x, this.y, this.w, this.h);
};
var origin = new Origin(30, 350, 20, 20);

var Wall = function(x, y, w, h) { 
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.vertical = false;
    this.horizontal = false;
    
};
Wall.prototype.draw = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
};
Wall.prototype.collide = function() {

    if(this.horizontal === false){
        if(thePlayer.x + thePlayer.w > this.x &&
           thePlayer.x               < this.x + this.w){
               
            this.vertical = true;
            
            if(thePlayer.y + thePlayer.h > this.y &&
               thePlayer.y               < this.y + this.h){
    
                if(thePlayer.yspeed > 0){
                    thePlayer.yspeed = 0;
                    thePlayer.y = this.y - thePlayer.h;
                }            
                
                if(thePlayer.yspeed < 0){
                    thePlayer.yspeed = 0;
                    thePlayer.y = this.y + this.h;
                }
            }
        } else {
            this.vertical = false;
        }
    }
    
    if(this.vertical === false){
        if(thePlayer.y + thePlayer.h > this.y &&
           thePlayer.y               < this.y + this.h){
                   
            this.horizontal = true;
            
            if(thePlayer.x + thePlayer.w > this.x &&
               thePlayer.x               < this.x + this.w){
                   
                if(thePlayer.xspeed > 0){
                    thePlayer.xspeed = 0;
                    thePlayer.x = this.x - thePlayer.w;
                }            
                
                if(thePlayer.xspeed < 0){
                    thePlayer.xspeed = 0;
                    thePlayer.x = this.x + this.w;
                }
            }
        } else {
            this.horizontal = false;
        }
    }
};
Wall.prototype.move = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

var Lava = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
Lava.prototype.draw = function() {
    fill(0, 255, 13);
    rect(this.x, this.y, this.w, this.h);
};
Lava.prototype.collide = function() {
    if(collide(thePlayer, this)){
        thePlayer.respawn(30, 350);
    }
};
Lava.prototype.move = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

var Goal = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
};
Goal.prototype.draw = function() {
    fill(0, 213, 255);
    rect(this.x, this.y, this.w, this.h);
};
Goal.prototype.collide = function() {
    if(collide(thePlayer, this)){
        thePlayer.respawn(origin.x, origin.y);
        this.coll = true;
    } else {
        this.coll = false;
    }
};


//var wall1 = new Wall(200, 64, 61, 43);

var level = 1;


switch(level){
    case 1:
        var lava1 = new Lava(75, 64, 10, 345);
        var lava2 = new Lava(165, -9, 10, 375);
        var lava3 = new Lava(259, 64, 10, 345);
        var lava4 = new Lava(200, 100, 10, 10);
        var lava5 = new Lava(200, 100, 10, 10);
        
        var wall1 = new Wall(207, 196, 15, 15);
        var wall2 = new Wall(326, -9, 10, 375);
        
        var wall3 = new Wall(332, 63, 37, 79);
        var wall4 = new Wall(376, 174, 49, 75);
        var wall5 = new Wall(333, 280, 30, 4);
        var wall6 = new Wall(372, 305, 30, 4);
        var wall7 = new Wall(333, 338, 30, 4);
        
        var lvl1 = function(){

            origin.draw();
            lava1.draw();
            lava1.collide();
            lava2.draw();
            lava2.collide();
            lava3.draw();
            lava3.collide();
            lava4.draw();
            lava4.collide();
            //lava4.move(sin(frameCount*5/50)*32+210, cos(frameCount*5/50)*32+200, 10, 10);

            lava4.move(sin(frameCount/10)*32+210, cos(frameCount/10)*32+200, 10, 10); 

            
            lava5.draw();
            lava5.collide();
            //lava5.move(sin(frameCount*5/50+100)*32+210, cos(frameCount*5/50+100)*32+200, 10, 10); 

            lava5.move(sin(frameCount/10+360)*32+210, cos(frameCount/10+360)*32+200, 10, 10); 

            wall1.draw();
            wall1.collide();

            wall2.draw();
            wall2.collide();  
            wall3.draw();
            wall3.collide(); 
            wall4.draw();
            wall4.collide();  
            wall5.draw();
            wall5.collide();
            wall6.draw();
            wall6.collide();
            wall7.draw();
            wall7.collide();
        };
        
    break;
    case 2:
    /*
        var wall1 = new Wall(200, 200, 20, 20);
        
        var lvl2 = function(){
            wall1.draw();
            wall1.collide();
            wall1.move(sin(frameCount*5)*32+212, 200, 20, 20);
        };*/
    break;
}

var goal = new Goal(359, 21, 20, 20);


    
draw= function() {
    background(232, 232, 227);
    
    goal.draw();
    goal.collide();    
    if(goal.coll){
        level++;
    }
    
    switch(level){
        case 1:
            lvl1();
        break;
        case 2:
            //lvl2();
        break;
    }

    thePlayer.draw();
    thePlayer.move(38, 40, 37, 39, 0.1);
    thePlayer.limits();
    thePlayer.update(0.03);
    //textSize();
    text(debugText, 50, 50);
    
    //println(thePlayer.xspeed);
    //println(thePlayer.yspeed);
    
};
