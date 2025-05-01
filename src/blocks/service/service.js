import enquire from 'enquire.js';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

(() => {
	const section = document.querySelector('[data-service-js]');
	if (! section) return;

	const slider = section.querySelector('.service__items.swiper');
	let swiper;

	const enableSwiper = (el) => {
		swiper = new Swiper(el, {
			modules: [Pagination],
			watchOverflow: true,
			spaceBetween: 18,
			threshold: 10,
			pagination: {
				el: `.service__dots`,
				bulletClass: 'service__dot',
				bulletActiveClass: 'active',
				bulletElement: 'button',
				clickable: true
			},
			breakpoints: {
				0: {
					spaceBetween: 16,
					slidesPerView: 1.15,
				},
				481: {
					spaceBetween: 16,
					slidesPerView: 1.8,
				},
				641: {
					spaceBetween: 16,
					slidesPerView: 2.2,
				},
				781: {
					spaceBetween: 16,
					slidesPerView: 2.8,
				},
				961: {
					spaceBetween: 18,
					slidesPerView: 3.5,
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