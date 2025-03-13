// JavaScript Document

$(function(){
	// usual main starting point when web page loads
	
	
	// use jquery to find the div with id button1
	// set the mouse enter and mouse leave functions, just like the onclick in the lecture
	// use the html attribute to set the text
	$("#button1").mouseenter(function(){
		$("#button1").html("<p>Thank You</p>");
	});

	// now you need to do the same for button1 for mouseleave
	$("#button1").mouseleave(function () { 
		$("#button1").html("<p>Mouse over me</p>");
	});

	// and mouseup, mousedown for button2
	$("#button2").mousedown(function () { 
		$("#button2").html("<p>Release me</p>");
		$("#button2").css("background", "lightblue");
	});

	$("#button2").mouseup(function () { 
		$("#button2").html("<p>Thank you</p>");
		$("#button2").css("background", "lightgreen");
	});
});

