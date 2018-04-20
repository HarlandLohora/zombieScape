$( document ).ready(function() {
    $("#ins").css("display","none");
});


var canvas=document.getElementById("stage");

var ctx=canvas.getContext("2d");
var position=0, maxJump=200, time=0,kills=0, money=0, cure=0,lives=3;	;
var isJumping = false, isShooting=false;
var bullets= [], zombies=[], Faids=[],Gustavs=[], dollars=[];
var vel=0, restart=0;
var frames = 0,interval;

/*FUNCTION BUTTONS*/
function showInstructions(){
	$(".pulse").removeClass("none");
	$(".instructions").removeClass("none");
	$("#ins").css("display","initial");
}
function quit(){
	$("#ins").css("display","initial");
	clearInterval(interval);	
	interval=0;
	$("#areU").removeClass("none");
}
function pause(){
	$("#pause").addClass("none");
	clearInterval(interval);	
	interval=0;
	$("#continue").removeClass("none");
}


function gotIt(){
	$(".pulse").addClass("none");
	$(".instructions").addClass("none");
	$(".info").css("display","none");
	$("#ins").css("display","none");
}

/*FUNCTIONS*/

function Random(){
	randomTime=Math.floor(Math.random()*5);
	return randomTime;
}
function RandomF(){
	randomTimeF=Math.floor(Math.random()*10);
	return randomTimeF;
}

function generateZombies(){
	var zombie = new ZombieOne()
	zombies.push(zombie);
}

function generateBullets(){
	var bullet = new newBullet();
	bullets.push(bullet);
}
function generateAids(){
	var aid = new FirstAid();
	Faids.push(aid);
}

function generateCash(){
	var cash = new green();
	dollars.push(cash);
}



function drawZombies(){
	zombies.forEach(function(zombie){
		zombie.draw();
	})
}

function drawBullets(){
	bullets.forEach(function(bullet){
		bullet.draw();	
	})
	
};
function drawAids(){
	Faids.forEach(function(aid){
		aid.draw();	
	})
	
};
function drawDollars(){
	dollars.forEach(function(cash){
		cash.draw();	
	})
	
};


function newBullet(){
	this.x=gustav.x+180;
	this.y=gustav.y+80;
	this.width=25;
	this.height=15;
	this.bullet = new Image();
	this.bullet.src="../img/BulletRigth.png";
	this.draw = function(){ 
		this.x+=5;
		ctx.drawImage(this.bullet,this.x,this.y, this.width, this.height);
	}
}

function ZombieOne(){
	this.x=canvas.width;
	this.y=350;
	this.width = 150;
	this.height = 150;
	this.zombie=new Image();
	this.zombie.src="../img/zombieOne.png";
	this.zombie.onload = function(){ //se ejecuta cuando la imagen se carga
			this.draw();		//es un callback
		}.bind(this);
	this.draw = function(){ 
		this.x-=1;
		ctx.drawImage(this.zombie,this.x,this.y, this.width, this.height);
	}
		this.isTouching=function(pipe){
			return (this.x <pipe.x +pipe.width)&&
				(this.x + this.width > pipe.x)&&
				(this.y < pipe.y + pipe.height)&&
				(this.y + this.height > pipe.y);
		};
}

/*=================================

===================================*/
function FirstAid(){
	this.x=canvas.width;
	this.y=200;
	this.width = 50;
	this.height = 50;
	this.aid=new Image();
	this.aid.src="../img/FirstAid.png";
	this.aid.onload = function(){ 
			this.draw();		
		}.bind(this);
	this.draw = function(){ 
		this.x-=1;
		ctx.drawImage(this.aid,this.x,this.y, this.width, this.height);
	}
	this.isTouching=function(pipe){
		return  (this.x <pipe.x +pipe.width)&&
				(this.x + this.width > pipe.x)&&
				(this.y < pipe.y + pipe.height)&&
				(this.y + this.height > pipe.y);
		};
}

