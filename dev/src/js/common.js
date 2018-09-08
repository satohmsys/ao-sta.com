import $ from 'jquery';

import moment from 'moment';
import './gcal.min';
import fullCalendar from 'fullcalendar';

let $w = $(window),
	$body = $('body'),
	$flag = true;

/**
* スクロール値を取得する
*/
var getScrollVal = (callback) => {
	$w.on('scroll load', function () {
		let $scrollVal = $w.scrollTop();
		// return $scrollVal;
		callback($scrollVal);
	});
}

$('.siteFooter__backToTop').on('click', function (e) {
	e.preventDefault();
	e.stopPropagation();

	$('body,html').animate({
		scrollTop: 0
	}, '800', 'swing');
});



/**
* sp button
*/
var $toggle = $('.navToggle');

$toggle.on('click', function () {
	$body.toggleClass('-is-navOpen');
});
$w.on('resize', function () {
	if ($flag) {
		$flag = false;
		setTimeout(function () {
			if (700 < $w.width()) {
				$body.removeClass('-is-navOpen');
			}
			$flag = true;
			return $flag;
		}, 500);
	}
});

/**
 * scroll effect
 */

let f = ($scrollVal) => {
	let $jsEffect = $('.js-effect'),
		$scrollBottom = $scrollVal + $w.height();

	/**
	* all fadein targets
	*/
	if ($jsEffect) {
		$.each($jsEffect, function () {
			let $target = $(this);

			if ($target.offset().top < $scrollBottom - 90) {
				$target.addClass('-on');
			}

		});
	}
}
getScrollVal(f);



/**
 * scroll signal
 */
let f2 = ($scrollVal) => {
	500 < $scrollVal ? $body.addClass('-isScrolled') : $body.removeClass('-isScrolled')
}

getScrollVal(f2);


/**
 * loading
 */
let $loadingAnim = $('.loadingAnim');

if ($loadingAnim) {
	$loadingAnim.find('.loadingAnim__text').on('transitionend', function () {
		$loadingAnim.remove();
		$body.addClass('isRenderered')
	})
	$w.on('load', function () {
		$body.addClass('isLoaded');
		// $( '.loadingAnim' ).fadeOut('fast', function(){
		// 	$(this).remove();
		// })
	});
}

/**
 * smooth scroll
 */
$('a[href^="#"]').click(function (e) {
	e.stopPropagation();
	e.preventDefault();

	var speed = 500,
		href = $(this).attr("href"),
		target = $(href == "#" || href == "" ? 'html' : href),
		position = target.offset().top - $('.siteHeader__logo').height() * 1.5;

	$("html, body").animate({ scrollTop: position }, speed, "swing");
	return false;
});


/** 
* fullcarendar.js
* @link http://little-braver.com/156/
*/
if( $('#calendar').length ){
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next,today',
			center: 'title',
			right: 'month,list'
		},
		displayEventTime: false,
		// THIS KEY WON'T WORK IN PRODUCTION!!!
		// To make your own Google API key, follow the directions here:
		// http://fullcalendar.io/docs/google_calendar/
		googleCalendarApiKey: 'AIzaSyCRSAXOHZ9q0_r-8nLa5bgde-WM9KN4Uy8',
		eventSources: [{
			googleCalendarId: 'mail.to.deeeeeeeeee@gmail.com'
		}],
		eventClick: function (event) {
			// opens events in a popup window
			window.open(event.url, 'gcalevent', 'width=700,height=600');
			return false;
		}
	});
}



export { $ };
export { $w };
export { getScrollVal };
