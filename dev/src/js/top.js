import $ from 'jquery';
import { getScrollVal, $w } from './common.js';
import 'slick-carousel';
// import 'slick/slick.scss';


// var effefcts = () => {
	$( function(){
		

		
		let f = function( $scrollVal ){
			const $scrollBottom = $scrollVal + $w.height();

			/**
			* parallax
			*/
			let $locationArea = $( '.section-navPanel__location' );

			if( $locationArea &&
				$locationArea.offset().top < $scrollBottom + 30 && 
				$scrollVal < ($locationArea.offset().top + $locationArea.outerHeight()) &&
				780 < $w.width()				
			){
				let bgpY = 100 - $scrollVal *0.05;
				$locationArea.css({
					'background-position': '0 ' + bgpY + '%'
				});
			}

		};

		getScrollVal( f ) ;		
	});
// }

// export default function(){
// 	effefcts();
// }