$( document ).ready(function() {
    console.log( "ready!" );

});

function gotIt(){
	$("#click")[0].play();
	$(".instructions").css("display","none");
	$(".info").css("display","none");
	$("#gotIt").css("display","none");
	$("#menu").css("display","flex");
}

function startGame(){
	$("#click")[0].play();
	$("section").removeClass("principal").addClass("map");
	$("#mS").removeClass("none");
	$("#menu").css("display","none");
	$(".backButton").removeClass("none");
	$(".missions").removeClass("none");
}

function mainMenu(){
	$("#click")[0].play();
	$("section").addClass("principal").removeClass("map");
	$("#mS").addClass("none");
	$("#menu").css("display","flex");
	$(".backButton").addClass("none");
	$(".missions").addClass("none");
	$("#players").css("display","none");
	$(".info").addClass("none");
	$(".info").css("display","none");
}

function instructions(){
	$("#click")[0].play();
	$(".instructions").css("display","initial");
	$(".info").css("display","flex");
	$("#gotIt").css("display","initial");
	$("#menu").css("display","none");
}

function warning(){
	$(".alert").removeClass("none");
}
function close(){
	alert("lol");
}
function howmany(){
		$("#players").css("display","initial");
		$("#mS").css("display","none");
	
	}