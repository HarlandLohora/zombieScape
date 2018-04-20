$( document ).ready(function() {
    $("#ins").css("display","none");
});


var canvas=document.getElementById("stage");

var ctx=canvas.getContext("2d");
var position=0,positionR=0, maxJump=200,maxJumpR=200, time=0,kills=0, killsRichard=0, livesR=1,lives=1;	;
var isJumping = false,isJumpingR=false, isShooting=false, isShootingRichard=false;
var bullets= [], zombies=[], Faids=[],Gustavs=[], dollars=[],Richards=[],bulletsRichard=[];
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
function generateBulletsR(){
	var bullet = new newBulletRichard();
	bulletsRichard.push(bullet);
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

function drawBulletsRichard(){
	bulletsRichard.forEach(function(bullet){
		bullet.draw();	
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

function newBulletRichard(){
	this.x=richard.x+180;
	this.y=richard.y+80;
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
		this.x-=5;
		ctx.drawImage(this.zombie,this.x,this.y, this.width, this.height);
	}
		this.isTouching=function(pipe){
			return (this.x <pipe.x +pipe.width)&&
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
	this.life = 100;
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
	
	/*SKULL*/
	this.skull = new Image();
	this.skull.src="../img/skull.png";
	this.skull.onload = function(){
			this.drawSkull();		
		}.bind(this);
	this.drawSkull = function(){
		ctx.drawImage(this.skull,90,20,30,30);
	}
	this.kills = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(kills,140,43);
	}

	this.P1 = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText("Gustav",10,40);
	}

	/*LIFE*/
	this.drawLife = function(){
		ctx.beginPath();
		ctx.lineWidth="1";
		ctx.strokeStyle="white";
		ctx.rect(190,19,101,32);
		ctx.stroke();
		ctx.closePath();
		if(this.life>=70){
			ctx.fillStyle="#1AC02B";
			ctx.fillRect(191,20,this.life,30);
		}else if(this.life<90&&this.life>=30){
			ctx.fillStyle="#FFA500";
			ctx.fillRect(191,20,this.life,30);
		}else if(this.life<30){
			ctx.fillStyle="#FF0000";
			ctx.fillRect(191,20,this.life,30);
		}
		
		if(lives>2){
			$(".x").removeClass("none");
			alert("Gana Richard");
		}
		
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

/*===========================================================
							RICHARD
=============================================================*/
function Richard(){
	this.x=160; //diferencia 140
	this.y=310;
	this.width = 200;
	this.height = 200;
	this.life = 100;
	this.positionXGun=174;
	this.positionYGun=394;
	/*RICHARD RIGTH*/
	this.img = new Image();
	this.img.src = "../img/RIchardRigth.png";
	this.img.onload = function(){ 
			this.draw();
		}.bind(this);
	this.draw = function(){ 
		Gustavs.push(gustav);
		ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
	}
	/*RICHARD LEFT*/
	this.imgL = new Image();
	this.imgL.src = "../img/RichardLeft.png";
	this.imgL.onload = function(){
			this.draw();
		}.bind(this);
	this.drawL = function(){
		Gustavs.push(gustav);
		ctx.drawImage(this.imgL,this.x,this.y, this.width, this.height);
	}
	
	/*SKULL*/
	this.skull = new Image();
	this.skull.src="../img/skull.png";
	this.skull.onload = function(){
			this.drawSkull();		
		}.bind(this);
	this.drawSkull = function(){
		ctx.drawImage(this.skull,580,20,30,30);
	}
	this.kills = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(killsRichard,630,43);
	}

	this.P2 = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText("Richard",480,40);
	}

	/*LIFE*/
	this.drawLife = function(){
		ctx.beginPath();
		ctx.lineWidth="1";
		ctx.strokeStyle="white";
		ctx.rect(700,19,101,32);
		ctx.stroke();
		ctx.closePath();
		if(this.life>=70){
			ctx.fillStyle="#1AC02B";
			ctx.fillRect(701,20,this.life,30);
		}else if(this.life<90&&this.life>=30){
			ctx.fillStyle="#FFA500";
			ctx.fillRect(701,20,this.life,30);
		}else if(this.life<30){
			ctx.fillStyle="#FF0000";
			ctx.fillRect(701,20,this.life,30);
		}
	
		if(livesR>2){
			$(".x").removeClass("none");
			alert("Gana Gustav");
		}
		
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
			richard.draw();
		}
	}
	this.backward = function(){
			if(this.x>0){
				this.x -= 10;
				richard.drawL();
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

function updateRightRichard(){
	richard.forward();
	positionR=0;
}

function updateLeftRichard(){
	
	richard.backward();
	positionR=1;
}

function updateJumpRichard(){
	richard.jump();
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
	
	richard.P2();
	richard.drawSkull();
	richard.drawLife();
	richard.drawClock();
	richard.kills();
	gustav.P1();
	gustav.drawSkull();
	gustav.drawLife();
	gustav.drawClock();
	drawZombies();
	if(positionR===0){
		richard.draw();
	}else if (positionR===1){
		richard.drawL();
	}
	if(isShootingRichard){
		richard.drawShoot();
	}


	if(frames % (80*Random()) === 0 ){
		generateZombies();
	}
	drawBullets();
	drawBulletsRichard();
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
	/*RICHARDS*/
	if(isJumpingR){
		if(maxJumpR==0){
			isJumpingR=false;
			console.log(isJumping);
		}
		if(maxJumpR>0){
			updateJumpRichard();
			maxJumpR-=10;
		}
		
	}

	if(isJumpingR==false){
		if(maxJumpR<200){
			maxJumpR += 10;
			richard.down();
		}
		if(maxJumpR==200){
			isJumpingR=0;
		}
	}
	
}


function checkCollition(){

		zombies.forEach(function(zombie,zindex){
			if(zombie.isTouching(gustav)){
				console.log("Zombie");
				if(gustav.life<5){
					$(".x").removeClass("none");
					$("#winner").text("Richard wins with "+kills+" kills");
					pause();
				}else if(gustav.life>6){
				gustav.life-=25;
				zombies.splice(zindex,1);
			}
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
		zombies.forEach(function(zombie,zindex){
			if(zombie.isTouching(richard)){
				console.log("Zombie");
				if(richard.life<5){
					$(".x").removeClass("none");
					$("#winner").text("Gustav wins with "+kills+" kills");
					pause();
				}else if(richard.life>6){
				richard.life-=25;
				zombies.splice(zindex,1);
			}
				
			}
			bulletsRichard.forEach(function(bullet,bindex){
			if(zombie.isTouching(bullet)){
				console.log("bullet");
				bulletsRichard.splice(bindex,1);
				zombies.splice(zindex,1);
				killsRichard++;
			}
			})
		});
		

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
var richard = new Richard;

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
		}else if(position===1){
			console.log("U can't");
		}		
	}
	if(e.keyCode===68){
		updateRightRichard();	
	} else if(e.keyCode===87){
		isJumpingR=true;		
	} else if(e.keyCode===65){
		updateLeftRichard();
	} else if(e.keyCode===75){
		if(positionR===0){
			generateBulletsR();
		}else if(positionR===1){
			console.log("U can't");
		}	
	}
});
