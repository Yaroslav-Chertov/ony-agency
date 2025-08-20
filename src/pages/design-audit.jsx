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
        description: 'Выявляем основные сложности системы визуального языка и находим точки роста | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Выявляем основные сложности системы визуального языка и находим точки роста | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%206/untitled%20folder/audit-snippet.png'
    }

    const cases = [
        {
            "id": '',
            "link": '/work/restore',
            "title": 'Restore',
            "subtitle": 'Ребрендинг и позиционирование мультибрендового магазина техники',
            "note": 'Ощущение праздника',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%205/_Teaser.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/innotech',
            "title": 'Группа «Иннотех»',
            "subtitle": 'Ребрендинг и сайт для IT-компании',
            "note": 'Трансформация бизнеса',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder/head.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/Kaspersky-evolution',
            "title": 'Kaspersky',
            "subtitle": 'Рестайлинг айдентики лидера в сфере кибербезопасности',
            "note": 'Эволюция кибериммунитета',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2012/header.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/avito',
            "title": 'Авито',
            "subtitle": 'Брендинг для крупнейшего сервиса частных объявлений в России',
            "note": 'Здесь решают люди',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/%D0%90%D0%B2%D0%B8%D1%82%D0%BE/00_avito.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }
    ]

    const steps = [
        {
            "title": "1. Изучение материалов от клиента",
            "content": "<p>На этом этапе мы берем все материалы, которыми пользуется клиент в разных точках контакта с целевой аудиторией, смотрим на них с точки зрения набора инструментов и типа контента в оффлайн и диджитал-среде.</p>"
        }, {
            "title": "2. Интервью с командой клиента",
            "content": "<p>Проводим ряд интервью с представителями разных отделов клиента: внутренние заказчики, теми, кто пользуется этими материалами, топ-менеджерами, инхаус-командой. Уточняем у них, насколько удобно или неудобно, пользоваться существующим брендбуком при создании макетов и тиражировании стиля на другие носители.</p>"
        }, {
            "title": "3. Презентция результатов",
            "content": "<p>На встрече мы показываем анализ с подробными выводами по каждому из элементов, составляющих систему визуального языка в разных контекстах, с разными типами контента: логотип, цветовые решения, типографика и тд., а также наши рекомендации по улучшению или изменению некоторых из них.</p><p>Часто дизайн-аудит является стартовой точкой дальнейшей работы по обновлению айдентики. Выводы аудита позволяют определить будущие шаги в развитии стиля и понять глубину его переработки: рефреш, рестайлинг или полноценный ребрендинг.</p>"
        }
    ]

    const clients = [
        {
            "title": "<span>Авито</span>",
            "url": "/client/avito"
        }, {
            "title": "<span>Kaspersky</span>",
            "url": "/client/kasperskiy"
        }, {
            "title": "<span>restore</span>",
            "url": "/client/restore"
        }, {
            "title": "<span>Группа «Иннотех»</span>",
            "url": "/client/innotech"
        }
    ]

    const advantages = [
        {
            "title": "Кросс-дисциплинарная команда",
            "text": "Мультидисциплинарность нашей команды позволяет нам создавать новые идеи и решения на пересечении экспертиз. Это обеспечивает масштабируемость брендинга и его бесшовное вхождение в различные контексты, будь то офлайн или онлайн среда."
        }, {
            "title": "Функциональность и эстетика",
            "text": "Мы создаем функциональный дизайн с осмысленной эстетикой, делая продукт понятным и удобным. Наша айдентика фокусируется на практическом применении и готова к будущим изменениям."
        }, {
            "title": "Долговечные решения",
            "text": "Наши решения основаны на продуманной стратегии и исследованиях. Это даёт нам возможность создавать долговечный дизайн, который способен привлекать новую аудиторию, не теряя старую, и сохранять актуальность."
        }, {
            "title": "Инновационный подход",
            "text": "Мы регулярно внедряем в процесс работы новые технологии. Автоматизируем дизайн-процессы и упрощяем работу команды клиента над айдентикой с помощью генеративной графики и нейросетей."
        }
    ]

    const expertise = [
        {
            "title": "240+",
            "text": "Наград международных <br>и российских наград"
        }, {
            "title": "24",
            "text": "Года на рынке"
        }, {
            "title": "100+",
            "text": "Креативных <br>профессионалов"
        }, {
            "title": "500+",
            "text": "Реализованных <br>проектов"
        }
    ]

    const ratings = [
        {
            "num": "1 место",
            "name": "Брендинг «под ключ»",
            "source": "Рейтинг Рунета"
        }, {
            "num": "1 место",
            "name": "Разработка фирменного стиля для digital-проектов",
            "source": "Ruward"
        }, {
            "num": "4 место",
            "name": "Дизайн-агентства для Онлайн-сервисов и порталов",
            "source": "Ruward"
        }, {
            "num": "3 место",
            "name": "Дизайн-агентства для IT-компаний и сервисов",
            "source": "Ruward"
        }, {
            "num": "1 место",
            "name": "Бренд-стратегия",
            "source": "Рейтинг Рунета"
        }
    ]

    const reviews = [
        {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/tg_image_1504725814.jpeg",
                "alt": ""
            },
            "name": "Никита Морозов",
            "position": "Head of Design, Kaspersky",
            "text": "«Работали с плотной интеграцией ONY в формате дизайн-аудита, чтобы оптимизировать и развить наш визуальный язык на ближайшие 5 лет. Это прям то, что надо для правильного, итерационного развития стиля компании»"
        }, {
            "photo": {
                "src": "../assets/images/feedback/Galizdra_Egor.jpg",
                "alt": ""
            },
            "name": "Егор Гализдра",
            "position": "Арт-директор, restore",
            "text": "«Для нашей команды аудит был ключевой точкой, в которой мы поняли, куда двигаться дальше. В ходе интервью мы наткнулись на вопросы, которые сами себе не задавали никогда, но в ответах на них крылись основные инсайты. После аудита мы сформировали принципы, которые помогли сразу отсеить идеи и прийти к тому фирменному стилю, который реально решал наши задачи»"
        }
    ]

    return <Layout title="Дизайн-аудит" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="brand">
                    <div class="brand__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <div class="intro__head">
                                    <h1 class="intro__subtitle h2">Дизайн-аудит</h1>

                                    <div class="intro__text">Выявляем основные сложности системы визуального языка и находим точки роста.</div>
                                </div>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/ony_showreel2021_1080p.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="brand__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Этапы</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__block">
                                            <div class="infoblock__text"><p>Процесс работы над дизайн-аудитом прозрачный и комфортный для команды клиента</p></div>

                                            <div class="infoblock__list" data-elts="accordionBlock">
                                                {steps.map((step,i) => {
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

                                        <div class="infoblock__block">
                                            <div class="infoblock__title h2">Чтобы делать лучший продукт, мы работаем с лучшими</div>
                                            <div class="infoblock__text"><p>Дизайн-аудит осуществляет ведущий арт-директор проекта самостоятельно, при необходимости подключается бренд-стратега, а бренд-продюсер организует процесс. Дополниельно возможно подключение CG-специалиста, шрифтового дизайнера, иллюстратора и UX/UI-дизайнера.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="brand__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Клиенты</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__links">
                                            {clients.map ((c,i) => {
                                                return <a href={c.url}>{c.title}</a>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="brand__cases">
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
                                                            <video muted loop playsinline autoplay preload="none" src={card.preview.video}></video>
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
                            </div>
                        </section>
                    </div>

                    <div class="brand__advantages inverse">
                        <div class="brand__block">
                            <section class="advantages">
                                <div class="advantages__container">
                                    <h2 class="advantages__title h2">Наши преимущества</h2>

                                    <div class="advantages__main">
                                        <div class="advantages__list">
                                            {advantages.map((a,i) => {
                                                return <div class="advantages__item">
                                                    <div class="advantages-card">
                                                        <div class="advantages-card__subtitle">{a.title}</div>
                                                        <div class="advantages-card__text">{a.text}</div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="brand__block">
                            <section class="expertise">
                                <div class="expertise__container">
                                    <h2 class="expertise__title h2">Передовая экспертиза в брендинге</h2>

                                    <div class="expertise__list">
                                        {expertise.map((e,i) => {
                                            return <div class="expertise__item">
                                                <div class="expertise__subtitle">{e.title}</div>
                                                <div class="expertise__text">{e.text}</div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="brand__block">
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
                    </div>

                    <div class="brand__reviews">
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

                    <div class="brand__form inverse">
                        <section class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h1">Привет! Расскажите <br/>о&nbsp;вашей задаче</h2>

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
