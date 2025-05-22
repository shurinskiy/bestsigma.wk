// import "../../node_modules/swiped-events/dist/swiped-events.min.js";
// import { throttle } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

/* function updateVH() {
	const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', throttle(updateVH, 200), { passive: true });
updateVH(); */

const form = document.querySelector('form.form');
const alerts = form?.querySelector('.form__alerts');
const fields = form?.querySelectorAll('.form__field input');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	form.classList.add('pending');
	
	const formData = new FormData(e.target);
	formData.append('lang', document.documentElement.lang || 'ru'); 

	try {
		// отправляем данные на сервер
		await fetch('mailto.php', { method: 'POST', body: formData }).then((response) => {
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
				form.classList.add('success');
				e.target.reset(); 
			// если почта не ушла
			} else {
				alerts.innerHTML = data.text;

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
		alerts.innerHTML = error;
	} finally {
		form.classList.remove('pending');
	}
});