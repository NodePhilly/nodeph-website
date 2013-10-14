//Brett's bubbles
//yes, this was written very quickly
//yes, its not good code
//it should not be practiced this way
//you shouldnt be reading this anyway, because its freaking bubbles

var Bubble = function(radius, acceleration, positionX, positionY){
	var maxRadius = 10,
		maxAcceleration = 1,
		maxPositionX = 95,
		maxPositionY = 50;

		this.radius = radius || Math.random() * maxRadius;
		this.acceleration = acceleration || Math.random() * maxAcceleration;
		this.positionX = positionX || Math.random() * maxPositionX;
		this.positionY = positionY || Math.random() * maxPositionY  + 45;
}
Bubble.prototype.radius = 0;
Bubble.prototype.acceleration = 0;
Bubble.prototype.positionX = 0;
Bubble.prototype.positionY = 0;
Bubble.prototype.bubblediv = {};

Bubble.prototype.CreateAndAppendBubbleDiv = function(){
	var bubble = this;
	this.bubbleDiv = $('<div class="ZeBubbleHolder"><div class="bubble"/></div>');
	
	this.bubbleDiv.css({top: this.positionY + "%", left:this.positionX + "%"})
	$('.bubblesContainer').append(this.bubbleDiv);
	this.bubbleDiv.mouseenter(function(){
		dodge(bubble);	
	})
}
Bubble.prototype.MoveBubble = function(movingRight, alreadyMovingUp){
	var bubble = this;
	if(!alreadyMovingUp){
		bubble.bubbleDiv.animate({top:"2%"},{"queue":false, "easing":"linear","duration": Math.random() * 6000 + 2000, "complete": function(){
			bubble.bubbleDiv.remove();
			bubble.CreateAndAppendBubbleDiv();
			bubble.MoveBubble(Math.random() * 100 % 2 == 1 ? true : false, false);
		}});
	}
		if(movingRight){

			var left = bubble.bubbleDiv.position().left / bubble.bubbleDiv.parent().width() * 100 + 5;
			
			bubble.bubbleDiv.animate({left:left + "%"},{"queue":true, "easing":"linear","duration": 2000, "complete": function(){
				bubble.MoveBubble(false, true);
			}});
		}
		if(!movingRight){
			var left = bubble.bubbleDiv.position().left / bubble.bubbleDiv.parent().width() * 100 - 5;
			bubble.bubbleDiv.animate({left:left + "%"}, {"queue":true, "easing":"linear","duration": 2000, "complete": function(){
				bubble.MoveBubble(true, true);
		}});
	}
		
}
function dodge(bubble){
	var negativeOrPositive = Math.random() * 100 % 2 == 1 ? -5: 5;
	var left = bubble.bubbleDiv.position().left / bubble.bubbleDiv.parent().width() * 100 +negativeOrPositive ;
	var top = bubble.bubbleDiv.css('top');
	var percentTop = parseFloat(top);
	bubble.bubbleDiv.stop();
		bubble.bubbleDiv.animate({top:"2%"},{"queue":false, "easing":"linear","duration": percentTop < 200 ? 500: 1000 , "complete": function(){
			bubble.bubbleDiv.remove();
			bubble.CreateAndAppendBubbleDiv();
			bubble.MoveBubble(Math.random() * 100 % 2 == 1 ? true : false, false);
		}});
	bubble.bubbleDiv.animate({left:left + "%"},{"easing":"linear","duration": 500});
	bubble.MoveBubble(true, true);
}


function startDrinking(){
	$(".whitespace").stop();
	if($(".whitespace").height() > $(window).height() - 80){
		startDrinking();	
	}
	var content = $("#content");

	var blureffect = parseInt($(".whitespace").css('height'))/50 + "px";
	$("p, h2, h1").css({'color': 'transparent',  'textShadow': 'black 0px 0px ' +blureffect})
	if($(".whitespace").height() >= 400){
	leftBlur.show();
	rightBlur.show();
	leftBlur.animate({ 'left':'+=6' , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0, 'color': 'transparent',  'textShadow': 'black 0px 0px ' +blureffect}, {'queue': false,"easing":"linear", "duration":300})
	rightBlur.animate({'left': "-=6" , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0, 'color': 'transparent',  'textShadow': 'black 0px 0px ' +blureffect}, {'queue': false,"easing":"linear", "duration":300})
	}
	$(".whitespace").animate({'height': '+=40'},startDrinking);

}
function stopDrinking(){
	$(".whitespace").stop();
	var content = $("#content");

	if(parseInt($(".whitespace").css('height')) <= 0){
		leftBlur.css({'position':'absolute', 'left': content.offset().left , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0})
		rightBlur.css({'position':'absolute', 'left': content.offset().left , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0})
		leftBlur.hide();
		rightBlur.hide();
		return;
	}	

	var blureffect = parseInt($(".whitespace").css('height'))/50 + "px";
	$("p, h2, h1").css({'color': 'transparent',  'textShadow': 'black 0px 0px ' +blureffect})
	if($(".whitespace").height() > 400){
		leftBlur.show();
		rightBlur.show();
		leftBlur.animate({ 'left':'-=6' , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0, 'color': 'transparent',  'textShadow': 'black 0px 0px ' +blureffect}, {'queue': false,"easing":"linear", "duration":300})
		rightBlur.animate({'left': "+=6" , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0, 'color': 'transparent',  'textShadow': 'black 0px 0px ' +blureffect}, {'queue': false,"easing":"linear", "duration":300})
	}
	$(".whitespace").animate({'height': '-=40'},{'queue': true,"easing":"linear", "duration":300,"complete": stopDrinking})
}

var testBubbles = [];
var leftBlur = {};
var rightBlur = {};
$(document).ready(function(){

	for(var i = 0; i < 20; i++){
		testBubbles[i] = new Bubble();
		testBubbles[i].CreateAndAppendBubbleDiv();
		testBubbles[i].MoveBubble(i % 2 == 1 ? true : false, false);

	}
	var content = $("#content");

	leftBlur = content.clone();
	rightBlur = content.clone();
	leftBlur.css({'position':'absolute', 'left': content.offset().left , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0, 'display': 'none'})
	rightBlur.css({'position':'absolute', 'left': content.offset().left , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0, 'display':'none'})
	$("body").append(leftBlur);
	$("body").append(rightBlur);

	$("header").mousedown(startDrinking);
	$("body").mouseup(stopDrinking);
	$(window).resize(function(){
		leftBlur.css({'position':'absolute', 'left': content.offset().left , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0})
		rightBlur.css({'position':'absolute', 'left': content.offset().left , 'top' : content.offset().top, 'height' : content.height(), 'minHeight' : 0})
	});
});