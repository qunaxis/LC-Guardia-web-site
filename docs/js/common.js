$(function() {
	// Custom JS
	$('.carouselPhotoes').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
		lazyLoad: 'progressive',
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true
	});
	$('.fa-navicon').click(function() {
		$('.nav-mobile > nav').show();
	});
	$('.fa-navicon > a').click(function() {
		$('.nav-mobile > nav').hide();
	});
	$(document).mouseup(function (e) {
		var container = $('.nav-mobile > nav');
		if (container.has(e.target).length === 0){
				container.hide();
		}
	});
});
