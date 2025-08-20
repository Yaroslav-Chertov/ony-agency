import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import BriefForm from '#@/components/BriefForm.jsx';
import { env } from '#_/server/utils/env.js';

export const staticPage = true;

export default async ({ data }) => {
    return <Layout title="Консультация">

        <div class="wrapper">
            <Header />

            <main class="main">
                <section class="brief">
                    <div class="brief__container">
                        <div class="brief__wrap">
                            <h1 class="brief__title h1">Привет! Задайте<br/> ваш&nbsp;вопрос</h1>
                            <div class="brief__description">Мы будем рады проконсультировать вас по вопросам исследований, бренд-стратегии, брендинга, UX/UI-дизайна, мобильной и веб-разработки. Подскажем как подступиться к сложной задаче, организовать процесс, подобрать инструментарий и не только.</div>

                            <div class="brief__form">
                                <BriefForm url={env.API_URL + 'send_consultation'} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

    </Layout>
}
