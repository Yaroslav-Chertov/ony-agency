import Counters from '#@/components/Counters.jsx';
import SvgIcons from '#@/components/SvgIcons.jsx';
import v from '#_/server/utils/v.js';

const attrsToData = (attrs) => {
    const dataAttrs = {}

    Object.entries(attrs).map(([key, value]) => {
        dataAttrs['data-' + key] = value
    })

    return dataAttrs
}

const Layout = ({ children, title, hideBriefButton, bodyClass = '', attrs = {}, meta = {} }) => {
    const dataAttrs = attrsToData(attrs)
    const metaTitle = title ? title + ' | Агентство ONY' : 'Агентство ONY';

    const metaTags = {
        description: 'Стратегии, брендинг ‍и digital-решения для компаний, готовых к изменениям. Мы гордимся работой с компаниями, которые задают правила игры на своих рынках.',
        ogTitle: metaTitle,
        ogDescription: 'Стратегии, брендинг ‍и digital-решения для компаний, готовых к изменениям. Мы гордимся работой с компаниями, которые задают правила игры на своих рынках.',
        ogImage: 'https://ony.ru/assets/favicon/og-image.png',
        keywords: 'Агентство ONY',
        ...meta
    }

    return <html lang="ru">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="format-detection" content="telephone=no" />

            <meta name="yandex-verification" content="eb214d7b1c1afc13" />
            <meta name="description" content={metaTags.description} />
            <meta name="keywords" content={metaTags.keywords} />
            <meta property="og:title" content={metaTags.ogTitle} />
            <meta property="og:description" content={metaTags.ogDescription} />
            <meta property="og:image" content={metaTags.ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:image:width" content="1280" />
            <meta property="og:image:height" content="640" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="canonical" href="https://ony.ru/" />

            {/*
            <link rel="icon" href="https://ony.ru/assets/favicon/favicon.ico" sizes="32x32" />
            <link rel="shortcut icon" href="https://ony.ru/assets/favicon/favicon.svg" sizes="any" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="https://ony.ru/assets/favicon/apple-touch-icon.png"/>
            <link rel="manifest" href="https://ony.ru/assets/favicon/site.webmanifest" /> */}

            <link rel="preload" href="/assets/fonts/ONYOneBeta/ONYOneBeta-Medium.otf" as="font" crossorigin="anonymous" />
            <link rel="preload" href="/assets/fonts/ONYOneBeta/ONYOneBeta-Regular.otf" as="font" crossorigin="anonymous" />
            <link rel="preload" href="/assets/fonts/ONYOneBeta/ONYOneBeta-Light.otf" as="font" crossorigin="anonymous" />

            <title>{metaTitle}</title>
            <link rel="stylesheet" href={'/assets/styles/styles.css?v=' + v} />
            <script src={'/assets/js/head.js?v=' + v} type="module"></script>
        </head>
        <body class={`body ${bodyClass} is-loading` } {...dataAttrs} data-elt="body">
            <SvgIcons />
            <div class="line-loader"></div>
            <div class="body-loader"></div>

            <div class="debug">
                <div class="debug-panel"></div>
                <div class="debug-grid"> {/* Сетка для проверки дизайна */}
                    <div class="debug-grid__container">
                        <div class="debug-grid__row">
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                            <span><i></i></span>
                        </div>
                    </div>
                </div>
            </div>

            {!hideBriefButton && <a href="/brief" className="brief-btn button button--inverse"><span>Оставить заявку</span></a>}

            {children}

            <script src={'/assets/js/app.js?v=' + v} type="module"></script>
            <Counters />
        </body>
    </html>
};

export default Layout;
