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

if ($loadingAnim.length ) {
	new Promise( function( resolve ){
		$w.on('load', function () {
			document.body.classList.add('-is-ready');
		})
		return resolve( 1 );
	}).then(function( resolve ){
		document.getElementsByClassName('lastChar')[0].addEventListener('transitionend', function (e) {
			e.stopPropagation();
			document.body.classList.add('-is-loaded');
		});
	}).then( function(){
			document.getElementsByClassName('loadingAnim')[0].addEventListener('transitionend', function (e) {
				e.stopPropagation();
				// console.log( e );
				// setTimeout(() => {
					// $loadingAnim.remove();
				// }, 1500); 
			});
	});

	// $w.on( 'load', function(){
	// 	$( 'body' ).addClass( '-is-ready' );

	// 	$( '.lastChar' ).on('transitionend', function( e ){
	// 		e.stopPropagation();
	// 		e.preventDefault();

	// 		$('body').addClass('-is-loaded');
	// 		setTimeout( function(){
	// 			$('.loadingAnim').on( 'transitionend' , function( e ){
	// 				e.stopPropagation();
		
	// 				$loadingAnim.remove();
	// 			});	
	// 		}, 2000 )
	// 	});
	// });

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
		googleCalendarApiKey: 'AIzaSyA2GEYckx_MNqE6fRMogXgBYUHG2T5C248',
		eventSources: [{
			googleCalendarId: 'aomoristartupcenter@gmail.com'
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
