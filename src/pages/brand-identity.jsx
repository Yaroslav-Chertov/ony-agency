import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BriefForm from '#@/components/BriefForm.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Помогаем бренду говорить с аудиторией, используя понятные и актуальные дизайн-решения, тренды и потребности пользователя | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Помогаем бренду говорить с аудиторией, используя понятные и актуальные дизайн-решения, тренды и потребности пользователя | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%206/untitled%20folder/brand-id-snippet.png'
    }

    const cases = [
        {
            "id": '',
            "link": '/work/mts',
            "title": 'МТС',
            "subtitle": 'Ребрендинг и&nbsp;бренд-платформа экосистемы цифровых сервисов',
            "note": 'Менять привычное',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%203/004.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/Kaspersky-evolution',
            "title": 'Kaspersky',
            "subtitle": 'Рестайлинг айдентики лидера в&nbsp;сфере кибербезопасности',
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
            "link": '/work/innotech',
            "title": 'Иннотех',
            "subtitle": 'Айдентика и&nbsp;корпоративный сайт для&nbsp;IT-гиганта',
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
            "link": '/work/tinkoff',
            "title": 'Тинькофф',
            "subtitle": 'Айдентика и&nbsp;дизайн-система одной из&nbsp;крупнейших финансовых экосистем',
            "note": 'Новая эко-система',
            "preview": {
                "video": 'https://player.vimeo.com/external/607419663.hd.mp4?s=94f4d9e2cced81a961befd6326788d77e34f5795&amp;profile_id=174',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/go-circle',
            "title": 'Go Circle',
            "subtitle": 'Позиционирование, айдентика и&nbsp;сайт движения экологических инициатив',
            "note": 'Новая норма жизни',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/Go-circle/05.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/okkam',
            "title": 'Okkam',
            "subtitle": 'Ребрендинг международной коммуникационной группы компаний',
            "note": 'Отсекая лишнее',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/1280.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }
    ]

    const steps = [
        {
            "title": "1. Вводные исследования",
            "content": "<p>На этом этапе мы синхронизируемся с клиентом по целям и задачам. Для этого мы проводим конкурентный анализ и ряд интервью с представителями клиента. Результат этапа — согласованный креативный бриф, по которому будет работать творческая команда.</p><p>Перед стартом дизайн-работ бренду важно иметь сформулированное позиционирование, так как дизайн будет опираться на него. Если его нет — мы можем его разработать или доуточнить вместе с нашим агентством Signal, которое возглавляет рейтинг разработки бренд-стратегии в России.</p>"
        }, {
            "title": "2. Концептинг бренд-айдентики",
            "content": "<p>На этом этапе мы ищем метафору, раскладываем её на носители, разрабатываем логотип, исследуем возможности дополнительной графики, фотостиля, иллюстраций, подбираем шрифты. Думаем широко: оцениваем диджитал- и моушен-потенциал визуального языка, закладываем потенциал для его развития в долгосрочной перспективе.</p><p>Обычно мы разрабатываем две-три концепции фирменного стиля.</p><p>По завершению этапа вы получаете основу айдентики, включая логотип, фирменную цветовую палитру, стилеобразующую графику и шрифт.</p>"
        }, {
            "title": "3. Интеграция стиля",
            "content": "<p>Следующий возможный шаг — интеграция стиля в необходимые носители: создание 3D-стиля, фотостиля, моушен-брендинга, сборка руководства по использованию новой айдентики (гайдбука или брендбука).</p>"
        }, {
            "title": "4. Поддержка после запуска проекта",
            "content": "<p>Мы готовы устроить команде клиента воркшоп по работе с новой дизайн-системой. Также мы с радостью поучаствуем в подготовке к запуску проекта, а после — готовы отсматривать результаты работ дизайн-команды клиента, устраивать артдирекшен-сессии или полноценные воркшопы для решения возникающих при работе со стилем вопросов.</p>"
        }
    ]

    const clients = [
        {
            "title": "<span>МТС</span>",
            "url": "/client/mts"
        }, {
            "title": "<span>VK</span>",
            "url": "/client/vk"
        }, {
            "title": "<span>Яндекс</span>",
            "url": "/client/yandex"
        }, {
            "title": "<span>Тинькофф</span>",
            "url": "/client/tinkoff"
        }, {
            "title": "<span>Сбер</span>",
            "url": "/client/sberbank"
        }, {
            "title": "<span>Авито</span>",
            "url": "/client/avito"
        }, {
            "title": "<span>OKKAM</span>",
            "url": "/client/okkam"
        }, {
            "title": "<span>X5 Group</span>",
            "url": "/client/x5-group"
        }, {
            "title": "<span>Kaspersky</span>",
            "url": "/client/kasperskiy"
        }, {
            "title": "<span>СКБ Контур</span>",
            "url": "/client/skb-kontur"
        }, {
            "title": "<span>Rambler</span>",
            "url": "/client/rambler-co"
        }, {
            "title": "<span>Открытие</span>",
            "url": "/client/otkritie"
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
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/reviews-1.png",
                "alt": ""
            },
            "name": "Ксения Сергачёва",
            "position": "Руководитель центра по работе с брендом, МТС",
            "text": "«C ONY и Signal (part of ONY) мы работаем уже 2 года, вместе сделали сложнейшие и интереснейшие проекты. ONY являются для нас надежной опорой в стратегических и брендинговых вопросах»"
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

    return <Layout title="Разработка бренд-айдентики" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="brand">
                    <div class="brand__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <div class="intro__head">
                                    <h1 class="intro__subtitle h2">Бренд-айдентика</h1>

                                    <div class="intro__text">При разработке айдентики мы используем понятные и актуальные дизайн-решения, учитывая тренды и потребности пользователя. Балансируя между функцией и эстетикой, мы помогаем бренду говорить с аудиторией.</div>
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
                                            <div class="infoblock__text"><p>Процесс разработки бренд-айдентики прозрачный и комфортный для команды клиента</p></div>

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
                                            <div class="infoblock__title h2">Чтобы делать лучший продукт,
                                            мы работаем с лучшими</div>
                                            <div class="infoblock__text"><p>В процессе разработки стиля участвует несколько бренд-дизайнеров, арт-директор и креативный директор. Смысловую составляющую проекта супервизирует бренд-стратег, а бренд-продюсер организует процесс. По мере необходимости возможно подключение CG-специалиста, шрифтового дизайнера, иллюстратора и UX/UI-дизайнера.</p></div>
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
