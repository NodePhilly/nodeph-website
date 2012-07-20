//Authored by King Ted

$(document).ready(function(){
    $(".contactbtn").click(function(){
        $(".contact").stop().slideDown(500, function(){
 			$(".contactinnerstuff").stop().animate({ opacity: 1.0}, 100);
        })
    });
    $(".cancelbtn").click(function(){
         $(".contactinnerstuff").stop().animate({opacity: 0.0}, 100,function(){
            $(".contact").stop().slideUp(500);
        })
    });
});