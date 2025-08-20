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
        description: 'Проектируем интерфейсы любой сложности: от имиджевых лендингов до IT-продуктов | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Проектируем интерфейсы любой сложности: от имиджевых лендингов до IT-продуктов | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder/ux-design-snippet.png'
    }

    const cases = [
        {
            "id": '',
            "link": '/work/dantone-home',
            "title": 'Dantone Home',
            "subtitle": 'Разработка интернет-магазина',
            "note": 'Формы и функции',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2015/dantone-main-case-cover.mp4',
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
        }, {
            "id": '',
            "link": '/work/torgi223',
            "title": 'Торги223',
            "subtitle": 'Сайт электронной торговой площадки',
            "note": 'Просто о сложном',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/torgi.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/goldapple',
            "title": 'Золотое яблоко',
            "subtitle": 'Дизайн интернет-магазина',
            "note": 'Магазин как бьюти-блог',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/goldapple.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/galitsky-galitsky',
            "title": 'GALITSKIY &amp; GALITSKIY',
            "subtitle": 'Разработка имиджевого сайтаn',
            "note": 'Сила места',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/galiz.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }
    ]

    const steps = [
        {
            "title": "Этапы",
            "content": "<ul><li>Проводим несколько общих встреч, формулируем цели и задачи, собираем стартовые материалы.</li><li>Подбираем оптимальный путь, учитывая планируемый состав работ, приоритеты и сроки. Определяем MVP. Приступаем к работе.</li><li>Разрабатываем информационную архитектуру и прототип. Аргументируем решения данными и экспертизой.</li><li>При необходимости проверить решения, проводим UX-тестирование.</li><li>Параллельно формулируем требования к контенту и передаем копирайтеру для подготовки.</li><li>По мере готовности прототипов передаем в работу над дизайн-концепцией и ее адаптацией на все последующие страницы.</li><li>Масштабируем продукт для реализации новых требований, поддерживая актуальность.</li></ul>"
        }
    ]

    const clients = [
        {
            "title": "<span>МТС</span>",
            "url": "/work/mts"
        }, {
            "title": "<span>Яндекс</span>",
            "url": "/work/yandex-uslugi"
        }, {
            "title": "<span>KIA</span>",
            "url": "/work/kia-ru"
        }, {
            "title": "<span>Золотое яблок</span>",
            "url": "/work/goldapple"
        }, {
            "title": "<span>Megafon</span>",
            "url": "/work/megafon-site"
        }, {
            "title": "<span>Bausch+Lomb</span>",
            "url": "/work/bauschandlomb"
        }, {
            "title": "<span>Группа «Иннотех»</span>",
            "url": "/work/innotech"
        }, {
            "title": "<span>Rambler</span>",
            "url": "/work/ramblerandco"
        }, {
            "title": "<span>Райффайзен банк</span>",
            "url": "/client/raiffeisen-bank"
        }, {
            "title": "<span>Dantone Home</span>",
            "url": "/work/dantone-home"
        }, {
            "title": "<span>Торги223</span>",
            "url": "/work/torgi223"
        }, {
            "title": "<span>GALITSKIY &amp; GALITSKIY</span>",
            "url": "/work/galitsky-galitsky"
        }, {
            "title": "<span>Gulliver</span>",
            "url": "/work/gulliver"
        }, {
            "title": "<span>Третьяковская галерея</span>",
            "url": "/client/tretyakovka"
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
        }
    ]

    return <Layout title="UX-проектирование" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="brand">
                    <div class="brand__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <div class="intro__head">
                                    <h1 class="intro__subtitle h2">Проектируем интерфейсы любой сложности: от имиджевых лендингов до IT-продуктов</h1>

                                    <div class="intro__text">Глубоко погружаясь в задачу, систематизируем данные в стройную архитектуру, разрабатываем прототип и обосновываем решения, заботясь об успешном взаимодействии бизнеса и конечного пользователя. Здесь красота — в логике и деталях, которые наша команда талантливо упаковывает в единый удобный UX.</div>
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
                                        <h2 class="infoblock__title h2">Подход</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__block">
                                            <div class="infoblock__content">
                                                <h3>В проектировании мы всегда идем от общего к частному, чтобы осознанно управлять нашим вниманием.</h3>
                                                <p>В начале мы стремимся видеть цельную картину, поэтому собираем и анализируем информацию обо всех сторонах взаимодействия бизнеса с пользователем, которые нам действительно могут быть полезны:</p>
                                                <ul>
                                                    <li>цель работ, задачи интерфейса и метрики успеха,</li>
                                                    <li>позиционирование и стратегия,</li>
                                                    <li>портрет целевой аудитории,</li>
                                                    <li>результат исследований,</li>
                                                    <li>данные веб-аналитики,</li>
                                                    <li>коммуникация за пределами интерфейса,</li>
                                                    <li>действующий контент,</li>
                                                    <li>бизнес-процессы клиента.</li>
                                                </ul>
                                                <p>Полученные вводные служат предметом для разработки информационной архитектуры в формате наглядных схем и диаграмм. Это важный подготовительный этап для описания структуры данных и логики функционала, который поможет быстро ориентироваться каждому члену команды в процессе работы.</p>
                                                <p>На основе информационной архитектуры собираем детализированный прототип, где продумываем экраны и элементы интерфейса, которые должен видеть конечный пользователь, но пока без визуального стиля.</p>
                                            </div>

                                            <div class="infoblock__list" data-elts="accordionBlock">
                                                {steps.map((step,i) => {
                                                    return <div class="infoblock__item">
                                                        <div class="infoblock-card" data-elts="accordionTarget" data-param={i}>
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
                                            <div class="infoblock__text"><p>В результате получаем наглядную карту продукта и кликабельный прототип интерфейса с продуманными пользовательскими сценариями и бизнес-процессами.</p></div>
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

                    <div class="brand__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Члены команды и их роли</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__content">
                                            <p>Чтобы делать лучший продукт, мы работаем с лучшими — это команда продактов, арт-директоров, системных аналитиков и UX-дизайнеров. Проектирование UX в ONY — это синергии компетенций и опыта каждого из них.</p>
                                            <ul>
                                                <li>Продакт-менеджер</li>
                                                <li>Арт-директор</li>
                                                <li>Системный аналитик</li>
                                                <li>UX-дизайнер</li>
                                                <li>UX-копирайтер</li>
                                            </ul>
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

                        {/* <div class="brand__block">
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
                        </div> */}

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
