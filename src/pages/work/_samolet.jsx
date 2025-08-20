import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';

export const staticPage = true;

export default async ({ data }) => {
    return <Layout>
        <div class="wrapper">
            <Header />

            <main class="main" data-elt="pageContainer">
                <div class="intro-block" data-elt="transitionIntro">
                    <div class="intro-block__container">
                        <a href="/about-agency" class="intro-block__box">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">Самолет СТАТИКА</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Еще проект</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video muted loop playsinline autoplay src="/assets/case/samolet/intro.mp4" type="video/mp4"></video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="case" data-elt="transitionContent">
                    <div class="case__wrap">
                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side">
                                            <h3 class="infoblock__title">Брендинг</h3>
                                        </div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>«Самолет» — один из крупнейших девелоперов Московского региона. В ONY компания обратилась за разработкой нового стиля и дизайн-системы, которые доносили бы главные ценности компании: открытость, современность, технологичность. «Покупка недвижимости — это сложно, долго и страшно» — компания собирается сломать это представление, и образ бренда должен был это демонстрировать.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/01.jpg" data-src="/assets/case/samolet/01_full.png" data-key="0" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side"></div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>Главное отличие «Самолета» — желание не «продать квартиру и забыть», а наоборот, построить долгие отношения с клиентом, помогая на всех этапах покупки и поддерживая после с помощью дополнительных сервисов и услуг. В поисках концепции мы пришли к образу конструктора и календаря, которые легли в основу будущего стиля. Конструктор — это про строительство, гибкость и изменения. Это про сервис, в котором можно подбирать компоненты под себя, а не просто брать готовый пакет услуг. Движение блоков по горизонтали отсылает к таймлайну в календаре — так мы создаём дополнительную динамику в макетах, поддерживая идею об отношениях, которые развиваются во времени.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <video data-key="0" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/samolet/02.m4v" type="video/m4v"></video>
                                        </div>
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/03.jpg" data-src="/assets/case/samolet/03_full.png" data-key="1" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side"></div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>В логотипе мы слегка изменили конструкции знаков, сильнее проявив их геометричность. Форма букв стала рифмоваться с основной графикой стиля. Появился и знак, который можно использовать в паре с основным логотипом либо как самостоятельный элемент. В нем мы соединили два образа: направленную вправо стрелку, метафору движения вперед, и урбан-блок — часть городского квартала на строительных схемах.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/04.jpeg" data-src="/assets/case/samolet/04_full.jpeg" data-key="2" alt="" />
                                        </div>
                                        <div class="media__box">
                                            <video data-key="1" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/samolet/05.m4v" type="video/m4v"></video>
                                        </div>
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/06.jpg" data-src="/assets/case/samolet/06_full.png" data-key="3" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side"></div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>Может показаться, что типографический стиль достаточно аскетичен и предоставляет мало возможностей. Это не так. С помощью диджитал языка мы смогли передать много смыслов. Например, использовали плашки с легкими тенями — этот приём позволяет нам легко отделять информационные слои друг от друга, а с точки зрения характера бренда материальность дает нам ощущение крафта и предметности — чего-то, что можно потрогать, как вещи в доме.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/07.jpg" data-src="/assets/case/samolet/07_full.png" data-key="4" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side"></div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>Дополнением к типографическому языку стали пиктограммы. Мы создали уникальные линейные микро-иллюстрации, сохранив баланс между узнаваемостью образов и характерной пластикой. Пиктограммы существуют в двух комплектах: более крупные иллюстрации для коммуникационных форматов и пак с уменьшенной детализацией для карт и применения в супер-мелком размере.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/08.jpg" data-src="/assets/case/samolet/08_full.png" data-key="5" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side"></div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>Вместе с концепцией стиля нам нужно было создать понятную дизайн-систему, которую клиент легко сможет поддерживать и развивать в дальнейшем. Мы разработали большое количество макетов: лифлеты, имиджевую и навигационную наружную рекламу, указатели, и параллельно оформляли правила работы с ними в руководство. Вместе с командой Самолета мы провели несколько арт-дирекшн сессий, чтобы дизайнеры на стороне клиента лучше почувствовали стиль и научились с ним работать. На сессиях мы анализировали сделанные по руководству макеты, решали спорные моменты и искали альтернативные решения там, где нам казалось новый стиль работал не очень удачно.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <img data-key="6" data-elts="loadMedia" src="/assets/case/samolet/09.jpg" data-src="/assets/case/samolet/09_full.jpeg" alt="" />
                                        </div>
                                        <div class="media__box">
                                            <video data-key="2" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/samolet/10.m4v" type="video/m4v"></video>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--content">
                            <section class="infoblock infoblock--case">
                                <div class="infoblock__container">
                                    <div class="infoblock__row">
                                        <div class="infoblock__col infoblock__col--side"></div>

                                        <div class="infoblock__col infoblock__col--main">
                                            <div class="infoblock__text"><p>Теперь новый дизайн «Самолета» стал отражать его основную трансформацию — в технологичного девелопера с большим спектром полезных и понятных услуг, которыми удобно пользоваться каждый день.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="case__block case__block--gallery">
                            <section class="media">
                                <div class="media__container">
                                    <div class="media__wrap">
                                        <div class="media__box">
                                            <img data-elts="loadMedia" src="/assets/case/samolet/11.jpg" data-src="/assets/case/samolet/11_full.png" data-key="7" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div class="intro-block is-next" data-elt="transitionNext">
                    <div class="intro-block__container">
                        <a href="/work/_yandex-uslugi" class="intro-block__box" data-elt="goNextPage">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">Яндекс.Услуги</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Еще проект</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video muted loop playsinline autoplay src="/assets/case/yandex-uslugi/intro.mp4" type="video/mp4"></video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </Layout>
}
