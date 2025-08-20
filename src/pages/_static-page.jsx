import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';

import TextBlockMultiple from '#@/components/page-components/TextBlockMultiple.jsx';
import TextHoverBlock from '#@/components/page-components/TextHoverBlock.jsx';
import BigTextBlock from '#@/components/page-components/BigTextBlock.jsx';
import ImageBlock from '#@/components/page-components/ImageBlock.jsx';
import VideoBlock from '#@/components/page-components/VideoBlock.jsx';
import VideoWithText from '#@/components/page-components/VideoWithText.jsx';
import IframeBlock from '#@/components/page-components/IframeBlock.jsx';
import ReviewsBlockList from '#@/components/page-components/ReviewsBlockList.jsx';
import RepeaterTextBlock from '#@/components/page-components/RepeaterTextBlock.jsx';
import RepeaterCustomBlock from '#@/components/page-components/RepeaterCustomBlock.jsx';
import RepeaterCustom2Block from '#@/components/page-components/RepeaterCustom2Block.jsx';
import FreeCodeBlock from '#@/components/page-components/FreeCodeBlock.jsx';
import RepeaterTextareaBlock from '#@/components/page-components/RepeaterTextareaBlock.jsx';
import CustomBlock from '#@/components/page-components/CustomBlock.jsx';
import H1Block from '#@/components/page-components/H1Block.jsx';
import ShowreelBlock from '#@/components/page-components/ShowreelBlock.jsx';
import ClientsBlock from '#@/components/page-components/ClientsBlock.jsx';
import { env } from '#_/server/utils/env.js';

const componentsMap = {
    'h1_block': H1Block,
    /* 'text_block': (data) => {
        const adaptedData = {
            block_title: data.data.title,
            block_description: data.data.description
        };
        return <TextBlock data={adaptedData} />;
    }, */
    'big_text_block': BigTextBlock,
    'image_block': ImageBlock,
    'video_block': (data) => {
        const adaptedDate = {
            dark_mode: data.data.dark_mode,
            block_video_link: data.data.video_link,
        };
        return <VideoBlock data={adaptedDate} />;
    },
    'iframe_block': IframeBlock,
    'reviews_block': ReviewsBlockList,
    'repeater_text_block': RepeaterTextBlock,
    'repeater_custom_block': RepeaterCustomBlock,
    'repeater_custom2_block': RepeaterCustom2Block,
    'free_code_block': FreeCodeBlock,

    'repeater_textarea_block': RepeaterTextareaBlock,
    'custom_block': CustomBlock,
    'showreel': ShowreelBlock,
    'text_hover_block': TextHoverBlock,
    'clients_block': ClientsBlock,
    'text_block': TextBlockMultiple,
    'video_with_text': VideoWithText
}

export default async ({ data }) => {
    const structure = data.struct_data;
    return <Layout>
        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="static case">
                    {structure.map((d, i) => {
                        if (!componentsMap[d.type]) {
                            console.log('COMP', d.type)
                            return;
                        }

                        return componentsMap[d.type]({ data: d });
                    })}
                </div>
            </main>

            <Footer footerClass="inverse" />
        </div>
    </Layout>
}
