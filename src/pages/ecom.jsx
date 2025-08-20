import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Input from "../components/form/Input.jsx";
import InputFile from "../components/form/InputFile.jsx";
import Textarea from "../components/form/Textarea.jsx";
import Checkbox from "../components/form/Checkbox.jsx";
import Button from "../components/form/Button.jsx";
import BriefForm from '#@/components/BriefForm.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Комплексная разработка интернет-магазинов любой сложности на основе продуктовых исследований | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Комплексная разработка интернет-магазинов любой сложности на основе продуктовых исследований | Чтобы заказать — заполните бриф на сайте',
    }

    const logos = ['goldapple', 'gulliver', 'kia', 'mts', 'dantone-home', 'avito', 'm-video', 'megafon', 'yandex', 'cc']

    const cases = [
        {
            "id": '',
            "link": '/work/innotech',
            "title": 'Иннотех',
            "subtitle": 'Сайт для IT-компании',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled folder/video-cover.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            },
            "info": [
                {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }
            ]
        }, {
            "id": '',
            "link": '/work/innotech',
            "title": 'Иннотех',
            "subtitle": 'Сайт для IT-компании',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled folder/video-cover.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            },
            "info": [
                {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }
            ]
        }, {
            "id": '',
            "link": '/work/innotech',
            "title": 'Иннотех',
            "subtitle": 'Сайт для IT-компании',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled folder/video-cover.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            },
            "info": [
                {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }, {
                    "icon": "",
                    "num": "",
                    "text": ""
                }
            ]
        }
    ]

    const steps = [
        {
            "title": "Предпроектное исследование",
            "content": "<p>На&nbsp;этом этапе мы&nbsp;погружаемся в&nbsp;контекст задачи, обсуждаем цели и&nbsp;пожелания клиента, анализируем вводные данные и&nbsp;формируем функционал будущего проекта.</p>"
        }, {
            "title": "Проектирование",
            "content": "<p>Создаём карту будущего проекта, формируем список требований к&nbsp;контенту, разрабатываем прототип продукта с&nbsp;фокусом на&nbsp;актуальные бизнес-задачи. Собираем интерактивный прототип для демонстрации работы продукта и&nbsp;тестирования взаимодействия с&nbsp;пользователями.</p>"
        }, {
            "title": "Дизайн-концепция",
            "content": "<p>На&nbsp;основе одной страницы прототипа разрабатываем дизайн-концепцию. Прорабатываем множество вариантов и&nbsp;предлагаем один, наиболее соответствующую потребностям пользователей задачам будущего продукта.</p>"
        }, {
            "title": "Дизайн",
            "content": "<p>Отрисовываем все страницы продукта на&nbsp;основе согласованной дизайн-концепции, структурируем визуальные приёмы, собираем UI-Kit, а&nbsp;после&nbsp;&mdash; передаем в&nbsp;разработку.</p>"
        }, {
            "title": "Front-end разработка",
            "content": "<p>На&nbsp;этом этапе происходит верстка страниц. Превращаем дизайн-макеты в&nbsp;страницы продукта и&nbsp;добиваемся реализации задуманной дизайнерами идеи.</p>"
        }, {
            "title": "Back-end разработка",
            "content": "<p>Развертываем серверное окружение (DevOps). Разрабатываем и&nbsp;описываем функционал каждой страницы сайта.</p>"
        }, {
            "title": "Релиз и&nbsp;поддержка",
            "content": "<p>Помогаем развернуть продукт на&nbsp;сервере клиента. Помогаем с&nbsp;возникающими проблемами фиксированный период времени. Можем подключиться для продолжения работы над развитием вашего проекта с&nbsp;учётом данных аналитики и&nbsp;бизнес-показателей для улучшения метрик вашего продукта.</p>"
        }
    ]

    const methodology = [
        {
            "title": "Fix",
            "text": "подходит для простых проектов с&nbsp;четким&nbsp;ТЗ, где мы&nbsp;заранее понимаем объём работ и&nbsp;можем чётко оценить сроки и&nbsp;стоимость."
        }, {
            "title": "T&M",
            "text": "подходит для проектов, где состав работ может меняться и&nbsp;дополняться по&nbsp;ходу развития. В&nbsp;этом случае оплата происходит за&nbsp;фактические часы, которые специалисты тратят на&nbsp;работу."
        }, {
            "title": "Retainer",
            "text": "подходит сложным проектам, которые предполагают долгосрочное развитие и&nbsp;поддержку со&nbsp;стороны выделенной команды наших специалистов. В&nbsp;этом случае происходит выкуп часов целой команды, собранной под потребности вашего проекта."
        }, {
            "title":"STEPS",
            "src": "https://steps.ony.ru/",
            "text": "подходит для малого бизнеса, который планирует развивать интернет-магазин в&nbsp;сложный e-commerce-проект последовательными итерациями по&nbsp;методологии спринтов. Работающий MVP проект вы&nbsp;получаете через 3&nbsp;недели."
        }
    ]

    const infonum = [
        {
            "title": "№1",
            "text": "в&nbsp;рейтинге дизайн-агентств для e-commerce по&nbsp;версии Ruward"
        }, {
            "title": "24",
            "text": "года на рынке"
        }, {
            "title": "190+",
            "text": "международных <br>и российских наград"
        }, {
            "title": "500+",
            "text": "завершенных <br>проектов"
        }
    ]

    const ratings = [
        {
            "num": "2&nbsp;место",
            "name": "Дизайн-агентство для &laquo;Услуг в&nbsp;B2С и&nbsp;B2B&raquo;",
            "source": "Рейтинг Рунета"
        }, {
            "num": "1&nbsp;место",
            "name": "Дизайн-агентства для Ecommerce",
            "source": "Ruward"
        }, {
            "num": "3&nbsp;место",
            "name": "Дизайн-агентства для IT-компаний и&nbsp;сервисов",
            "source": "Ruward"
        }, {
            "num": "3&nbsp;место",
            "name": "Дизайн для FMCG-сегмента",
            "source": "Рейтинг Рунета"
        }, {
            "num": "4&nbsp;место",
            "name": "Дизайн-агентства для Онлайн-сервисов и&nbsp;порталов",
            "source": "Ruward"
        }, {
            "num": "Топ-10",
            "name": "Рейтинг лучших студий диджитал-дизайна",
            "source": "Tagline"
        }
    ]

    const reviews = [
        {
            "photo": {
                "src": "https://api.ony.ru/uploads/blocks/1719484923.jpg",
                "alt": ""
            },
            "name": "Камила Гюлахмедова",
            "position": "Руководитель web-разработки, VisageHall",
            "text": "«ONY для нас — это команда, с которой мы решили очень важные и интересные задачи. Хочется выделить комплексный подход, крутой менеджмент, позитивный, свежий динамичный взгляд, лёгкость и скорость в коммуникации. Команде разработки отдельная благодарность за высокий профессионализм, энтузиазм и стопроцентную вовлеченность в процесс!»"
        }, {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/tg_image_1504725814.jpeg",
                "alt": ""
            },
            "name": "Никита Морозов",
            "position": "Head of Design, Kaspersky",
            "text": "«Наш опыт совместной работы всегда был максимально позитивным. ONY предлагают глубокое понимание сути брендинга, свежие, не избитые решения, тщательную проработку деталей и исчерпывающее изучение контекста. Если вам нужно по-настоящему качественно, то там где-то внизу должна быть кнопка с контактами»"
        }, {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/reviews-1.png",
                "alt": ""
            },
            "name": "Ксения Сергачёва",
            "position": "Руководитель центра по работе с брендом, МТС",
            "text": "«C ONY и Signal (part of ONY) мы работаем уже 2 года, вместе сделали сложнейшие и интереснейшие проекты. ONY являются для нас надежной опорой в стратегических и брендинговых вопросах»"
        }
    ]

    return <Layout title="E-commerce" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="ecom">
                    <div class="ecom__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">Комплексная разработка эффективных e-commerce-проектов</h1>

                                <div class="intro__partners-logos">
                                    <div class="partners-logos">
                                        <div class="partners-logos__track">
                                            <div class="partners-logos__line">
                                                {[...logos, ...logos].map((name, i) => (
                                                    <div class="partners-logos__item">
                                                        <div class={`partners-logos__icon partners-logos__icon--${name}`}>
                                                            <img src={`/assets/images/partners-logos/${name}.svg`} alt={name} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video preload="meta" muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/digital_fast.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__cases inverse">
                        <section class="ecom-cases">
                            <div class="ecom-cases__container">
                                <div class="ecom-cases__row">
                                    <div class="ecom-cases__col ecom-cases__col--side">
                                        <h3 class="ecom-cases__title">Кейсы</h3>
                                        <a href="/work" class="ecom-cases__link btn-link btn-link--icon">
                                            <span>Все проекты</span>
                                            <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                        </a>
                                    </div>

                                    <div class="ecom-cases__col ecom-cases__col--main">
                                        <div class="ecom-cases__list">
                                            <div class="ecom-cases__item">
                                                <div class="ecom-cases-card">
                                                    <a href="/work/kia-ru" class="ecom-cases-card__main">
                                                        <h3 class="ecom-cases-card__title h2"><span>KIA</span></h3>
                                                        <div class="ecom-cases-card__subtitle">Перезапуск Digital-платформы</div>
                                                        <div class="ecom-cases-card__preview">
                                                            <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/kia.png" alt="" />
                                                        </div>
                                                    </a>

                                                    <div class="ecom-cases-card__info">
                                                        <ul class="ecom-cases-card__list">
                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>68%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">конверсия в&nbsp;заявку через конфигуратор</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>11.3%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">конверсия в&nbsp;кредитном калькуляторе</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>64%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">конверсия в&nbsp;заявку на&nbsp;кредит</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>34%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">конверсия в&nbsp;разделе &laquo;Авто в&nbsp;наличии&raquo;</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="ecom-cases__item">
                                                <div class="ecom-cases-card">
                                                    <a href="/work/gulliver-market" class="ecom-cases-card__main">
                                                        <h3 class="ecom-cases-card__title h2"><span>Gulliver</span></h3>
                                                        <div class="ecom-cases-card__subtitle">Запуск комплексного проекта единой платформы e-commerce</div>
                                                        <div class="ecom-cases-card__preview">
                                                            <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/gulliver.png" alt="" />
                                                        </div>
                                                    </a>

                                                    <div class="ecom-cases-card__info">
                                                        <ul class="ecom-cases-card__list">
                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>62%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">конверсия в&nbsp;покупку</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>60%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">рост LTV</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>17%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">рост органического трафика</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="ecom-cases__item">
                                                <div class="ecom-cases-card">
                                                    <a href="/work/dantone-home" class="ecom-cases-card__main">
                                                        <h3 class="ecom-cases-card__title h2"><span>Dantone Home</span></h3>
                                                        <div class="ecom-cases-card__subtitle">Разработка интернет-магазина мебели</div>
                                                        <div class="ecom-cases-card__preview">
                                                            <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/1-2.png" alt="" />
                                                        </div>
                                                    </a>

                                                    <div class="ecom-cases-card__info">
                                                        <ul class="ecom-cases-card__list">
                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40" style="transform: scale(1,-1);"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>340%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">снизились отказы от&nbsp;покупок</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>60%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">выросла глубина просмотра</div>
                                                            </li>

                                                            <li class="ecom-cases-card__item">
                                                                <div class="ecom-cases-card__num">
                                                                    <svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-arrow-up"></use></svg>
                                                                    <span>140%</span>
                                                                </div>

                                                                <div class="ecom-cases-card__text">выросло количество просмотров страниц</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="ecom-cases__item">
                                                <div class="ecom-cases-card">
                                                    <a href="/work/goldapple" class="ecom-cases-card__main">
                                                        <h3 class="ecom-cases-card__title h2"><span>Золотое яблоко</span></h3>
                                                        <div class="ecom-cases-card__subtitle">Разработка интернет-магазина</div>
                                                        <div class="ecom-cases-card__preview">
                                                            <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/apple.png" alt="" />
                                                        </div>
                                                    </a>

                                                    <div class="ecom-cases-card__info">
                                                        <ul class="ecom-cases-card__list-links">
                                                            <li class="ecom-cases-card__item-links">
                                                                <a href="https://im.ratingruneta.ru/beauty" target="_blank" class="ecom-cases-card__link"><span>Tоп-1 в рейтинге удобства интернет-магазинов в категории «Красота и уход» по версии Рейтинга Рунета</span></a>
                                                            </li>

                                                            <li class="ecom-cases-card__item-links">
                                                                <a href="https://top100.datainsight.ru" target="_blank" class="ecom-cases-card__link"><span>Топ-15 крупнейших e-commerce России</span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="ecom-cases__item">
                                                <div class="ecom-cases-card">
                                                    <a href="/work/liquides-imaginaires" class="ecom-cases-card__main">
                                                        <h3 class="ecom-cases-card__title h2"><span>Liquides Imaginaires</span></h3>
                                                        <div class="ecom-cases-card__subtitle">Разработка интернет-магазина для французского парфюмерного бренда</div>
                                                        <div class="ecom-cases-card__preview">
                                                            <img src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/2-4.png" alt="" />
                                                        </div>
                                                    </a>

                                                    <div class="ecom-cases-card__info">
                                                        <ul class="ecom-cases-card__list-links">
                                                            <li class="ecom-cases-card__item-links">
                                                                <a href="https://tagline.ru/ony/cases/imidzheviy-sayt-francuzskogo-parfyumernogo-brenda-liquides-imaginaires" target="_blank" class="ecom-cases-card__link"><span>Лучший международный сайт по&nbsp;версии Tagline Awards 2023</span></a>
                                                            </li>

                                                            <li class="ecom-cases-card__item-links">
                                                                <a href="https://tagline.ru/ony/cases/imidzheviy-sayt-francuzskogo-parfyumernogo-brenda-liquides-imaginaires" target="_blank" class="ecom-cases-card__link"><span>Лучший сайт по&nbsp;версии Tagline Awards 2023</span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* <div class="ecom__cases">
                        <section class="cases cases--serviсes-page">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {cases.map((card, i) => {
                                        const Wrapper = card.link ? 'a' : 'div';

                                        return (
                                            <div class="cases__item">
                                                <Wrapper href={card.link || undefined} class="case-card-static">
                                                    <div class="case-card-static__title">{card.title}</div>
                                                    <div class="case-card-static__subtitle">{card.subtitle}</div>
                                                    <div class="case-card-static__preview">
                                                        {card.preview.video ? (
                                                            <video preload="meta" muted loop playsinline autoplay preload="none" src={card.preview.video}></video>
                                                        ) : card.preview.img.src ? (
                                                            <img src={card.preview.img.src} alt={card.preview.img.alt} />
                                                        ) : null}
                                                    </div>
                                                    <div class="case-card-static__note">{card.note}</div>
                                                </Wrapper>
                                            </div>
                                        );
                                    })}
                                </div>

                                <a href="/work" class="cases__link btn-link btn-link--icon">
                                    <span>Все кейсы</span>
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                </a>
                            </div>
                        </section>
                    </div> */}

                    <div class="ecom__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side"></div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>Мы&nbsp;в&nbsp;ONY глубоко погружаемся в&nbsp;проекты и&nbsp;проводим продуктовые исследования, чтобы достигать бизнес-целей наших клиентов, разрабатывая решения в&nbsp;e-commerce на&nbsp;базе пользовательских инсайтов и&nbsp;аналитики.</p><p>Мы&nbsp;создаём интернет-магазины и&nbsp;консультируем по&nbsp;бизнес-процессам, а&nbsp;также помогаем компаниям развиваться в&nbsp;e-commerce-среде с&nbsp;помощью product centric и&nbsp;data-driven подходов. Результат&nbsp;&mdash; повышение эффективности и&nbsp;улучшение метрик.</p>
                                        </div>

                                        <div class="infoblock__numbers">
                                            <section class="info-num">
                                                <div class="info-num__list">
                                                    {infonum.map((n,i) => (
                                                        <div class="info-num__item">
                                                            <div class="info-num__title h1">{n.title}</div>
                                                            <div class="info-num__text">{n.text}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Этапы проекта</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list" data-elts="accordionBlock">
                                            {steps.map((step, i) => {
                                                return <div class="infoblock__item">
                                                    <div class={`infoblock-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}>
                                                            <span>{step.title}</span>
                                                            <svg class="svg-icon" viewBox="0 0 30 30" width="40" height="40"><use xlink:href="#svg-arrow-right"></use></svg>
                                                        </button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">{step.content}</div>
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

                    <div class="ecom__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Формат работы</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock-methodology">
                                            {methodology.map((m,i) => {
                                                return <div class="infoblock-methodology__item">
                                                    {m.src ? (
                                                        <a href={m.src} class="infoblock-methodology__link" target="_blank">
                                                            <span>{m.title}</span>
                                                        </a>
                                                    ) : (
                                                        <div class="infoblock-methodology__subtitle">{m.title}</div>
                                                    )}
                                                    <div class="infoblock-methodology__text">{m.text}</div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Технологии</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__technology technology">
                                            <h2 class="technology__title h2">Backend</h2>
                                            <ul class="technology__list">
                                                <li class="technology__item"><span>Bitrix</span></li>
                                                <li class="technology__item"><span>Wordpress</span></li>
                                                <li class="technology__item"><span>Shopify</span></li>
                                                <li class="technology__item"><span>Python</span></li>
                                                <li class="technology__item"><span>Laravel</span></li>
                                                <li class="technology__item"><span>GO</span></li>
                                                <li class="technology__item"><span>PHP</span></li>
                                                <li class="technology__item"><span>Django</span></li>
                                            </ul>
                                        </div>
                                        <div class="infoblock__technology technology">
                                            <h2 class="technology__title h2">Frontend</h2>
                                            <ul class="technology__list">
                                            <li class="technology__item"><span>HTML</span></li>
                                            <li class="technology__item"><span>JavaScript</span></li>
                                            <li class="technology__item"><span>TypeScript</span></li>
                                            <li class="technology__item"><span>React (NEXT)</span></li>
                                            <li class="technology__item"><span>Vue (NUXT)</span></li>
                                            <li class="technology__item"><span>Three.js</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__media">
                        <section class="media">
                            <div class="media__container">
                                <div class="media__wrap">
                                    <div class="media__box">
                                        <video preload="meta" muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/About.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Команда</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>Чтобы делать лучший продукт, мы&nbsp;работаем с&nbsp;лучшими. Digital-команда ONY&nbsp;&mdash; это команда стратегов, маркетологов, арт-директоров, UX-дизайнеров, продуктовых дизайнеров, разработчиков, аналитиков и&nbsp;продюсеров. Проекты агентства&nbsp;&mdash; это синергии компетенций и&nbsp;опыта каждого из&nbsp;них.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Подход</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>ONY&nbsp;&mdash; агентство полного цикла и&nbsp;наша внутренняя структура специально создана так, чтобы направлять ваш проект на&nbsp;всех этапах разработки, сохраняя при этом целостность, создавая синергию и&nbsp;синхронизируя наши команды с&nbsp;вашими.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="ecom__form">
                        <section class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h1">Расскажите коротко <br/>о&nbsp;вашей задаче</h2>

                                    <div class="brief__form">
                                        <BriefForm />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer footerClass='inverse'/>
        </div>

    </Layout>
}
