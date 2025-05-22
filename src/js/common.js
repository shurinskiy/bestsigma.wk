// import "../../node_modules/swiped-events/dist/swiped-events.min.js";
import { throttle } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

function updateVH() {
	const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', throttle(updateVH, 200), { passive: true });
updateVH();


document.querySelector('form.form').addEventListener('submit', async (e) => {
	e.preventDefault();
	this.classList.add('pending');

	try {
		// отправляем данные на сервер
		await fetch('mailto.php', { method: 'POST', body: new FormData(e.target) }).then((response) => {
			if (response.ok) {
				// если сервер ответил нормально - отдаем данные
				return response.json();
			} else {
				// если все плохо - генерируем исключение
				throw new Error(response.statusText);
			}
		}).then((data) => {
			// если почта ушла
			if (data.status === 'success') {
				this.classList.add('success');
				e.target.reset(); 
			// если почта не ушла
			} else {
				infoblock.innerHTML = data.text;

				if (data.errors) {
					// расставляем ошибки у полей не прошедших валидацию
					fields.forEach(field => {
						data.errors.map(error => {
							if (field.name == error) field.classList.add('error');
						});
					});
				}
			}
		});
			
	} catch (error) {
		// отображаем данные если сервер ответил не правильно
		infoblock.innerHTML = error;
	} finally {
		wrapper.classList.remove('pending');
	}
});