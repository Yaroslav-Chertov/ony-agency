import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import TextBlock from '#@/components/page-components/TextBlock.jsx';
import ImageBlock from '#@/components/page-components/ImageBlock.jsx';
import VideoBlock from '#@/components/page-components/VideoBlock.jsx';
import IframeBlock from '#@/components/page-components/IframeBlock.jsx';
import ReviewsBlock from '#@/components/page-components/ReviewsBlock.jsx';
import RepeaterTextBlock from '#@/components/page-components/RepeaterTextBlock.jsx';
import RepeaterCustomBlock from '#@/components/page-components/RepeaterCustomBlock.jsx';
import RepeaterCustom2Block from '#@/components/page-components/RepeaterCustom2Block.jsx';
import FreeCodeBlock from '#@/components/page-components/FreeCodeBlock.jsx';
import RepeaterTextareaBlock from '#@/components/page-components/RepeaterTextareaBlock.jsx';
import CustomBlock from '#@/components/page-components/CustomBlock.jsx';
import H1Block from '#@/components/page-components/H1Block.jsx';
import { env } from '#_/server/utils/env.js';

const componentsMap = {
    'h1_block': H1Block,
    'text_block': TextBlock,
    'image_block': ImageBlock,
    'video_block': VideoBlock,
    'iframe_block': IframeBlock,
    'reviews_block': ReviewsBlock,
    'repeater_text_block': RepeaterTextBlock,
    'repeater_custom_block': RepeaterCustomBlock,
    'repeater_custom2_block': RepeaterCustom2Block,
    'free_code_block': FreeCodeBlock,
    'repeater_textarea_block': RepeaterTextareaBlock,
    'custom_block': CustomBlock,
}

export default async ({ data }) => {
    const firstBlockH1 = data.data.struct_data[0].element_type === 'h1_block';
    const structure = data.data.struct_data.slice(1);
    const nextProject = data.data.next_project;
    let MainImage = () => '';

    if (firstBlockH1) {
        if (data.data.video_link) {
            MainImage = () => <video data-elts="loadMedia" muted loop playsinline src={data.data.video_link} type="video/mp4"></video>
        } else if (data.data.image) {
            MainImage = () => <img src={env.BASE_URL + data.data.image} alt="" />;
        }
    } else {
        MainImage = () => <VideoBlock data={data.data.struct_data[0]} />;
    }

    const title = data.data.struct_data.find(d => d.element_type === 'h1_block').block_title;

    return <Layout title={title + ' | Агентство ONY'}>
        <div class="wrapper">
            <Header />

            <main class="main" data-elt="pageContainer">
                <div class="intro-block" data-elt="transitionIntro">
                    <div class="intro-block__container">
                        <a href="" class="intro-block__box">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">{title}</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Еще проект</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class={`intro-block__image${!data.image && !data.video_link ? ' is-empty' : ''}`}>
                                    <MainImage />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="case" data-elt="transitionContent">
                    <div class="case__wrap">
                        {/* TODO: Если первый блок element_type === '' */}
                        {structure.map((d, i) => {
                            if (!componentsMap[d.element_type] || d.element_type === 'h1_block') {
                                // console.log('COMP', componentsMap[d.element_type])
                                return;
                            }

                            return componentsMap[d.element_type]?.({ data: d, key: i });
                        })}
                    </div>
                </div>

                <div class="intro-block is-next" data-elt="transitionNext">
                    <div class="intro-block__container">
                        <a href={'/work/' + nextProject.slug} class="intro-block__box" data-elt="goNextPage">
                            <div class="intro-block__head">
                                <h1 class="intro-block__title h1">{nextProject.title}</h1>
                                <div class="intro-block__more">
                                    <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use xlink:href="#svg-arrow-right"></use></svg>
                                    <span>Еще проект</span>
                                </div>
                            </div>

                            <div class="intro-block__main">
                                <div class="intro-block__image">
                                    {nextProject.video_link
                                        ? <video data-elts="loadMedia" preload="meta" muted loop playsinline src={nextProject.video_link} type="video/mp4"></video>
                                        : <img src={env.BASE_URL + nextProject.image} alt="" />
                                    }
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </Layout>
}
