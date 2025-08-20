import Layout from '#@/layouts/Layout.jsx';

export const devOnly = true;
export const staticPage = true;

export default async ({ data }) => {
    return <Layout title="Карта сайта">
        <div class="wrapper">

        <main class="main">
			<div class="sitemap">
				<div class="sitemap__container">
                    <div class="sitemap__head">
                        <a href="" class="sitemap__logo">
                            <svg class="svg-icon" viewBox="0 0 96 30" width="96" height="30"><use xlink:href="#svg-logo"></use></svg>
                        </a>
                    </div>

                    <div class="sitemap__main">
                        <ul class="sitemap__list">
                            <li class="sitemap__item sitemap__item--category">
                                Основные страницы
                            </li>

                            <li class="sitemap__item">
                                <a href="/" class="sitemap__link">Главная</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/about-agency" class="sitemap__link">Об агентстве</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/all-services-and-approach" class="sitemap__link">Услуги и подход</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/contacts" class="sitemap__link">Контакты</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/brief" class="sitemap__link">Бриф</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/consultation" class="sitemap__link">Консультация</a>
                            </li>

                            <li class="sitemap__item sitemap__item--category">
                                Страницы проектов
                            </li>

                            <li class="sitemap__item">
                                <a href="/work" class="sitemap__link">Проекты</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/work/_samolet" class="sitemap__link">Детальная Самолет (полностью оптимизированная)</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/work/_yandex-uslugi" class="sitemap__link">Детальная Яндекс.Услуги (полностью оптимизированная)</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/work/mts-brandportal" class="sitemap__link">МТС Брендпортал (продакшен, оптимизированная только на фронте)</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/client/yandex" class="sitemap__link">Страница клиента Яндекс</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/client/atlas" class="sitemap__link">Страница клиента Атлас (пустая)</a>
                            </li>

                            <li class="sitemap__item sitemap__item--category">
                                Статичные страницы (уникальный дизайн/контент)
                            </li>

                            <li class="sitemap__item">
                                <a href="/audio-branding" class="sitemap__link">ONY Audio branding — разработка аудиобрендинга</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/brand-identity" class="sitemap__link">Бренд-айдентика</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/design-audit" class="sitemap__link">Дизайн-аудит</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/ux-audit" class="sitemap__link">UX-аудит</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/ux-design" class="sitemap__link">UX-проектирование</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/strategy" class="sitemap__link">Стратегия</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/corp-web" class="sitemap__link">Корпоративные сайты</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/ecom" class="sitemap__link">Ecom</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/multibrands" class="sitemap__link">Мультибренды</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/branding" class="sitemap__link">Брендинг</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/product" class="sitemap__link">Продукт</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/digital" class="sitemap__link">Digital</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/tech" class="sitemap__link">Tech</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/design-concept-digital-product" class="sitemap__link"><s>Разработка дизайн-концепции цифрового продукта</s></a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/design-support" class="sitemap__link"><s>Дизайн-поддержка</s></a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/mobile-app" class="sitemap__link"><s>Разработка мобильных приложений</s></a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/hr-sites-and-portals" class="sitemap__link"><s>Разработка сайтов для HR</s></a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/intranet-erp-crm" class="sitemap__link"><s>Разработка интранетов, CRM и ERP-систем</s></a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/promo-and-landings" class="sitemap__link"><s>Разработка промо-сайтов и лендингов</s></a>
                            </li>

                            <li class="sitemap__item sitemap__item--category">
                                Другое
                            </li>

                            <li class="sitemap__item">
                                <a href="/404" class="sitemap__link">Ошибка 404</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/500.html" class="sitemap__link">Ошибка 500 - фатальная</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/503.html" class="sitemap__link">Ошибка 503 - сервер недоступен (обновляем сайт)</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/success" class="sitemap__link">Успешная отправка формы</a>
                            </li>

                            <li class="sitemap__item">
                                <a href="/policy" class="sitemap__link">Политика конфиденциальности персональных данных</a>
                            </li>
                        </ul>
                    </div>
				</div>
			</div>
		</main>

        </div>
    </Layout>
}

