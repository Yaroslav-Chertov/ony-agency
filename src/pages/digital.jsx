import Layout from '../layouts/Layout.jsx';
import Input from "../components/form/Input.jsx";
import InputFile from "../components/form/InputFile.jsx";
import Textarea from "../components/form/Textarea.jsx";
import Checkbox from "../components/form/Checkbox.jsx";
import Button from "../components/form/Button.jsx";
import { env } from '#_/server/utils/env.js';
import Header from '../components/Header.jsx';

export const staticPage = true;

export default async ({ data }) => {
    const metaTags = {
        description: 'Разработка Digital-платформ, интернет-магазинов и сервисов на базе глубоких исследований аудитории | Чтобы заказать - заполните бриф на сайте или звоните +7(495)120-78-88',
        ogDescription: 'Разработка Digital-платформ, интернет-магазинов и сервисов на базе глубоких исследований аудитории | Чтобы заказать - заполните бриф на сайте или звоните +7(495)120-78-88',
    }

    const services = [
        {
            param: "audit",
            title: "Аудит",
            description: "Проводим UX-аудит, который улучшает метрики вашего продукта. <i>Вы&nbsp;получаете беклог для доработки интерфейсов</i>",
            details: [
                { label: "Сроки", value: "от&nbsp;8&nbsp;дней" },
                { label: "Стоимость", value: "от&nbsp;500&nbsp;тыс." },
                { label: "Форма работы", value: "Fix" },
            ],
            action: {url: "https://ony.ru/ux-audit"},
        },
        {
            param: "research",
            title: "Исследования",
            description: "Создаем и&nbsp;развиваем цифровые продукты ориентируясь на&nbsp;данные. <i>Вы&nbsp;получаете готовый отчет и&nbsp;рекомендации</i>",
            details: [
                { label: "Сроки", value: "от&nbsp;10&nbsp;дней" },
                { label: "Стоимость", value: "от&nbsp;1&nbsp;млн" },
                { label: "Форма работы", value: "Fix" },
            ],
            action: {url: "https://ony.ru/product"},
        },
        {
            param: "project",
            title: "Проектирование",
            description: "Проектируем интерфейсы любой сложности: от&nbsp;имиджевых лендингов до&nbsp;IT-продуктов. <i>Вы&nbsp;получаете прототип интерфейса с&nbsp;продуманными сценариями</i>",
            details: [
                { label: "Сроки", value: "от&nbsp;10&nbsp;дней" },
                { label: "Стоимость", value: "от&nbsp;400&nbsp;тыс." },
                { label: "Форма работы", value: "Fix, T&M, Retainer" },
            ],
            action: {url: ""},
        },
        {
            param: "design",
            title: "Дизайн",
            description: "Разрабатываем функционально-применимый дизайн. <i>Вы&nbsp;получаете дизайн-концепт, отвечающий требованиям и&nbsp;задачам бизнеса</i>",
            details: [
                { label: "Сроки", value: "от&nbsp;20&nbsp;дней" },
                { label: "Стоимость", value: "от&nbsp;1.2 млн" },
                { label: "Форма работы", value: "Fix, T&M, Retainer" },
            ],
            action: {url: ""},
        },
        {
            param: "dev",
            title: "Разработка",
            description: "Создаем продукты, которые остаются актуальными и&nbsp;эффективными долгое время. <i>Вы&nbsp;получаете масштабируемый digital-продукт с&nbsp;постоянной поддержкой</i>",
            details: [
                { label: "Сроки", value: "от&nbsp;10&nbsp;дней" },
                { label: "Стоимость", value: "от&nbsp;500&nbsp;тыс." },
                { label: "Форма работы", value: "Fix, T&M, Retainer" },
            ],
            action: {url: "https://ony.ru/tech"},
        },
        {
            param: "support",
            title: "Поддержка",
            description: "Отвечаем за&nbsp;стабильную работу сервиса и&nbsp;безопасность. <i>Вы&nbsp;получаете команду, отвечающую за&nbsp;поддержание и&nbsp;развитие вашего проекта</i>",
            details: [
                { label: "Сроки", value: "от&nbsp;10&nbsp;дней" },
                { label: "Стоимость", value: "от&nbsp;100&nbsp;тыс." },
                { label: "Форма работы", value: "T&M" },
            ],
            action: {url: ""},
        }
    ]

    const reviews = [
        {
          photo: "/assets/images/digital/reviews/img0.jpg",
          name: "Ксения Сергачёва",
          position: "Руководитель центра по&nbsp;работе с&nbsp;брендом МТС",
          content: "Мы&nbsp;создали бренд портал для быстрого погружения любого нового сотрудника или партнёра в&nbsp;бренд МТС и&nbsp;его основные черты. А&nbsp;также собрали в&nbsp;одном месте все компоненты айдентики. Для лучшего вовлечения мы&nbsp;добавили интерактивные блоки, которые выполняют роль демо&nbsp;&mdash; в&nbsp;игровой форме знакомят пользователя с&nbsp;общим принципом того или иного дизайн-решения, объясняют, почему они такие и&nbsp;какая за&nbsp;этим стоит идея"
        },
        {
          photo: "/assets/images/digital/reviews/img1.jpg",
          name: "Олеся Ващенко",
          position: "Бренд-менеджер Островок Командировки",
          content: "Команда ONY смогла не&nbsp;только глубоко прочувствовать нашу бренд-пирамиду, но&nbsp;и&nbsp;гармонично использовать элементы нового брендбука, воплотив их&nbsp;в&nbsp;современном, стильном и&nbsp;функциональном лендинге. Результат превзошел наши ожидания&nbsp;&mdash; получился не&nbsp;просто лендинг, а&nbsp;пример, на&nbsp;который мы&nbsp;теперь ориентируемся при создании дальнейших материалов"
        },
        {
          photo: "/assets/images/digital/reviews/img2.jpg",
          name: "Марат Михтифидинов",
          position: "Руководитель интернет-магазина Dantone Home",
          content: "После проделанной работы мы&nbsp;получили современный сайт с&nbsp;обновленным дизайном. Теперь мы&nbsp;можем самостоятельно и&nbsp;оперативно создавать лендинги под разные задачи. Раздел &laquo;Новости&raquo; превратился в&nbsp;полноценный блог с&nbsp;интересным оформлением и&nbsp;продвинутыми возможностями конструктора"
        },
        {
          photo: "/assets/images/digital/reviews/img3.jpg",
          name: "Камила Гюлахмедова",
          position: "Руководитель web-разработки в&nbsp;VisageHall",
          content: "ONY для нас&nbsp;&mdash; это команда, с&nbsp;которой мы&nbsp;решили очень важные и&nbsp;интересные задачи. Хочется выделить комплексный подход, крутой менеджмент, позитивный, свежий динамичный взгляд, лёгкость и&nbsp;скорость в&nbsp;коммуникации. Команде разработки отдельная благодарность за&nbsp;высокий профессионализм, энтузиазм и&nbsp;стопроцентную вовлеченность в&nbsp;процесс! Волшебный опыт вдохновляет на&nbsp;новые совместные идеи и&nbsp;проекты"
        },
        {
          photo: "/assets/images/digital/reviews/img4.jpg",
          name: "Александра Иванова",
          position: "Директор по&nbsp;маркетингу Metrium",
          content: "От&nbsp;работы с&nbsp;ONY остались исключительно приятные впечатления. Коллеги оперативно реагировали на&nbsp;правки, четко укладывались в&nbsp;сроки, обозначенные в&nbsp;дорожной карте проекта. Благодаря их&nbsp;экспертизе нашу изначальную идею о&nbsp;том, каким мы&nbsp;хотим видеть сайт, удалось доработать до&nbsp;полностью рабочей концепции, а&nbsp;после реализовать&nbsp;ее. Крайне благодарны за&nbsp;вовлеченность в&nbsp;проект и&nbsp;профессионализм"
        }
    ]

    const ratings = [
        {
          num: 1,
          title: "Дизайн-агентства для e-commerce",
          category: "Ruward"
        },
        {
          num: 2,
          title: "Дизайн-агентства для beauty-проектов",
          category: "Ruward"
        },
        {
          num: 3,
          title: "Дизайн-агентства для IT-компаний и&nbsp;сервисов",
          category: "Ruward"
        },
        {
          num: 4,
          title: "Дизайн-агентства для онлайн-сервисов и&nbsp;порталов",
          category: "Ruward"
        },
        {
          num: 4,
          title: "Дизайн-агентств для автопроизводителей",
          category: "Ruward"
        },
        {
          num: 10,
          title: "Дизайн-агентств для FinTech",
          category: "Ruward"
        },
        {
          num: 10,
          title: "Рейтинг лучших студий диджитал-дизайна",
          category: "Tagline"
        },
        {
          num: 10,
          title: "Digital Design &amp;&nbsp;Creative",
          category: "Ruward"
        }
    ]

    const ecosystems = [
        {
            title: "",
            text: "ONY закрывает весь цикл запуска продукта"
        }, {
            title: "Signal (part of&nbsp;ONY)",
            text: "Команда стратегов и&nbsp;исследователей, которая умеет делать глубокие и&nbsp;увлекательные исследования, осторожно заглядывая в&nbsp;будущее, постоянно сканирует культуру, чтобы стратегии брендов работали на&nbsp;ваш бизнес и&nbsp;оставались актуальными надолго"
        }, {
            title: "Branding",
            text: "Команда дизайнеров, которая создает визуальные системы, запускает и&nbsp;поддерживает бренды, учитывая тренды и&nbsp;потребности пользователя. Балансируя между функцией и&nbsp;эстетикой, помогает бренду говорить с&nbsp;аудиторией"
        }, {
            title: "Digital",
            text: "Команда digital-дизайнеров и&nbsp;разработчиков, которая занимается продуктовыми исследованиями, разработкой дизайна и&nbsp;цифровых продуктов компаний и&nbsp;сервисов, опираясь на&nbsp;задачи брендов и&nbsp;потребности пользователей"
        }
    ]

    const articles = [
        {
            image: "/assets/images/digital/media/00.jpg",
            note: "One Two Prod &middot; #4",
            title: "Павел Аксенов&nbsp;&mdash; об&nbsp;уровнях продактов и&nbsp;метриках",
            source: "https://youtu.be/-gqIucg_teE?si=S9ITYgFfxrb6-FXS",
            sourceText: "youtube"
        },
        {
            image: "/assets/images/digital/media/01.jpg",
            note: "Статья &middot; Дизайн",
            title: "Правила работы за&nbsp;digital-станком",
            source: "https://vc.ru/design/778173-pravila-raboty-za-digital-stankom",
            sourceText: "vc.ru"
        },
        {
            image: "/assets/images/digital/media/02.jpg",
            note: "Статья &middot; AI",
            title: "Как использовать нейросети для ускорения работы над проектом: аналитика, прототипы, визуал",
            source: "https://vc.ru/marketing/1489171-kak-ispolzovat-neiroseti-dlya-uskoreniya-raboty-nad-proektom-analitika-prototipy-vizual",
            sourceText: "vc.ru"
        },
        {
            image: "/assets/images/digital/media/03.jpg",
            note: "Статья &middot; Управление",
            title: "Бюджетный и&nbsp;дорогостоящий eCommerce&nbsp;&mdash; в&nbsp;чём разница?",
            source: "https://vc.ru/marketing/1777879-sravnenie-e-sommerce-reshenii-kogda-stoit-ekonomit-a-kogda-investirovat",
            sourceText: "vc.ru"
        }
    ]

    const mediaAds = [
        {
            title: "Блог на&nbsp;VC",
            subtitle: "Статьи про Digital",
            url: "https://vc.ru/u/1017892-ony"
        },
        {
            title: "One Two Prod",
            subtitle: "Подкаст с&nbsp;AGIMA",
            url: "https://onetwoprod.mave.digital/"
        },
        {
            title: "ONY Webinar",
            subtitle: "Записи вебинаров",
            url: "https://youtube.com/playlist?list=PLaYY3VZBnLlfwSU7u4DC6niWhKP7PZLiH&feature=shared"
        }
    ]

    const popups = [
        {
            category: "E-com",
            filter: "ecom",
            title: "Комплексная разработка эффективных интернет-магазинов. <i>&#8470;&nbsp;1&nbsp;дизайн-агентство для e-commerce по&nbsp;версии Ruward</i>",
            projects: [
                {
                    title: "Dantone Home",
                    subtitle: "Furniture &middot; E-com",
                    description: "Интернет-магазин для бренда мебели и&nbsp;предметов интерьера",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/cc.mp4",
                    image: {
                        src: "",
                        alt: ""
                    },
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2022" },
                        { title: "Бронза", value: "MIXX&nbsp;Russia, 2022" },
                        { title: "3&nbsp;место", value: "Золотой сайт, 2021" }
                    ],
                    metrics: [
                        { title: "Просмотры сайта", value: "+140%" },
                        { title: "Глубина просмотра", value: "+60%" },
                        { title: "Отказы от покупок", value: "-340%" }
                    ],
                    stack: ["HTML&nbsp;/ CSS", "Javascript", "Webpack"],
                    link: "https://ony.ru/work/dantone-home"
                }, {
                    title: "Золотое яблоко",
                    subtitle: "Beauty &middot; E-com",
                    description: "Самый быстрорастущий парфюмерный супермаркет в&nbsp;России",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Golden%20Apple/10_checkout.mp4",
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2022" },
                        { title: "Бронза", value: "MIXX&nbsp;Russia, 2022" }
                    ],
                    link: "https://ony.ru/work/goldapple"
                }, {
                    title: "VisageHall",
                    subtitle: "Beauty &middot; E-com",
                    description: "Сеть парфюмерно-косметических магазинов из&nbsp;Дагестана с&nbsp;мировыми брендами",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/visage-hall.mp4",
                    stack: ["HTML&nbsp;/ CSS", "Javascript", "Webpack"],
                    link: "https://ony.ru/work/visage-hall"
                }, {
                    title: "Liquides Imaginaires",
                    subtitle: "Beauty &middot; E-com",
                    description: "Имиджевый сайт французского парфюмерного бренда",
                    video: "https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%206/11-anm.mp4",
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2023" },
                        { title: "Серебро", value: "MIXX&nbsp;Russia, 2023" }
                    ],
                    link: "https://ony.ru/work/liquides-imaginaires"
                }, {
                    title: "Gulliver Market",
                    subtitle: "Fashion &middot; E-com",
                    description: "Интернет-магазин бренда одежды, обуви и&nbsp;аксессуаров для детей",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Gulliver%20Market/%D0%B3%D1%83%D0%BB%D0%BB%D0%B8%D0%B2%D0%B5%D1%80%201920%20iPad.mp4",
                    awards: [
                        { title: "Бронза", value: "MIXX&nbsp;Russia, 2021" },
                    ],
                    metrics: [
                        { title: "Конверсия в&nbsp;покупку", value: "+62%" },
                        { title: "LTV", value: "+60%" },
                        { title: "Органический трафик", value: "+17%" }
                    ],
                    stack: ["Laravel", "Vue"],
                    link: "https://ony.ru/work/gulliver-market"
                }
            ]
        }, {
            category: "IT&nbsp;&amp;&nbsp;Fintech",
            filter: "it_fintech",
            title: "Комплексная разработка цифровых продуктов для&nbsp;IT и&nbsp;финансовых компаний. <i>&#8470;&nbsp;3&nbsp;дизайн-агентство для IT-компаний и&nbsp;сервисов по&nbsp;версии Ruward</i>",
            projects: [
                {
                    title: "Группа &laquo;Иннотех&raquo;",
                    subtitle: "IT &middot; Web",
                    description: "Сайт одной из&nbsp;крупнейших IT-компаний России",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/innotech.mp4",
                    image: {
                        src: "",
                        alt: ""
                    },
                    awards: [
                        { title: "Золото", value: "Workspace Digital Awards, 2024" },
                        { title: "3 место", value: "Золотой сайт, 2023" }
                    ],
                    link: "https://ony.ru/work/innotech"
                }, {
                    title: "МТС Бренд портал",
                    subtitle: "Ecosystem &middot; Web",
                    description: "Портал, объединяющий информацию о&nbsp;всех брендах экосистемы МТС",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/video_covers_for_cases/MTS_main.mp4",
                    awards: [
                        { title: "Серебро", value: "Tagline Awards, 2024" },
                        { title: "3&nbsp;место", value: "Рейтинг Рунета, 2024" },
                        { title: "Золото", value: "Среда, 2024" }
                    ],
                    stack: ["Next.js", "TypeScript", "Webpack", "REST API", "SCSS"],
                    link: "https://ony.ru/work/mts-brandportal"
                }, {
                    title: "ID.World",
                    subtitle: "Telecom &middot; Web",
                    description: "Сайт для международной IT-компании, которая разрабатывает решения для удаленной верификации личности",
                    video: "https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%2023/4.mp4",
                    link: "https://ony.ru/work/ID-World"
                }, {
                    title: "RED",
                    subtitle: "Fintech &middot; Product",
                    description: "Цифровая платформа сервиса для подбора и&nbsp;приобретения продуктов страхования",
                    video: "https://storage.yandexcloud.net/ony-ru-media/RED-ru/03_anm.mp4",
                    link: "https://ony.ru/work/red-ru"
                }, {
                    title: "Торги223",
                    subtitle: "IT &middot; Web",
                    description: "Промо-сайт электронной торговой площадки",
                    video: "https://player.vimeo.com/progressive_redirect/playback/794877673/rendition/1080p/file.mp4?loc=external&signature=76712d4c59ae2cb72b8282e76f1376e98d1bb6503b2d4029d8e63dae05ab4149",
                    link: "https://ony.ru/work/torgi223"
                }, {
                    title: "Мегафон",
                    subtitle: "Telecom &middot; Web",
                    description: "Разработка дизайн-системы для веб-продуктов Мегафона",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Megafon%20Digital/MF%2008_tiles.mp4",
                    link: "https://ony.ru/work/megafon-digital"
                }
            ]
        }, {
            category: "Beauty &amp;&nbsp;Fashion",
            filter: "beauty_fashion",
            title: "Комплексная разработка цифровых продуктов для индустрии моды и&nbsp;красоты. <i>&#8470;&nbsp;2&nbsp;дизайн-агентство для beauty-компаний по&nbsp;версии Ruward</i>",
            projects: [
                {
                    title: "Золотое яблоко",
                    subtitle: "Beauty &middot; E-com",
                    description: "Самый быстрорастущий парфюмерный супермаркет в&nbsp;России",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Golden%20Apple/10_checkout.mp4",
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2022" },
                        { title: "Бронза", value: "MIXX&nbsp;Russia, 2022" }
                    ],
                    link: "https://ony.ru/work/goldapple"
                }, {
                    title: "Liquides Imaginaires",
                    subtitle: "Beauty &middot; E-com",
                    description: "Имиджевый сайт французского парфюмерного бренда",
                    video: "https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/untitled%20folder%206/11-anm.mp4",
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2023" },
                        { title: "Серебро", value: "MIXX&nbsp;Russia, 2023" }
                    ],
                    link: "https://ony.ru/work/liquides-imaginaires"
                }, {
                    title: "VisageHall",
                    subtitle: "Beauty &middot; E-com",
                    description: "Сеть парфюмерно-косметических магазинов из&nbsp;Дагестана с&nbsp;мировыми брендами",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/visage-hall.mp4",
                    stack: ["HTML&nbsp;/ CSS", "Javascript", "Webpack"],
                    link: "https://ony.ru/work/visage-hall"
                }, {
                    title: "Clive Christian",
                    subtitle: "Beauty &middot; E-com",
                    description: "Интернет-магазин для британского парфюмерного дома",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/cc.mp4",
                    link: "https://ony.ru/work/clive-christian"
                }, {
                    title: "CLARA",
                    subtitle: "Beauty &middot; E-com",
                    description: "Интернет-магазин международной компании по&nbsp;производству электроприборов для ухода за&nbsp;волосами",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/clara.mp4",
                    link: "https://ony.ru/work/clara"
                }
            ]
        }, {
            category: "HR",
            filter: "hr",
            title: "Комплексная разработка HR-сайтов и&nbsp;карьерных порталов",
            projects: [
                {
                    title: "Raiffeisen DGTL",
                    subtitle: "Fintech &middot; HR &middot; Web",
                    description: "Карьерный сайт Райффайзен банка",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/raiffeisen.mp4",
                    link: "https://ony.ru/work/raiffeisen-career"
                }
            ]
        }, {
            category: "Auto",
            filter: "auto",
            title: "Комплексная разработка цифровых продуктов для автомобильных компаний. <i>&#8470;&nbsp;4&nbsp;дизайн-агентство для автомобильного бизнеса по&nbsp;версии Ruward</i>",
            projects: [
                {
                    title: "Kia",
                    subtitle: "Auto &middot; Web",
                    description: "Сайт корейского автопроизводителя Kia на&nbsp;территории России",
                    video: "https://player.vimeo.com/external/607413142.hd.mp4?s=528124abc896abe5b138deac3ce1be894e133d8a&profile_id=175",
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2023" },
                        { title: "Серебро", value: "MIXX&nbsp;Russia, 2020" },
                        { title: "Бронза", value: "MIXX&nbsp;Russia, 2020" }
                    ],
                    metrics: [
                        { title: "Заявки в&nbsp;конфигураторе", value: "+68%" },
                        { title: "Заявки на кредит", value: "+64%" },
                        { title: "Заявки через калькулятор", value: "+11,3%" }
                    ],
                    stack: ["HTML&nbsp;/ CSS", "Javascript", "Webpack"],
                    link: "https://ony.ru/work/kia-ru"
                }, {
                    title: "Carcade",
                    subtitle: "Fintech &middot; Web &middot; Mobile",
                    description: "Сайт и&nbsp;приложение для лизинговой компании",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Carcde/04_mob_s.mp4",
                    stack: ["Next.js", "Bitrix"],
                    link: "https://ony.ru/work/carcade"
                }
            ]
        }, {
            category: "Culture",
            filter: "culture",
            title: "Комплексная разработка цифровых продуктов для культурных проектов и&nbsp;организаций",
            projects: [
                {
                    title: "Третьяковская галерея",
                    subtitle: "Culture &middot; Web",
                    description: "Разработка сайта для Третьяковской галереи",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/5/t-site.mp4",
                    awards: [
                        { title: "Золото", value: "Tagline Awards" },
                        { title: "Бронза", value: "Tagline Awards" }
                    ],
                    link: "https://ony.ru/work/t-brand"
                }, {
                    title: "Трёхгорная мануфактура",
                    subtitle: "Web",
                    description: "Корпоративный сайт бизнес-квартала",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Trekhgorka%20-%202/05%E2%80%93list.mp4",
                    awards: [
                        { title: "Золото", value: "Tagline Awards, 2022" },
                        { title: "3&nbsp;место", value: "Золотой сайт, 2021" }
                    ],
                    stack: ["Bitrix"],
                    link: "https://ony.ru/work/trekhgorka"
                }, {
                    title: "Музей AZ",
                    subtitle: "Culture &middot; Web",
                    description: "Сайт для галереи «Музей AZ»",
                    video: "https://storage.yandexcloud.net/ony-ru-media/AZ%20Digital/AZ%2012_end.mp4",
                    awards: [
                        { title: "Бронза", value: "ADCR, 2020" },
                        { title: "Серебро", value: "Tagline Awards, 2018" }
                    ],
                    link: "https://ony.ru/work/az-digital"
                }, {
                    title: "AZ Shop",
                    subtitle: "Culture &middot; Web",
                    description: "Разработка интернет-магазина Музея&nbsp;AZ",
                    video: "https://storage.yandexcloud.net/ony-ru-media/AZ%20shop/01-anm.mp4",
                    awards: [
                        { title: "Website of&nbsp;the Day", value: "CSS Design Award, 2021" },
                        { title: "Mobile Excellence", value: "Awwwards, 2021" },
                        { title: "Серебро", value: "Tagline Awards, 2022" }
                    ],
                    link: "https://ony.ru/work/az-shop"
                }, {
                    title: "TTMG",
                    subtitle: "Web",
                    description: "Имиджевый сайт для архитектурного бюро из&nbsp;Монако",
                    video: "https://ony-ru-media.storage.yandexcloud.net/untitled%20folder%204/05.mp4",
                    awards: [
                        { title: "Серебро", value: "Tagline Awards, 2024" }
                    ],
                    link: "https://ony.ru/work/ttmg"
                }, {
                    title: "GALITSKIY & GALITSKIY",
                    subtitle: "Retail &middot; Web",
                    description: "Разработка имиджевого сайта винодельни",
                    video: "https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/video_covers_for_cases/Preview_G&G.mp4",
                    awards: [
                        { title: "2&nbsp;место", value: "Workspace Digital Awards, 2023" },
                        { title: "Бронза", value: "ADCR, 2022" },
                        { title: "Золото", value: "Tagline Awards, 2022" },
                        { title: "Бронза", value: "Среда, 2022" }
                    ],
                    link: "https://ony.ru/work/galitsky-galitsky"
                }
            ]
        }, {
            category: "Media",
            filter: "media",
            title: "Комплексная разработка медиа-продуктов",
            projects: [
                {
                    title: "Медиа Про",
                    subtitle: "Media &middot; Web",
                    description: "Разработка сайта бренд-медиа Яндекс Про",
                    video: "https://ony-ru-media.storage.yandexcloud.net/Media%20pro/mainpage_desktop_01.m4v",
                    stack: ["Laravel", "Vue"],
                    link: "https://ony.ru/work/media-pro"
                }, {
                    title: "Flacon Magazine",
                    subtitle: "Media &middot; Web",
                    description: "Сайт модного журнала Flacon",
                    video: "https://storage.yandexcloud.net/ony-ru-media/Flacon%20Digital%20Web/%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B7%20%D1%84%D0%BE%D1%82%D0%BE%20web.mp4",
                    awards: [
                        { title: "Золото", value: "ADCR, 2019" },
                        { title: "Золото", value: "Tagline Awards, 2019" },
                        { title: "Серебро", value: "Tagline Awards, 2019" }
                    ],
                    stack: ["Laravel", "Vue"],
                    link: "https://ony.ru/work/flacon-digital"
                }, {
                    title: "Газпром-медиа",
                    subtitle: "Media &middot; Web",
                    description: "Разработка корпоративного сайта для медиахолдинга",
                    video: "https://storage.yandexcloud.net/ony-ru-media/GazpromMeddia/01_mainpage.mp4",
                    stack: ["Nuxt", "Node.js"],
                    link: "https://ony.ru/work/gazprom-media"
                }
            ]
        }
    ]

    return <Layout attrs={{ page: "digital" }} title="Digital" meta={metaTags}>
        <div class="wrapper">
            {/* <header class="digital-header" data-elt="digitalHeader">
                <div class="digital-header__container">
                    <div class="digital-header__wrap">
                        <a href="/" class="digital-header__logo">
                            <svg class="svg-icon" viewBox="0 0 96 30" width="76" height="24"><use xlink:href="#svg-logo"></use></svg>
                        </a>

                        <div class="digital-header__nav">
                            <nav class="digital-nav">
                                <ul class="digital-nav__list">
                                    <li class="digital-nav__item">
                                        <a href="#projects" class="digital-link" data-elts="closeNav"><span>Проекты</span></a>
                                    </li>

                                    <li class="digital-nav__item">
                                        <a href="#services" class="digital-link" data-elts="closeNav"><span>Услуги</span></a>
                                    </li>

                                    <li class="digital-nav__item">
                                        <a href="#media" class="digital-link" data-elts="closeNav"><span>Медиа</span></a>
                                    </li>

                                    <li class="digital-nav__item">
                                        <a href="#request" class="digital-button" data-elts="closeNav"><span>Оставить заявку</span></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <button type="button" class="digital-header__burger" data-elt="navToggle">
                            <span></span><span></span>
                        </button>
                    </div>
                </div>
            </header> */}

            <Header />

            <main class="main">
                <div class="digital">
                    <div class="digital__section">
                        <section class="digital-intro" data-elt="digitalIntroState" data-state="0">
                            <div class="digital-intro__container">
                                <div class="digital-intro__wrap">
                                    <div class="digital-intro__main">
                                        <div class="digital-intro__subtitle">
                                            <div class="digital-cube">
                                                <div class="digital-cube__rotator" data-elt="digitalIntroTitleRotate">
                                                    <div class="digital-cube__line digital-cube__line--1">
                                                        <span>ONY <br/>Digital</span>
                                                    </div>

                                                    <div class="digital-cube__line digital-cube__line--2">
                                                        <span>&#8470;&nbsp;1&nbsp;Дизайн-агентство <br/>для e-commerce</span>
                                                    </div>

                                                    <div class="digital-cube__line digital-cube__line--3">
                                                        <span>&#8470;&nbsp;2&nbsp;Дизайн-агентство <br/>для beauty-проектов</span>
                                                    </div>

                                                    <div class="digital-cube__line digital-cube__line--4">
                                                        <span>&#8470;&nbsp;3&nbsp;Дизайн-агентство <br/>для IT-компаний и&nbsp;сервисов</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h1 class="digital-intro__title h1">Создаём цифровые&nbsp;продукты. От&nbsp;идеи до&nbsp;запуска</h1>

                                        <div class="digital-intro__images">
                                            <div class="digital-intro__img">
                                                <img src="/assets/images/digital/intro/00.jpg" alt="" />
                                            </div>

                                            <div class="digital-intro__img">
                                                <img src="/assets/images/digital/intro/01.jpg" alt="" />
                                            </div>

                                            <div class="digital-intro__img">
                                                <img src="/assets/images/digital/intro/02.jpg" alt="" />
                                            </div>

                                            <div class="digital-intro__img">
                                                <img src="/assets/images/digital/intro/03.jpg" alt="" />
                                            </div>

                                            <div class="digital-intro__img">
                                                <img src="/assets/images/digital/intro/04.jpg" alt="" />
                                            </div>

                                            <div class="digital-intro__img">
                                                <img src="/assets/images/digital/intro/05.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="digital-intro__list">
                                        <div class="digital-intro__item">
                                            <div class="digital-intro-card">
                                                <div class="digital-intro-card__title">Клиенты</div>

                                                <div class="digital-intro-card__content">
                                                    <a href="https://ony.ru/client/kia" target="_blank" class="digital-intro-card__link"><span>Kia</span>,</a>
                                                    <a href="https://ony.ru/client/avito" target="_blank" class="digital-intro-card__link"><span>Avito</span>,</a>
                                                    <a href="https://ony.ru/client/mts" target="_blank" class="digital-intro-card__link"><span>МТС</span>,</a>
                                                    <a href="https://ony.ru/client/kasperskiy" target="_blank" class="digital-intro-card__link"><span>Касперский</span>,</a>
                                                    <a href="https://ony.ru/client/yandex" target="_blank" class="digital-intro-card__link"><span>Яндекс</span>,</a>
                                                    <a href="https://ony.ru/client/innotech" target="_blank" class="digital-intro-card__link"><span>Иннотех</span>,</a>
                                                    <a href="https://ony.ru/client/rambler-co" target="_blank" class="digital-intro-card__link"><span>Рамблер</span>,</a>
                                                    <a href="https://ony.ru/client/gulliver" target="_blank" class="digital-intro-card__link"><span>Gulliver</span>,</a>
                                                    <a href="https://ony.ru/client/tinkoff" target="_blank" class="digital-intro-card__link"><span>Т-Банк</span>,</a>
                                                    <a href="https://ony.ru/client/gazprom-media" target="_blank" class="digital-intro-card__link"><span>Газпром</span>,</a>
                                                    <a href="https://ony.ru/client/zolotoe-yabloko" target="_blank" class="digital-intro-card__link"><span>Золотое яблоко</span></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="digital-intro__item">
                                            <div class="digital-intro-card">
                                                <div class="digital-intro-card__title">Продукты</div>

                                                <div class="digital-intro-card__content">
                                                    <a href="https://ony.ru/ecom" target="_blank" class="digital-intro-card__link"><span>Интернет-магазины</span>,</a>
                                                    <a href="https://ony.ru/corp-web" target="_blank" class="digital-intro-card__link"><span>корпоративные сайты</span>,</a>
                                                    <a class="digital-intro-card__link"><span>мобильные приложения</span>,</a>
                                                    <a class="digital-intro-card__link"><span>порталы</span>,</a>
                                                    <a class="digital-intro-card__link"><span>интранеты</span>,</a>
                                                    <a class="digital-intro-card__link"><span>промо-сайты</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-projects" id="projects">
                            <div class="digital-projects__container">
                                <div class="digital-projects__wrap">
                                    <div class="digital-projects__top">
                                        <div class="digital-projects__controls">
                                            {popups.map(p => <button class="digital-link" data-elts="popupOpen" data-popup={p.filter}>{p.category}</button>)}
                                        </div>
                                    </div>

                                    <div class="digital-projects__list">
                                        <div class="digital-projects__item">
                                            <a href="https://ony.ru/work/goldapple" target="_blank" class="digital-projects-card">
                                                <div class="digital-projects-card__media">
                                                    <video muted loop playsinline preload="meta" src="https://storage.yandexcloud.net/ony-ru-media/Golden%20Apple/10_checkout.mp4" type="video/mp4"></video>
                                                </div>

                                                <div class="digital-projects-card__title">Магазин как инстаграм-блог. Золотое яблоко</div>
                                                <div class="digital-projects-card__note">Beauty &middot; E-com</div>

                                                <div class="digital-projects-card__tags">
                                                    <div class="digital-projects-card__tag">ADCR, Рейтинг Рунета</div>
                                                    <div class="digital-projects-card__tag">&#8470;&nbsp;1&nbsp;в рейтинге удобства интернет-магазинов</div>
                                                </div>
                                            </a>
                                        </div>

                                        <div class="digital-projects__item">
                                            <a href="https://ony.ru/work/mts-brandportal" target="_blank" class="digital-projects-card">
                                                <div class="digital-projects-card__media">
                                                    <img src="https://api.ony.ru/uploads/blocks/1719471874.jpg" alt=""/>
                                                </div>

                                                <div class="digital-projects-card__title">МТС бренд портал. Цифровая экосистема</div>
                                                <div class="digital-projects-card__note">IT &middot; Platform</div>

                                                <div class="digital-projects-card__tags">
                                                    <div class="digital-projects-card__tag">MIXX&nbsp;Russia, Sreda</div>
                                                </div>
                                            </a>
                                        </div>

                                        <div class="digital-projects__item">
                                            <a href="https://ony.ru/work/dantone-home" target="_blank" class="digital-projects-card">
                                                <div class="digital-projects-card__media">
                                                    <video muted loop playsinline preload="meta" src="/assets/images/digital/projects/dh.mp4" type="video/mp4"></video>
                                                </div>

                                                <div class="digital-projects-card__title">Dantone Home. Формы и&nbsp;функции</div>
                                                <div class="digital-projects-card__note">Furniture &middot; E-com</div>

                                                <div class="digital-projects-card__tags">
                                                    <div class="digital-projects-card__tag">В&nbsp;4,4 раза снизили bounce rate</div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <a href="https://ony.ru/work" target="_blank" class="digital-projects__button digital-button"><span>Все проекты</span></a>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-services" id="services">
                            <div class="digital-services__container">
                                <div class="digital-services__row">
                                    <div class="digital-services__col digital-services__col--side">
                                        <ul class="digital-services__nav">
                                            {services.map((service, index) => (
                                                <li class="digital-services__nav-item">
                                                    <button class={`digital-services__nav-link ${index === 0 ? "is-active" : ""}`} data-elts="tabControl" data-param={service.param}>
                                                        {service.title}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div class="digital-services__col digital-services__col--main">
                                        <div class="digital-services__list">
                                            {services.map((service, index) => (
                                                <div class={`digital-services__item ${index === 0 ? "is-active" : ""}`} data-elts="tabTarget" data-param={service.param}>
                                                    <div class="digital-services-card" data-param={index}>
                                                        <div class="digital-services-card__top" data-param={index}>
                                                            <div class="digital-services-card__title">{service.title}</div>
                                                            <div class="digital-services-card__arrow">
                                                                <svg class="svg-icons" width="21" height="21" viewBox="0 0 21 21">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.502 14.293L16.6486 8.14648L17.3557 8.8536L10.5019 15.7072L3.64844 8.85359L4.35555 8.14649L10.502 14.293Z"/>
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        <div class="digital-services-card__drop">
                                                            <div class="digital-services-card__content">
                                                                <div class="digital-services-card__subtitle">{service.description}</div>

                                                                <div class="digital-services-card__list">
                                                                    {service.details.map((detail, index) => (
                                                                        <div class="digital-services-card__item">
                                                                            <div class="digital-services-card__label">{detail.label}</div>
                                                                            <div class="digital-services-card__value">{detail.value}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {service.action.url && (
                                                                    <a href={service.action.url} class="digital-services-card__button digital-button" target="_blank">Подробнее</a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-reviews">
                            <div class="digital-reviews__container">
                                <div class="digital-reviews__wrap">
                                    <h2 class="digital-reviews__title">Отзывы</h2>

                                    <div class="digital-reviews__slider">
                                        <div class="swiper swiper-reviews">
                                            <div class="swiper-arrows">
                                                <button class="swiper-btn-prev">
                                                    <img src="/assets/images/digital/arrow-left.svg" alt=""/>
                                                </button>

                                                <button class="swiper-btn-next">
                                                    <img src="/assets/images/digital/arrow-right.svg" alt=""/>
                                                </button>
                                            </div>

                                            <div class="swiper-wrapper">
                                                {reviews.map((review,i) => (
                                                    <div class="swiper-slide">
                                                        <div class="digital-reviews-card">
                                                            <div class="digital-reviews-card__main">
                                                                <div class="digital-reviews-card__photo">
                                                                    <img src={review.photo} alt=""/>
                                                                </div>

                                                                <div class="digital-reviews-card__name">{review.name}</div>
                                                                <div class="digital-reviews-card__position">{review.position}</div>
                                                            </div>

                                                            <div class="digital-reviews-card__content">{review.content}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-ratings">
                            <div class="digital-ratings__container">
                                <div class="digital-ratings__row">
                                    <div class="digital-ratings__col">
                                        <h2 class="digital-ratings__title">Рейтинги</h2>
                                    </div>

                                    <div class="digital-ratings__col">
                                        <ul class="digital-ratings__list">
                                            {ratings.map((rating,i) => (
                                                <li class="digital-ratings__item">
                                                    <div class="digital-ratings-card">
                                                        <div class="digital-ratings-card__wrap">
                                                            <div class="digital-ratings-card__side">
                                                                <div class="digital-ratings-card__num">{rating.num}</div>
                                                                <div class="digital-ratings-card__note">Место</div>
                                                            </div>
                                                            <div class="digital-ratings-card__main">
                                                                <div class="digital-ratings-card__title">{rating.title}</div>
                                                                <div class="digital-ratings-card__note">{rating.category}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-awards">
                            <div class="digital-awards__container">
                                <h3 class="digital-awards__title">Награды</h3>
                                <div class="digital-awards__content">Cannes Lions, Awwwards, The FWA, EDA, Red Dot, ADCE <i>и&nbsp;другие международные и&nbsp;локальные награды</i></div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-ecosystem">
                            <div class="digital-ecosystem__bg">
                                <video muted loop playsinline autoplay preload="meta" src="/assets/images/digital/ecosystem-bg.mp4" type="video/mp4"></video>
                            </div>

                            <div class="digital-ecosystem__container">
                                <div class="digital-ecosystem__list">
                                    {ecosystems.map((ecosystem,i) => (
                                        <div class="digital-ecosystem__item">
                                            <div class="digital-ecosystem-card">
                                                <div class="digital-ecosystem-card__title">{ecosystem.title}</div>
                                                <div class="digital-ecosystem-card__text">{ecosystem.text}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-media" id="media">
                            <div class="digital-media__container">
                                <div class="digital-media__wrap">
                                    <h2 class="digital-media__title">Медиа</h2>

                                    <div class="digital-media__slider">
                                        <div class="swiper swiper-media">
                                            <div class="swiper-arrows">
                                                <button class="swiper-btn-prev">
                                                    <img src="/assets/images/digital/arrow-left.svg" alt="" />
                                                </button>
                                                <button class="swiper-btn-next">
                                                    <img src="/assets/images/digital/arrow-right.svg" alt="" />
                                                </button>
                                            </div>

                                            <div class="swiper-wrapper">
                                                {articles.map((article, i) => (
                                                    <div class="swiper-slide">
                                                        <a href={article.source} target="_blank" class="digital-media-card">
                                                            <div class="digital-media-card__image">
                                                                <img src={article.image} alt="" />
                                                            </div>
                                                            <div class="digital-media-card__note">{article.note}</div>
                                                            <div class="digital-media-card__title">{article.title}</div>
                                                            <div class="digital-media-card__source">{article.sourceText}</div>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="digital-media__bottom">
                                        <div class="digital-media__ad">
                                            <div class="digital-media__subtitle">Следите за&nbsp;выходом новых материалов</div>

                                            <div class="digital-media__list">
                                                {mediaAds.map((m,i) => (
                                                    <div class="digital-media__item">
                                                        <a href={m.url} target="_blank" class="digital-media-ad">
                                                            <div class="digital-media-ad__main">
                                                                <div class="digital-media-ad__title">{m.title}</div>
                                                                <div class="digital-media-ad__subtitle"><span>{m.subtitle}</span></div>
                                                            </div>

                                                            <div class="digital-media-ad__arrow">
                                                                <img src="/assets/images/digital/arrow-right.svg" alt="" />
                                                            </div>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="digital__section">
                        <section class="digital-request" id="request">
                            <div class="digital-request__container">
                                <div class="digital-request__row">
                                    <div class="digital-request__col">
                                        <h2 class="digital-request__title">Оставить заявку</h2>
                                    </div>

                                    <div class="digital-request__col">
                                        <div class="digital-request__form">
                                            <form action={env.API_URL + 'send_brief'} method="POST" data-elt="digitalForm" class="form form--digital-request is-loading- is-success-">
                                                <div class="form__box">
                                                    <div class="form__row">
                                                        <div class="form__col">
                                                            <Input name="name" type="text" placeholder="Имя*" />
                                                        </div>
                                                        <div class="form__col">
                                                            <Input name="company" type="text" placeholder="Компания*" />
                                                        </div>
                                                        <div class="form__col">
                                                            <Input name="phone" elts="mask" type="text" placeholder="Телефон*" />
                                                        </div>
                                                        <div class="form__col">
                                                            <Input name="email" type="text" placeholder="E-mail*" />
                                                        </div>
                                                    </div>

                                                    <Textarea name="comment" placeholder="Описание задачи" rows="1" />

                                                    <div class="form__field" data-input="file">
                                                        <div class="form-file">
                                                            <div class="form-file__control">
                                                                <span class="form-file__control-button">
                                                                    <span>Прикрепить файл</span>
                                                                    <span>до 10 МБ</span>
                                                                </span>
                                                                <input type="file" name="file" id="file" class="form-file__control-input" />
                                                            </div>

                                                            <div class="form-file__result">
                                                                <div class="form-file__result-value" data-filenames></div>
                                                                <button class="form-file__result-reset" data-reset-file>
                                                                    <span>Изменить</span>
                                                                </button>
                                                            </div>

                                                            <div class="form-message" data-error="file"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form__field" data-input="agreement">
                                                        <div class="checkbox">
                                                            <div class="checkbox__control">
                                                                <input type="checkbox" name="agreement" id="agreement" class="checkbox__input" checked />
                                                                <span class="checkbox__icon"></span>
                                                            </div>

                                                            <label for="agreement" class="checkbox__label">Я согласен с&nbsp;<a href="https://ony.ru/policy" target="_blank">правилами обработки персональных данных</a></label>
                                                            <div class="form-message" data-error></div>
                                                        </div>
                                                    </div>

                                                    <div class="form__field form__field--controls">
                                                        <button type="submit" class="form__button digital-button">
                                                            <span>Отправить</span>

                                                            <div class="form__submit-success">
                                                                <svg class="svg-icon" viewBox="0 0 21 22" width="21" height="22"><use href="#svg-check2"></use></svg>
                                                                <span>Отправлено</span>
                                                            </div>
                                                        </button>

                                                        <div class="form-loader">
                                                            <div class="form-loader__icon">
                                                                <img src="/assets/icons/loader.svg" alt=""/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-response" data-form-response></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <footer class="digital-footer" data-elts="digitalFooter">
                <div class="digital-footer__container">
                    <div class="digital-footer__wrap">
                        <div class="digital-footer__main">
                            <div class="digital-footer__section">
                                <div class="digital-footer__form">
                                    <form action={env.API_URL + 'subscribe'} method="POST" data-elt="subscribeForm" class="form form--digital-subscribe">
                                        <h3 class="form__title">Полезная рассылка о бренд-стратегии, дизайне и разработке</h3>

                                        <div class="form__box">
                                            <Input name="email" type="text" placeholder="E-mail*" />

                                            <div class="form__field">
                                                <div class="form__note">Нажимая кнопку «подписаться», вы&nbsp;соглашаетесь с&nbsp;<a href="/policy" target="_blank"><span>правилами обработки персональных данных</span></a></div>
                                            </div>

                                            <div class="form__field form__field--controls">
                                                <button type="submit" class="form__button digital-button">
                                                    <span>Подписаться</span>

                                                    <div class="form__submit-success">
                                                        <svg class="svg-icon" viewBox="0 0 21 22" width="21" height="22"><use href="#svg-check2"></use></svg>
                                                        <span>Вы подписаны</span>
                                                    </div>
                                                </button>

                                                <div class="form-loader">
                                                    <div class="form-loader__icon">
                                                        <img src="/assets/icons/loader.svg" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-response" data-form-response></div>
                                    </form>
                                </div>
                            </div>

                            <div class="digital-footer__section">
                                <div class="digital-footer__row">
                                    <div class="digital-footer__col">
                                        <div class="digital-footer__subtitle">Контакты</div>

                                        <ul class="digital-footer__list">
                                            <li class="digital-footer__item">
                                                <a href="tel:+74951207888" class="digital-footer__link"><span>+7 495 120 78 88</span></a>
                                            </li>
                                            <li class="digital-footer__item">
                                                <a href="mailto:mail@ony.ru" class="digital-footer__link"><span>mail@ony.ru</span></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="digital-footer__col">
                                        <div class="digital-footer__subtitle">Адрес</div>

                                        <ul class="digital-footer__list">
                                            <li class="digital-footer__item">
                                                Берсеневская набережная, 6с3<br/>
                                                Москва, Россия
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="digital-footer__col">
                                        <div class="digital-footer__subtitle">Соцсети</div>

                                        <ul class="digital-footer__list">
                                            <li class="digital-footer__item">
                                                <a href="https://www.youtube.com/channel/UCvlx1yLAxUUQ_teP93_ps9A" target="_blank" class="digital-footer__link"><span>Youtube</span></a>
                                            </li>
                                            <li class="digital-footer__item">
                                                <a href="https://t.me/onyagency" target="_blank" class="digital-footer__link"><span>Telegram</span></a>
                                            </li>
                                            <li class="digital-footer__item">
                                                <a href="https://www.behance.net/onyagency" target="_blank" class="digital-footer__link"><span>Behance</span></a>
                                            </li>
                                            <li class="digital-footer__item">
                                                <a href="https://vk.com/onyagency" target="_blank" class="digital-footer__link"><span>VK</span></a>
                                            </li>
                                            <li class="digital-footer__item">
                                                <a href="https://vc.ru/u/1017892-ony" target="_blank" class="digital-footer__link"><span>VC</span></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="digital-footer__col">
                                        <div class="digital-footer__subtitle">Карьера</div>

                                        <ul class="digital-footer__list">
                                            <li class="digital-footer__item">
                                                <a href="mailto:join@ony.ru" target="_blank" class="digital-footer__link"><span>join@ony.ru</span></a>
                                            </li>
                                            <li class="digital-footer__item">
                                                <a href="https://join.ony.ru" target="_blank" class="digital-footer__link"><span>Вакансии</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="digital-footer__section">
                                <div class="digital-footer__copy">&copy;Ony Agency International. All rights reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {popups.map((p, i) => <div class="popup popup--digital-cases" data-elts="popup" data-popup={p.filter}>
                <div class="popup__box" data-elts="popupContent">
                    <div class="popup__top">
                        <div class="popup__filter">{p.category}</div>
                        <button class="popup__close" data-elts="popupClose"><span>Закрыть</span></button>
                    </div>

                    <div class="popup__main">
                        <div class="popup__title">{p.title}</div>
                        <a href="#request" class="popup__button digital-button" data-elts="closeDigitalPopup"><span>Оставить заявку</span></a>

                        <div class="popup__list">
                            {p.projects.map((project, i) => (
                                <div class="popup__item">
                                    <div class="digital-project-info">
                                        <div class="digital-project-info__preview">
                                            {project.video ? (
                                                <video muted loop playsinline preload="meta" src={project.video}></video>
                                            ) : project.img.src ? (
                                                <img src={project.img.src} alt={project.img.alt} />
                                            ) : null}
                                        </div>

                                        <div class="digital-project-info__row">
                                            <div class="digital-project-info__col">
                                                <div class="digital-project-info__box">
                                                    <div class="digital-project-info__top">
                                                        <div class="digital-project-info__title">{project.title}</div>
                                                        <div class="digital-project-info__subtitle">{project.subtitle}</div>
                                                        <div class="digital-project-info__descr digital-project-info__descr--mob">{project.description}</div>
                                                    </div>

                                                    <div class="digital-project-info__main">
                                                        {project.awards && project.awards.length > 0 && (
                                                            <div class="digital-project-info-card">
                                                                <div class="digital-project-info-card__title">Награды</div>
                                                                <div class="digital-project-info-card__content">
                                                                    {project.awards.map((a, i) => (
                                                                        <div key={i} class="digital-project-info-card__box">
                                                                            <div class="digital-project-info-card__subtitle">{a.title}</div>
                                                                            <div class="digital-project-info-card__value">{a.value}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="digital-project-info__col">
                                                <div class="digital-project-info__box">
                                                    <div class="digital-project-info__top">
                                                        <div class="digital-project-info__descr">{project.description}</div>
                                                    </div>
                                                    <div class="digital-project-info__main">
                                                        {project.metrics && project.metrics.length > 0 && (
                                                            <div class="digital-project-info-card">
                                                                <div class="digital-project-info-card__title">Метрики</div>
                                                                <div class="digital-project-info-card__content">
                                                                    {project.metrics.map((m, i) => (
                                                                        <div class="digital-project-info-card__box">
                                                                            <div class="digital-project-info-card__subtitle">{m.title}</div>
                                                                            <div class="digital-project-info-card__value">{m.value}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {project.stack && project.stack.length > 0 && (
                                                            <div class="digital-project-info-card">
                                                                <div class="digital-project-info-card__title">Стек</div>
                                                                <div class="digital-project-info-card__content">
                                                                    {project.stack.map((s, i) => (
                                                                        <div class="digital-project-info-card__box">
                                                                            <div class="digital-project-info-card__subtitle">{s}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <a href={project.link} target='_blank' class="digital-project-info__button digital-button">Подробнее</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div class="popup__all-projects">
                            <div class="digital-projects-all">
                                <div class="digital-projects-all__list">
                                    <div class="digital-projects-all__item">
                                        <div class="digital-projects-all__media">
                                            <video muted loop playsinline preload="none" src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/video_covers_for_cases/Preview_G&amp;G.mp4"></video>
                                        </div>
                                    </div>

                                    <div class="digital-projects-all__item">
                                        <div class="digital-projects-all__media">
                                            <video muted loop playsinline preload="none" src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/video_covers_for_cases/MTS_main.mp4"></video>
                                        </div>
                                    </div>

                                    <div class="digital-projects-all__item">
                                        <div class="digital-projects-all__media">
                                            <img src="https://api.ony.ru/uploads/blocks/1701943836.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <a href="/work" target="_blank" class="digital-projects-all__control digital-button"><span>Все проекты</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>

    </Layout>
}
