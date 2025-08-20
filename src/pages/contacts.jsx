import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';

export default async ({ data }) => {
    const dataList = data.struct_data.filter(section => section.type === 'text_block');
    const metaTags = {
        description: 'Заполните бриф на сайте или звоните по телефону +7(495) 120-78-88 | Агентство ONY',
        ogDescription: 'Заполните бриф на сайте или звоните по телефону +7(495) 120-78-88 | Агентство ONY',
    }

    return <Layout title="Контакты" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <section class="contacts" data-elt="transitionContent">
                    <div class="contacts__container">
                        <div class="contacts__wrap">
                            {dataList.map(s => 
                                <div class="contacts__info">
                                    <dl class="contact-infoblock">
                                        <dt>
                                            <h3>{s.title}</h3>
                                        </dt>

                                        <dd>
                                            {s.description}
                                        </dd>
                                    </dl>
                                </div>
                            )}
                            {/* <div class="contacts__info">
                                <dl class="contact-infoblock">
                                    <dt>
                                        <h3>Сотрудничество</h3>
                                    </dt>

                                    <dd>
                                        <ul>
                                            <li><a href="" class="contact-infoblock__link contact-infoblock__link--underline"><span>Заполнить бриф</span></a></li>
                                            <li><a href="tel:+74951207888" class="contact-infoblock__link"><span>+7 495 120 78 88</span></a></li>
                                            <li><a href="mailto:mail@ony.ru" class="contact-infoblock__link"><span>mail@ony.ru</span></a></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>

                            <div class="contacts__info">
                                <dl class="contact-infoblock">
                                    <dt>
                                        <h3>PR-отдел</h3>
                                    </dt>

                                    <dd>
                                        <ul>
                                            <li><a href="mailto:pr@ony.ru" class="contact-infoblock__link"><span>pr@ony.ru</span></a></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>

                            <div class="contacts__info">
                                <dl class="contact-infoblock">
                                    <dt>
                                        <h3>Карьера</h3>
                                    </dt>

                                    <dd>
                                        <ul>
                                            <li><a href="" class="contact-infoblock__link contact-infoblock__link--underline"><span>Открытые вакансии</span></a></li>
                                            <li><a href="mailto:job@ony.ru" class="contact-infoblock__link"><span>job@ony.ru</span></a></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div> */}

                            {/* <div class="contacts__info">
                                <dl class="contact-infoblock">
                                    <dt>
                                        <h3>Адрес</h3>
                                    </dt>

                                    <dd>
                                        <ul>
                                            <li><address>Россия, Москва,<br/>Берсеневская набережная 6с3</address></li>
                                            <li><a href="" class="contact-infoblock__link contact-infoblock__link--underline"><span>На карте</span></a></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div> */}

                            {/* <div class="contacts__info">
                                <dl class="contact-infoblock">
                                    <dt>
                                        <h3>Соцсети</h3>
                                    </dt>

                                    <dd>
                                        <ul>
                                            <li><a href="https://www.youtube.com/c/ONYAir" class="contact-infoblock__link contact-infoblock__link--underline"><span>Youtube</span></a></li>
                                            <li><a href="https://t.me/onyagency" class="contact-infoblock__link contact-infoblock__link--underline"><span>Telegram</span></a></li>
                                            <li><a href="https://www.behance.net/onyagency" class="contact-infoblock__link contact-infoblock__link--underline"><span>Behance</span></a></li>
                                            <li><a href="https://vc.ru/u/1017892-ony" class="contact-infoblock__link contact-infoblock__link--underline"><span>VC</span></a></li>
                                            <li><a href="https://vk.com/onyagency" class="contact-infoblock__link contact-infoblock__link--underline"><span>Vk</span></a></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div> */}
                        </div>
                    </div>
                </section>

                <section class="media" data-elt="transitionNext">
                    <div class="media__container">
                        <div class="media__wrap">
                            <div class="media__box">
                                <video muted loop playsinline autoplay src={data.struct_data.find(d => d.type === 'video_block').video_link} type="video/mp4"></video>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer footerClass="inverse"/>
        </div>

    </Layout>
}
