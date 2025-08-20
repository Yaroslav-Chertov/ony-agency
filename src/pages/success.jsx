import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%206/untitled%20folder/UX-snippet.png'
    }

    const cases = [
        {
            "id": '',
            "link": '/work/mts',
            "title": 'МТС. Ребрендинг и&nbsp;бренд-платформа экосистемы',
            "title_hover": "Менять привычное",
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/8b2b0734fd38682e69be9263200731ca.png',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/Kaspersky-evolution',
            "title": 'Kaspersky. Ребрендинг',
            "title_hover": "Эволюция кибериммунитета",
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/0e1fc5401b3d461bbaf824ba5c74008f.png',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/dantone-home',
            "title": 'Dantone Home. E-commerce',
            "title_hover": "Формы и&nbsp;функции",
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/e22a76178c71994bad607e5c2b096c0c.jpg',
                    "alt": ''
                }
            }
        }, {
            "id": '',
            "link": '/work/innotech',
            "title": 'Группа «Иннотех». Айдентика и&nbsp;корпоративный сайт',
            "title_hover": "Трансформация бизнеса",
            "preview": {
                "video": '',
                "img": {
                    "src": 'https://api.ony.ru/images/uploads/7c7761884b6a3e3084721038688e3e64.png',
                    "alt": ''
                }
            }
        }
    ]

    const services = [
        {
            "title": "Стратегия и&nbsp;исследования",
            "content": "<ul><li>Бренд-аудит</li><li>Анализ конкурентов</li><li>Глубинные интервью</li><li>Фокус-группы</li><li>Количественное исследование</li><li>Семиотическое исследование</li><li>Трендвотчинг</li><li>Разработка бренд-платформы</li><li>Разработка EVP</li><li>Позиционирование и бренд-стратегия</li><li>Архитектура бренда</li><li>Коммуникационная матрица</li></ul>"
        }, {
            "title": "Дизайн и брендинг",
            "content": "<ul><li>Дизайн-аудит</li><li>Айдентика</li><li>Нейминг и слоганы</li><li>Разработка иллюстраций</li><li>Фотостиль</li><li>CG и motion</li><li>Аудиобрендинг</li><li>Разработка шрифтов</li><li>Генеративная графика</li></ul>"
        }, {
            "title": "Digital-дизайн и&nbsp;разработка",
            "content": "<ul><li>UX-аудит</li><li>Продуктовые исследования</li><li>Проектирование информационной архитектуры</li><li>Проектирование интерфейсов</li><li>Дизайн-концепция сайта</li><li>Разработка сайта</li><li>Техническая поддержка</li></ul>"
        }
    ]

    return <Layout title="Успех" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="success-page">
                    <div class="success-page__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">Спасибо! Менеджер скоро с&nbsp;вами&nbsp;свяжется</h1>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video muted loop playsinline autoplay src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/SIGNAL_video.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="success-page__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Услуги</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">
                                            <p>Создаём бренды и&nbsp;трансформируем бизнес клиентов, благодаря синергии экспертиз в&nbsp;стратегии, брендинге, digital и&nbsp;технологиях.</p>
                                        </div>

                                        <div class="infoblock__list" data-elts="accordionBlock">
                                            {services.map((s, i) => {
                                                return <div class="infoblock__item">
                                                    <div class={`infoblock-card`} data-elts="accordionTarget" data-param={i}>
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}>
                                                            <span>{s.title}</span>
                                                        </button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">{s.content}</div>
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

                    <div class="success-page__cases">
                        <section class="cases">
                            <div class="cases__container">
                                <div class="cases__wrap">
                                    <h2 class="cases__title h2">Кейсы</h2>

                                    <div class="cases__list">
                                        {cases.map((card, i) => (
                                            <div class="cases__item">
                                                <a href={card.link} class="case-card case-card--mini" data-elts="casePreview" data-type="works" data-key={i}>
                                                    <div class="case-card__preview">
                                                        <img src={card.preview.img.src} alt="" />
                                                    </div>
                                                    <div class="case-card__title">{card.title}</div>
                                                    <div data-elts="caseHoverTitle" d-title={card.title_hover} class="case-card__head no-opacity"><div>{card.title_hover}</div></div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="success-page__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">СМИ о&nbsp;нас</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__articles">
                                            <div class="infoblock__article">
                                                <div class="infoblock__text">Путь ребрендинга: Опыт МТС</div>
                                                <a href="https://adpass.ru/rebrending-mts/?ysclid=m3hcx67qs1317523224" target='_blank' class="infoblock__more-btn"><span>ADPASS</span></a>
                                            </div>

                                            <div class="infoblock__article">
                                                <div class="infoblock__text">История ONY: интервью с&nbsp;руководителями агентства</div>
                                                <a href="https://incrussia.ru/fly/ony" target='_blank' class="infoblock__more-btn"><span>Inc Russia</span></a>
                                            </div>

                                            <div class="infoblock__article">
                                                <div class="infoblock__text">Позиционирование B2B-tech-компаний: вредные советы и&nbsp;рабочие рекомендации агентства Signal (part of ONY)</div>
                                                <a href="https://adindex.ru/publication/opinion/marketing/2023/01/16/309896.phtml?ysclid=m3hcz8zs1k755789619" target='_blank' class="infoblock__more-btn"><span>Adindex</span></a>
                                            </div>

                                            <div class="infoblock__article">
                                                <div class="infoblock__text">Поколение Аlpha: чем дети миллениалов отличаются от&nbsp;всех нас</div>
                                                <a href="https://www.forbes.ru/forbeslife/388639-pokolenie-alpha-chem-deti-millenialov-otlichayutsya-ot-vseh-nas?ysclid=m3hczyvgkf937132095" target='_blank' class="infoblock__more-btn"><span>Forbes</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </main>

            <Footer footerClass="inverse" />
        </div>

    </Layout>
}
