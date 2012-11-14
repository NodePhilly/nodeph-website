$(document).ready(function() {
    $('.feature').tinycarousel({ 
		pager: true,
		animation: true,
		controls: false,
		interval: false
	});

	$(".speakerTile .moreButton").click(function() {
        selectTile($(this).closest(".speakerTile").attr("speakerExpanded"));
    });
    $(".speakerExpanded .lessButton").click(function() {
          unselectTile($(this).closest(".speakerExpanded"));
    });
});

function selectTile(speakerExpanded) {
    $(".speakersGrid").animate({opacity:0},400);

        $("#" + speakerExpanded).css('opacity',1).css('z-index',103);

};

function unselectTile(speakerExpanded) {
  var id = speakerExpanded.attr('id');
    speakerExpanded.css('opacity',0).css('z-index',1);;
           $(".speakersGrid").animate({opacity:1},400);	
}