var canvas = document.getElementById("stage");

var ctx = canvas.getContext("2d");

/*var intervalo, position = 0;

var frames=0;*/
/*==========================================================
						CLASS BOARD
============================================================*/
/*
function Board(){
		this.x = 0;
		this.y = 0;
		this.width = canvas.width;
		this.height = canvas.height;
		this.img = new Image(); //se genera una instancia de Image()
		this.img.src = "../img/city.png";
		this.score=0;
		this.img.onload = function(){ //se ejecuta cuando la imagen se carga
			this.draw();		//es un callback
		}.bind(this);
		this.move = function(){
			this.x -= 5;		//le va restando un pixel a la posicion
			if(this.x< -this.width) this.x=0;	//si es menor re reinicia
		}
		this.draw = function(){
			this.move();
			ctx.drawImage(this.img,this.x,this.y, this.width, this.height);
			ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height);
		}	

		this.drawScore = function(){
			this.score=Math.floor(frames/60);
			ctx.font= "50px TrueLies";
			ctx.fillStyle = "white";
			ctx.fillText(this.score,this.width/2-10,this.y+50);//se genera el score en canvas
		}
}

*/

/*==========================================================
			CLASS GUSTAV
============================================================*/
/*
function Gustav(){
	this.life=100;
	this.x=20;
	this.y = 310;
	this.width = 200;
	this.height =200;
	this.gR = new Image();
	this.gL = new Image();
	this.gR.src= "../img/GustavRigth.png";
	this.gL.src= "../img/GustavLeft.png";
	this.gR.onload = function(){
		this.drawRight();
	}.bind(this);

	this.drawRight = function(){
		//this.y += 1;
		//console.log("Listo");
		ctx.drawImage(this.gR,this.x,this.y,this.width,this.height);
		//if(this.y<0 || this.y>canvas.height-this.height) gameOver();
	};
	this.drawLeft = function(){
		ctx.drawImage(this.gL,this.x,this.y,this.width,this.height);
	}
	this.drawJumpR = function(){
		ctx.drawImage(this.gR,this.x,this.y,this.width,this.height);
	}
	this.drawJumpL = function(){
		ctx.drawImage(this.gL,this.x,this.y,this.width,this.height);
	}

	this.forward = function(){
		//console.log("mas 10");
		this.x += 10;
		gustav.drawRight();
	}
	this.backward = function(){
		//console.log("menos 10");
		this.x -= 10;
		gustav.drawLeft();
	}
	this.jump = function(){
		//console.log("jump 10");

		this.y -= 100;
		if(position===0){
			gustav.drawJumpR();
		}
		else if(position===1){
			gustav.drawJumpL();
		}
	}
}
*/
/*==========================================================
			FUNCTION OF MOVEMENT
============================================================*/
/*
function updateRight(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	board.draw();
	board.drawScore();
	gustav.forward();
	frames++;
	position=0;
}

function updateLeft(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	frames++;
	board.draw();
	board.drawScore();
	gustav.backward();
	position=1;
}

function updateJump(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	board.draw();
	board.drawScore();
	gustav.jump();
	frames++;
}

*/
/*==========================================================
			CREACIÓN DE GUSTAV
============================================================*/

/*var gustav = new Gustav();

var board = new Board;

*/

/*==========================================================
			FUNCTIONS UPDATE & START
============================================================*/

function Board(){

}

function Update(){
	board.draw();
}

function Start(){
	setInterval(function(){
		Update();
	},1000/60);
}


/*--------------------------------------------------*/
var stage = new Board();
/*==========================================================
					LISTENERS
============================================================*/
/*
addEventListener("keydown", function(e){
			if(e.keyCode===39){
				updateRight();	
			}
		});

addEventListener("keydown", function(e){
			if(e.keyCode===37){
				updateLeft();	
			}
		});

addEventListener("keydown", function(e){
			if(e.keyCode===38){
				updateJump();	
			}
		});

addEventListener("keydown", function(e){
			if(e.keyCode===32){
				shoot();	
			}
		});
function showInstructions(){
	$(".info").removeClass("none");
	$(".pulse").removeClass("none");
	$(".instructions").removeClass("none");
}*/