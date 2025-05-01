import enquire from 'enquire.js';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

(() => {
	const section = document.querySelector('[data-blog-js]');
	if (! section) return;

	const slider = section.querySelector('.blog__items.swiper');
	let swiper;

	const enableSwiper = (el) => {
		swiper = new Swiper(el, {
			modules: [Pagination],
			watchOverflow: true,
			spaceBetween: 32,
			threshold: 10,
			pagination: {
				el: `.blog__dots`,
				bulletClass: 'blog__dot',
				bulletActiveClass: 'active',
				bulletElement: 'button',
				clickable: true
			},
			breakpoints: {
				0: {
					slidesPerView: 1.0,
				},
				481: {
					slidesPerView: 1.2,
				},
				641: {
					slidesPerView: 1.6,
				},
				781: {
					slidesPerView: 1.8,
				}
			}
		});
	}

	enquire.register("screen and (max-width: 960px)", {
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