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
	})
});
