import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';
import { env } from '#_/server/utils/env.js';

export default async ({ data }) => {
    // TODO: prepare fixtures
    const { struct_data, next_page } = data;
    const dataIntro = struct_data.find(d => d.id === 'home_1411711520352').title;
    const dataProjectsFirst = struct_data.find(d => d.id === 'home_1125862462825').projects;
    const dataBigTextFirst = struct_data.find(d => d.id === 'home_566284179621').block_description;
    const dataProjectsSecond = struct_data.find(d => d.id === 'home_225493579108').projects;
    const dataBigTextSecond = struct_data.find(d => d.id === 'home_1038314605149').block_description;
    const dataClientsBlock = struct_data.find(d => d.id === 'home_1593689541344');

    let allCasesIndex = 0;
    const rotatorClasses = ['--top', '--center', '--bottom', '--back'];

    const createRotator = (dataArr) => {
        const len = dataArr.length;
        const result = [];
        for (let index = 0; index < 4; index++) {
            result.push(<div class={'rotator-cube__face rotator-cube__face' + rotatorClasses[index % 4]}>
                <img src={env.BASE_URL + dataArr[index % len].logo_white} alt="" />
            </div>)
        }

        return result;
    }

    return <Layout>
        <div class="wrapper">
            <Header />

            <main class="main" data-elt="pageContainer">
                <div class="home" data-elt="transitionContent">
                    <div class="home__hover" data-elts="caseHoverTarget"></div>
                    <div class="home__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">{dataIntro}</h1>

                                <div class="intro__main">
                                    <div class="slider swiper-container">
                                        <div class="slider__list swiper-wrapper">
                                            {struct_data[0].type === 'slides_block' && struct_data[0].slides.map((s, i) =>
                                                <div class=" slider__item swiper-slide">
                                                    <a href={s.link} class="case-card-slider">
                                                        <div class="case-card-slider__image">
                                                            <video muted loop playsinline preload={i === 0 ? 'auto' : 'meta'} autoplay={i === 0} src={s.video} type="video/mp4"></video>
                                                            {/* <video muted loop playsinline preload="meta" autoplay src={s.video} type="video/mp4"></video> */}
                                                        </div>
                                                        <div class="case-card-slider__content">
                                                            <div class="case-card-slider__title">{s.title}</div>
                                                            <div class="case-card-slider__description">{s.description}</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        <div class="swiper-pagination"></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="home__cases">
                        <section class="cases cases--triple">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {dataProjectsFirst.map((p, i) =>
                                        <div class="cases__item">
                                            <a href={'/work/' + p.slug} class="case-card" data-elts="casePreview" data-key={allCasesIndex++}>
                                                <div class="case-card__preview">
                                                    <video data-elts="casePreviewMedia" muted loop playsinline autoplay={false} preload="meta" src={p.video_link || p.video_link_cover} ></video>
                                                </div>
                                                <div class="case-card__title">{p.title}</div>
                                                <div data-elts="caseHoverTitle" class="case-card__head no-opacity"><div>{p.title_hover}</div></div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div class="cases__title"></div>
                            </div>
                        </section>
                    </div>

                    <div class="home__heading">
                        <section class="heading">
                            <div class="heading__container">
                                <h2 class="heading__title h1">
                                    {dataBigTextFirst}
                                </h2>
                            </div>
                        </section>
                    </div>

                    <div class="home__cases">
                        <section class="cases cases--hexagonal">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {dataProjectsSecond.map((p, i) =>
                                        <div class="cases__item">
                                            <a href={'/work/' + p.slug} class="case-card" data-elts="casePreview" data-key={allCasesIndex++}>
                                                <div class="case-card__preview">
                                                    <video data-elts="casePreviewMedia" muted loop playsinline autoplay={false} preload="meta" src={p.video_link}></video>
                                                </div>

                                                <div class="case-card__title">{p.title}</div>
                                                <div data-elts="caseHoverTitle" d-title={p.title_hover} class="case-card__head"><div>{p.title_hover}</div></div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div class="cases__title"></div>
                            </div>
                        </section>
                    </div>

                    <div class="home__heading">
                        <section class="heading">
                            <div class="heading__container">
                                <h2 class="heading__title h1">
                                    {dataBigTextSecond}
                                </h2>
                            </div>
                        </section>
                    </div>

                    <div class="home__video inverse">
                        <section class="media">
                            <div class="media__container">
                                <div class="media__wrap">
                                    <div class="media__box">
                                        <video data-elts="loadMedia" muted loop playsinline preload="meta" src={dataClientsBlock.video_link} type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="home__info inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataClientsBlock.block_title_1}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text body-l">{dataClientsBlock.block_description_1}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="home__logos inverse">
                        <section class="logos">
                            <div class="logos__container">
                                <div class="logos__list">
                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator">
                                                {createRotator(dataClientsBlock.cliens_line1_column1)}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator">
                                                {createRotator(dataClientsBlock.cliens_line1_column2)}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator">
                                                {createRotator(dataClientsBlock.cliens_line1_column3)}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator">
                                                {createRotator(dataClientsBlock.cliens_line1_column4)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="home__info inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataClientsBlock.block_title_2}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text body-l">{dataClientsBlock.block_description_2}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="home__logos inverse">
                        <section class="logos">
                            <div class="logos__container">
                                <div class="logos__list">
                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator" data-rotation="0">
                                                {createRotator(dataClientsBlock.cliens_line2_column1)}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator" data-rotation="0">
                                                {createRotator(dataClientsBlock.cliens_line2_column2)}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator" data-rotation="0">
                                                {createRotator(dataClientsBlock.cliens_line2_column3)}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="logos__item">
                                        <div class="rotator-cube">
                                            <div class="rotator-cube__box" data-elts="rotator" data-rotation="0">
                                                {createRotator(dataClientsBlock.cliens_line2_column4)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="intro-block inverse is-next" data-elt="transitionNext">
                    <div class="intro-block__container">
                        <a href={next_page.slug} class="intro-block__box" data-elt="goNextPage">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">{next_page.title}</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Подробнее</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video data-elts="loadMedia" muted loop playsinline preload="meta" src={next_page.video_link} type="video/mp4"></video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>

            <Footer footerClass="inverse" />
        </div>
    </Layout>
}
