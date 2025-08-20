import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';

export const staticPage = true;

export default async ({ data }) => {
    return <Layout>

        <div class="wrapper">
            <Header />

            <main class="main">
                <section class="error">
                    <video autoplay loop muted playsinline src="https://ony.ru/assets/videos/404-reg.mp4"></video>
                </section>
            </main>
        </div>

    </Layout>
}
