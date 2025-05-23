import enquire from 'enquire.js';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

(() => {
	const section = document.querySelector('[data-choice-js]');
	if (! section) return;

	const slider = section.querySelector('.choice__items.swiper');
	let swiper;

	const enableSwiper = (el) => {
		swiper = new Swiper(el, {
			modules: [Pagination],
			watchOverflow: true,
			spaceBetween: 18,
			threshold: 10,
			pagination: {
				el: `.choice__dots`,
				bulletClass: 'choice__dot',
				bulletActiveClass: 'active',
				bulletElement: 'button',
				clickable: true
			},
			breakpoints: {
				0: {
					slidesPerView: 1.0,
				},
				481: {
					slidesPerView: 1.4,
				},
				641: {
					slidesPerView: 1.8,
				},
				781: {
					slidesPerView: 2.2,
				},
				961: {
					slidesPerView: 2.7,
				}
			}
		});
	}

	enquire.register("screen and (max-width: 1100px)", {
		match: function() {
			enableSwiper(slider);
		},
		unmatch: function() {
			if (swiper !== undefined ) {
				swiper.destroy(true, true);
			} 
		}
	});

})();