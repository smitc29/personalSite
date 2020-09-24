// JavaScript Document

$(document).ready(function(){
    $(".flipItem01").click(function(){
        $(".panelItem01").fadeIn();
		$(".panelItem02").fadeOut();
		$(".panelItem03").fadeOut();
		$(".panelItem04").fadeOut();
		$(".panelItem05").fadeOut();
		$(".panelItem06").fadeOut();
    });
});

$(document).ready(function(){
    $(".flipItem02").click(function(){
        $(".panelItem01").fadeOut();
		$(".panelItem02").fadeIn();
		$(".panelItem03").fadeOut();
		$(".panelItem04").fadeOut();
		$(".panelItem05").fadeOut();
		$(".panelItem06").fadeOut();
    });
});