function green(){
	this.x=canvas.width;
	this.y=120;
	this.width = 50;
	this.height = 50;
	this.dollar=new Image();
	this.dollar.src="../img/cash.png";
	this.dollar.onload = function(){ 
			this.draw();		
		}.bind(this);
	this.draw = function(){ 
		this.x-=3;
		ctx.drawImage(this.dollar,this.x,this.y, this.width, this.height);
	}
	this.isTouching=function(pipe){
		return  (this.x <pipe.x +pipe.width)&&
				(this.x + this.width > pipe.x)&&
				(this.y < pipe.y + pipe.height)&&
				(this.y + this.height > pipe.y);
		};
}


function Stage(){
	this.x=0;
	this.y=0;
	this.background = new Image();
	this.background.src="../img/city.png";
	this.background.onload = function(){
			this.draw();		
		}.bind(this);
	this.move = function(){
			this.x -= 1;		//le va restando un pixel a la posicion
			if(this.x< -canvas.width) this.x=0;	//si es menor reinicia
			
		}
	this.draw = function(){
		this.move();
		ctx.drawImage(this.background,this.x,this.y,canvas.width,canvas.height);
		ctx.drawImage(this.background,this.x + canvas.width,this.y,canvas.width,canvas.height);
	}
	this.time = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(Math.floor(time/60)+" Seconds",1040,43);
	}


}

function Gustav(){
	this.x=20;
	this.y=310;
	this.width = 200;
	this.height = 200;
	this.life = 300;
	this.positionXGun=174;
	this.positionYGun=394;
	/*GUSTAV RIGTH*/
	this.img = new Image();
	this.img.src = "../img/GustavRigth.png";
	this.img.onload = function(){ 
			this.draw();
		}.bind(this);
	this.draw = function(){ 
		Gustavs.push(gustav);
		ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
	}
	/*GUSTAV LEFT*/
	this.imgL = new Image();
	this.imgL.src = "../img/GustavLeft.png";
	this.imgL.onload = function(){
			this.draw();
		}.bind(this);
	this.drawL = function(){
		Gustavs.push(gustav);
		ctx.drawImage(this.imgL,this.x,this.y, this.width, this.height);
	}
	/*HEARTS*/
	this.heart = new Image();
	this.heart.src="../img/heart.png";
	this.heart.onload = function(){ 
			this.drawHearts();
		}.bind(this);
	this.drawHearts = function(){
		if(lives===3){
			ctx.drawImage(this.heart,20,20,30,30);
			ctx.drawImage(this.heart,55,20,30,30);
			ctx.drawImage(this.heart,90,20,30,30);
		}else if(lives===2){
			ctx.drawImage(this.heart,20,20,30,30);
			ctx.drawImage(this.heart,55,20,30,30);
		}else if(lives===1){
			ctx.drawImage(this.heart,20,20,30,30);
		}
		
	}
	/*SKULL*/
	this.skull = new Image();
	this.skull.src="../img/skull.png";
	this.skull.onload = function(){
			this.drawSkull();		
		}.bind(this);
	this.drawSkull = function(){
		ctx.drawImage(this.skull,200,20,30,30);
	}
	this.kills = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(kills,240,43);
	}

	/*LIFE*/
	this.drawLife = function(){
		ctx.beginPath();
		ctx.lineWidth="1";
		ctx.strokeStyle="white";
		ctx.rect(349,19,302,32);
		ctx.stroke();
		ctx.closePath();
		if(this.life>=210){
			ctx.fillStyle="#1AC02B";
			ctx.fillRect(350,20,this.life,30);
		}else if(this.life<210&&this.life>=90){
			ctx.fillStyle="#FFA500";
			ctx.fillRect(350,20,this.life,30);
		}else if(this.life<90){
			ctx.fillStyle="#FF0000";
			ctx.fillRect(350,20,this.life,30);
		}
		if(this.life<2){
			lives--;
			this.life=300;
		}
		if(lives===0){
			$(".x").removeClass("none");
		}
		
	}


	/*CASH*/
	this.cash = new Image();
	this.cash.src="../img/cash.png";
	this.drawCash = function(){
		ctx.drawImage(this.cash,720,15,40,40);
	}
	this.Money = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(money,770,43);
	}

	this.cure = new Image();
	this.cure.src="../img/FirstAid.png";
	this.drawCure = function(){
		ctx.drawImage(this.cure,860,15,40,40);
	}
	this.Cure = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(cure,910,43);
	}

	/*CLOCK*/
	this.clock = new Image();
	this.clock.src="../img/clock.png";
	this.clock.onload = function(){
			this.drawClock();		
		}.bind(this);
	this.drawClock = function(){
		ctx.drawImage(this.clock,1000,20,30,30);
	}
	
	/*X*/
	this.forward = function(){
		if(this.x<950){
			this.x +=10;
			gustav.draw();
		}
	}
	this.backward = function(){
			if(this.x>0){
				this.x -= 10;
				gustav.drawL();
			}
	}
	this.jump = function(){
		
		this.y-=10;
		
	}
	this.down= function(){
		this.y+=10;
	}
	this.isTouching=function(pipe){
			return (this.x <pipe.x +pipe.width)&&
				(this.x + this.width > pipe.x)&&
				(this.y < pipe.y + pipe.height)&&
				(this.y + this.height > pipe.y);
		};
}

