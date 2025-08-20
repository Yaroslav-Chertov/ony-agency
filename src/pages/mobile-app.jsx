import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BriefForm from '#@/components/BriefForm.jsx';

export const devOnly = true;
export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Профессиональная разработка мобильных приложений. Создаем удобное и функциональное приложение для бизнеса! | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Профессиональная разработка мобильных приложений. Создаем удобное и функциональное приложение для бизнеса! | Чтобы заказать — заполните бриф на сайте',
    }

    const common = {
        title: 'Делаем мобильные приложения, которые приносят пользу',
        description: `<p>Поможем сделать приложения, которые отличаются от конкурентов. Возьмем исследования, дизайн и разработку на себя, чтобы вы сосредоточились на бизнесе. На релизе вы получите красивый продукт, который отвечает вашим бизнес-задачам. </p>`
    }

    const process = [
        {
            num: '01',
            title: 'Брифуем',
            text: 'Выясняем ваши бизнес-цели и задачи проекта'
        }, {
            num: '02',
            title: 'Исследуем',
            text: 'По запросу изучаем рынок, конкурентов и делаем отчет'
        }, {
            num: '03',
            title: 'Погружаемся в продукт',
            text: 'Узнаем, как он устроен и в чём его ценность'
        }, {
            num: '04',
            title: 'Планируем',
            text: 'Составляем дорожную карту, Гант и декомпозируем задачи'
        }, {
            num: '05',
            title: 'Проектируем',
            text: 'Собираем структуру и кликабельные прототипы'
        }, {
            num: '06',
            title: 'Рисуем дизайн',
            text: 'Рисуем концепцию и дизайн-макеты'
        }, {
            num: '07',
            title: 'Разрабатываем',
            text: 'Если у вас нет своей команды'
        }, {
            num: '08',
            title: 'Релизим',
            text: 'Тестим и запускаем проект'
        }, {
            num: '09',
            title: 'Поддерживаем',
            text: 'Бережно следим за работой проекта'
        }
    ]

    const technology = [
        {
            title: 'iOS',
            list: ['Swift']
        }, {
            title: 'Android',
            list: ['Kotlin']
        }, {
            title: 'Кроссплатформенная разработка',
            list: ['Flutter', 'React Native']
        }, {
            title: 'Backend',
            list: ['Node.js', 'Python', 'PHP', 'Go']
        }
    ]

    const team = [
        {
            title: 'Аналитик',
            text: 'Изучит ваш продукт, чтобы мы были максимально погружены в проект'
        }, {
            title: 'Продакт',
            text: 'Узнает ваши бизнес-цели и поможет декомпозировать на задачи'
        }, {
            title: 'Продюсер',
            text: 'Организует работу и документооборот'
        }, {
            title: 'Арт-директор и дизайнеры',
            text: 'Отвечают за логику и визуал проекта'
        }, {
            title: 'Разработчики',
            text: 'Отвечают за код и поддержку'
        }
    ]

    const approach = [
        {
            title: 'Экспериментируем',
            text: 'Пробуем новые фичи и смелые решения'
        }, {
            title: 'Исследуем',
            text: 'Изучаем всё, тестируем с реальными пользователями'
        }, {
            title: 'Работаем по&nbsp;Agile',
            text: 'Итерациями для гибкости и&nbsp;скорости'
        }, {
            title: 'Всегда на&nbsp;связи',
            text: 'встречаемся, обучаем инструментам, тестируем продукт и делаем выводы вместе'
        }
    ]

    const clients = [
        {
            title: `<span>Группа «Иннотех»</span>`,
            url: '/client/innotech'
        }, {
            title: `<span>МТС</span>`,
            url: '/client/mts'
        }, {
            title: `<span>Райффайзен банк</span>`,
            url: '/client/raiffeisen-bank'
        }, {
            title: `<span>Яндекс</span>`,
            url: '/client/yandex'
        }, {
            title: `<span>Тинькофф</span>`,
            url: '/client/tinkoff'
        }, {
            title: `<span>KIA</span>`,
            url: '/client/kia'
        }, {
            title: `<span>Megafon</span>`,
            url: '/client/megafon'
        }, {
            title: `<span>Rambler</span>`,
            url: '/client/rambler-co'
        }, {
            title: `<span>Авито</span>`,
            url: '/client/avito'
        }, {
            title: `<span>Gulliver</span>`,
            url: '/client/gulliver'
        }, {
            title: `<span>Золотое яблоко</span>`,
            url: '/client/zolotoe-yabloko'
        }, {
            title: `<span>Dantone Home</span>`,
            url: '/client/dantone_home'
        }
    ]

    const cases = [
        {
            "id": '',
            "link": '/work/podrygka',
            "title": 'Подружка',
            "subtitle": 'Дизайн мобильного приложения для федеральной сети косметических магазинов',
            "note": 'Бьюти-шопинг онлайн',
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/397973050260c1f53c418066b54892a6.png',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/cowry-digital',
            "title": 'Cowry',
            "subtitle": 'Приложение финансовой платформы',
            "note": 'P2P-переводы без лишних шагов',
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/5196c4307b1fd8414a7ee8da599c758c.png',
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
            "link": '/work/carcade',
            "title": 'Carcade',
            "subtitle": 'Приложение лизинговой компании',
            "note": 'Эксперт в автолизинге',
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/bd366c397de4814b2ff59e9ad08b5b73.jpeg',
                    "alt": ''
                }
            }
        }
    ]

    const methodology = [
        {
            "title": "Fix",
            "text": "подходит для простых проектов с четким ТЗ. Мы заранее понимаем объём работ и чётко оцениваем сроки и стоимость."
        }, {
            "title": "T&M",
            "text": "подходит для проектов, где состав работ может меняться и дополняться. Оплата за фактические часы наших специалистов."
        }, {
            "title": "Retainer",
            "text": "подходит сложным проектам. Предполагает долгосрочное развитие и поддержку нашей выделенной командой. Вы покупаете часы целой команды, собранной под ваш проект."
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
            "num": "5 место",
            "name": "Рейтинг разработчиков приложения для beauty-сегмента",
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
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/reviews-1.png",
                "alt": ""
            },
            "name": "Ксения Сергачёва",
            "position": "Руководитель центра по работе с брендом МТС",
            "text": "Мы создали бренд портал для быстрого погружения любого нового сотрудника или партнера в бренд МТС и его основные черты. А также собрали в одном месте все компоненты айдентики. Для лучшего вовлечения мы добавили интерактивные блоки, которые выполняют роль демо — в игровой форме знакомят пользователя с общим принципом того или иного дизайн-решения, объясняют, почему они такие и какая за этим стоит идея"
        }, {
            "photo": {
                "src": "/assets/images/digital/reviews/img1.jpg",
                "alt": ""
            },
            "name": "Олеся Ващенко",
            "position": "Бренд-менеджер Островок Командировки",
            "text": "Команда ONY смогла не только глубоко прочувствовать нашу бренд-пирамиду, но и гармонично использовать элементы нового брендбука, воплотив их в современном, стильном и функциональном лендинге. Результат превзошел наши ожидания — получился не просто лендинг, а пример, на который мы теперь ориентируемся при создании дальнейших материалов"
        }
    ]

    return <Layout title="Разработка мобильных приложений" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="services-page">
                    <div class="services-page__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <div class="intro__head">
                                    <h1 class="intro__subtitle h2">{common.title}</h1>
                                </div>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/ony_showreel2021_1080p.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="services-page__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side"></div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__block infoblock__block--medium">
                                            <div class="infoblock__text">{common.description}</div>
                                        </div>

                                        <div class="infoblock__block">
                                            <div class="infoblock__list" data-elts="accordionBlock">
                                                <div class="infoblock__item">
                                                    <div class="infoblock-card" data-elts="accordionTarget" data-param="process">
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param="process">Процесс</button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">
                                                                <div class="process">
                                                                    <div class="process__list">
                                                                        {process.map((p,i) => {
                                                                            return <div class="process__item">
                                                                                <div class="process-step">
                                                                                    <div class="process-step__num">{p.num}</div>
                                                                                    <div class="process-step__content">
                                                                                        <div class="process-step__title">{p.title}</div>
                                                                                        <div class="process-step__text">{p.text}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="infoblock__item">
                                                    <div class="infoblock-card" data-elts="accordionTarget" data-param="technology">
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param="technology">Стек технологий</button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">
                                                                <div class="technology technology--sm">
                                                                    {technology.map((t,i) => {
                                                                        return <div class="technology__row">
                                                                            <div class="technology__col">
                                                                                <h3 class="technology__title">{t.title}</h3>
                                                                            </div>

                                                                            <div class="technology__col">
                                                                                <div class="technology__list">
                                                                                    {t.list.map((item, i) => {
                                                                                        return <div class="technology__item">
                                                                                            <span>{item}</span>
                                                                                        </div>
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="infoblock__item">
                                                    <div class="infoblock-card" data-elts="accordionTarget" data-param="team">
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param="team">Команда</button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">
                                                                <div class="team">
                                                                    <div class="team__list">
                                                                        {team.map((el, i) => {
                                                                            return <div class="team__item">
                                                                                <div class="team__title">{el.title}</div>
                                                                                <div class="team__text">{el.text}</div>
                                                                            </div>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="infoblock__item">
                                                    <div class="infoblock-card" data-elts="accordionTarget" data-param="approach">
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param="approach">Подход</button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">
                                                                <div class="approach">
                                                                    {approach.map ((apr, i) => {
                                                                        return <div class="approach__row">
                                                                            <div class="approach__col">
                                                                                <div class="approach__title">{apr.title}</div>
                                                                            </div>
                                                                            <div class="approach__col">
                                                                                <div class="approach__text">{apr.text}</div>
                                                                            </div>
                                                                        </div>
                                                                    })}
                                                                </div>
                                                            </div>
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

                    <div class="services-page__info">
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

                    <div class="services-page__cases">
                        <section class="cases cases--serviсes-page">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {cases.map((card, i) => {
                                        return <div class="cases__item">
                                            <a href={card.link} class="case-card-static">
                                                <div class="case-card-static__preview">
                                                    {card.preview.video ? (
                                                        <video muted loop playsinline autoplay preload="none" src={card.preview.video}></video>
                                                    ) : card.preview.img.src ? (
                                                        <img src={card.preview.img.src} alt={card.preview.img.alt} />
                                                    ) : null}
                                                </div>

                                                <div class="case-card-static__title">{card.title}</div>
                                                <div class="case-card-static__subtitle">{card.subtitle}</div>
                                                {/* <div class="case-card-static__note">{card.note}</div> */}
                                            </a>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="services-page__info">
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

                    <div class="services-page__ratings inverse">
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

                    {/* <div class="services-page__advantages inverse">
                        <div class="services-page__block">
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

                        <div class="services-page__block">
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

                        <div class="services-page__block">
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
                    </div> */}

                    <div class="services-page__reviews">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Отзывы клиентов</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list" data-elts="accordionBlock">
                                            {reviews.map((r,i) => {
                                                return <div class="infoblock__item">
                                                    <div class={`reviews-card reviews-card--accordion ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                        <div class="reviews-card__top" data-elts="accordionBtn" data-param={i}>
                                                            <div class="reviews-card__image">
                                                                <img src={r.photo.src} alt={r.photo.alt} />
                                                            </div>
                                                            <div class="reviews-card__main">
                                                                <div class="reviews-card__name">{r.name}</div>
                                                                <div class="reviews-card__position">{r.position}</div>
                                                            </div>
                                                        </div>

                                                        <div class="reviews-card__drop" data-elts="accordionBox">
                                                            <div class="reviews-card__content" data-elts="accordionContent">{r.text}</div>
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

                    <div class="services-page__form inverse">
                        <section class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h2">Привет! Расскажите <br/>о&nbsp;вашей задаче</h2>

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
