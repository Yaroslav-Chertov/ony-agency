import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Input from "../components/form/Input.jsx";
import InputFile from "../components/form/InputFile.jsx";
import Textarea from "../components/form/Textarea.jsx";
import Checkbox from "../components/form/Checkbox.jsx";
import Button from "../components/form/Button.jsx";
import { env } from '#_/server/utils/env.js';
import Success from '#@/components/form/Success.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Комплексная веб и мобильная разработка digital-продуктов | Чтобы заказать — заполните бриф на сайте или звоните +7(495)120-78-88',
        ogDescription: 'Комплексная веб и мобильная разработка digital-продуктов | Чтобы заказать — заполните бриф на сайте или звоните +7(495)120-78-88',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/Share.png'
    }

    const test = [
        {
            "title": "Функциональное тестирование",
            "content": "Проверяем, соответствует&nbsp;ли программа или&nbsp; приложение спецификациям и&nbsp;верно&nbsp;ли выполняет свои функции."
        }, {
            "title": "Интеграционное тестирование",
            "content": "Тестируем взаимодействие и&nbsp;передачу данных между различными компонентами или&nbsp; модулями программы."
        }, {
            "title": "Тестирование производительности",
            "content": "Оцениваем способность системы справляться с&nbsp;высокой нагрузкой и&nbsp;определяем предельные точки производительности."
        }, {
            "title": "Smoke Testing",
            "content": "Убеждаемся, что основные функции системы корректно работают после внесенных в&nbsp;код изменений."
        }
    ]

    return <Layout title="Digital Tech" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="tech">
                    <div class="tech__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">ONY Digital Tech. Воплощаем смелые идеи в&nbsp;реальность через код.</h1>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/digital_fast.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__expertise inverse">
                        <section class="tech-expertise">
                            <div class="tech-expertise__container">
                                <div class="tech-expertise__list">
                                    <div class="tech-expertise__item">
                                        <div class="tech-expertise__box">
                                            <div class="tech-expertise__place">
                                                <span>1</span><span>место</span>
                                            </div>
                                            <div class="tech-expertise__text">Рейтинг разработчиков на&nbsp;React Native по&nbsp;версии Рейтинга Рунета</div>
                                        </div>
                                    </div>

                                    <div class="tech-expertise__item">
                                        <div class="tech-expertise__box">
                                            <div class="tech-expertise__place">
                                                <span>2</span><span>место</span>
                                            </div>
                                            <div class="tech-expertise__text">Рейтинг разработчиков на&nbsp;Next.js по&nbsp;версии Рейтинга Рунета</div>
                                        </div>
                                    </div>

                                    <div class="tech-expertise__item">
                                        <div class="tech-expertise__box">
                                            <div class="tech-expertise__place">
                                                <span>6</span><span>место</span>
                                            </div>
                                            <div class="tech-expertise__text">Рейтинг разработчиков на&nbsp;Laravel по&nbsp;версии Рейтинга Рунета</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__info inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Наша экспертиза</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>Комплексный технический продакшен. Создаем продукты, которые остаются актуальными и&nbsp;эффективными долгое время после релиза за&nbsp;счет масштабируемых технологических решений.</p>

                                            <p>Закрываем весь цикл работ: аудит, проектирование, разработка, тестирование, devops, поддержка и&nbsp;код-ревью.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__logos inverse">
                        <section class="logos">
                            <div class="logos__container">
                                <div class="logos__list">
                                    <div class="logos__item">
                                        <div class="logos__icon">
                                            <img src="/assets/images/tech/partners/megafon.svg" alt="" />
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="logos__icon">
                                            <img src="/assets/images/tech/partners/tinkoff.svg" alt="" />
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="logos__icon">
                                            <img src="/assets/images/tech/partners/yandex.svg" alt="" />
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="logos__icon">
                                            <img src="/assets/images/tech/partners/kia.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__direction">
                        <section class="tech-direction">
                            <div class="tech-direction__container">
                                <div class="tech-direction__head">
                                    <h2 class="tech-direction__title h2">Основные направления</h2>
                                    <div class="tech-direction__text">Любим создавать продукты с&nbsp;нуля, но&nbsp;умеем работать и&nbsp;с&nbsp;существующим дизайном: оценим входящие материалы, проконсультируем и&nbsp;поможем улучшить проект за&nbsp;счет технологий.</div>
                                </div>

                                <div class="tech-direction__list">
                                    <div class="tech-direction__item">
                                        <div class="tech-direction__block">Корпоративные экосистемы и платформы</div>
                                    </div>

                                    <div class="tech-direction__item">
                                        <div class="tech-direction__block">Разработка мобильных приложений</div>
                                    </div>

                                    <div class="tech-direction__item">
                                        <div class="tech-direction__block">E-commerce, медиа-проекты</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__projects">
                        <section class="tech-projects">
                            <div class="tech-projects__container">
                                <div class="tech-projects__row">
                                    <div class="tech-projects__col">
                                        <h3 class="tech-projects__title">Глубокий опыт в&nbsp;разработке</h3>
                                        <div class="tech-projects__text">Мы&nbsp;накопили большой опыт и&nbsp;экспертизу в&nbsp;крупных проектах и&nbsp;сложных процессах, однако не&nbsp;ограничиваемся этим и&nbsp;берем в&nbsp;работу задачи любых масштабов. Открыто делимся знаниями и&nbsp;опытом, описываем процессы максимально прозрачно, чтобы у&nbsp;вас не&nbsp;осталось сомнений, почему тот или иной фреймворк или язык программирования лучше всего подходят под ваш проект.</div>

                                        <a href="/work" class="tech-projects__link btn-link btn-link--icon">
                                            <span>Все проекты</span>
                                            <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                        </a>
                                    </div>

                                    <div class="tech-projects__col">
                                        <div class="tech-projects__list">
                                            <div class="tech-projects__item">
                                                <a href="/work/kia-ru" class="tech-projects-card">
                                                    <div class="tech-projects-card__preview">
                                                        <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/1.png" alt="" />
                                                    </div>

                                                    <div class="tech-projects-card__title">Kia. Перезапуск Digital-платформы</div>
                                                </a>
                                            </div>

                                            <div class="tech-projects__item">
                                                <a href="/work/gulliver-market" class="tech-projects-card">
                                                    <div class="tech-projects-card__preview">
                                                        <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/2.jpg" alt="" />
                                                    </div>

                                                    <div class="tech-projects-card__title">Gulliver. Запуск комплексного проекта единой платформы e-commerce</div>
                                                </a>
                                            </div>

                                            <div class="tech-projects__item">
                                                <a href="/work/goldapple" class="tech-projects-card">
                                                    <div class="tech-projects-card__preview">
                                                        <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/3.png" alt="" />
                                                    </div>

                                                    <div class="tech-projects-card__title">Золотое яблоко. Разработка интернет-магазина</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Гибкий набор технологий</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>У&nbsp;нас нет предпочтений, зато есть опыт и&nbsp;принцип интенсивного погружения в&nbsp;бизнес-потребности клиентов. Мы&nbsp;рекомендуем оптимальную технологию и&nbsp;подробно расскажем об&nbsp;альтернативах, их&nbsp;преимуществах и&nbsp;рисках. Используем распространенные языки программирования, с&nbsp;которыми после смогут работать и&nbsp;сторонние разработчики.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__technologies">
                        <section class="tech-technologies">
                            <div class="tech-technologies__container">
                                <div class="tech-technologies__block">
                                    <div class="tech-technologies__row">
                                        <div class="tech-technologies__col tech-technologies__col--side">
                                            <h3 class="tech-technologies__title">Web</h3>
                                        </div>

                                        <div class="tech-technologies__col tech-technologies__col--main">
                                            <ul class="tech-technologies__list">
                                                <li class="tech-technologies__item">HTML</li>
                                                <li class="tech-technologies__item">JavaScript</li>
                                                <li class="tech-technologies__item">TypeScript</li>
                                                <li class="tech-technologies__item">React (NEXT)</li>
                                                <li class="tech-technologies__item">Vue (NUXT)</li>
                                                <li class="tech-technologies__item">Three.js</li>
                                                <li class="tech-technologies__item">Bitrix</li>
                                                <li class="tech-technologies__item">Wordpress</li>
                                                <li class="tech-technologies__item">Starpi</li>
                                                <li class="tech-technologies__item">Python</li>
                                                <li class="tech-technologies__item">Laravel</li>
                                                <li class="tech-technologies__item">GO</li>
                                                <li class="tech-technologies__item">PHP</li>
                                                <li class="tech-technologies__item">Django</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="tech-technologies__block">
                                    <div class="tech-technologies__row">
                                        <div class="tech-technologies__col tech-technologies__col--side">
                                            <h3 class="tech-technologies__title">No-code</h3>
                                        </div>

                                        <div class="tech-technologies__col tech-technologies__col--main">
                                            <ul class="tech-technologies__list">
                                                <li class="tech-technologies__item">Tilda</li>
                                                <li class="tech-technologies__item">Webflow</li>
                                                <li class="tech-technologies__item">Framer</li>
                                                <li class="tech-technologies__item">Readymag</li>
                                                <li class="tech-technologies__item">Vue (NUXT)</li>
                                                <li class="tech-technologies__item">Dora AI</li>
                                                <li class="tech-technologies__item">Bubble</li>
                                                <li class="tech-technologies__item">Airtable</li>
                                                <li class="tech-technologies__item">Make</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="tech-technologies__block">
                                    <div class="tech-technologies__row">
                                        <div class="tech-technologies__col tech-technologies__col--side">
                                            <h3 class="tech-technologies__title">Mobile</h3>
                                        </div>

                                        <div class="tech-technologies__col tech-technologies__col--main">
                                            <ul class="tech-technologies__list">
                                                <li class="tech-technologies__item">React Native</li>
                                                <li class="tech-technologies__item">Swift</li>
                                                <li class="tech-technologies__item">Flutter</li>
                                                <li class="tech-technologies__item">Java</li>
                                                <li class="tech-technologies__item">Kotlin</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__approach tech__approach--steps inverse">
                        <section class="tech-approach">
                            <div class="tech-approach__container">
                                <h2 class="tech-approach__title h2">Подход к&nbsp;созданию проектов</h2>
                                <div class="tech-approach__text"><p>Параллельная разработка позволяет нам вдвое ускорить работу над проектом, не&nbsp;создавая внутренних зависимостей команд. Применяем разные фреймворки, в&nbsp;зависимости от&nbsp;специфики и&nbsp;сроков проекта&nbsp;&mdash; как&nbsp; Agile, так и&nbsp;Waterfall. Продуктовый подход превалирует над визуальными приемами&nbsp;&mdash; функция определяет форму, не&nbsp;наоборот.</p></div>

                                <div class="tech-approach__list">
                                    <div class="tech-approach__item">
                                        <div class="tech-approach-card">
                                            <div class="tech-approach-card__wrap">
                                                <div class="tech-approach-card__side">
                                                    <div class="tech-approach-card__title">Знакомство и&nbsp;анализ данных</div>
                                                </div>

                                                <div class="tech-approach-card__main">
                                                    <div class="tech-approach-card__list">
                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Analytics and UX/UI</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Project architecture</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Technical specification</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tech-approach__item">
                                        <div class="tech-approach-card">
                                            <div class="tech-approach-card__wrap">
                                                <div class="tech-approach-card__side">
                                                    <div class="tech-approach-card__title">Разработка</div>
                                                </div>

                                                <div class="tech-approach-card__main">
                                                    <div class="tech-approach-card__list">
                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Backend + API</div>
                                                            <div class="tech-approach-card__cell">QA</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">HTML</div>
                                                            <div class="tech-approach-card__cell">Frontend</div>
                                                            <div class="tech-approach-card__cell">QA</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tech-approach__item">
                                        <div class="tech-approach-card">
                                            <div class="tech-approach-card__wrap">
                                                <div class="tech-approach-card__side">
                                                    <div class="tech-approach-card__title">Поддержка и&nbsp;развитие</div>
                                                </div>

                                                <div class="tech-approach-card__main">
                                                    <div class="tech-approach-card__list">
                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Launch</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Support and Growth</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__formats inverse">
                        <section class="tech-formats">
                            <div class="tech-formats__container">
                                <h2 class="tech-formats__title h2">Гибкие форматы работы</h2>

                                <div class="tech-formats__main">
                                    <div class="tech-triangle">
                                        <div class="tech-triangle__bg">
                                            <svg width="686" height="550" viewBox="0 0 686 550" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M375.878 14.3523C357.214 -2.53897 328.786 -2.53897 310.121 14.3523C305.426 18.6011 300.698 25.8509 291.031 40.7098L22.6648 453.188C17.0265 461.854 12.8141 468.329 9.75245 473.478C6.68736 478.63 4.81462 482.391 3.82072 485.631C-4.21874 511.841 10.8094 539.548 37.1635 547.102C40.4212 548.036 44.5944 548.518 50.5848 548.758C56.5704 549 64.2944 549 74.6337 549H611.366C621.705 549 629.429 549 635.415 548.758C641.405 548.518 645.578 548.036 648.836 547.102C675.19 539.548 690.219 511.841 682.179 485.631C681.185 482.391 679.312 478.63 676.247 473.478C673.185 468.329 668.973 461.854 663.335 453.188L394.969 40.7098C385.301 25.8509 380.573 18.6011 375.878 14.3523ZM309.45 13.6108C328.496 -3.62515 357.504 -3.62515 376.549 13.6108C381.366 17.9704 386.18 25.3684 395.807 40.1645L664.173 452.642L664.177 452.649C669.809 461.305 674.033 467.798 677.106 472.966C680.181 478.136 682.105 481.979 683.135 485.337C691.339 512.083 676.003 540.355 649.111 548.064C645.735 549.032 641.464 549.516 635.455 549.758C629.447 550 621.704 550 611.381 550H74.6181C64.2952 550 56.552 550 50.5446 549.758C44.535 549.516 40.2642 549.032 36.8879 548.064C9.99599 540.355 -5.33885 512.083 2.86468 485.337C3.89478 481.979 5.81807 478.136 8.89295 472.966C11.966 467.799 16.1894 461.307 21.8195 452.653L290.193 40.1645C299.819 25.3684 304.633 17.9704 309.45 13.6108Z" fill="#B3B3B3"/>
                                            </svg>
                                        </div>

                                        <div class="tech-triangle__controls">
                                            <button class="tech-triangle__button" data-elts="tabControl" data-param="tm">
                                                <div class="tech-triangle__circle"></div>
                                                <span>Time and <br/>Materials(T&M)</span>
                                            </button>

                                            <button class="tech-triangle__button" data-elts="tabControl" data-param="fix">
                                                <div class="tech-triangle__circle"></div>
                                                <span>Fix</span>
                                            </button>

                                            <button class="tech-triangle__button" data-elts="tabControl" data-param="sprint">
                                                <div class="tech-triangle__circle"></div>
                                                <span>Ritainer</span>
                                            </button>
                                        </div>

                                        <div class="tech-triangle__popups">
                                            <div class="tech-triangle-popup tech-triangle-popup--left" data-elts="tabTarget" data-param="tm">
                                                <button class="tech-triangle-popup__close" data-elts="closeTabControl">
                                                    <svg class="svg-icon" viewBox="0 0 21 21" width="24" height="24"><use xlink:href="#svg-cross"></use></svg>
                                                </button>

                                                <div class="tech-triangle-popup__box">
                                                    <div class="tech-triangle-popup__title">T&M</div>

                                                    <ul class="tech-triangle-popup__list">
                                                        <li class="tech-triangle-popup__item">
                                                            <span>Use case</span>
                                                            <span>На старте проекта нет глубокого понимания состава работы. Работаем на основе гибких методологий, оплата по почасовой ставке специалистов.</span>
                                                        </li>

                                                        <li class="tech-triangle-popup__item">
                                                            <span>Для</span>
                                                            <span>Сложные продукты, сервисы для стартапов, e-commerce, корпоративные порталы</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div class="tech-triangle-popup tech-triangle-popup--up" data-elts="tabTarget" data-param="fix">
                                                <button class="tech-triangle-popup__close" data-elts="closeTabControl">
                                                    <svg class="svg-icon" viewBox="0 0 21 21" width="24" height="24"><use xlink:href="#svg-cross"></use></svg>
                                                </button>

                                                <div class="tech-triangle-popup__box">
                                                    <div class="tech-triangle-popup__title">Fix</div>

                                                    <ul class="tech-triangle-popup__list">
                                                        <li class="tech-triangle-popup__item">
                                                            <span>Use case</span>
                                                            <span>Мы детально понимаем состав работы по проекту и можем заранее точно оценить объем.
                                                            </span>
                                                        </li>

                                                        <li class="tech-triangle-popup__item">
                                                            <span>Для</span>
                                                            <span>Небольших проектов, лендингов, промо-сайтов</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div class="tech-triangle-popup tech-triangle-popup--right" data-elts="tabTarget" data-param="sprint">
                                                <button class="tech-triangle-popup__close" data-elts="closeTabControl">
                                                    <svg class="svg-icon" viewBox="0 0 21 21" width="24" height="24"><use xlink:href="#svg-cross"></use></svg>
                                                </button>

                                                <div class="tech-triangle-popup__box">
                                                    <div class="tech-triangle-popup__title">Sprint</div>

                                                    <ul class="tech-triangle-popup__list">
                                                        <li class="tech-triangle-popup__item">
                                                            <span>Use case</span>
                                                            <span>Большие проекты, предполагающие долгосрочное сотрудничество, масштабирование и развитие, поддержку и постоянное участие выделенной команды наших специалистов.</span>
                                                        </li>

                                                        <li class="tech-triangle-popup__item">
                                                            <span>Для</span>
                                                            <span>Медиа-проектов, e-commerce, корпоративных экосистем и платформ</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__approach tech__approach--start inverse">
                        <section class="tech-approach">
                            <div class="tech-approach__container">
                                <h2 class="tech-approach__title h2">Запускаем эффективные проекты, используя продуктовый подход</h2>
                                <div class="tech-approach__text"><p>Начинаем с&nbsp;MVP и&nbsp;последовательно внедряем сложные функции и&nbsp;интеграции. После релиза внимательно изучаем метрики и&nbsp;поведение пользователей, на&nbsp;основе результатов внедряем улучшения.</p></div>

                                <div class="tech-approach__list">
                                    <div class="tech-approach__item">
                                        <div class="tech-approach-card">
                                            <div class="tech-approach-card__wrap">
                                                <div class="tech-approach-card__side">
                                                    <div class="tech-approach-card__title">Старт</div>
                                                </div>

                                                <div class="tech-approach-card__main">
                                                    <div class="tech-approach-card__list">
                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">MVP</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Аналитика и улучшения</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Релиз 1</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Релиз 2</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Релиз 3</div>
                                                        </div>

                                                        <div class="tech-approach-card__item">
                                                            <div class="tech-approach-card__cell">Поддержка</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__direction">
                        <section class="tech-direction">
                            <div class="tech-direction__container">
                                <h2 class="tech-direction__title h2">3 составляющие успешного проекта</h2>

                                <nav class="tech-direction__list">
                                    <div class="tech-direction__item">
                                        <a href="#research" class="tech-direction__link">
                                            <span>Research and Developement</span>
                                            <svg class="svg-icon" viewBox="0 0 24 24" width="24" height="24"><use xlink:href="#svg-arrow-down"></use></svg>
                                        </a>
                                    </div>

                                    <div class="tech-direction__item">
                                        <a href="#testing" class="tech-direction__link">
                                            <span>Комплексное тестирование</span>
                                            <svg class="svg-icon" viewBox="0 0 24 24" width="24" height="24"><use xlink:href="#svg-arrow-down"></use></svg>
                                        </a>
                                    </div>

                                    <div class="tech-direction__item">
                                        <a href="#support" class="tech-direction__link">
                                            <span>Поддержка</span>
                                            <svg class="svg-icon" viewBox="0 0 24 24" width="24" height="24"><use xlink:href="#svg-arrow-down"></use></svg>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </section>
                    </div>

                    <div class="tech__info" id="research">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Research and Developement (R&D)</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>Постоянно изучаем новые технологии и&nbsp;тренды: от&nbsp;искусственного интеллекта до&nbsp;блокчейна и&nbsp;AR. Наиболее интересные приемы интегрируем как во&nbsp;внутреннюю работу команды, так и&nbsp;в&nbsp;клиентские проекты&nbsp;&mdash; сразу, пока это свежее и&nbsp;актуальное решение.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__components">
                        <div class="tech-components">
                            <div class="tech-components__container">
                                <div class="tech-components__list">
                                    <div class="tech-components__item">
                                        <div class="tech-components-card">
                                            <div class="tech-components-card__preview">
                                                <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/5.png" alt="" />
                                            </div>

                                            <div class="tech-components-card__title">Генеративная графика с&nbsp;помощью нейросетей</div>
                                        </div>
                                    </div>

                                    <div class="tech-components__item">
                                        <div class="tech-components-card">
                                            <div class="tech-components-card__preview">
                                                <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/6.png" alt="" />
                                            </div>

                                            <div class="tech-components-card__title">Умный поиск через&nbsp;AI и&nbsp;анализ данных</div>
                                        </div>
                                    </div>

                                    <div class="tech-components__item">
                                        <div class="tech-components-card">
                                            <div class="tech-components-card__preview">
                                                <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/7.png" alt="" />
                                            </div>

                                            <div class="tech-components-card__title">Product-market fit на&nbsp;базе исследования рынка</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tech__info" id="testing">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Тестирование проектов</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list" data-elts="accordionBlock">
                                            {test.map((t,i) => {
                                                return <div class="infoblock__item">
                                                    <div class={`infoblock-card`} data-elts="accordionTarget" data-param={i}>
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}><span>{t.title}</span></button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">{t.content}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__support" id="support">
                        <section class="tech-support">
                            <div class="tech-support__container">
                                <div class="tech-support__row">
                                    <div class="tech-support__col tech-support__col--side">
                                        <h3 class="tech-support__title">Поддержка проекта</h3>
                                    </div>
                                    <div class="tech-support__col tech-support__col--main">
                                        <div class="tech-support__tags">
                                            <div class="tech-support__tag"><span>Серверная поддержка</span></div>
                                            <div class="tech-support__tag"><span>Мониторинг</span></div>
                                            <div class="tech-support__tag"><span>Техническая поддержка</span></div>
                                            <div class="tech-support__tag"><span>Дизайн-поддержка</span></div>
                                            <div class="tech-support__tag"><span>Продуктовая поддержка</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tech-support__row">
                                    <div class="tech-support__col tech-support__col--side">
                                        <div class="tech-support__controls">
                                            <button class="tech-support__button btn-link is-active" data-elts="tabControl" data-param="1"><span>Администрирование</span></button>
                                            <button class="tech-support__button btn-link" data-elts="tabControl" data-param="2"><span>Дальнейшее развитие</span></button>
                                        </div>
                                    </div>

                                    <div class="tech-support__col tech-support__col--main">
                                        <div class="tech-support__main">
                                            <div class="tech-support__block is-active" data-elts="tabTarget" data-param="1">
                                                <div class="tech-support__text">Отвечаем за&nbsp;стабильную работу сервиса и&nbsp;безопасность соединения. Знаем, как дорога каждая минута &laquo;простоя&raquo; в&nbsp;высоконагруженных проектах, поэтому минимизируем саму возможность такой ситуации&nbsp;&mdash; за&nbsp;счет комплекса технических и&nbsp;архитектурных решений.</div>
                                            </div>

                                            <div class="tech-support__block" data-elts="tabTarget" data-param="2">
                                                <div class="tech-support__text">Продуктовая команда помогает приоритизировать задачи и&nbsp;формировать бэклог проекта&nbsp;&mdash; улучшаем пользовательский опыт, работаем над повышением вовлеченности, а&nbsp;также стабильным ростом&nbsp;LT метрик аудитории сайта или&nbsp; приложения.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__projects inverse">
                        <section class="tech-projects">
                            <div class="tech-projects__container">
                                <div class="tech-projects__row">
                                    <div class="tech-projects__col">
                                        <h2 class="tech-projects__title h2">Внутренние <br/> разработки ONY</h2>
                                    </div>

                                    <div class="tech-projects__col">
                                        <div class="tech-projects__list">
                                            <div class="tech-projects__item">
                                                <a href="https://steps.ony.ru" class="tech-projects-card">
                                                    <div class="tech-projects-card__preview">
                                                        <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/8.png" alt="" />
                                                    </div>

                                                    <div class="tech-projects-card__title"><b>STEPS.</b> Услуга запуска интернет-магазина с&nbsp;возможностью базовой кастомизации. Функциональный MVP за&nbsp;три недели.</div>
                                                </a>
                                            </div>

                                            <div class="tech-projects__item">
                                                <div class="tech-projects-card">
                                                    <div class="tech-projects-card__preview">
                                                        <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/9.png" alt="" />
                                                    </div>

                                                    <div class="tech-projects-card__title"><b>ONY GHOST.</b> Чат-бот в&nbsp;Discord, который автоматизирует процессы взятия больничных, отгулов и&nbsp;отпусков внутри агентства.</div>
                                                </div>
                                            </div>

                                            <div class="tech-projects__item">
                                                <div class="tech-projects-card">
                                                    <div class="tech-projects-card__preview">
                                                        <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/10.png" alt="" />
                                                    </div>

                                                    <div class="tech-projects-card__title"><b>ONY ERP.</b> Система учета финансов и&nbsp;рентабельности проектов в&nbsp;реальном времени. Координируем работу продюсеров и&nbsp;финансового отдела для принятия data-driven решений.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="tech__brief inverse">
                        <div class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h2">Привет! Расскажите коротко о&nbsp;вашей задаче</h2>

                                    <div class="brief__form">
                                        <form action={env.API_URL + 'email'} method="POST" class="form form--tech inverse" data-elt="techForm">
                                            <div class="form__box">
                                                <div class="form__row">
                                                    <div class="form__col">
                                                        <div class="form__main">
                                                            <Input name="name" type="text" label="Имя*" />
                                                            <Input name="phone" elts="mask" type="text" label="Телефон*" />
                                                            <Input name="email" type="text" label="E-mail*" />
                                                            <Textarea name="desc" label="Описание задачи" rows="4" />
                                                        </div>
                                                    </div>

                                                    <div class="form__col">
                                                        <div class="form__options">
                                                            <div class="form__checkbox" data-input="">
                                                                <div class="checkbox checkbox--button">
                                                                    <input type="checkbox" name="goal" value="consultation" id="consultationLabel" class="checkbox__input" />

                                                                    <label for="consultationLabel" class="checkbox__label">
                                                                        <span class="checkbox__icon">
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-plus2"></use></svg>
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-check"></use></svg>
                                                                        </span>

                                                                        <span>Консультация</span>
                                                                    </label>
                                                                </div>
                                                                <div data-error="" class="form-message"></div>
                                                            </div>

                                                            <div class="form__checkbox" data-input="">
                                                                <div class="checkbox checkbox--button">
                                                                    <input type="checkbox" name="goal" value="development" id="developmentLabel" class="checkbox__input" />

                                                                    <label for="developmentLabel" class="checkbox__label">
                                                                        <span class="checkbox__icon">
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-plus2"></use></svg>
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-check"></use></svg>
                                                                        </span>

                                                                        <span>Разработка</span>
                                                                    </label>
                                                                </div>
                                                                <div data-error="" class="form-message"></div>
                                                            </div>

                                                            <div class="form__checkbox" data-input="">
                                                                <div class="checkbox checkbox--button">
                                                                    <input type="checkbox" name="goal" value="support" id="supportLabel" class="checkbox__input" />

                                                                    <label for="supportLabel" class="checkbox__label">
                                                                        <span class="checkbox__icon">
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-plus2"></use></svg>
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-check"></use></svg>
                                                                        </span>

                                                                        <span>Поддержка</span>
                                                                    </label>
                                                                </div>
                                                                <div data-error="" class="form-message"></div>
                                                            </div>

                                                            <div class="form__checkbox" data-input="">
                                                                <div class="checkbox checkbox--button">
                                                                    <input type="checkbox" name="goal" value="design" id="designLabel" class="checkbox__input" />

                                                                    <label for="designLabel" class="checkbox__label">
                                                                        <span class="checkbox__icon">
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-plus2"></use></svg>
                                                                            <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-check"></use></svg>
                                                                        </span>

                                                                        <span>Дизайн</span>
                                                                    </label>
                                                                </div>
                                                                <div data-error="" class="form-message"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Checkbox name="agreement" />
                                                <Button label="Отправить" />
                                            </div>

                                            <div class="form-response" data-form-response></div>
                                            {/* <Success message="Спасибо! Менеджер скоро с вами свяжется" btn="Хорошо" /> */}
                                        </form>
                                    </div>
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
