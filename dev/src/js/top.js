import $ from 'jquery';
import { getScrollVal, $w } from './common.js';
import 'slick-carousel';

// var effefcts = () => {
	$( function(){
		
		$('.mv__imgs').slick({
			arrows: false,
			autoplay: true,
			autoplayspeed: 0,
			dots: false,
			infinite: true,
			pause: 5000,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 700,
		});

		
		const 	$bridge = $('.section--concept__location'),
		$bridge_offset = $bridge.offset().top,
		$bridge_bottom = $bridge.outerHeight() + $bridge_offset,
		$a = $('.section--concept__a'),
		$a_offset = $a.offset().top;
		let $a_pathlength = 0;

		$a.find( 'path' ).each(function (i) {
			$a_pathlength = this.getTotalLength();
		});		
		
		let f = function( $scrollVal ){
			const $scrollBottom = $scrollVal + $w.height();
			
			if ($bridge_offset < $scrollBottom && $scrollVal < $bridge_bottom ){
				$bridge.css( {
					'background-position': '50% ' + ( $scrollVal / -8 ) + 'px'   
				});
			}

			if( $a_offset * 0.8 < $scrollBottom ){
				$a.find('path').attr( {style: 'stroke-dasharray:'+ $a_pathlength * 1 + '; ' + 'stroke-dashoffset:' +  $a_pathlength * -1 });
			}

			$a.css( {
				'transform': 'translateY(' + $scrollVal / -6 + 'px' + ')'
			})
			
		};
		
		getScrollVal(f);	
		
		
	});
// }

// export default function(){
// 	effefcts();
// }