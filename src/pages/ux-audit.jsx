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
        description: 'Помогаем бизнесу улучшить метрики, повысить конверсии и увеличеть показатель удержания пользователей на сайте | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Помогаем бизнесу улучшить метрики, повысить конверсии и увеличеть показатель удержания пользователей на сайте | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%206/untitled%20folder/UX-snippet.png'
    }

    const cases = [
        {
            "id": '',
            "link": '/work/torgi223',
            "title": 'Торги223',
            "subtitle": 'Сайт электронной торговой площадки',
            "note": 'Просто о сложном',
            "preview": {
                "video": 'https://player.vimeo.com/progressive_redirect/playback/794877673/rendition/1080p/file.mp4?loc=external&amp;signature=76712d4c59ae2cb72b8282e76f1376e98d1bb6503b2d4029d8e63dae05ab4149',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/bauschandlomb',
            "title": 'Bausch+Lomb',
            "subtitle": 'Мобильное приложения программы лояльности известного производителя контактных линз',
            "note": 'Забота в каждом клике',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%203/ANIM-01.mp4',
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
                "video": 'https://player.vimeo.com/external/607413142.hd.mp4?s=528124abc896abe5b138deac3ce1be894e133d8a&amp;profile_id=175',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }
    ]

    const steps = [
        {
            "title": "Когда нужен UX-аудит?",
            "content": "<ul><li>Цифровой продукт не приносит желаемых результатов</li><li>Пользователи жалуются на интерфейс и не до конца понимают логику продукта</li><li>Не хватает внутренней продуктовой или UX-экспертизы</li><li>Размытые требования мешают определить каким должен получиться итоговый продукт</li><li>Ограничен бюджет или сроки, поэтому необходимо убрать всё лишнее, чтобы определить минимальный функционал для запуска</li><li>Есть идеи развития продукта, но не понятно, как их лучше реализовать</li></ul>"
        }, {
            "title": "Процесс",
            "content": "<ul><li>Проводим несколько общих встреч, формулируем цели и задачи, собираем вводную информацию о бизнесе, услугах и целевой аудитории</li><li>Подбираем оптимальные инструменты и методологии. Приступаем к работе</li><li>Собираем подробный отчёт и рекомендации. Аргументируем решения данными и экспертизой</li><li>Результат передаем в отдел разработки и остаемся на связи, чтобы минимизировать потери знаний при дальнейшей работе над продуктом</li></ul>"
        }, {
            "title": "Как мы работаем",
            "content": "<ul><li>Изучаем веб-аналитику</li><li>Проводим экспертный аудит интерфейса</li><li>Анализируем решения конкурентов</li><li>Проводим UX-тестирование интерфейса с респондентами</li><li>Проводим функциональное тестирование сайта</li><li>Формируем рекомендации, структурируем и приоритизируем</li><li>Проводим A/B-тестирование</li></ul>"
        }, {
            "title": "Команда",
            "content": "<p>Чтобы делать лучший продукт, мы работаем с лучшими — это команда продактов, исследователей, арт-директоров, UX-дизайнеров и продуктовых дизайнеров. UX-аудит в ONY — это синергии компетенций и опыта каждого из них.</p> <ul><li>Продакт-менеджер</li><li>Исследователь</li><li>Арт-директор</li><li>UX-дизайнер</li><li>QA-инженер</li></ul>"
        }
    ]

    const clients = [
        {
            "title": "<span>Иннотех</span>",
            "url": "/work/innotech"
        }, {
            "title": "<span>МТС</span>",
            "url": "/work/mts"
        }, {
            "title": "<span>Райффайзен банк</span>",
            "url": "/client/raiffeisen-bank"
        }, {
            "title": "<span>Газпром</span>",
            "url": "/work/gazprom-media"
        }, {
            "title": "<span>Яндекс</span>",
            "url": "/work/yandex-uslugi"
        }, {
            "title": "<span>Тинькофф</span>",
            "url": "/work/tinkoff"
        }, {
            "title": "<span>KIA</span>",
            "url": "/work/kia-ru"
        }, {
            "title": "<span>Megafon</span>",
            "url": "/work/megafon-site"
        }, {
            "title": "<span>Rambler</span>",
            "url": "/work/ramblerandco"
        }, {
            "title": "<span>Авито</span>",
            "url": "/work/avito"
        }, {
            "title": "<span>Gulliver</span>",
            "url": "/work/gulliver"
        }, {
            "title": "<span>Золотое яблок</span>",
            "url": "/work/goldapple"
        }, {
            "title": "<span>Dantone Home</span>",
            "url": "/work/dantone-home"
        }
    ]

    const advantages = [
        {
            "title": "Кросс-дисциплинарная команда",
            "text": "Мультидисциплинарность нашей команды позволяет нам создавать новые идеи и решения на пересечении экспертиз."
        }, {
            "title": "Функциональность и эстетика",
            "text": "Мы создаем функциональный дизайн с осмысленной эстетикой, делая продукт понятным и удобным."
        }, {
            "title": "Долговечные решения",
            "text": "Мы регулярно внедряем в процесс работы новые технологии. Автоматизируем дизайн-процессы и упрощяем работу команды клиента над проектом."
        }, {
            "title": "Инновационный подход",
            "text": "Наши решения основаны на продуманной стратегии и исследованиях. Это даёт нам возможность создавать долговечный дизайн, который способен привлекать новую аудиторию, не теряя старую, и сохранять актуальность."
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
            "num": "Топ-10",
            "name": "Рейтинг лучших студий диджитал-дизайна",
            "source": "Tagline"
        }, {
            "num": "Топ-10",
            "name": "Digital Design & Creative",
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
            "name": "Дизайн-агентства для Ecommerce",
            "source": "Рейтинг Рунета"
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
        }
    ]

    return <Layout title="UX-аудит" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="brand">
                    <div class="brand__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <div class="intro__head">
                                    <h1 class="intro__subtitle h2">Проводим UX-аудит, который улучшает метрики вашего продукта</h1>

                                    <div class="intro__text">UX-аудит — это быстрый и надежный способ сфокусироваться на работающих решениях в ситуации редизайна сайта или развития его ключевых показателей. Используем накопленные опыт и экспертизу в разработке интерфейсов любой сложности, а также инструменты качественных и количественных исследований.</div>
                                </div>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video preload="meta" muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/ony_showreel2021_1080p.mp4" type="video/mp4"></video>
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
                                        <h2 class="infoblock__title h2">Подход</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__block">
                                            <div class="infoblock__content">
                                                <h3>UX-аудит необходим для выявления барьеров в пути пользователей, мешающих достигать целевых действий на сайте.</h3>
                                                <p>Мы стремимся видеть объективную картину, поэтому анализируем все стороны взаимодействия бизнеса с пользователем:</p>
                                                <ul>
                                                    <li>Бизнес-задачи</li>
                                                    <li>Ценность услуг или продуктов</li>
                                                    <li>Портреты целевой аудитории</li>
                                                    <li>Коммуникацию за пределами интерфейса</li>
                                                    <li>Контент в интерфейсе</li>
                                                    <li>Доступность навигации</li>
                                                    <li>Набор технических возможностей (фичей)</li>
                                                    <li>Работоспособность сайта</li>
                                                </ul>
                                            </div>

                                            <div class="infoblock__list" data-elts="accordionBlock">
                                                {steps.map((step,i) => {
                                                    return <div class="infoblock__item">
                                                        <div class={`infoblock-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                            <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}>{step.title}</button>
                                                            <div class="infoblock-card__drop" data-elts="accordionBox">
                                                                <div class="infoblock-card__content infoblock-card__content--full" data-elts="accordionContent">{step.content}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </div>

                                        <div class="infoblock__block">
                                            <div class="infoblock__title h2">Что получает клиент в результате</div>
                                            <div class="infoblock__text"><p>Бизнес получает готовый гайд и бэклог для доработки интерфейсов и улучшения его показателей.</p></div>
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
                                    <h2 class="expertise__title h2">Передовая экспертиза в digital</h2>

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
