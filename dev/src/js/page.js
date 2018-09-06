import $ from 'jquery';
import { getScrollVal, $w } from './common.js';


if ($( '.section--imgs').length ){
	let $imgSections = $( '.imgDetail' ),
		$imgArea = '',
		$img = '';
	let f = function( $scrollVal ){
		const $scrollBottom = $scrollVal + $w.height();

		$.each( $imgSections, function(){
			let $sec = $( this ),
				$secOffset = $sec.offset().top;

			// console.log( $secOffset )
			
			if( $secOffset < $scrollBottom /* && $scrollVal < $secOffset + $sec.height() * 1.5 */ ){
				$imgArea = $sec.find( '.imgDetail__img__area' ),
				$img = $imgArea.find( 'img');

				let $scrollDiff = $scrollBottom - $secOffset;

				console.log( $scrollDiff)


				$imgArea.css({
					'transition' : 'none',
					// 'transform': 'translateY(' + $scrollVal/ - ($w.width() *0.1) +'px )'
					'transform': 'translateY(' + $scrollDiff / ($w.width() * -0.01) +'px )'
				})
				$img.css({
					// 'transform': 'translateY(' + $scrollVal / - ($w.width() * 0.01) + 'px )'
					'transform': 'translateY(' + $scrollDiff / ($w.width() * -0.005) + 'px )'
				})
			}
		})
	};
	
	getScrollVal( f ) ;
}

