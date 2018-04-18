var canvas = document.getElementById("stage");

var ctx = canvas.getContext("2d");

var intervalo, position = 0;

var frames=0;
/*==========================================================
			CLASE GUSTAV
============================================================*/
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

/*==========================================================
			FUNCIONES DE MOVIMIENTO
============================================================*/

function updateRight(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	gustav.forward();
	frames++;
	position=0;
}

function updateLeft(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	gustav.backward();
	frames++;
	position=1;
}

function updateJump(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	gustav.jump();
	frames++;
}



/*==========================================================
			CREACIÓN DE GUSTAV
============================================================*/

var gustav = new Gustav();


/*==========================================================
			LISTENERS DE TECLAS
============================================================*/
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

