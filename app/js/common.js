$(function() {
    $('.ajax-popup-link').magnificPopup({
        type: 'ajax'
    });
    $(".call-form").submit(function() {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function() {
            alert('Заявка отправлена!');
            setTimeout(function() {
                var magnificPopup = $.magnificPopup.instance;
                magnificPopup.close();
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });
	$('.carouselPhotos').slick({
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
    $.ionTabs("#info");
	$(document).mouseup(function (e) {
		var container = $('.nav-mobile > nav');
		if (container.has(e.target).length === 0){
				container.hide();
		}
	});
    var $grid = $('.grid').masonry({
        // options...
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true
    });
    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });
});
