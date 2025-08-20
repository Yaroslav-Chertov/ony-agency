import Layout from '../layouts/Layout.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Input from "../components/form/Input.jsx";
import InputFile from "../components/form/InputFile.jsx";
import Textarea from "../components/form/Textarea.jsx";
import Checkbox from "../components/form/Checkbox.jsx";
import Button from "../components/form/Button.jsx";
import BriefForm from '#@/components/BriefForm.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Разработка стратегии, брендинга и digital-продуктов для мультибрендов, экосистем, корпорация и групп компаний | Чтобы заказать — заполните бриф на сайте',
        ogDescription: 'Разработка стратегии, брендинга и digital-продуктов для мультибрендов, экосистем, корпорация и групп компаний | Чтобы заказать — заполните бриф на сайте',
        ogImage: 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/multibrand-snippet%20%281%29.png'
    }

    const cases = [
        {
            "id": "mts",
            "title": "МТС",
            "text": "Сотрудничаем с 2021 года. Более 20 проектов и больше 150 реализованных задач.",
            "video": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%203/header.mp4"
            },
            "list": [
                {
                    "id": '',
                    "link": '/work/mts',
                    "title": 'МТС',
                    "subtitle": 'Ребрендинг и&nbsp;бренд-платформа экосистемы цифровых сервисов',
                    "note": 'Менять привычное',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%203/004.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/mts-junior',
                    "title": 'МТС Junior',
                    "subtitle": 'Брендинг и семиотическое исследование ',
                    "note": 'Цифровой мир глазами ребенка',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2010/1%20-%20header.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/mts-link',
                    "title": 'МТС Линк',
                    "subtitle": 'Бренд-платформа, нейминг и айдентика экосистемы сервисов для бизнес-коммуникаций',
                    "note": 'Виртуозная работа',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%208/headder.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/mts-travel',
                    "title": 'МТС Travel',
                    "subtitle": 'Брендинг цифрового сервиса для бронирования отелей',
                    "note": 'Портал для путешествий',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2013/01_header.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '',
                    "title": 'МТС TrueTech',
                    "subtitle": 'Coming soon',
                    "note": 'Coming soon',
                    "preview": {
                        "video": '',
                        "img": {
                            "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/case-mtc-1.jpg',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '',
                    "title": 'МТС Умный Дом',
                    "subtitle": 'Coming soon',
                    "note": 'Coming soon',
                    "preview": {
                        "video": '',
                        "img": {
                            "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/case-mtc-2.jpg',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/mts-stroki',
                    "title": '«Строки» от МТС',
                    "subtitle": 'Дизайн-система сервиса электронных и аудио-книг',
                    "note": 'Новая литература',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%202/stroki_case_header.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/mts-exolve',
                    "title": 'МТС Exolve',
                    "subtitle": 'Бренд-платформа и айдентика облачной платформы для омниканальной коммуникации с клиентами',
                    "note": 'Диалог строится',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%207/header.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }
            ]
        },
        {
            "id": "yandex",
            "title": "Яндекс",
            "text": "Сотрудничаем с 2017 года. Более 30 проектов, включая брендинг Яндекс GO.",
            "video": {
                "src": "https://player.vimeo.com/external/537146907.hd.mp4?s=a39cb0f94ff43242364b6d855035e3c038366888&profile_id=175"
            },
            "list": [
                {
                    "id": '',
                    "link": '/work/yandex-go',
                    "title": 'Яндекс Go',
                    "subtitle": 'Брендинг экосистемы для повседневных городских задач',
                    "note": 'Суперприложение для жизни в городе',
                    "preview": {
                        "video": 'https://storage.yandexcloud.net/ony-ru-media/Go/05%20YaGo_Poster1_1_1-1.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/yandex-taxi',
                    "title": 'Яндекс.Такси',
                    "subtitle": 'Ребрендинг сервиса онлайн-заказа такси',
                    "note": 'Главный на дороге',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/Yandex%20taxi/00_head.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/yandex-uslugi',
                    "title": 'Яндекс.Услуги',
                    "subtitle": 'Айдентика сервиса для решения бытовых задач',
                    "note": 'Когда вы в надежных руках',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/Yandex%20Uslugi/yandex-uslugi.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/media-pro',
                    "title": 'Медиа Про',
                    "subtitle": 'Архитектура и дизайн онлайн-медиа про работу на себя от Яндекса',
                    "note": 'Просто о самозанятости',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/Media%20pro/intro_60.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '',
                    "title": 'Яндекс.Лавка',
                    "subtitle": 'Концепция айдентики для сервиса доставки продуктов',
                    "note": 'Coming soon',
                    "preview": {
                        "video": '',
                        "img": {
                            "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/case-y-1.jpg',
                            "alt": ''
                        }
                    }
                }
            ]
        },
        {
            "id": "kaspersky",
            "title": "Kaspersky",
            "text": "Сотрудничаем с 2018 года. Более 10 проектов, включая айдентику компании.",
            "video": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2012/header.mp4"
            },
            "list": [
                {
                    "id": '',
                    "link": '/work/Kaspersky-evolution',
                    "title": 'Kaspersky',
                    "subtitle": 'Рестайлинг айдентики лидера в сфере кибербезопасности',
                    "note": 'Эволюция кибериммунитета',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2012/14.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/kaspersky-audio',
                    "title": 'Kaspersky Audio Branding',
                    "subtitle": 'Аудиобрендинг для лидера в сфере кибербезопасности',
                    "note": 'Звук будущего',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/kaspersky.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/kaspersky-os',
                    "title": 'KasperskyOS',
                    "subtitle": 'Айдентика операционной системы от «Лаборатории Касперского»',
                    "note": 'Врожденный кибериммунитет',
                    "preview": {
                        "video": 'https://player.vimeo.com/progressive_redirect/playback/711587199/rendition/1080p/file.mp4?loc=external&signature=0e4cf422637195bfd2794c6f4aa0be1f0e6b528634d6396f4d787852be105d90',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }
            ]
        },
        {
            "id": "tinkoff",
            "title": "Тинькофф",
            "text": "Сотрудничаем с 2018 года. 5 проектов, включая ребрендинг экосистемы.",
            "video": {
                "src": "https://player.vimeo.com/external/607419663.hd.mp4?s=94f4d9e2cced81a961befd6326788d77e34f5795&profile_id=174"
            },
            "list": [
                {
                    "id": '',
                    "link": '/work/tinkoff',
                    "title": '',
                    "subtitle": 'Разработка архитектуры всех сервисов и  предложений компании',
                    "note": '',
                    "preview": {
                        "video": 'https://storage.yandexcloud.net/ony-ru-media/Tinkoff/case_tinkoff-logofont.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/tinkoff',
                    "title": '',
                    "subtitle": 'Разработка архитектуры всех сервисов и  предложений компании',
                    "note": '',
                    "preview": {
                        "video": 'https://player.vimeo.com/progressive_redirect/playback/375871031/rendition/1080p/file.mp4?loc=external&signature=89c92606cbac0821cfc28c47f9143456763d79ef423ec88184b0ba71df937b9f',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/tinkoff',
                    "title": '',
                    "subtitle": 'Разработка корпоративного шрифта Tinkoff Sans',
                    "note": '',
                    "preview": {
                        "video": '',
                        "img": {
                            "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/case-tin-1.jpg',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/tinkoff',
                    "title": '',
                    "subtitle": 'Разработка концепции фотостиля',
                    "note": '',
                    "preview": {
                        "video": '',
                        "img": {
                            "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/case-tin-2.jpg',
                            "alt": ''
                        }
                    }
                }
            ]
        },
        {
            "id": "sber",
            "title": "Cбер",
            "text": "Сотрудничаем с 2016 года. Более 15 проектов.",
            "video": {
                "src": "https://storage.yandexcloud.net/ony-ru-media/SberDevices/Sb%201%20As-1.mp4"
            },
            "list": [
                {
                    "id": '',
                    "link": '/work/sberdevices',
                    "title": 'SberDevices',
                    "subtitle": 'CG, видео и фото для презентации умных устройств от «Сбера»',
                    "note": 'Презентация умных устройств',
                    "preview": {
                        "video": 'https://storage.yandexcloud.net/ony-ru-media/SberDevices/13.%20Sb%203%20Portal-1.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/sbercloud',
                    "title": 'SberCloud',
                    "subtitle": 'Брендинг облачной платформы для хранения, защиты и обработки данных',
                    "note": 'Объемы данных',
                    "preview": {
                        "video": 'https://ony-ru-media.storage.yandexcloud.net/SberCloud/00_sbercloud.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }
            ]
        },
        {
            "id": "avito",
            "title": "Авито",
            "text": "Сотрудничаем с 2019. 5 проектов, включая айдентику компании.",
            "video": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/%D0%90%D0%B2%D0%B8%D1%82%D0%BE/00_avito.mp4"
            },
            "list": [
                {
                    "id": '',
                    "link": '/work/avito',
                    "title": '',
                    "subtitle": 'Дизайн-аудит и исследование визуальных коммуникаций',
                    "note": '',
                    "preview": {
                        "video": 'https://storage.yandexcloud.net/ony-ru-media/%D0%90%D0%B2%D0%B8%D1%82%D0%BE/01%20pics-pinned-logo_1-1.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/avito',
                    "title": '',
                    "subtitle": 'Обновление концепции стиля и разработка гайдлайнов',
                    "note": '',
                    "preview": {
                        "video": 'https://storage.yandexcloud.net/ony-ru-media/%D0%90%D0%B2%D0%B8%D1%82%D0%BE/03%20CASE-billboard_2.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/avito',
                    "title": '',
                    "subtitle": 'Обновление цветовой палитры бренда',
                    "note": '',
                    "preview": {
                        "video": '',
                        "img": {
                            "src": 'https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/case-avito-1.jpg',
                            "alt": ''
                        }
                    }
                }, {
                    "id": '',
                    "link": '/work/avito',
                    "title": '',
                    "subtitle": 'Разработка гайдлайнов фотостиля',
                    "note": '',
                    "preview": {
                        "video": 'https://storage.yandexcloud.net/ony-ru-media/%D0%90%D0%B2%D0%B8%D1%82%D0%BE/11%20out_1.mp4',
                        "img": {
                            "src": '',
                            "alt": ''
                        }
                    }
                }
            ]
        }
    ]

    const services = [
        {
            "title": "Брендинг",
            "content": "<ul><li>Дизайн-аудит</li><li>Айдентика</li><li>Нейминг и&nbsp;слоганы</li><li>Разработка иллюстраций</li><li>Фотостиль</li><li>CG и&nbsp;motion</li><li>Аудиобрендинг</li><li>Разработка шрифтов</li><li>Генеративная графика</li></ul>"
        }, {
            "title": "Стратегия и&nbsp;исследования",
            "content": "<ul><li>Бренд-аудит</li><li>Анализ конкурентов</li><li>Глубинные интервью</li><li>Фокус-группы</li><li>Количественное исследование</li><li>Семиотика</li><li>Трендвотчинг</li><li>Бренд-платформа</li><li>Разработка EVP</li><li>Позиционирование</li><li>Бренд-стратегия</li><li>Архитектура бренда</li><li>Коммуникационная матрица</li></ul>"
        }, {
            "title": "Digital-дизайн и&nbsp;разработка",
            "content": "<ul><li>UX-аудит</li><li>Продуктовые исследования</li><li>Информационная архитектура</li><li>Проектирование интерфейсов</li><li>Дизайн-концепция сайта</li><li>Разработка сайта</li><li>Техническая поддержка</li></ul>"
        }
    ]

    const clients = [
        {
            "title": "<span>МТС</span>",
            "url": "/client/mts"
        }, {
            "title": "<span>VK</span>",
            "url": "/client/vk"
        }, {
            "title": "<span>Яндекс</span>",
            "url": "/client/yandex"
        }, {
            "title": "<span>Тинькофф</span>",
            "url": "/client/tinkoff"
        }, {
            "title": "<span>Сбер</span>",
            "url": "/client/sberbank"
        }, {
            "title": "<span>Авито</span>",
            "url": "/client/avito"
        }, {
            "title": "<span>OKKAM</span>",
            "url": "/client/okkam"
        }, {
            "title": "<span>X5 Group</span>",
            "url": "/client/x5-group"
        }, {
            "title": "<span>Kaspersky</span>",
            "url": "/client/kasperskiy"
        }, {
            "title": "<span>СКБ Контур</span>",
            "url": "/client/skb-kontur"
        }, {
            "title": "<span>Rambler</span>",
            "url": "/client/rambler-co"
        }, {
            "title": "<span>Открытие</span>",
            "url": "/client/otkritie"
        }
    ]

    const advantages = [
        {
            "title": "Гибкость",
            "text": "Умеем встраиваться в производственные циклы и&nbsp;другие особенности корпораций."
        }, {
            "title": "Глубокое погружение",
            "text": "Понимаем особенности и&nbsp;потребности мультибрендовых и&nbsp;экосистемных компаний."
        }, {
            "title": "Помощь с имплементацией",
            "text": "Мы не только разрабатываем решения, но&nbsp;и&nbsp;помогаем с их внедрением, а также обучаем и&nbsp;поддерживаем команду клиента."
        }, {
            "title": "Строим архитектуры",
            "text": "Успешно практикуем разработку архитектур брендов мультибрендовых и&nbsp;экосистемных компаний."
        }, {
            "title": "Сфокусированы на еnterprise",
            "text": "Работаем с крупнейшими компаниями в&nbsp;своих отраслях и&nbsp;помогаем им оставаться лидерами."
        }, {
            "title": "Синергия направлений",
            "text": "Наша мультидисциплинарная команд умело сочетает стратегию, брендинг, цифровой дизайн и&nbsp;разработку для создания уникальных брендов и&nbsp;продуктов."
        }
    ]

    const expertise = [
        {
            "title": "100+",
            "text": "Креативных <br>профессионалов"
        }, {
            "title": "24",
            "text": "Года на рынке"
        }, {
            "title": "500+",
            "text": "Реализованных <br>проектов"
        }, {
            "title": "240+",
            "text": "Международных <br>и российских наград"
        }
    ]

    const ratings = [
        {
            "num": "1 место",
            "name": "Брендинг «под ключ»",
            "source": "Рейтинг Рунета"
        }, {
            "num": "1 место",
            "name": "Бренд-стратегия",
            "source": "Рейтинг Рунета"
        }, {
            "num": "3 место",
            "name": "Дизайн-агентства для IT-компаний и сервисов",
            "source": "Ruward"
        }, {
            "num": "4 место",
            "name": "Дизайн-агентства для Онлайн-сервисов и порталов",
            "source": "Ruward"
        }
    ]

    const reviews = [
        {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/untitled%20folder%205/reviews-1.png",
                "alt": ""
            },
            "name": "Ксения Сергачёва",
            "position": "Руководитель центра по работе с брендом, МТС",
            "text": "«C ONY и Signal (part of ONY) мы работаем уже 2 года, вместе сделали сложнейшие и интереснейшие проекты. ONY являются для нас надежной опорой в стратегических и брендинговых вопросах»"
        }, {
            "photo": {
                "src": "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/tg_image_1504725814.jpeg",
                "alt": ""
            },
            "name": "Никита Морозов",
            "position": "Head of Design, Kaspersky",
            "text": "«Наш опыт совместной работы всегда был максимально позитивным. ONY предлагают глубокое понимание сути брендинга, свежие, не избитые решения, тщательную проработку деталей и исчерпывающее изучение контекста. Если вам нужно по-настоящему качественно, то там где-то внизу должна быть кнопка с контактами»"
        }
    ]

    return <Layout title="Услуги для мультибрендов" meta={metaTags}>

        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="multibrands">
                    <div class="multibrands__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <div class="intro__head">
                                    <h1 class="intro__subtitle h2">
                                        <span class="title-line">
                                            <span>Исключительные</span>
                                            <span class="title-animation">
                                                <span>брендинговые</span>
                                                <span>стратегические</span>
                                                <span>цифровые</span>
                                            </span>
                                        </span>
                                        решения для мультибрендов, экосистем, корпораций и&nbsp;групп компаний.
                                    </h1>
                                </div>

                                <div class="intro__main">
                                    <div class="intro__image">
                                        <video data-elts="loadMedia" preload="meta" muted loop playsinline src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/ony_showreel2021_1080p.mp4" type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="multibrands__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Услуги</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text"><p>Создаём бренды и&nbsp;трансформируем бизнес клиентов, благодаря синергии экспертиз в стратегии, брендинге, digital и&nbsp;технологиях.</p></div>

                                        <div class="infoblock__list" data-elts="accordionBlock">
                                            {services.map((s,i) => {
                                                return <div class="infoblock__item">
                                                    <div class={`infoblock-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                        <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={i}>{s.title}</button>
                                                        <div class="infoblock-card__drop" data-elts="accordionBox">
                                                            <div class="infoblock-card__content" data-elts="accordionContent">{s.content}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="multibrands__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h2 class="infoblock__title h2">Клиенты</h2>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__links">
                                            {clients.map ((c,i) => {
                                                return <a href={c.url}>{c.title}</a>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="multibrands__cases">
                        <div class="multibrands-cases">
                            <div class="multibrands-cases__head">
                                <div class="multibrands-cases__container">
                                    <h2 class="multibrands-cases__title h2">Кейсы</h2>
                                    <div class="multibrands-cases__text">Мы&nbsp;стратегический партнер для ведущих компаний, готовых к&nbsp;инновациям. Наши решения, основанные на&nbsp;исследованиях, направлены на&nbsp;создание фундамента для роста и&nbsp;масштаба.</div>
                                </div>
                            </div>

                            <div class="multibrands-cases__list inverse">
                                {cases.map((item, i) => {
                                    return (
                                        <div class="multibrands-cases__item">
                                            <div class="multibrands-cases-card">
                                                <div class="multibrands-cases-card__bg">
                                                    <video data-elts="loadMedia" preload="meta" muted loop playsinline src={item.video.src} type="video/mp4"></video>
                                                </div>

                                                <div class="multibrands-cases-card__container">
                                                    <h3 class="multibrands-cases-card__title">{item.title}</h3>
                                                    <div class="multibrands-cases-card__text">{item.text}</div>
                                                    <button class="multibrands-cases-card__button button" data-elts="toggleOpen" data-param={item.id}>
                                                        <span>Смотреть кейсы</span><span>Скрыть кейсы</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="multibrands-cases-more" data-elts="toggleOpenTarget" data-param={item.id}>
                                                <section class="cases cases--multibrands-page">
                                                    <div class="cases__container">
                                                        <div class="cases__list">
                                                            {item.list.map((card, j) => {
                                                                const Wrapper = card.link ? 'a' : 'div';

                                                                return (
                                                                    <div class="cases__item">
                                                                        <Wrapper href={card.link || undefined} class="case-card-static">
                                                                            <div class="case-card-static__title">{card.title}</div>
                                                                            <div class="case-card-static__subtitle">{card.subtitle}</div>
                                                                            <div class="case-card-static__preview">
                                                                                {card.preview.video ? (
                                                                                    <video data-elts="loadMedia" preload="meta" muted loop playsinline src={card.preview.video}></video>
                                                                                ) : card.preview.img.src ? (
                                                                                    <img src={card.preview.img.src} alt={card.preview.img.alt} />
                                                                                ) : null}
                                                                            </div>
                                                                            <div class="case-card-static__note">{card.note}</div>
                                                                        </Wrapper>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div class="multibrands__reviews">
                        <section class="reviews">
                            <div class="reviews__container">
                                <h2 class="reviews__title h2">Отзывы клиентов</h2>

                                <div class="reviews__list" data-elts="accordionBlock">
                                    {reviews.map((r,i) => {
                                        return <div class="reviews__item">
                                            <div class={`reviews-card ${i === 0 ? 'is-open' : ''}`} data-elts="accordionTarget" data-param={i}>
                                                <div class="reviews-card__top" data-elts="accordionBtn" data-param={i}>
                                                    <div class="reviews-card__image">
                                                        <img src={r.photo.src} alt={r.photo.alt} />
                                                    </div>
                                                    <div class="reviews-card__name">{r.name}</div>
                                                    <div class="reviews-card__position">{r.position}</div>
                                                </div>

                                                <div class="reviews-card__drop" data-elts="accordionBox">
                                                    <div class="reviews-card__content" data-elts="accordionContent">{r.text}</div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="multibrands__advantages inverse">
                        <div class="multibrands__block">
                            <section class="advantages">
                                <div class="advantages__container">
                                    <h2 class="advantages__title h2">Уникальная экспертиза в&nbsp;работе с&nbsp;экосистемами и&nbsp;мультибрендами</h2>

                                    <div class="advantages__main">
                                        <div class="advantages__list">
                                            {advantages.map((a,i) => {
                                                return <div class="advantages__item">
                                                    <div class="advantages-card">
                                                        <div class="advantages-card__subtitle">{a.title}</div>
                                                        <div class="advantages-card__text">{a.text}</div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="multibrands__block">
                            <section class="expertise">
                                <div class="expertise__container">
                                    <h2 class="expertise__title h2">Флагманские решения для флагманов рынка</h2>

                                    <div class="expertise__list">
                                        {expertise.map((e,i) => {
                                            return <div class="expertise__item">
                                                <div class="expertise__subtitle">{e.title}</div>
                                                <div class="expertise__text">{e.text}</div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="multibrands__block">
                            <section class="ratings">
                                <div class="ratings__container">
                                    <h2 class="ratings__title h2">Рейтинги</h2>

                                    <div class="ratings__list">
                                        {ratings.map((r,i) => {
                                            return <div class="ratings__item">
                                                <div class="ratings-card">
                                                    <div class="ratings-card__num">{r.num}</div>
                                                    <div class="ratings-card__name">{r.name}</div>
                                                    <div class="ratings-card__source">{r.source}</div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div class="multibrands__form">
                        <section class="brief">
                            <div class="brief__container">
                                <div class="brief__wrap">
                                    <h2 class="brief__title h1">Привет! Расскажите <br/>о&nbsp;вашей задаче</h2>

                                    <div class="brief__form">
                                        <BriefForm />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer footerClass='inverse'/>
        </div>

    </Layout>
}
