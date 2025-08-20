import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import BriefForm from '#@/components/BriefForm.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Заполните бриф на сайте или звоните по телефону +7(495) 120-78-88 | Агентство ONY',
        ogDescription: 'Заполните бриф на сайте или звоните по телефону +7(495) 120-78-88 | Агентство ONY',
    }

return <Layout title="Бриф" hideBriefButton meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <section class="brief">
                    <div class="brief__container">
                        <div class="brief__wrap">
                            <h1 class="brief__title h1">Привет! Расскажите <br/>о&nbsp;вашей задаче</h1>

                            <div class="brief__form">
                                <BriefForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

    </Layout>
}
