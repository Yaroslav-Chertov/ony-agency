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
        description: 'Усиливаем характер и идентичность бренда через звук в самых разных точках контакта | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Усиливаем характер и идентичность бренда через звук в самых разных точках контакта | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Audiobranding/snippet_ab.png'
    }

    const cases = [
        {
            "id": '',
            "link": '/work/mts-audiobranding',
            "title": '',
            "subtitle": 'Звук экосистемы. МТС Аудиобрендинг',
            "note": '2023',
            "preview": {
                "video": '',
                "iframe": {
                    "src": 'https://player.vimeo.com/video/1062441998?h=17211c1f9f&badge=0&autopause=0&player_id=0&app_id=58479',
                    "allow": 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media',
                    "title": 'ONY_MTS_SOUND_rus_sub'
                },
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/kaspersky-audio',
            "title": '',
            "subtitle": 'Звук будущего. Kaspersky Audio Branding',
            "note": '2022',
            "preview": {
                "video": '',
                "iframe": {
                    "src": 'https://player.vimeo.com/video/766839416?h=0b0f0a679f&badge=0&autopause=0&player_id=0&app_id=58479',
                    "allow": 'autoplay; fullscreen; picture-in-picture',
                    "title": 'The sound of the future: how we created audio branding for Kaspersky'
                },
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/start',
            "title": '',
            "subtitle": 'START Rebranding',
            "note": '2022',
            "preview": {
                "video": 'https://player.vimeo.com/progressive_redirect/playback/674851434/rendition/1080p/file.mp4?loc=external&signature=47657a08a04aaf629d9ade2470d3b7e96e64b4961176b7c64e2d617a51bbd4d5',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '',
            "title": '',
            "subtitle": 'PIK Audio Branding <i>(coming soon)</i>',
            "note": '2024',
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%206/untitled%20folder/Frame%202085661378-2.png',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '',
            "title": '',
            "subtitle": 'Viju Audio Branding <i>(coming soon)</i>',
            "note": '2022',
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%206/untitled%20folder/Frame%202085661378%20%283%29.png',
                    "alt": ''
                }
            }
        }
    ]

    const value = [
        {
            "title": "Эмоции",
            "content": "<p>Звук&nbsp;&mdash; это язык чувств. Он&nbsp;мгновенно создаёт настроение, вызывает ассоциации и&nbsp;усиливает связь с&nbsp;аудиторией. Правильный аудиобрендинг превращает бренд в&nbsp;живой образ, к&nbsp;которому хочется возвращаться</p>"
        }, {
            "title": "Поведение",
            "content": "<p>Музыка меняет настроение и&nbsp;поведение: заставляет невольно притопывать ногой или качать головой. Исследования подтверждают, что она усиливает вовлечённость и&nbsp;повышает эффективность бренда.</p>"
        }, {
            "title": "Внимание",
            "content": "<p>Глаза можно закрыть, а&nbsp;уши&nbsp;&mdash; нет. Звук мгновенно захватывает внимание, выделяет бренд и&nbsp;делает его узнаваемым&nbsp;&mdash; в&nbsp;рекламе, в&nbsp;сервисах, в&nbsp;интерфейсах и&nbsp;в&nbsp;офлайн-пространствах</p>"
        }, {
            "title": "Непрерывность",
            "content": "<p>Когда бренд звучит одинаково на&nbsp;всех платформах&nbsp;&mdash; в&nbsp;рекламе, приложениях, видео и&nbsp;магазинах&nbsp;&mdash; он&nbsp;становится узнаваемым на&nbsp;интуитивном уровне.</p>"
        }, {
            "title": "Память",
            "content": "<p>Музыка встраивается в&nbsp;нашу память так, как не&nbsp;может ни&nbsp;один другой формат. Фирменный звук бренда фиксируется в&nbsp;сознании, мгновенно срабатывая&nbsp;&mdash; одним аккордом, одной нотой, одним звуком.</p>"
        }, {
            "title": "Значимость",
            "content": "<p>Музыка говорит с&nbsp;аудиторией на&nbsp;её&nbsp;языке. Она создаёт связь с&nbsp;культурным контекстом, делает бренд ближе, понятнее, эмоциональнее. Когда звук резонирует с&nbsp;эмоциями людей, бренд становится не&nbsp;просто узнаваемым, а&nbsp;значимым.</p>"
        }
    ]

    const reviews = [
        {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/reviews-1.png",
                "alt": ""
            },
            "name": "Ксения Сергачёва",
            "position": "Руководитель центра по работе с брендом, МТС",
            "text": "&laquo;Работая над аудиоайдентикой МТС, команда ONY предложила нам удобное и&nbsp;пластичное решение&nbsp;&mdash; аудио-ДНК для всей экосистемы&nbsp;&mdash; комплексную систему звуков, которую можно адаптировать под форматы и&nbsp;задачи, собирать разные, но&nbsp;узнаваемые варианты звучания, делать саунд дизайн моушен графики и&nbsp;UX элементов. Наш sound pack работает так&nbsp;же гибко, как и&nbsp;визуальные элементы бренда. Такой подход особенно актуален нам как&nbsp;IT компании, где звук становится не&nbsp;просто частью коммуникации, но&nbsp;и&nbsp;элементом взаимодействия с&nbsp;продуктом, и&nbsp;как бренду экосистемы, где саббренды получают своё собственное, но&nbsp;всё равно узнаваемое звучание&raquo;"
        }, {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/tg_image_1504725814.jpeg",
                "alt": ""
            },
            "name": "Никита Морозов",
            "position": "Head of Design, Kaspersky",
            "text": "&laquo;Хочу выразить благодарность агентству ONY за&nbsp;их&nbsp;профессионализм, креативность и&nbsp;внимательное отношение к&nbsp;нашему проекту аудиобрендинга. Музыкальные аранжировки, звуковые логотипы и&nbsp;аудиоассоциации, созданные ими, не&nbsp;только подчеркивают нашу индивидуальность, но&nbsp;и&nbsp;вызывают эмоциональный отклик у&nbsp;нашей аудитории, делая наш бренд узнаваемым и&nbsp;запоминающимся&raquo;"
        }
    ]

    return <Layout title="Разработка аудиобрендинга" bodyClass="body inverse-body" meta={metaTags}>
        <script src="https://player.vimeo.com/api/player.js"></script>

        <div class="wrapper">
            <Header headerClass="inverse" />

            <main class="main">
                <div class="audiobranding inverse">
                    <div class="audiobranding__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h2">Разработка аудиобрендинга&nbsp;&mdash; <br />звук в&nbsp;памяти</h1>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Audiobranding/header_audiobranding.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="audiobranding__info">
                        <div class="audiobranding-info">
                            <div class="audiobranding-info__container">
                                <div class="audiobranding-info__wrap">
                                    <div class="audiobranding-info__top">
                                        <div class="audiobranding-info__title">Что такое аудиобрендинг</div>

                                        <div class="audiobranding-info__description">Аудиобрендинг&nbsp;&mdash; это звуковая идентичность, которая вызывает эмоцию, усиливает характер бренда и&nbsp;делает его ближе к&nbsp;аудитории в&nbsp;каждом касании&nbsp;&mdash; от&nbsp;рекламы до&nbsp;интерфейсов</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="audiobranding__cases">
                        <section class="cases">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {cases.map((card, i) => {
                                        const Wrapper = card.link ? 'a' : 'div';

                                        return (
                                            <div class="cases__item">
                                                <div class="case-card-static">
                                                    <div class="case-card-static__preview">
                                                        {card.preview.video ? (
                                                            <video muted loop playsinline autoplay preload="none" src={card.preview.video}></video>
                                                        ) : card.preview.iframe ? (
                                                            <iframe src={card.preview.iframe.src} frameborder="0" allow={card.preview.iframe.allow} title={card.preview.iframe.title}></iframe>
                                                        ) : card.preview.img.src ? (
                                                            <img src={card.preview.img.src} alt={card.preview.img.alt} />
                                                        ) : null}
                                                    </div>
                                                    <Wrapper
                                                        {...(card.link ? { href: card.link } : {})} class="case-card-static__subtitle">{card.subtitle}
                                                    </Wrapper>
                                                    <div class="case-card-static__note">{card.note}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="audiobranding__info">
                        <div class="audiobranding-info">
                            <div class="audiobranding-info__container">
                                <div class="audiobranding-info__wrap">
                                    {/* <div class="audiobranding-info__top">
                                        <div class="audiobranding-info__title">Что такое аудиобрендинг</div>

                                        <div class="audiobranding-info__description">
                                        Аудиобрендинг — это органичное продолжение характера бренда и усиление ее идентичности через звук в самых разных точках контакта
                                        </div>
                                    </div> */}

                                    <div class="audiobranding-info__main">
                                        <div class="audiobranding-info__block">
                                            <div class="audiobranding-info__title">Зачем нужен аудиобрендинг</div>

                                            <div class="audiobranding-info__content">
                                                <p>Слух&nbsp;&mdash; это естественный и&nbsp;инстинктивный способ восприятия мира. Мы&nbsp;чувствуем звук на&nbsp;уровне эмоций ещё до&nbsp;рождения, раньше, чем начинаем осознавать слова или образы.</p>
                                            </div>
                                        </div>

                                        <div class="audiobranding-info__block">
                                            <div class="audiobranding-info__title">Почему звук имеет значение</div>

                                            <div class="infoblock infoblock--audio">
                                                <div class="infoblock__list" data-elts="accordionBlock">
                                                    {value.map((v, i) => {
                                                        return <div class="infoblock__item">
                                                            <div class={`infoblock-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                                <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}>{v.title}</button>
                                                                <div class="infoblock-card__drop" data-elts="accordionBox">
                                                                    <div class="infoblock-card__content" data-elts="accordionContent">{v.content}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>

                                            {/* <div class="audiobranding-info__content">
                                                <ul>
                                                    <li>транслировать Brand Cue через видео, аудио и UI</li>
                                                    <li>запоминаемость</li>
                                                    <li>обогащает и уточняет характер бренда</li>
                                                </ul>
                                            </div> */}
                                        </div>

                                        <div class="audiobranding-info__block">
                                            <div class="case-card-static">
                                                <div class="case-card-static__iframe">
                                                    <iframe src="https://sampler-seven.vercel.app/dark" allowfullscreen ></iframe>
                                                </div>

                                                <a href="/work/mts-audiobranding" class="case-card-static__subtitle">Семплер разработанный для МТС</a>
                                                <div class="case-card-static__note">2024</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="audiobranding__audio">
                        <section class="audio">
                            <div class="audio__container">
                                <div class="audio__wrap">
                                    <div class="audio__list">
                                        <div class="audio__item">
                                            <div class="audio-card">
                                                <div class="audio-card__player" data-player="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Audiobranding/Kaspersky_Anthem.mp3">
                                                    <svg class="svg-icon" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        {/* GRAY BUTTON CIRCLE */}
                                                        <circle class="audio-card__player-bg" cx="28" cy="28" r="23" fill="#2B2B2B"/>

                                                        {/* PAUSE ICON */}
                                                        <g class="pause">
                                                            <rect x="24" y="22" width="2" height="12" fill="white"/>
                                                            <rect x="30" y="22" width="2" height="12" fill="white"/>
                                                        </g>

                                                        {/* PROGRESS BG LINE */}
                                                        <path class="survey-results__circle-bg" d="M54.5 28C54.5 42.6355 42.6355 54.5 28 54.5C13.3645 54.5 1.5 42.6355 1.5 28C1.5 13.3645 13.3645 1.5 28 1.5C42.6355 1.5 54.5 13.3645 54.5 28Z" stroke="#2B2B2B"/>

                                                        {/* PROGRESS LINE */}
                                                        <path stroke-dasharray="0, 167" class="survey-results__circle" d="M54.5 28C54.5 42.6355 42.6355 54.5 28 54.5C13.3645 54.5 1.5 42.6355 1.5 28C1.5 13.3645 13.3645 1.5 28 1.5C42.6355 1.5 54.5 13.3645 54.5 28Z" stroke="#565656"/>

                                                        {/* PLAY ICON */}
                                                        <path class="play" d="M35.025 28.3653L24 34.7306V22L35.025 28.3653Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div class="audio-card__content">
                                                    <h3 class="audio-card__title h2">Brand music</h3>
                                                    <div class="audio-card__subtitle">Kaspersky Audiobranding</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="audio__item">
                                            <div class="audio-card">
                                                <div class="audio-card__player" data-player="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Audiobranding/МТС_1.mp3">
                                                    <svg class="svg-icon" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        {/* GRAY BUTTON CIRCLE */}
                                                        <circle class="audio-card__player-bg" cx="28" cy="28" r="23" fill="#2B2B2B"/>

                                                        {/* PAUSE ICON */}
                                                        <g class="pause">
                                                            <rect x="24" y="22" width="2" height="12" fill="white"/>
                                                            <rect x="30" y="22" width="2" height="12" fill="white"/>
                                                        </g>

                                                        {/* PROGRESS BG LINE */}
                                                        <path class="survey-results__circle-bg" d="M54.5 28C54.5 42.6355 42.6355 54.5 28 54.5C13.3645 54.5 1.5 42.6355 1.5 28C1.5 13.3645 13.3645 1.5 28 1.5C42.6355 1.5 54.5 13.3645 54.5 28Z" stroke="#2B2B2B"/>

                                                        {/* PROGRESS LINE */}
                                                        <path stroke-dasharray="0, 167" class="survey-results__circle" d="M54.5 28C54.5 42.6355 42.6355 54.5 28 54.5C13.3645 54.5 1.5 42.6355 1.5 28C1.5 13.3645 13.3645 1.5 28 1.5C42.6355 1.5 54.5 13.3645 54.5 28Z" stroke="#565656"/>

                                                        {/* PLAY ICON */}
                                                        <path class="play" d="M35.025 28.3653L24 34.7306V22L35.025 28.3653Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div class="audio-card__content">
                                                    <h3 class="audio-card__title h2">Sound logo</h3>
                                                    <div class="audio-card__subtitle">MTS Audiobranding</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="audio__item">
                                            <div class="audio-card">
                                                <div class="audio-card__player" data-player="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Audiobranding/MTS_4.mp3">
                                                    <svg class="svg-icon" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        {/* GRAY BUTTON CIRCLE */}
                                                        <circle class="audio-card__player-bg" cx="28" cy="28" r="23" fill="#2B2B2B"/>

                                                        {/* PAUSE ICON */}
                                                        <g class="pause">
                                                            <rect x="24" y="22" width="2" height="12" fill="white"/>
                                                            <rect x="30" y="22" width="2" height="12" fill="white"/>
                                                        </g>

                                                        {/* PROGRESS BG LINE */}
                                                        <path class="survey-results__circle-bg" d="M54.5 28C54.5 42.6355 42.6355 54.5 28 54.5C13.3645 54.5 1.5 42.6355 1.5 28C1.5 13.3645 13.3645 1.5 28 1.5C42.6355 1.5 54.5 13.3645 54.5 28Z" stroke="#2B2B2B"/>

                                                        {/* PROGRESS LINE */}
                                                        <path stroke-dasharray="0, 167" class="survey-results__circle" d="M54.5 28C54.5 42.6355 42.6355 54.5 28 54.5C13.3645 54.5 1.5 42.6355 1.5 28C1.5 13.3645 13.3645 1.5 28 1.5C42.6355 1.5 54.5 13.3645 54.5 28Z" stroke="#565656"/>

                                                        {/* PLAY ICON */}
                                                        <path class="play" d="M35.025 28.3653L24 34.7306V22L35.025 28.3653Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div class="audio-card__content">
                                                    <h3 class="audio-card__title h2">Sound Identity</h3>
                                                    <div class="audio-card__subtitle">MTS Audiobranding</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="audiobranding__info">
                        <div class="audiobranding-info">
                            <div class="audiobranding-info__container">
                                <div class="audiobranding-info__wrap">
                                    <div class="audiobranding-info__top">
                                        <div class="audiobranding-info__title">Наш подход</div>

                                        <div class="audiobranding-info__description">Мы&nbsp;верим в&nbsp;силу звука, способного говорить за&nbsp;бренд. Наш подход помогает компаниям звучать уникально и&nbsp;убедительно, вовлекая аудиторию и&nbsp;формируя долгосрочные ассоциации.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="audiobranding__reviews inverse">
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

                    <div class="audiobranding__form">
                        <section class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h2">Расскажите коротко <br/>о&nbsp;вашей задаче</h2>

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
