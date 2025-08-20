const Header = ({ children, data, showButton, headerClass = "" }) => {
    //TODO: check jsx factory for undefined?
    const nav = {
        branding: {
            title: "Брендинг",
            nav: {
                col1: [
                    {
                        title: "Дизайн-аудит",
                        link: "/design-audit",
                    },
                    {
                        title: "Бренд-айдентика",
                        link: "/brand-identity",
                    },
                    {
                        title: "Аудиобрендинг",
                        link: "/audio-branding",
                    } /* , {
						title: 'CG и моушен',
						link: ''
					}, {
						title: 'Иллюстрации',
						link: ''
					}, {
						title: 'Фотостиль',
						link: ''
					}, {
						title: 'Упаковка',
						link: ''
					} */,
                ],

                col2: [
                    /* {
						title: 'Бренд с нуля',
						link: ''
					}, {
						title: 'Нейминг, слоганы, дискрипторы',
						link: ''
					}, {
						title: 'Гайдлайны и брендбуки',
						link: ''
					}, {
						title: 'Бренд-поддержка',
						link: ''
					}, {
						title: 'Шрифты',
						link: ''
					}, {
						title: 'Креативный кодинг',
						link: ''
					}, {
						title: 'Ребрендинг',
						link: ''
					}, {
						title: 'Кейсы',
						link: ''
					} */
                ],

                mob: [
                    {
                        title: "О&nbsp;брендинге",
                        link: "/branding",
                    },
                    {
                        title: "Все проекты",
                        link: "/work?branding",
                    },
                ],
            },
            case: {
                link: "/work/cowry-branding",
                preview: {
                    img: {
                        src: "https://api.ony.ru/images/uploads/9244cc7271c9ab8d1ad7404401165b05.png",
                        alt: "",
                    },
                },
                title: "Cowry. Айдентика",
                title_hover: "Money Moving",
            },
        },

        digital: {
            title: "Диджитал",
            nav: {
                col1: [
                    {
                        title: "Интернет-магазины",
                        link: "/ecom",
                    },
                    {
                        title: "Корпоративные сайты",
                        link: "/corp-web",
                    },
                    /* {
						title: 'Мобильные приложения',
						link: '/mobile-app'
					}, {
						title: 'HR-сайты и порталы',
						link: '/hr-sites-and-portals'
					}, {
						title: 'Промо-сайты и лендинги',
						link: '/promo-and-landings'
					}, */ {
                        title: "Цифровые продукты",
                        link: "/tech",
                    } /* , {
						title: 'Интранеты и ERP',
						link: '/intranet-erp-crm'
					} */,
                ],

                col2: [
                    {
                        title: "Продуктовые исследования",
                        link: "/product",
                    },
                    {
                        title: "UX-аудит",
                        link: "/ux-audit",
                    },
                    {
                        title: "UX-проектирование",
                        link: "/ux-design",
                    } /* , {
						title: 'Дизайн-концепция',
						link: '/design-concept-digital-product'
					}, {
						title: 'Дизайн-поддержка',
						link: '/design-support'
					} */ /* , {
						title: 'Техническая поддержка',
						link: ''
					}, {
						title: 'Тестирование',
						link: ''
					} */,
                ],

                mob: [
                    {
                        title: "О диджитал",
                        link: "/digital",
                    },
                    {
                        title: "Все проекты",
                        link: "/work?digital",
                    },
                ],
            },
            case: {
                link: "/work/dodo-brands",
                preview: {
                    img: {
                        src: "https://api.ony.ru/images/uploads/cacfb6846e7b48bab7131ed0824eeb99.png",
                        alt: "",
                    },
                },
                title: "Dodo Brands. Корпоративный сайт",
                title_hover: "Прозрачный найм и открытая культура",
            },
        },

        strategy: {
            title: "Стратегия",
            nav: {
                col1: [
                    {
                        title: "Архитектура бренда",
                        link: "https://signal.ony.ru/brand-architecture",
                    },
                    {
                        title: "Платформа бренда",
                        link: "https://signal.ony.ru/positioning-and-platform-brand",
                    },
                    {
                        title: "Бренд работодателя",
                        link: "https://signal.ony.ru/evp-employer-brand-strategy",
                    },
                    {
                        title: "Стратегические сессии",
                        link: "https://signal.ony.ru/strategic-sessions",
                    },
                    {
                        title: "Сопровождение и консалтинг",
                        link: "https://signal.ony.ru/support-and-consulting",
                    },
                    {
                        title: "Коммуникационная стратегия",
                        link: "https://signal.ony.ru/brand-communication-strategy",
                    },
                    {
                        title: "Семиотика",
                        link: "https://signal.ony.ru/semiotics",
                    },
                    {
                        title: "Трендвотчинг",
                        link: "https://signal.ony.ru/trendwatching",
                    },
                ],

                col2: [
                    {
                        title: "Фокус-группы",
                        link: "https://signal.ony.ru/focus-groups",
                    },
                    {
                        title: "Глубинные интервью",
                        link: "https://signal.ony.ru/in-depth-interviews",
                    },
                    {
                        title: "Экспресс-обзор категории",
                        link: "https://signal.ony.ru/express-category-review",
                    },
                    {
                        title: "Онлайн-форум",
                        link: "https://signal.ony.ru/online-forum",
                    },
                    {
                        title: "Цифровая этнография",
                        link: "https://signal.ony.ru/digital-ethnography",
                    },
                    {
                        title: "CX и UX-интервью",
                        link: "https://signal.ony.ru/cx-and-ux-interview",
                    },
                    {
                        title: "Количественные исследования",
                        link: "https://signal.ony.ru/quantitative-research",
                    },
                    {
                        title: "Код города или территории",
                        link: "https://signal.ony.ru/city-territory-decoding",
                    },
                ],

                mob: [
                    {
                        title: "О Signal",
                        link: "https://signal.ony.ru",
                    },
                    {
                        title: "Все проекты",
                        link: "https://signal.ony.ru/cases",
                    },
                ],
            },
            case: {
                link: "/work/naumi",
                preview: {
                    img: {
                        src: "https://api.ony.ru/images/uploads/6fec00499ff919c83e5fcd0fbe5ee5f0.png",
                        alt: "",
                    },
                },
                title: "Naumi. Ребрендинг",
                title_hover: "Преображая городскую реальность",
            },
        },

        solutions: {
            title: "Решения",
            nav: [
                {
                    title: "Мультибренды и корпорации",
                    link: "/multibrands",
                } /* , {
					title: 'Стартапы',
					link: ''
				}, {
					title: 'IT и сервисы',
					link: ''
				}, {
					title: 'Банки и финтех',
					link: ''
				}, {
					title: 'Мода и красота',
					link: ''
				}, {
					title: 'Premium',
					link: ''
				}, {
					title: 'Спорт',
					link: ''
				}, {
					title: 'Недвижимость',
					link: ''
				} */,
            ],
        },

        about: {
            title: "О нас",
            nav: [
                {
                    title: "Об агентстве",
                    link: "/about-agency",
                },
                {
                    title: "Услуги и подход",
                    link: "/all-services-and-approach",
                },
                {
                    title: "Агентство Signal",
                    link: "https://signal.ony.ru/",
                },
                {
                    title: "CG-cтудия Magma",
                    link: "https://themagma.ru/",
                },
                {
                    title: "Вакансии",
                    link: "https://join.ony.ru/",
                } /* , {
					title: 'ONY Fonts',
					link: ''
				}, {
					title: 'ONY Verse',
					link: ''
				}, {
					title: 'Блог',
					link: ''
				} */,
            ],
        },
    };
    return (
        <header class={`header is-active ${headerClass}`} data-elt="header">
            <div class="header__wrap">
                <div class="header__top">
                    <div class="header__container">
                        <div class="header__promo">
                            <a
                                href="https://themagma.ru"
                                class="header__promo-link"
                                target="_blank"
                            >
                                <span>
                                    Magma — наша новая студия CG-дизайна
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="header__main">
                    <div class="header__container">
                        <div class="header__box">
                            <a
                                href="/"
                                class="header__logo"
                                aria-label="ONY Agency"
                            >
                                <svg
                                    class="svg-icon"
                                    viewBox="0 0 96 30"
                                    width="96"
                                    height="30"
                                >
                                    <use xlink:href="#svg-logo"></use>
                                </svg>
                            </a>

                            <div class="header__nav">
                                <nav class="nav" data-elt="navHoverContainer">
                                    <div class="nav__bg" data-elt="navBg"></div>

                                    <div class="nav__wrap">
                                        <ul class="nav__list">
                                            <li class="nav__item">
                                                <a
                                                    href="/work"
                                                    class="nav__link"
                                                >
                                                    <span>Проекты</span>
                                                </a>
                                            </li>

                                            <li
                                                class="nav__item nav__item--sub nav__item--services"
                                                data-elts="navHover"
                                            >
                                                {/* TODO: или лучше указать тег button */}
                                                <button
                                                    type="button"
                                                    class="nav__link nav__link--title"
                                                    data-elts="toggleNavMobile"
                                                    data-param="branding"
                                                >
                                                    <span>
                                                        {nav.branding.title}
                                                    </span>
                                                    <div class="nav__icon"></div>
                                                </button>

                                                <div class="nav-submenu">
                                                    <div class="nav-submenu__container">
                                                        <div class="nav-submenu__wrap">
                                                            <div class="nav-submenu__main">
                                                                <ul class="nav-submenu__list">
                                                                    {nav.branding.nav.col1.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item nav-submenu__item--desk">
                                                                        <a
                                                                            href={
                                                                                nav
                                                                                    .branding
                                                                                    .nav
                                                                                    .mob[0]
                                                                                    .link
                                                                            }
                                                                            class="nav-submenu__link"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    nav
                                                                                        .branding
                                                                                        .nav
                                                                                        .mob[0]
                                                                                        .title
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 22 22"
                                                                                width="22"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-right21"></use>
                                                                            </svg>
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <ul class="nav-submenu__list">
                                                                    {nav.branding.nav.col2.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item nav-submenu__item--desk">
                                                                        <a
                                                                            href={
                                                                                nav
                                                                                    .branding
                                                                                    .nav
                                                                                    .mob[1]
                                                                                    .link
                                                                            }
                                                                            class="nav-submenu__link"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    nav
                                                                                        .branding
                                                                                        .nav
                                                                                        .mob[1]
                                                                                        .title
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 22 22"
                                                                                width="22"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-right21"></use>
                                                                            </svg>
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <ul class="nav-submenu__list nav-submenu__list--mob">
                                                                    {nav.branding.nav.mob.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item">
                                                                        <div class="nav-submenu__title">
                                                                            <span>
                                                                                Услуги
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            <div class="nav-submenu__side">
                                                                <a
                                                                    href={
                                                                        nav
                                                                            .branding
                                                                            .case
                                                                            .link
                                                                    }
                                                                    class="case-card case-card--mini"
                                                                >
                                                                    <div class="case-card__preview">
                                                                        <img
                                                                            src={
                                                                                nav
                                                                                    .branding
                                                                                    .case
                                                                                    .preview
                                                                                    .img
                                                                                    .src
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div class="case-card__title">
                                                                        <i>
                                                                            New:{" "}
                                                                        </i>
                                                                        {
                                                                            nav
                                                                                .branding
                                                                                .case
                                                                                .title
                                                                        }
                                                                    </div>
                                                                    <div class="case-card__head no-opacity">
                                                                        <div>
                                                                            <i>
                                                                                New:{" "}
                                                                            </i>
                                                                            {
                                                                                nav
                                                                                    .branding
                                                                                    .case
                                                                                    .title_hover
                                                                            }
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 21 22"
                                                                                width="21"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-nh"></use>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li
                                                class="nav__item nav__item--sub nav__item--services"
                                                data-elts="navHover"
                                            >
                                                <button
                                                    type="button"
                                                    class="nav__link nav__link--title"
                                                    data-elts="toggleNavMobile"
                                                    data-param="digital"
                                                >
                                                    <span>
                                                        {nav.digital.title}
                                                    </span>
                                                    <div class="nav__icon"></div>
                                                </button>

                                                <div class="nav-submenu">
                                                    <div class="nav-submenu__container">
                                                        <div class="nav-submenu__wrap">
                                                            <div class="nav-submenu__main">
                                                                <ul class="nav-submenu__list">
                                                                    {nav.digital.nav.col1.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item nav-submenu__item--desk">
                                                                        <a
                                                                            href={
                                                                                nav
                                                                                    .digital
                                                                                    .nav
                                                                                    .mob[0]
                                                                                    .link
                                                                            }
                                                                            class="nav-submenu__link"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    nav
                                                                                        .digital
                                                                                        .nav
                                                                                        .mob[0]
                                                                                        .title
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 22 22"
                                                                                width="22"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-right21"></use>
                                                                            </svg>
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <ul class="nav-submenu__list">
                                                                    {nav.digital.nav.col2.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item nav-submenu__item--desk">
                                                                        <a
                                                                            href={
                                                                                nav
                                                                                    .digital
                                                                                    .nav
                                                                                    .mob[1]
                                                                                    .link
                                                                            }
                                                                            class="nav-submenu__link"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    nav
                                                                                        .digital
                                                                                        .nav
                                                                                        .mob[1]
                                                                                        .title
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 22 22"
                                                                                width="22"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-right21"></use>
                                                                            </svg>
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <ul class="nav-submenu__list nav-submenu__list--mob">
                                                                    {nav.digital.nav.mob.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item">
                                                                        <div class="nav-submenu__title">
                                                                            <span>
                                                                                Услуги
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            <div class="nav-submenu__side">
                                                                <a
                                                                    href={
                                                                        nav
                                                                            .digital
                                                                            .case
                                                                            .link
                                                                    }
                                                                    class="case-card case-card--mini"
                                                                >
                                                                    <div class="case-card__preview">
                                                                        <img
                                                                            src={
                                                                                nav
                                                                                    .digital
                                                                                    .case
                                                                                    .preview
                                                                                    .img
                                                                                    .src
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div class="case-card__title">
                                                                        <i>
                                                                            New:
                                                                        </i>
                                                                        {
                                                                            nav
                                                                                .digital
                                                                                .case
                                                                                .title
                                                                        }
                                                                    </div>
                                                                    <div class="case-card__head no-opacity">
                                                                        <div>
                                                                            <i>
                                                                                New:
                                                                            </i>
                                                                            {
                                                                                nav
                                                                                    .digital
                                                                                    .case
                                                                                    .title_hover
                                                                            }
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 21 22"
                                                                                width="21"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-nh"></use>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li
                                                class="nav__item nav__item--sub nav__item--services"
                                                data-elts="navHover"
                                            >
                                                <button
                                                    type="button"
                                                    class="nav__link nav__link--title"
                                                    data-elts="toggleNavMobile"
                                                    data-param="strategy"
                                                >
                                                    <span>
                                                        {nav.strategy.title}
                                                    </span>
                                                    <div class="nav__icon"></div>
                                                </button>

                                                <div class="nav-submenu">
                                                    <div class="nav-submenu__container">
                                                        <div class="nav-submenu__wrap">
                                                            <div class="nav-submenu__main">
                                                                <ul class="nav-submenu__list">
                                                                    {nav.strategy.nav.col1.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item nav-submenu__item--desk">
                                                                        <a
                                                                            href={
                                                                                nav
                                                                                    .strategy
                                                                                    .nav
                                                                                    .mob[0]
                                                                                    .link
                                                                            }
                                                                            class="nav-submenu__link"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    nav
                                                                                        .strategy
                                                                                        .nav
                                                                                        .mob[0]
                                                                                        .title
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 21 22"
                                                                                width="21"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-nh"></use>
                                                                            </svg>
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <ul class="nav-submenu__list">
                                                                    {nav.strategy.nav.col2.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                        <svg
                                                                                            class="svg-icon"
                                                                                            viewBox="0 0 21 22"
                                                                                            width="21"
                                                                                            height="22"
                                                                                        >
                                                                                            <use xlink:href="#svg-arrow-nh"></use>
                                                                                        </svg>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item nav-submenu__item--desk">
                                                                        <a
                                                                            href={
                                                                                nav
                                                                                    .strategy
                                                                                    .nav
                                                                                    .mob[1]
                                                                                    .link
                                                                            }
                                                                            class="nav-submenu__link"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    nav
                                                                                        .strategy
                                                                                        .nav
                                                                                        .mob[1]
                                                                                        .title
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 21 22"
                                                                                width="21"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-nh"></use>
                                                                            </svg>
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <ul class="nav-submenu__list nav-submenu__list--mob">
                                                                    {nav.strategy.nav.mob.map(
                                                                        (
                                                                            el
                                                                        ) => {
                                                                            return (
                                                                                <li class="nav-submenu__item">
                                                                                    <a
                                                                                        href={
                                                                                            el.link
                                                                                        }
                                                                                        class="nav-submenu__link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                el.title
                                                                                            }
                                                                                        </span>
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}

                                                                    <li class="nav-submenu__item">
                                                                        <div class="nav-submenu__title">
                                                                            <span>
                                                                                Услуги
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            <div class="nav-submenu__side">
                                                                <a
                                                                    href={
                                                                        nav
                                                                            .strategy
                                                                            .case
                                                                            .link
                                                                    }
                                                                    class="case-card case-card--mini"
                                                                >
                                                                    <div class="case-card__preview">
                                                                        <img
                                                                            src={
                                                                                nav
                                                                                    .strategy
                                                                                    .case
                                                                                    .preview
                                                                                    .img
                                                                                    .src
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div class="case-card__title">
                                                                        <i>
                                                                            New:
                                                                        </i>
                                                                        {
                                                                            nav
                                                                                .strategy
                                                                                .case
                                                                                .title
                                                                        }
                                                                    </div>
                                                                    <div class="case-card__head no-opacity">
                                                                        <div>
                                                                            <i>
                                                                                New:
                                                                            </i>
                                                                            {
                                                                                nav
                                                                                    .strategy
                                                                                    .case
                                                                                    .title_hover
                                                                            }
                                                                            <svg
                                                                                class="svg-icon"
                                                                                viewBox="0 0 21 22"
                                                                                width="21"
                                                                                height="22"
                                                                            >
                                                                                <use xlink:href="#svg-arrow-nh"></use>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li
                                                class="nav__item nav__item--sub"
                                                data-elts="navHover"
                                            >
                                                <button
                                                    type="button"
                                                    class="nav__link nav__link--title"
                                                    data-elts="toggleNavMobile"
                                                >
                                                    <span>
                                                        {nav.solutions.title}
                                                    </span>
                                                    <div class="nav__icon"></div>
                                                </button>

                                                <div class="nav-submenu">
                                                    <div class="nav-submenu__container">
                                                        <ul class="nav-submenu__list">
                                                            {nav.solutions.nav.map(
                                                                (el) => {
                                                                    return (
                                                                        <li class="nav-submenu__item">
                                                                            <a
                                                                                href={
                                                                                    el.link
                                                                                }
                                                                                class="nav-submenu__link"
                                                                            >
                                                                                <span>
                                                                                    {
                                                                                        el.title
                                                                                    }
                                                                                </span>
                                                                                <svg
                                                                                    class="svg-icon"
                                                                                    viewBox="0 0 21 22"
                                                                                    width="21"
                                                                                    height="22"
                                                                                >
                                                                                    <use xlink:href="#svg-arrow-nh"></use>
                                                                                </svg>
                                                                            </a>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>

                                            <li
                                                class="nav__item nav__item--sub"
                                                data-elts="navHover"
                                            >
                                                <button
                                                    class="nav__link nav__link--title"
                                                    data-elts="toggleNavMobile"
                                                >
                                                    <span>
                                                        {nav.about.title}
                                                    </span>
                                                    <div class="nav__icon"></div>
                                                </button>

                                                <div class="nav-submenu">
                                                    <div className="nav-submenu__container">
                                                        <ul class="nav-submenu__list">
                                                            {nav.about.nav.map(
                                                                (el) => {
                                                                    return (
                                                                        <li class="nav-submenu__item">
                                                                            <a
                                                                                href={
                                                                                    el.link
                                                                                }
                                                                                class="nav-submenu__link"
                                                                            >
                                                                                <span>
                                                                                    {
                                                                                        el.title
                                                                                    }
                                                                                </span>
                                                                                <svg
                                                                                    class="svg-icon"
                                                                                    viewBox="0 0 21 22"
                                                                                    width="21"
                                                                                    height="22"
                                                                                >
                                                                                    <use xlink:href="#svg-arrow-nh"></use>
                                                                                </svg>
                                                                            </a>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav__item">
                                                <a
                                                    href="/contacts"
                                                    class="nav__link"
                                                >
                                                    <span>Контакты</span>
                                                </a>
                                            </li>

                                            <li class="nav__item">
                                                <a
                                                    href="https://en.ony.ru"
                                                    class="nav__link"
                                                >
                                                    <span>En</span>
                                                </a>
                                            </li>
                                        </ul>

                                        {/* {showButton && (
										<div class="nav__button">
											<a href="/brief" class="button button--inverse"><span>Оставить заявку</span></a>
										</div>
									)} */}
                                    </div>
                                </nav>
                            </div>

                            {children}

                            {/* {showButton && (
							<a href="/brief" class="header__button button button--inverse"><span>Оставить заявку</span></a>
						)} */}

                            <button class="header__burger" data-elt="navToggle">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
