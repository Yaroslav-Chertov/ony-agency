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
                                <h1 class="intro-block__title h1">Яндекс. Услуги. Когда вы в надежных руках</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Еще проект</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video muted loop playsinline autoplay preload="meta" src="/assets/case/yandex-uslugi/intro.mp4" type="video/mp4"></video>
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
                                            <div class="infoblock__text"><p>Яндекс.Услуги — сервис для решения бытовых задач. Как и другие продукты Яндекса, он прост и надежен — достаточно нажать одну кнопку, и проверенные люди решат вашу задачу качественно и в срок. На рынке уже существует агрегаторы, собирающие профессионалов в одном месте, но стратегия Яндекс.Услуг отличается от них — это сервис про поддержку и ответственность за сделанное. Новая айдентика должна была отображать это, вызывать доверие и выделяться среди других сервисов компании.</p></div>
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
                                            <video data-key="0" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/yandex-uslugi/00.mp4" type="video/mp4"></video>
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
                                            <div class="infoblock__text"><p>Первой задачей проекта стал поиск образа, который бы лег в основу концепции и отобразил новое позиционирование сервиса. Несложно придумать логотип, например, для строителя: его атрибуты — это каска, молоток и прочие понятные инструменты. Мы же искали универсальную метафору для всех услуг и профессий разом, и нашли ее в рукопожатии между людьми. В любом, даже интеллектуальном, труде мы так или иначе задействуем руки, через рукопожатие скрепляем сделку, держим инструменты и, в целом, взаимодействуем с миром. Так, Яндекс.Услуги фактически становятся цифровыми руками своих клиентов.</p></div>
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
                                            <video data-key="1" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/yandex-uslugi/01.mp4" type="video/mp4"></video>
                                        </div>
                                        <div class="media__box">
                                            <img data-key="0" data-elts="loadMedia" src="/assets/case/yandex-uslugi/02.jpeg" data-src="/assets/case/yandex-uslugi/02_full.jpeg" alt="" />
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
                                            <div class="infoblock__text"><p>Следующим шагом нам предстояло создать визуальную систему, которая бы легко масштабировалась на различные носители: как в диджитале, так и в офлайне. И наши «пятюни» – так мы прозвали придуманную абстракцию – легли в основу всего фирменного стиля. Даже если на носителе не видно логотипа, эти элементы отсылают нас к бренду. Для вариативности макетов мы разработали несколько подходов: Zoom in/out – когда с помощью рук мы приближаем или отдаляем изображение. Мы можем «подержать» ими фотографию или начать пользоваться предметом с их помощью. Все это создает ощущение тепла и поддержки – ведь когда у нас что-то ломается, мы превращаемся в детей, которым нужен ответственный взрослый.</p></div>
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
                                            <img data-key="1" loading="lazy" data-elts="loadMedia" src="/assets/case/yandex-uslugi/03.jpeg" data-src="/assets/case/yandex-uslugi/03_full.jpeg" alt="" />
                                        </div>
                                        <div class="media__box">
                                            <video data-key="2" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/yandex-uslugi/04.mp4" type="video/mp4"></video>
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
                                            <div class="infoblock__text"><p>Иконка Яндекс.Услуг должна была смотреться органично в ряду с другими сервисами Яндекса. Поэтому цветовая гамма соответствует палитре компании, но по-своему выделяется. В пару к желтому цвету — активный оранжевый, а черный мы добавили для контраста, чтобы сделать и сам логотип, и иконку сервиса более заметными и запоминающимися.</p></div>
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
                                            <video data-key="3" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/yandex-uslugi/05.mp4" type="video/mp4"></video>
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
                                            <div class="infoblock__text"><p>Мы внимательно отнеслись и к стилю фотографий — людям важно видеть в исполнителях не моделей с фотостока, а реальных людей. Ведь именно их они впускают в свой дом, оказывая доверие. Для команды Яндекс.Услуг мы подготовили ряд советов с необычными ракурсами, сюжетами в городе и квартире — искренние эмоции и живые лица исполнителей моментально располагают к себе.</p></div>
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
                                            <video data-key="4" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/yandex-uslugi/06.mp4" type="video/mp4"></video>
                                        </div>
                                        <div class="media__box">
                                            <img data-key="2" loading="lazy" data-elts="loadMedia" src="/assets/case/yandex-uslugi/07.jpeg" data-src="/assets/case/yandex-uslugi/07_full.jpeg" alt="" />
                                        </div>
                                        <div class="media__box">
                                            <video data-key="5" data-elts="loadMedia" muted loop playsinline autoplay={false} preload="none" src="/assets/case/yandex-uslugi/08.mp4" type="video/mp4"></video>
                                        </div>
                                        <div class="media__box">
                                            <img data-key="3" loading="lazy" data-elts="loadMedia" src="/assets/case/yandex-uslugi/09.jpeg" data-src="/assets/case/yandex-uslugi/09_full.jpeg" alt="" />
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
                                            <div class="infoblock__text"><p>Яндекс.Услуги — цифровой продукт, поэтому все элементы брендинга очень естественно могут интегрироваться в него, превращаясь в элементы интерфейса. Например, анимированные руки становятся кнопками или блоками, привлекающими внимание пользователя. Бренду также было очень важно, чтобы дизайн хорошо переносился на униформу исполнителей. Это может быть фартук, майка или бейсболка. «Пятюни» хорошо ложатся на любой самый разнообразный мерч.</p></div>
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
                                            <img data-key="4" loading="lazy" data-elts="loadMedia" src="/assets/case/yandex-uslugi/10.jpeg" data-src="/assets/case/yandex-uslugi/10_full.jpeg" alt="" />
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
                                            <div class="infoblock__text"><p>Во время работы над проектом мы очень плотно взаимодействовали с командой клиента — проводили воркшопы и общие креативные сессии. В итоге у нас получилось создать гибкую дизайн-систему с широким и удобным инструментарием.</p></div>
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
                                            <img data-key="5" loading="lazy" data-elts="loadMedia" src="/assets/case/yandex-uslugi/11.jpeg" data-src="/assets/case/yandex-uslugi/11_full.jpeg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div class="intro-block is-next" data-elt="transitionNext">
                    <div class="intro-block__container">
                        <a href="/work/_samolet" class="intro-block__box" data-elt="goNextPage">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">Самолет</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Еще проект</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    <video data-key="6" data-elts="loadMedia" muted loop playsinline autoplay={false} src="/assets/case/samolet/intro.mp4" type="video/mp4"></video>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </Layout>
}
