var canvas=document.getElementById("stage");

var ctx=canvas.getContext("2d");
var position=0, maxJump=200, time=0,kills=0;	;
var isJumping = false, isShooting=false;
var bullets= [], zombies=[];
var vel=0, restart=0;
var frames = 0;

function Random(){
	randomTime=Math.floor(Math.random()*5);
	console.log(randomTime);
	return randomTime;
}

function generateZombies(){
	var zombie = new ZombieOne()
	zombies.push(zombie);
}

function drawZombies(){
	zombies.forEach(function(zombie){
		zombie.draw();
	})
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
}

function Bullets(){
	this.x;
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
	this.life = 30;
	this.positionXGun=174;
	this.positionYGun=394;
	/*GUSTAV RIGTH*/
	this.img = new Image();
	this.img.src = "../img/GustavRigth.png";
	this.img.onload = function(){ //se ejecuta cuando la imagen se carga
			this.draw();		//es un callback
		}.bind(this);
	this.draw = function(){ 
		ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
	}
	/*GUSTAV LEFT*/
	this.imgL = new Image();
	this.imgL.src = "../img/GustavLeft.png";
	this.imgL.onload = function(){ //se ejecuta cuando la imagen se carga
			this.draw();		//es un callback
		}.bind(this);
	this.drawL = function(){
		ctx.drawImage(this.imgL,this.x,this.y, this.width, this.height);
	}
	/*HEARTS*/
	this.heart = new Image();
	this.heart.src="../img/heart.png";
	this.heart.onload = function(){ //se ejecuta cuando la imagen se carga
			this.drawHearts();		//es un callback
		}.bind(this);
	this.drawHearts = function(){
		ctx.drawImage(this.heart,20,20,30,30);
		ctx.drawImage(this.heart,55,20,30,30);
		ctx.drawImage(this.heart,90,20,30,30);
	}
	/*SKULL*/
	this.skull = new Image();
	this.skull.src="../img/skull.png";
	this.skull.onload = function(){
			this.drawSkull();		
		}.bind(this);
	this.drawSkull = function(){
		ctx.drawImage(this.skull,300,20,30,30);
	}
	this.kills = function(){
		ctx.font ="20px TrueLies";
		ctx.strokeText(kills,340,43);
	}

	/*LIFE*/
	this.drawLife = function(){
		ctx.beginPath();
		ctx.lineWidth="1";
		ctx.strokeStyle="white";
		ctx.rect(499,19,302,32);
		ctx.stroke();
		ctx.closePath();
		if(this.life>80){
			ctx.fillStyle="#1AC02B";
			ctx.fillRect(500,20,300,30);
		}else if(this.life<80 && this.life>40){
			ctx.fillStyle="#FFA500";
			ctx.fillRect(500,20,225,30);
		}else if(this.life<40){
			ctx.fillStyle="#FF0000";
			ctx.fillRect(500,20,105,30);
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
	
	/*SHOOT*/
	this.bullet = new Image();
	this.bullet.src="../img/BulletRigth.png";
	this.bulletL = new Image();
	this.bulletL.src="../img/BulletLeft.png";
	this.bullet.onload = function(){
			//this.shoot();		
		}.bind(this);
	
	this.shoot=function(){
		//ctx.fillStyle="white";
		if(position===0){
			bullets.push(this.x);
			//console.log(bullets);
			ctx.drawImage(this.bullet,this.x+this.positionXGun,this.positionYGun-5,25,15);
		}else if (position===1){
			bullets.push(this.x);
			//console.log(bullets);
			ctx.drawImage(this.bulletL,this.x+4,this.positionYGun-5,25,15);
		}
		
	}
	this.drawShoot = function(){
			restart=this.x+this.positionXGun;
			if(vel<canvas.width){
				ctx.drawImage(this.bullet,restart+vel,this.positionYGun-5,25,15);
				vel+=10;
			}
			if(vel==canvas.width){
				vel+=1;
				alert("Salio");
			}
		
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
	gustav.drawClock();
	drawZombies();
	if(frames % (200*Random()) === 0 ){
		generateZombies()
	}
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
		//console.log("bajo");
		if(maxJump<200){
			maxJump += 10;
			gustav.down();
			console.log(maxJump);
		}
		if(maxJump==200){
			isJumping=0;
		}
	}

	//zombie.draw();
	/*if(gustav.x>400){
		stage.move();
	}*/
	
	
}

function Start(){
	setInterval(function(){
		Update();
		time++;
	},1000/60);
}

var gustav = new Gustav;
var stage = new Stage;


Start();
addEventListener("keydown", function(e){
	if(e.keyCode===39){
		//console.log("Rigth");
		updateRight();	
	} else if(e.keyCode===38){
		//console.log("Jump");
		isJumping=true;		
	} else if(e.keyCode===37){
		//console.log("Left");
		updateLeft();
	}else if(e.keyCode===32){
		//console.log("shoot");
		isShooting=true;
		gustav.drawShoot();
		
	}
});
