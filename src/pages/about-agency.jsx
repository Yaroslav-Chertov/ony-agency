import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';
import { env } from '#_/server/utils/env.js';

export default async ({ data }) => {
    const { struct_data } = data;
    const dataIntro = data.data;
    const dataBigTextFirst = struct_data.find(d => d.id === 'about-agency_1497978408182');
    const dataApproach = struct_data.find(d => d.id === 'about-agency_781944125412');
    const dataShowreel = struct_data.find(d => d.id === 'about-agency_240769766737');
    const dataInfo = struct_data.find(d => d.id === 'about-agency_630284420659');
    const dataClients = struct_data.find(d => d.id === 'about-agency_448831170614');
    const dataAwards = struct_data.find(d => d.id === 'about-agency_93425298622');
    const dataAwardsChronology = Object.entries(dataAwards.chronology).map(([key, value]) => ({ year: key, value: value[0] })).sort((a, b) => b.year - a.year);
    const dataServices = struct_data.find(d => d.id === 'about-agency_153939668789');
    const dataServicesList = struct_data.find(d => d.id === 'about-agency_876389849102');

    /* const separateArray = (arr, count) => {
        const result = [[]];
        let cursor = -1;
        arr.map((item, i) => {
            if (i % count === 0) {
                cursor++
            }

            if (!Array.isArray(result[cursor])) {
                result[cursor] = [];
            }

            result[cursor].push(item);
        })

        return result;
    }

    const cleanInfoHTML = (html, parser = () => [], count) => {
        const result = [...html.replace(/\n+ +/gi, '').matchAll(/>([^<]+)</g)].map(m => m[1].trim()).filter(m => m);
        const parsed = parser(result, count);

        return {
            result,
            parsed
        };
    } */

    const metaTags = {
        description: 'Мы работаем с компаниями, готовыми к изменениям сегодня, чтобы стать драйвером отрасли завтра | Заполните бриф на сайте или звоните +7(495) 120-78-88',
        ogDescription: 'Мы работаем с компаниями, готовыми к изменениям сегодня, чтобы стать драйвером отрасли завтра | Заполните бриф на сайте или звоните +7(495) 120-78-88',
    }

    return <Layout title="Об агентстве" meta={metaTags}>
        <div class="wrapper">
            <Header />

            <main class="main" data-elt="pageContainer">
                <div class="intro-block" data-elt="transitionIntro">
                    <div class="intro-block__container">
                        <a href={dataIntro.slug} class="intro-block__box">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">{dataIntro.title}</h1>

                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Подробнее</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video muted loop playsinline autoplay src={dataIntro.video_link} type="video/mp4"></video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="about" data-elt="transitionContent">
                    <div class="about__heading">
                        <section class="heading">
                            <div class="heading__container">
                                <h2 class="heading__title h1">{dataBigTextFirst.block_description}</h2>
                            </div>
                        </section>
                    </div>

                    <div class="about__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataApproach.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text"><p>{dataApproach.description}</p></div>

                                        <div class="infoblock__video">
                                            <div class="video" data-elt="showreel">
                                                <div class="video__container">
                                                    <div class="video__cover">
                                                        <video class="video__video" src={dataShowreel.video_link} poster="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/shoereel.png"></video>
                                                    </div>

                                                    <div class="video__controls">
                                                        <button class="video__play-btn" data-elt="playShowreel">
                                                            <span>{dataShowreel.button_title}</span>
                                                            <div class="video__play-icon">
                                                                <svg class="svg-icon svg-icon--play" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-play"></use></svg>
                                                                <svg class="svg-icon svg-icon--pause" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-pause"></use></svg>
                                                            </div>
                                                        </button>

                                                        <div class="video__progress" data-elt="showreelProgress">
                                                            <div class="video__progress-line"><span class="video__progress-line1"></span></div>
                                                            {/* <div class="video__progress-line1"></div>
                                                            <div class="video__progress-line2"></div> */}
                                                        </div>

                                                        <div class="video__time" data-elt="showreelTime">0:00 / 5:42</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataInfo.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__numbers">
                                            <section class="info-num">
                                                <div class="info-num__list">
                                                    {dataInfo.description}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__info">
                        <section class="infoblock infoblock--api">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">Клиенты</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__links">
                                            {dataClients.description}
                                        </div>

                                        <div class="infoblock__more-btn">
                                            <button class="more-btn" data-elts="toggleOpen" data-param="clients">
                                                <span>Полный список</span>
                                                <span>Скрыть список</span>
                                                <svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-cross"></use></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="more-content" data-elts="toggleOpenTarget" data-param="clients">
                            <div class="more-content__container">
                                <div class="more-content__wrap">
                                    <div class="more-content__block">
                                        <div class="more-clients">
                                            <div class="more-clients__nav">
                                                <button class="more-btn is-active" data-elts="tabControl" data-param="sort"><span>A–Я</span></button>
                                                <button class="more-btn" data-elts="tabControl" data-param="industry"><span>Отрасль</span></button>
                                            </div>

                                            <div class="more-clients__tab is-active" data-elts="tabTarget" data-param="sort">
                                                <div class="more-clients__wrap">
                                                    <ul class="more-clients__list">
                                                        {dataClients.all_clients.filter(c => c.slug !== '/client/').map((d, i) =>
                                                            <li class="more-clients__item"><a href={d.slug} class="more-clients__link"><span>{d.title}</span></a></li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div class="more-clients__tab" data-elts="tabTarget" data-param="industry">
                                                <div class="more-clients__wrap">
                                                    {dataClients.all_industries.filter(ind => ind.items.length).map((c, i) => {
                                                        return <div class="more-clients__block">
                                                            <div class="more-clients__title">{c.title}</div>
                                                            <ul class="more-clients__list">
                                                                {c.items.map(item => <li class="more-clients__item"><a href={item.slug} class="more-clients__link"><span>{item.title}</span></a></li>)}
                                                            </ul>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataAwards.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text"><p>{dataAwards.description}</p></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__awards">
                        <section class="logos">
                            <div class="logos__container">
                                <div class="logos__list">
                                    {[...dataAwards.awards.first_line, ...dataAwards.awards.second_line].map(award =>
                                        <div class="logos__item">
                                            <div class="logo-awward">
                                                <div class="logo-awward__img">
                                                    <img src={env.BASE_URL + award.logo} alt="" />
                                                </div>
                                                <div class="logo-awward__num">{award.quantity ? `x${award.quantity}` : ''}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__more-awards">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side"></div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <button class="more-btn" data-elts="toggleOpen" data-param="awards">
                                            <span>Полный список</span>
                                            <span>Скрыть список</span>
                                            <svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-cross"></use></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="more-content" data-elts="toggleOpenTarget" data-param="awards">
                            <div class="more-content__container">
                                <div class="more-content__wrap">
                                    <div class="more-awards">
                                        {dataAwardsChronology.map(row =>
                                            <div class="more-awards__row">
                                                <div class="more-awards__col more-awards__col--side">
                                                    <div class="more-awards__year">{row.year}</div>
                                                </div>

                                                <div class="more-awards__col more-awards__col--main">
                                                    <div class="more-awards__list">
                                                        {row.value.map(v =>
                                                            <>
                                                                <div class="more-awards__item">
                                                                    <div class="more-awards__title">{v.title}</div>
                                                                    <div class="more-awards__subtitle">{v.description}</div>
                                                                </div>

                                                                <div class="more-awards__item">
                                                                    <div class="more-awards__title">{v.awards_title}</div>
                                                                    <div class="more-awards__subtitle">{v.awards_description}</div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__info inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataServices.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text"><p>{dataServices.description}</p></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="about__bubbles inverse">
                        <section class="bubbles">
                            <div class="bubbles__container">
                                <div class="bubbles__list">
                                    {dataServicesList.description}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="intro-block is-next inverse" data-elt="transitionNext">
                    <div class="intro-block__container">
                        <a href="/all-services-and-approach" class="intro-block__box" data-elt="goNextPage">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">Услуги и подход</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Подробнее</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video muted loop playsinline autoplay src="/assets/videos-site/about.mp4" type="video/mp4"></video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>

            <Footer footerClass="inverse is-hidden" />
        </div>

    </Layout>
}
