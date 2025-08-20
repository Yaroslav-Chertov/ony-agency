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
        description: 'Создаем корпоративные сайты, которые решают задачи бизнеса | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Создаем корпоративные сайты, которые решают задачи бизнеса | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/corp_websites.jpeg'
    }

    const logos = ['kia', 'avito', 'mts', 'kaspersky', 'yandex', 'innotech', 'raiffeisen', 'rambler', 'megafon', 'goldapple', 'gulliver', 'gazprom', 'tinkoff']

    const cases = [
        {
            "id": '',
            "link": '/work/innotech',
            "title": 'Иннотех',
            "subtitle": 'Сайт для IT-компании',
            "note": 'Трансформация бизнеса',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled folder/video-cover.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/ttmg',
            "title": 'TTMG',
            "subtitle": 'Имиджевый сайт для архитектурного бюро из Монако',
            "note": 'Премиум в минимализме',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled folder 4/Cover_main.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/galitsky-galitsky',
            "title": 'GALITSKIY & GALITSKIY',
            "subtitle": 'Разработка имиджевого сайтаn',
            "note": 'Сила места',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/galiz.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/kia-ru',
            "title": 'KIA',
            "subtitle": 'Сайт автопроизводителя',
            "note": 'Автосалон на экране',
            "preview": {
                "video": 'https://player.vimeo.com/external/607413142.hd.mp4?s=528124abc896abe5b138deac3ce1be894e133d8a&profile_id=175',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/torgi223',
            "title": 'Торги223',
            "subtitle": 'Сайт электронной торговой площадки',
            "note": 'Просто о сложном',
            "preview": {
                "video": 'https://player.vimeo.com/progressive_redirect/playback/794877673/rendition/1080p/file.mp4?loc=external&signature=76712d4c59ae2cb72b8282e76f1376e98d1bb6503b2d4029d8e63dae05ab4149',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/trekhgorka',
            "title": 'Трехгорная мануфактура',
            "subtitle": 'Корпоративный сайт для бизнес-квартала',
            "note": 'Современное переосмысление пространства',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/Trekhgorka/00_header.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }
    ]

    const steps = [
        {
            "title": "Предпроектное исследование",
            "content": "<p>На&nbsp;этом этапе мы&nbsp;погружаемся в&nbsp;контекст бизнеса и&nbsp;тренды, обсуждаем цели и&nbsp;пожелания клиента, анализируем вводные данные и&nbsp;формируем функционал будущего проекта.</p>"
        }, {
            "title": "Проектирование",
            "content": "<p>Создаём карту будущего проекта, формируем список требований к&nbsp;контенту, разрабатываем прототип сайта с&nbsp;фокусом на&nbsp;бизнес-задачи и&nbsp;SEO-оптимизацию. Собираем интерактивный прототип для демонстрации работы сайта.</p>"
        }, {
            "title": "Дизайн-концепция",
            "content": "<p>На&nbsp;основе одной страницы прототипа разрабатываем дизайн-концепцию с&nbsp;демонстрацией анимаций. Прорабатываем множество вариантов и&nbsp;предлагаем один, наиболее соответствующий бренд-стратегии, айдентике и&nbsp;задачам будущего сайта.</p>"
        }, {
            "title": "Дизайн",
            "content": "<p>Отрисовываем все страницы сайта на&nbsp;основе согласованной дизайн-концепции, структурируем визуальные приёмы, собираем UI-Kit, а&nbsp;после&nbsp;&mdash; передаем в&nbsp;разработку.</p>"
        }, {
            "title": "Front-end разработка",
            "content": "<p>На&nbsp;этом этапе происходит верстка страниц. Превращаем дизайн-макеты в&nbsp;веб-страницы и&nbsp;добиваемся реализации задуманной дизайнерами идеи.</p>"
        }, {
            "title": "Back-end разработка",
            "content": "<p>Развертываем серверное окружение (DevOps). Описываем, разрабатываем и&nbsp;тестируем функционал каждой страницы сайта.</p>"
        }, {
            "title": "Релиз и&nbsp;поддержка",
            "content": "<p>Помогаем развернуть сайт на&nbsp;сервере клиента и&nbsp;решить возникающие проблемы в&nbsp;течение гарантийного периода. Можем подключиться для продолжения работы над развитием вашего проекта с&nbsp;учётом новых бизнес-требований.</p>"
        }
    ]

    const methodology = [
        {
            "title": "Fix",
            "text": "подходит для простых проектов с четким ТЗ, где мы заранее понимаем объём работ и можем чётко оценить сроки и стоимость."
        }, {
            "title": "T&M",
            "text": "подходит для проектов, где состав работ может меняться и дополняться по ходу развития. В этом случае оплата происходит за фактические часы, которые специалисты тратят на работу."
        }, {
            "title": "Retainer",
            "text": "подходит сложным проектам, которые предполагают долгосрочное развитие и поддержку со стороны выделенной команды наших специалистов. В этом случае происходит выкуп часов целой команды, собранной под потребности вашего проекта."
        }
    ]

    const infonum = [
        {
            "title": "280+",
            "text": "международных <br>и российских наград"
        }, {
            "title": "24",
            "text": "Года на рынке"
        }, {
            "title": "100+",
            "text": "Креативных <br>и IT-профессионалов"
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

    return <Layout title="Разработка корпоративных сайтов" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="corpweb">
                    <div class="corpweb__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">Создаем корпоративные сайты, которые решают задачи бизнеса</h1>

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

                    <div class="corpweb__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side"></div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>Мы&nbsp;в&nbsp;ONY тщательно погружаемся в&nbsp;задачи бизнеса, оборачивая главные смыслы в&nbsp;доступный&nbsp;UX и&nbsp;консистентную визуальную среду, которая говорит сама за&nbsp;себя.</p><p>Наша цель на&nbsp;понятном для целевой аудитории языке раскрыть ценность и&nbsp;преимущество бренда клиента, передать корпоративную культуру и&nbsp;миссию. В&nbsp;результате сайт в&nbsp;наших руках становится полноценной частью в&nbsp;формировании современного имиджа и&nbsp;получения новых контактов для сотрудничества, будь это партнёры, клиенты, инвесторы или соискатели.</p>
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

                    <div class="corpweb__cases">
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
                                                            <video preload="meta" muted loop playsinline autoplay src={card.preview.video}></video>
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
                    </div>

                    <div class="corpweb__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Этапы</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list" data-elts="accordionBlock">
                                            {steps.map((step, i) => {
                                                return <div class="infoblock__item">
                                                    <div class={`infoblock-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}>{step.title}</button>
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

                    <div class="corpweb__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Технологии</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__technology technology">
                                            <h2 class="technology__title h2">Backend</h2>
                                            <ul class="technology__list">
                                                <li class="technology__item"><span>Bitrix (1C-Битрикс)</span></li>
                                                <li class="technology__item"><span>Laravel</span></li>
                                                <li class="technology__item"><span>GO</span></li>
                                                <li class="technology__item"><span>PHP</span></li>
                                                <li class="technology__item"><span>Django</span></li>
                                            </ul>
                                        </div>
                                        <div class="infoblock__technology technology">
                                            <h2 class="technology__title h2">Frontend</h2>
                                            <ul class="technology__list">
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

                    <div class="corpweb__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Формат работы</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock-methodology">
                                            {methodology.map((m,i) => {
                                                return <div class="infoblock-methodology__item">
                                                    <div class="infoblock-methodology__subtitle">{m.title}</div>
                                                    <div class="infoblock-methodology__text">{m.text}</div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="corpweb__media">
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

                    <div class="corpweb__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Команда</h2>
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

                    <div class="corpweb__ratings">
                        <section class="ratings">
                            <div class="ratings__container">
                                <h2 class="ratings__title h2">Рейтинги</h2>

                                <div class="ratings__list">
                                    {ratings.map((r,i) => {
                                        return <div class="ratings__item">
                                            <div class="ratings-card">
                                                <div class="ratings-card__num">{r.num}</div>
                                                <div class="ratings-card__name">{r.name}</div>
                                                <div class="ratings-card__source">{r.source}</div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="corpweb__reviews">
                        <section class="reviews">
                            <div class="reviews__container">
                                <h2 class="reviews__title h2">Отзывы клиентов</h2>

                                <div class="reviews__list" data-elts="accordionBlock">
                                    {reviews.map((r,i) => {
                                        return <div class="reviews__item">
                                            <div class={`reviews-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                <div class="reviews-card__top" data-elts="accordionBtn" data-param={i}>
                                                    <div class="reviews-card__image">
                                                        <img src={r.photo.src} alt={r.photo.alt} />
                                                    </div>
                                                    <div class="reviews-card__name">{r.name}</div>
                                                    <div class="reviews-card__position">{r.position}</div>
                                                </div>

                                                <div class="reviews-card__drop" data-elts="accordionBox">
                                                    <div class="reviews-card__content" data-elts="accordionContent">{r.text}</div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="corpweb__form inverse">
                        <section class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h1">Расскажите коротко <br/>о&nbsp;вашей задаче</h2>

                                    <div class="brief__form">
                                        <BriefForm classes="inverse" />
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
