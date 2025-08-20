import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';
import { env } from '#_/server/utils/env.js';

export const staticPage = true;

export default async ({ data }) => {
    const structure = data.struct_data;
    
    return <Layout>
        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="static case">
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </div>
            </main>

            <Footer footerClass="inverse" />
        </div>
    </Layout>
}
