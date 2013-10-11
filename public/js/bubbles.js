//Brett's bubbles
//What makes a bubble a bubble

var Bubble = function(radius, acceleration, positionX, positionY){
	var maxRadius = 10,
		maxAcceleration = 1,
		maxPositionX = 100,
		maxPositionY = 50;

		this.radius = radius || Math.random() * maxRadius;
		this.acceleration = acceleration || Math.random() * maxAcceleration;
		this.positionX = positionX || Math.random() * maxPositionX;
		this.positionY = positionY || Math.random() * maxPositionY  + 50;
}
Bubble.prototype.radius = 0;
Bubble.prototype.acceleration = 0;
Bubble.prototype.positionX = 0;
Bubble.prototype.positionY = 0;
Bubble.prototype.bubblediv = {};

Bubble.prototype.CreateAndAppendBubbleDiv = function(){
	this.bubbleDiv = $('<div class="bubble"/>');
	this.bubbleDiv.css({top: this.positionY + "%", left:this.positionX + "%"})
	$('.bubblesContainer').append(this.bubbleDiv);
}
Bubble.prototype.MoveBubble = function(movingRight, alreadyMovingUp){
	var bubble = this;
	if(!alreadyMovingUp){
		bubble.bubbleDiv.animate({top:"-10%"},{"queue":false, "easing":"linear","duration": Math.random() * 6000 + 2000, "complete": function(){
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

var testBubbles = [];
$(document).ready(function(){

	for(var i = 0; i < 20; i++){
		testBubbles[i] = new Bubble();
		testBubbles[i].CreateAndAppendBubbleDiv();
		testBubbles[i].MoveBubble(i % 2 == 1 ? true : false, false);

	}

});