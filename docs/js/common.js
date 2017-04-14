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
    // // if (window.location.pathname === 'feedback.html'){
    // $.get('https://api.vk.com/method/board.getComments?group_id=85475750&topic_id=31600822&extended=1', function(data) {
    //     data = data.parseJSON();
    //     comment = data.response.comments[1];
    //     profile = data.response.profiles[1];
    //     $('.comments').append('<div class="comments"><img src="' + profile.photo + '" alt="" class="col-4 comment-img"><blockquote class="col-8"><p class="comment-text">' +  + '</p><a class="comment-author" href="//vk.com/id' + profile.uid + '">' + profile.first_name + ' ' + profile.last_name + '</a></blockquote></div>');
    // });
    // // }
    var $grid = $('.grid').masonry({
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true
    });
    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });

});
