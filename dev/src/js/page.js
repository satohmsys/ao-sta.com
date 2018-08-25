import $ from 'jquery';
import { getScrollVal, $w } from './common.js';


var effefcts = () => {
	$( function(){
		
		
		let f = function( $scrollVal ){
			const $scrollBottom = $scrollVal + $w.height();

			/**
			* section culture
			*/
			// if( $sectionCulture.offset().top < $scrollBottom  - 20  &&
			// 	 $scrollVal < ($sectionCulture.outerHeight() + $sectionCulture.offset().top ) ) {
			// 	let bgpY = 100 - $scrollVal *0.05;

			// 	$icon40th.css({
			// 		'filter': 'blur(' + bgpY*2 + 'px)',
			// 		'transform': 'translateY(' + bgpY + '%)'
			// 	})
			// }			
		};

		getScrollVal( f ) ;

	})
},

// export default function(){
// }

moreView();
// effefcts();