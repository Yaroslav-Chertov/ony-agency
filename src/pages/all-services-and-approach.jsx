import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';
import Input from "../components/form/Input.jsx";
import Button from "../components/form/Button.jsx";
import Success from "../components/form/Success.jsx";
import { env } from '#_/server/utils/env.js';

export default async ({ data }) => {
    const dataIntro = data.data;
    const dataBigTextFirst = data.struct_data.find(d => d.id === 'all-services-and-approach_229554926907');
    const dataApproach = data.struct_data.find(d => d.id === 'all-services-and-approach_280453281055');
    const dataServices = data.struct_data.find(d => d.id === 'all-services-and-approach_180785364109');
    const dataBrief = data.struct_data.find(d => d.id === 'all-services-and-approach_668888957915');

    const metaTags = {
        description: 'Создаём бренды и трансформируем бизнес клиентов, благодаря синергии экспертиз в стратегии, брендинге, digital и технологиях.',
        ogDescription: 'Создаём бренды и трансформируем бизнес клиентов, благодаря синергии экспертиз в стратегии, брендинге, digital и технологиях.',
    }

    return <Layout title="Услуги и подход" bodyClass="inverse-body" meta={metaTags}>

        <div class="wrapper">
            <Header headerClass="inverse" />

            <main class="main" data-elt="pageContainer">
                <div class="intro-block inverse" data-elt="transitionIntro">
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

                <div class="services inverse" data-elt="transitionContent">
                    <div class="services__heading">
                        <section class="heading">
                            <div class="heading__container">
                                <h2 class="heading__title h1">{dataBigTextFirst.block_description}</h2>
                            </div>
                        </section>
                    </div>

                    <div class="services__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataApproach.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text"><p>{dataApproach.description}</p></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="services__info">
                        <section class="infoblock infoblock--services">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataServices.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list">
                                            {Object.entries(dataServices.services).map(([ key, category ], i) => 
                                                <div class="infoblock__item">
                                                    <div class={'services-card'} data-elts="accordionTarget" data-param={key}>
                                                        <div class="services-card__top" data-elts="accordionBtn" data-param={key}>
                                                            <span>{category.title}</span>
                                                            <svg class="svg-icon" viewBox="0 0 21 21" width="40" height="40"><use xlink:href="#svg-cross"></use></svg>
                                                        </div>

                                                        <div class="services-card__drop" data-elts="accordionBox">
                                                            <div class="services-card__content" data-elts="accordionContent">
                                                                <div class="services-card__list">
                                                                    {Object.entries(category.children).map(([ key, child ]) => 
                                                                        <div class="services-card__item">
                                                                            <div class="services-card__title">{child.title}</div>
                                                                            <div class="services-card__text">{child.description}</div>
                                                                        </div>
                                                                    )}
                                                                </div>
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
                </div>

                <div class="brief brief--content" data-elt="transitionNext">
                    <div class="brief__container">
                        <div class="brief__wrap">
                            <h2 class="brief__title h1">{dataBrief.block_description}</h2>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>

    </Layout>
}
