import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Мы создаем и развиваем цифровые продукты ориентируясь на данные и инсайты. Делаем продуктовые исследования, которые идут в работу | Агентство ONY',
        ogDescription: 'Мы создаем и развиваем цифровые продукты ориентируясь на данные и инсайты. Делаем продуктовые исследования, которые идут в работу | Агентство ONY',
    }

    return <Layout title="Продуктовые исследования" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="product">
                    <div class="product__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h2">Мы&nbsp;создаем и&nbsp;развиваем цифровые продукты ориентируясь на&nbsp;данные и&nbsp;инсайты. Делаем продуктовые исследования, которые идут в&nbsp;работу.</h1>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/About.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="product__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">С&nbsp;чем можем помочь</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__help">
                                            <ul>
                                                <li>Предпроектные исследования</li>
                                                <li>UX-аудит</li>
                                                <li>Увеличение конверсии/LTV/retention/ARPU и&nbsp;других метрик</li>
                                                <li>Аутстафф продуктовой команды</li>
                                                <li>Проведение воркшопов</li>
                                                <li>Определение MVP продукта</li>
                                                <li>Проверка и&nbsp;генерация продуктовых гипотез</li>
                                                <li>Создание и&nbsp;развитие идеи продукта</li>
                                                <li>Разработка уникальных механик и &laquo;‎фичей&raquo;</li>
                                                <li>Разработка бонусной программы или внедрение геймификации</li>
                                                <li>Продуктовое сопровождение</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="product__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <h3 class="infoblock__title">Часто используем</h3>

                                <div class="infoblock__methods">
                                    <div class="product-methods">
                                        <div class="product-methods__list">
                                            <div class="product-methods__item">
                                                <ul>
                                                    <li>CJM</li>
                                                    <li>Глубинные интервью</li>
                                                    <li>Количественные исследования</li>
                                                    <li>Desk-research</li>
                                                    <li>Построение пирамиды метрик</li>
                                                </ul>
                                            </div>

                                            <div class="product-methods__item">
                                                <ul>
                                                    <li>RICE, ICE, MoSCoW</li>
                                                    <li>UX-интервью и тестировния</li>
                                                    <li>Аудит конкурентов</li>
                                                    <li>Воркшопы</li>
                                                    <li>Веб-аналитика</li>
                                                </ul>
                                            </div>

                                            <div class="product-methods__item">
                                                <ul>
                                                    <li>JTBD-фреймворк</li>
                                                    <li>User story mapping</li>
                                                    <li>User flow</li>
                                                    <li>Service Blueprint</li>
                                                    <li>А/Б тесты</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="product__heading">
                        <div class="heading">
                            <div class="heading__container">
                                <h2 class="heading__title h2">Мы&nbsp;делаем быстрые и&nbsp;гибкие продуктовые исследования, c&nbsp;применимым результатом</h2>
                                <a href="/brief" class="heading__link btn-link btn-link--bb"><span>Рассказать о задаче</span></a>
                            </div>
                        </div>
                    </div>

                    <div class="product__workflow inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <h3 class="infoblock__title">Рабочий процесс</h3>

                                <div class="infoblock__workflow">
                                    <div class="product-workflow">
                                        <div class="product-workflow__circle">
                                            <div class="product-workflow__circle product-workflow__circle--m">
                                                <div class="product-workflow__title">Задача</div>
                                                <div class="product-workflow__main">
                                                    <div class="product-workflow__list">
                                                        <div class="product-workflow__item">Проводим несколько общих встреч, формулируем цели и&nbsp;задачи.</div>
                                                        <div class="product-workflow__item">Подбираем оптимальные инструменты и&nbsp;методологии. Приступаем к&nbsp;работе.</div>
                                                        <div class="product-workflow__item">Подключаем UX-проектировщиков, чтобы минимизировать потери знаний при дальнейшей работе над продуктом.</div>
                                                        <div class="product-workflow__item">Собираем подробный отчёт и&nbsp;рекомендации. Аргументируем решения данными и&nbsp;экспертизой.</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="product-workflow__title product-workflow__title--result">Результат</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                     <div class="product__cases inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <h3 class="infoblock__title">Кейсы</h3>

                                <div class="infoblock__cases">
                                    <div class="product-table">
                                        <div class="product-table__row product-table__row--head">
                                            <div class="product-table__cell">Компания</div>
                                            <div class="product-table__cell">Задача</div>
                                            <div class="product-table__cell">Результат</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell">
                                                <a href="/work/kia"><span>KIA</span></a>
                                            </div>

                                            <div class="product-table__cell">Перезапуск Digital-платформы</div>

                                            <div class="product-table__cell">
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>68%</span><span>конверсия в&nbsp;заявку через конфигуратор</span>
                                                </div>
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>11,3%</span><span>конверсия в&nbsp;кредитном калькуляторе</span>
                                                </div>
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>64%</span><span>конверсия в&nbsp;заявку на&nbsp;кредит</span>
                                                </div>
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>34%</span><span>конверсия в&nbsp;разделе &laquo;Авто в&nbsp;наличии&raquo;</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell">
                                                <a href="/work/gulliver-market"><span>Детский маркетплейс одежды Gulliver Market</span></a>
                                            </div>

                                            <div class="product-table__cell">Запуск комплексного проекта единой платформы e-commerce</div>

                                            <div class="product-table__cell">
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>62%</span><span>конверсия в&nbsp;покупку</span>
                                                </div>
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>60%</span><span>рост LTV</span>
                                                </div>
                                                <div class="product-table__cell-item">
                                                    <span>▲</span><span>17%</span><span>рост органического трафика</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell">
                                                <a href="/work/goldapple"><span>Интернет-магазин &laquo;Золотое яблоко&raquo;</span></a>
                                            </div>

                                            <div class="product-table__cell">Разработка интернет-магазина</div>

                                            <div class="product-table__cell">Топ-100 e-commerce России. Участие во&nbsp;всех бенчмарках</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell">Интернет-магазин «Dantone Home»</div>

                                            <div class="product-table__cell">Перезапуск еком-платформы. Повышение удобства мобильной версии сайта</div>

                                            <div class="product-table__cell note">Идёт внедрение</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell note">NDA</div>

                                            <div class="product-table__cell">Разработка интернет-магазина для сети ювелирных салонов</div>

                                            <div class="product-table__cell note">Идёт внедрение</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell note">NDA</div>

                                            <div class="product-table__cell">Перезапуск сайта ведущего российсого производителя грузовых автомобилей</div>

                                            <div class="product-table__cell note">Идёт внедрение</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell note">NDA</div>

                                            <div class="product-table__cell">Повышение удобства использования платформы для работы по 223-ФЗ</div>

                                            <div class="product-table__cell note">Идёт внедрение</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell note">NDA</div>

                                            <div class="product-table__cell">Product discovery приложения для онлайн-записи на автомойку и шиномонтаж</div>

                                            <div class="product-table__cell note">Pivot</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell note">NDA</div>

                                            <div class="product-table__cell">Повышение эффективности сайта производителя мягких контактных линз</div>

                                            <div class="product-table__cell note">Идёт внедрение</div>
                                        </div>

                                        <div class="product-table__row">
                                            <div class="product-table__cell note">NDA</div>

                                            <div class="product-table__cell">Разработка концепции продукта-рейтинга, для организации по исследованию транспортной доступности</div>

                                            <div class="product-table__cell note">Идёт внедрение</div>
                                        </div>
                                    </div>
                                </div>

                                <button class="infoblock__more-btn more-btn"><span>Показать еще</span></button>
                            </div>
                        </section>
                    </div>

                    <div class="product__brief inverse">
                        <div class="brief brief--content">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h1">Давайте сделаем что-то новое вместе.<br/>
                                    <a href="/brief"><span>Заполнить бриф</span></a></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer footerClass='inverse'/>
        </div>

    </Layout>
}