function updateRight(){
	gustav.forward();
	position=0;
}

function updateLeft(){
	
	gustav.backward();
	position=1;
}

function updateJump(){
	gustav.jump();
}

/*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxx*/

function Update(){
	frames++;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	stage.draw();
	if(position===0){
		gustav.draw();
	}else if (position===1){
		gustav.drawL();
	}
	if(isShooting){
		gustav.drawShoot();
	}
	
	gustav.drawHearts();
	gustav.drawSkull();
	gustav.drawLife();
	gustav.drawCash();
	gustav.drawCure();
	gustav.drawClock();
	gustav.Money();
	gustav.Cure();
	drawZombies();
	if(frames % (150*Random()) === 0 ){
		generateZombies();
	}
	drawAids();
	if(frames % (150*RandomF()) === 0 ){
		generateAids();
	}

	drawDollars();
	if(frames % (125*RandomF()) === 0){
		generateCash();
	}
	drawBullets();

	stage.time();
	gustav.kills();
	if(isJumping){
		if(maxJump==0){
			isJumping=false;
			console.log(isJumping);
		}
		if(maxJump>0){
			updateJump();
			maxJump-=10;
		}
		
	}

	if(isJumping==false){
		if(maxJump<200){
			maxJump += 10;
			gustav.down();
		}
		if(maxJump==200){
			isJumping=0;
		}
	}
	
}


function checkCollition(){

		zombies.forEach(function(zombie,zindex){
			if(zombie.isTouching(gustav)){
				console.log("Zombie");
				gustav.life-=60;
				zombies.splice(zindex,1);
			}
			bullets.forEach(function(bullet,bindex){
			if(zombie.isTouching(bullet)){
				console.log("bullet");
				bullets.splice(bindex,1);
				zombies.splice(zindex,1);
				kills++;
			}
			})
		});
		
		Faids.forEach(function(aid,aindex){
			if(gustav.isTouching(aid)){
				console.log("por fin");
				Faids.splice(aindex,1);
				cure++;
			}
		});
		dollars.forEach(function(m,mindex){
			if(gustav.isTouching(m)){
				dollars.splice(mindex,1);
				money+=20;
			}
		})
	
}

function Start(){
	$("#continue").addClass("none");
	$("#pause").removeClass("none");
	$("#ins").css("display","none");
	$("#areU").addClass("none");
	if(interval>0) return;
	interval=setInterval(function(){
		Update();
		time++;
		checkCollition();
	},1000/60);
}

var gustav = new Gustav;
var stage = new Stage;


Start();
addEventListener("keydown", function(e){
	if(e.keyCode===39){
		updateRight();	
	} else if(e.keyCode===38){
		isJumping=true;		
	} else if(e.keyCode===37){
		updateLeft();
	}else if(e.keyCode===32){
		if(position===0){
			generateBullets();
			drawAids();
		}else if(position===1){
			console.log("U can't");
		}		
	}else if(e.keyCode===70){
		if(cure>0&&gustav.life<300){
			gustav.life+=30;
			cure--;
		}
		
	}
});
