import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Изучение аудитории, анализ рынка, тенденций и прогнозов | Разработка стратегии брендов и коммуникаций | Агентство ONY. тел: +7(495) 120-78-88',
        ogDescription: 'Изучение аудитории, анализ рынка, тенденций и прогнозов | Разработка стратегии брендов и коммуникаций | Агентство ONY. тел: +7(495) 120-78-88',
    }

    const cases = [
        {
            "id": '',
            "link": '/work/mts',
            "title": 'Менять привычное. МТС',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%203/header.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/restore',
            "title": 'Ощущение праздника. Restore',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%205/_Teaser.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/ekonika',
            "title": 'Переменна я постоянная. Ekonika',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%204/head.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/mts-junior',
            "title": 'Цифровой мир глазами ребенка. МТС Junior',
            "preview": {
                "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2010/1%20-%20header.mp4',
                "img": {
                    "src": '',
                    "alt": ''
                }
            }
        }
    ]

    const services =  {
        "title": "Услуги",
        "list": [
            {
                "title": "Бренд с&nbsp;нуля",
                "content": "<p>Поможем пройти вместе с&nbsp;вами весь путь создания разработки бренда с&nbsp;нуля. Когда есть только продукт, бизнес-модель или идея бренда.</p><p>От&nbsp;первых шагов до&nbsp;поддержки запуска на&nbsp;рынок.</p>"
            }, {
                "title": "Свежий ветер",
                "content": "<p>Когда нужно перепозиционировать уже существующий бренд, вдохнем новую жизнь или поможем перейти на&nbsp;новый виток развития.</p><p>Для компаний, у&nbsp;которых есть наследие, аудитория, сотрудники и&nbsp;опыт, которые нужно принимать во&nbsp;внимание.</p>"
            }, {
                "title": "Сборка истории бренда",
                "content": "<p>Создадим смысловую упаковку того, что у&nbsp;вас уже есть в&nbsp;компании. Систематизируем, сфокусируем, организуем в&nbsp;единой документ или гайд.</p><p>Для компаний, которые уже многое сделали для своей стратегии, но&nbsp;теперь им&nbsp;нужны сторонние эксперты, чтобы перевести это на&nbsp;язык коммуникаций.</p>"
            }, {
                "title": "Рука на&nbsp;пульсе",
                "content": "<p>Поможем оперативно реагировать на смену внешних факторов и трендов, появление новых технологий и продуктов, смену ценностей и социальных парадигм.</p><p>Для компаний, что хотят моментально подстраиваться под изменения рынка и оставаться в сердцах пользователей.</p>"
            }, {
                "title": "Ближе к&nbsp;людям",
                "content": "<p>Когда нужно лучше понять, как устроена целевая аудитория, ее&nbsp;настроения, ценности, потребительские паттерны, чтобы принимать решения о&nbsp;бренде и&nbsp;его коммуникации. Глубже погрузиться в&nbsp;культуру и&nbsp;контекст жизни целевой аудитории.</p>"
            }, {
                "title": "Эстетика со&nbsp;смыслом",
                "content": "<p>Поможем быстро перейти от&nbsp;слов к&nbsp;креативу.</p><p>Найдем способы выгодно отличаться от&nbsp;конкурентов, отражать видение команды и&nbsp;закладывать интересные метафоры.</p>"
            }, {
                "title": "Упаковка ценности продукта",
                "content": "<p>Поможем сформулировать ценностное предложение продукта.</p><p>Или придумаем, как преподнести его под другим углом.</p>"
            }, {
                "title": "Инновационный вайб",
                "content": "<p>Поможем вашей команде раскачаться для придумывания нового, нестандартного, другого.</p><p>Простимулируем инновационное и&nbsp;креативное мышление в&nbsp;головах людей.</p>"
            }, {
                "title": "HR&nbsp;бренды и&nbsp;EVP",
                "content": "<p>Упакуем смыслы, ценности и&nbsp;идеологию для компаний и&nbsp;их&nbsp;сотрудников&nbsp;&mdash; лояльных и&nbsp;потенциальных.</p> <p>Чтобы всем нравилось место их&nbsp;работы.</p>"
            }, {
                "title": "Не&nbsp;знаю, с&nbsp;чего начать",
                "content": "<p>Как сделать первый шаг в&nbsp;работе с&nbsp;брендом. Нужны&nbsp;ли вообще брендинговые работы. На&nbsp;какие вопросы нужно себе ответить, чтобы приступить к&nbsp;работе осмысленно.</p>"
            }
        ]
    }

    const clients = [
        {
            "title": "<span>Miro</span>",
            "url": "/client/miro"
        }, {
            "title": "<span>Lime</span>",
            "url": "/client/lime"
        }, {
            "title": "<span>Media 1</span>",
            "url": "/client/media1"
        }, {
            "title": "<span>VK</span>",
            "url": "/client/vk"
        }, {
            "title": "<span>X5 Retail Group</span>",
            "url": "/client/x5-group"
        }, {
            "title": "<span>Tretyakov Gallery</span>",
            "url": "/client/tretyakovka"
        }, {
            "title": "<span>Союзмультфильм</span>",
            "url": "/client/soyuzmultfilm"
        }, {
            "title": "<span>igooods</span>",
            "url": "/client/igooods"
        }, {
            "title": "<span>Ozone Travel</span>",
            "url": "/client/ozon"
        }, {
            "title": "<span>Coca-Cola</span>",
            "url": "/client/coca-cola"
        }, {
            "title": "<span>Сбер</span>",
            "url": "/client/sberbank"
        }
    ]

    const approach = {
        "title": "Подход",
        "list": [
            {
                "title": "Люди, а&nbsp;не&nbsp;потребители",
                "text": "Видим и&nbsp;ценим в&nbsp;целевой аудитории именно людей, и&nbsp;помогаем компаниям построить с&nbsp;ними крепкие отношения"
            }, {
                "title": "Limited edition, а&nbsp;не&nbsp;масс-маркет",
                "text": "Мы&nbsp;не&nbsp;работаем &laquo;на&nbsp;коленке&raquo;, используя готовые шаблоны. Для каждого проекта мы&nbsp;даем особенный взгляд на&nbsp;ситуацию"
            }, {
                "title": "Эволюция, а&nbsp;не&nbsp;революция",
                "text": "Стремимся к&nbsp;оригинальности идей, но&nbsp;уважаем корни и&nbsp;аутентичность ДНК компаний, с&nbsp;которыми работаем"
            }, {
                "title": "Встроенный bullshit-фильтр",
                "text": "Сами от&nbsp;себя требуем свежих и&nbsp;оригинальных решений, когда они необходимы"
            }, {
                "title": "Понимание культуры&nbsp;&mdash; главный игредиент",
                "text": "Мы&nbsp;все время мониторим культуру, чтобы, находить более органичные роли для брендов в&nbsp;контексте жизни людей"
            }
        ]
    }

    return <Layout title="Стратегия" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="strategy">
                    <div class="strategy__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">Signal&nbsp;&mdash; команда стратегов и&nbsp;исследователей</h1>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/SIGNAL_video.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="strategy__heading">
                        <section class="heading">
                            <div class="heading__container">
                                <h2 class="heading__title h1">Превращаем знания о&nbsp;людях, культуре и&nbsp;рынках в&nbsp;осмысленные бренд-стратегии</h2>
                            </div>
                        </section>
                    </div>

                    <div class="strategy__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Миссия</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text h2"><p>В&nbsp;соавторстве с&nbsp;компаниями мы&nbsp;приближаем мир, где все начинается со&nbsp;смысла. Вместе мы&nbsp;находим новые пути для развития брендов.</p><p>Мы&nbsp;умеем делать глубокие и&nbsp;увлекательные исследования, осторожно заглядываем в&nbsp;будущее, постоянно сканируем культуру, чтобы стратегии брендов работали на&nbsp;ваш бизнес и&nbsp;оставались актуальными надолго.</p></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                     <div class="strategy__cases">
                        <section class="cases cases--strategy-page">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {cases.map((card, i) => {
                                        const Wrapper = card.link ? 'a' : 'div';

                                        return (
                                            <div class="cases__item">
                                                <Wrapper href={card.link || undefined} class="case-card-static">
                                                    <div class="case-card-static__preview">
                                                        {card.preview.video ? (
                                                            <video muted loop playsinline autoplay preload="none" src={card.preview.video}></video>
                                                        ) : card.preview.img.src ? (
                                                            <img src={card.preview.img.src} alt={card.preview.img.alt} />
                                                        ) : null}
                                                    </div>
                                                    <div class="case-card-static__title">{card.title}</div>
                                                </Wrapper>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="strategy__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{approach.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="advantages">
                                            <div class="advantages__list">
                                                {approach.list.map((a,i) => {
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
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="strategy__info">
                        <section class="infoblock infoblock--services">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{services.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list">
                                            {services.list.map((item, i) => 
                                                <div class="infoblock__item">
                                                    <div class={'services-card'} data-elts="toggleOpenTarget" data-param={i}>
                                                        <div class="services-card__top" data-elts="toggleOpen" data-param={i}>
                                                            <span>{item.title}</span>
                                                            <svg class="svg-icon" viewBox="0 0 21 21" width="40" height="40"><use xlink:href="#svg-cross"></use></svg>
                                                        </div>

                                                        <div class="services-card__drop">
                                                            <div class="services-card__content">
                                                                <div class="services-card__text">{item.content}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="strategy__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Клиенты</h3>
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

                    <div class="strategy__link inverse">
                        <div class="intro-block is-next inverse">
                            <div class="intro-block__container">
                                <a href="https://signal.ony.ru" class="intro-block__box">
                                    <div class="intro-block__head">
                                        <h1 class="intro-block__title h1">Новый сайт Signal <br/>(ﾉ&gt;&omega;&lt;)ﾉ :｡･:*:･ﾟ&rsquo;★</h1>
                                        <div class="intro-block__more">
                                            <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                            <span>Перейти</span>
                                        </div>
                                    </div>

                                    <div class="intro-block__main">
                                        <div class="intro-block__image">
                                            <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/Videos/Main_3.mp4" type="video/mp4"></video>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="strategy__brief inverse">
                        <div class="brief brief--content">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h1">Расскажите о вашей задаче<br/>
                                    <a href="/brief"><span>Обсудить проект</span></a></h2>
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
