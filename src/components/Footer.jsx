import Input from "../components/form/Input.jsx";
import Button from "../components/form/Button.jsx";
import Success from "../components/form/Success.jsx";
import { env } from '#_/server/utils/env.js';

const Footer = ({footerClass = ''}) => {
	return <footer class={`footer ${footerClass}`} data-elt="footer">
		<div class="footer__container">
			<div class="footer__wrap">
				<div class="footer__main">
					<div class="footer__form">
						<form id="subscription" action={env.API_URL + 'subscribe'} method="POST" class="form form--subscribe" data-elt="subscribeForm">
							<h3 class="form__title">Полезная рассылка о бренд-стратегии, дизайне и разработке</h3>

							<div class="form__box">
								<Input name="email" type="text" label="E-mail*" />

								<div class="form__note">Нажимая кнопку «подписаться», вы&nbsp;соглашаетесь с&nbsp;<a href="/policy" target="_blank"><span>правилами обработки персональных данных</span></a></div>

								<Button label="Подписаться" />
							</div>

							<Success message="Спасибо за подписку. Уже отправили первое письмо!" btn="Хорошо" />

							<div class="form-response" data-form-response></div>
						</form>
					</div>

					<div class="footer__nav">
						<div class="footer__list">
							<div class="footer__block">
								{/* <a href="" download="" class="footer__link">
									<span>Скачать презентацию</span>
									<svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-download"></use></svg>
								</a> */}
							</div>
							<div class="footer__block">
								<h3 class="footer__subtitle">Контакты</h3>
								<ul class="footer__menu">
									<li class="footer__item">
										<a href="tel:+74951207888" class="footer__link"><span>+7 495 120 78 88</span></a>
									</li>
									<li class="footer-menu__item">
										<a href="mailto:mail@ony.ru" class="footer__link"><span>mail@ony.ru</span></a>
									</li>
								</ul>
							</div>

							<div class="footer__block">
								<h3 class="footer__subtitle">Карьера</h3>
								<ul class="footer__menu">
									<li class="footer__item">
										<a href="mailto:job@ony.ru" target="_blank" class="footer__link"><span>job@ony.ru</span></a>
									</li>
									<li class="footer__item">
										<a href="https://join.ony.ru" target="_blank" class="footer__link"><span>Вакансии</span></a>
									</li>
								</ul>
							</div>

							<div class="footer__block">
								<h3 class="footer__subtitle">Экосистема ONY</h3>
								<ul class="footer__menu">
									<li class="footer__item">
										<a href="https://signal.ony.ru" class="footer__link" target="_blank"><span>Signal (part of ONY)</span></a>
									</li>
									<li class="footer__item">
										<a href="https://themagma.ru" class="footer__link" target="_blank"><span>CG-студия Magma</span></a>
									</li>
								</ul>
							</div>

							<div class="footer__block">
								<h3 class="footer__subtitle">Навигация</h3>

								<ul class="footer__menu">
									<li class="footer__item">
										<a href="/work" class="footer__link"><span>Проекты</span></a>
									</li>
									<li class="footer__item">
										<a href="/about-agency" class="footer__link"><span>Об агентстве</span></a>
									</li>
									<li class="footer__item">
										<a href="/all-services-and-approach" class="footer__link"><span>Все услуги</span></a>
									</li>
								</ul>
							</div>

							<div class="footer__block">
								<h3 class="footer__subtitle">Соцсети</h3>

								<ul class="footer__menu">
									<li class="footer__item">
										<a href="https://t.me/onyagency" target="_blank" class="footer__link"><span>Telegram</span></a>
									</li>
									<li class="footer__item">
										<a href="https://www.youtube.com/channel/UCvlx1yLAxUUQ_teP93_ps9A" target="_blank" class="footer__link"><span>Youtube</span></a>
									</li>
									<li class="footer__item">
										<a href="https://vk.com/onyagency" target="_blank" class="footer__link"><span>VK</span></a>
									</li>
									<li class="footer__item">
										<a href="https://vc.ru/u/1017892-ony" target="_blank" class="footer__link"><span>VC</span></a>
									</li>
									<li class="footer__item">
										<a href="https://www.behance.net/onyagency" target="_blank" class="footer__link"><span>Behance</span></a>
									</li>
									<li class="footer__item">
										<a href="https://dribbble.com/onyagency" target="_blank" class="footer__link"><span>Dribbble</span></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{/* <div class="footer__row">
					<div class="footer__col">
						<div class="footer__subtitle">Адрес</div>
						<div class="footer__info">
							<address>Берсеневская набережная, 6с3 <br/>
							Москва, Россия</address>
						</div>
					</div>

					<div class="footer__col">
						<div class="footer__subtitle">Заказ</div>
						<ul class="footer__info">
							<li class="footer__item"><a href="tel:+74951207888" target="_blank" class="footer__link">+7 495 120 78 88</a></li>
							<li class="footer__item"><a href="mailto:mail@ony.ru" target="_blank" class="footer__link">mail@ony.ru</a></li>
						</ul>
					</div>

					<div class="footer__col">
						<div class="footer__subtitle">Работа</div>
						<ul class="footer__info">
							<li class="footer__item"><a href="mailto:job@ony.ru" target="_blank" class="footer__link">job@ony.ru</a></li>
						</ul>
					</div>

					<div class="footer__col">
						<div class="footer__subtitle">Соцсети</div>
						<ul class="footer__info">
							<li class="footer__item"><a href="" target='_blank' class="footer__link">Instagram</a></li>
							<li class="footer__item"><a href="" target='_blank' class="footer__link">Facebook</a></li>
							<li class="footer__item"><a href="" target='_blank' class="footer__link">Youtube</a></li>
							<li class="footer__item"><a href="" target='_blank' class="footer__link">Behance</a></li>
							<li class="footer__item"><a href="" target='_blank' class="footer__link">Medium</a></li>
						</ul>
					</div>

					<div class="footer__col">
						<div class="footer__subtitle">Меню</div>
						<ul class="footer__info">
							<li class="footer__item"><a href="/work" class="footer__link">Проекты</a></li>
							<li class="footer__item"><a href="/about-agency" class="footer__link">Об агентстве</a></li>
							<li class="footer__item"><a href="/all-services-and-approach" class="footer__link">Услуги</a></li>
							<li class="footer__item"><a href="/contacts" class="footer__link">Контакты</a></li>
						</ul>
					</div>
				</div> */}

				<div class="footer__bottom">
					<div class="footer__copy">Москва, Берсеневская набережная, 6с3</div>
					<div class="footer__copy">©Ony Agency Interntational. All&nbsp;rights&nbsp;reserved.</div>
				</div>
			</div>
		</div>
	</footer>
};

export default Footer;
