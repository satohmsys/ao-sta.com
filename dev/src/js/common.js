import $ from 'jquery';

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



export { $ };
export { $w };
export { getScrollVal };
// export default function () {
// 	backToTop();
// 	commonScrollToggle();
// 	headExpand();
// 	isLoaded();
// 	smoothScroll();
// 	localNavHited();
// }