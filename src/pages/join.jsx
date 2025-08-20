import Layout from "../layouts/Layout.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Checkbox from "../components/form/Checkbox.jsx";
import Button from "../components/form/Button.jsx";
import Input from "#@/components/form/Input.jsx";
import InputFile from "#@/components/form/InputFile.jsx";
import FormFactory from "../js/app/Form.js";
import { env } from "#_/server/utils/env.js";

export const staticPage = true;

export default async ({ data }) => {
    const logos = [
        "goldapple",
        "gulliver",
        "kia",
        "mts",
        "dantone-home",
        "avito",
        "m-video",
        "megafon",
        "yandex",
        "cc",
    ];

    const advantagesData = {
        title: "Преимущества",
        contents: [
            {
                item_title: "95",
                item_text:
                    "Креативных профессионалов в области дизайна, продюсирования, стратегии и цифровых продуктов",
            },
            {
                item_title: "7",
                item_text:
                    "Проектов в год — скорость пополнения портфолио дизайнера в брендинговом направлении",
            },
            {
                item_title: "5",
                item_text:
                    "Цифровых продуктов в год — скорость пополнения портфолио дизайнера в digital-отделе",
            },
            {
                item_title: "220+",
                item_text: "Международных и локальных наград",
            },
        ],
    };

    const openPositions = [
        {
            title: "New Business Manager",
            slug: "new-business-manager",
        },
        {
            title: "Senior Digital Designer",
            slug: "senior-digital-designer",
        },
        {
            title: "Head of Research (Signal)",
            slug: "head-of-research",
        },
    ];

    const projects = [
        {
            block_title: "Проект «ПОМОЩЬ»",
            block_comment:
                "ликвидация нищеты (1), ликвидация голода (2), хорошее здоровье и благополучие (3)",
            block_description:
                "Одна из целей «убера в сфере благотворительности» — обеспечить достойную жизнь пожилым людям в нашей стране. Мы вдохновились идеей приложения прозрачной помощи, выступили дизайн-партнерами и разработали визуальную систему проекта, включая фирменный шрифт, дизайн сайта и коммуникационные материалы для социальных сетей.",
            video: "https://ony-ru-media.storage.yandexcloud.net/Pomosch/00_head.mp4",
            image_path: "https://api.ony.ru/uploads/blocks/1700136584.png",
        },
        {
            block_title: "Движение экологических инициатив Go Circle",
            block_comment:
                "индустриализация, инновации и инфраструктура (9), ответственное потребление и производство (12), сохранение морских экосистем (14), сохранение экосистем суши (15)",
            block_description:
                "Команда строит инклюзивную, регенеративную и устойчивую экономику через инновации, ответственное потребление и производство. Мы тоже транслируем через дизайн некую культуру, направленную на гармонизацию отношений человека и систем вокруг, поэтому поддержали проект, разработали фирменный стиль и сайт.",
            video: "https://ony-ru-media.storage.yandexcloud.net/Go-circle/head.mp4",
            image_path: "https://api.ony.ru/uploads/blocks/1700136561.png",
        },
    ];

    const departments = [
        {
            id: 1,
            title: "Branding",
            description: "От дизайнера до арт-директора",
        },
        {
            id: 2,
            title: "Digital",
            description: "От дизайнера до арт-директора",
        },
        {
            id: 3,
            title: "Strategy (Signal)",
            description:
                "От первых интервью до бизнес-стратегий крупных клиентов",
        },
        {
            id: 4,
            title: "Producers",
            description: "От менеджера до руководителя отдела",
        },
        {
            id: 6,
            title: "New business",
            description: "От менеджера до директора по развитию бизнеса",
        },
        // {
        //     id: 5,
        //     title: "PR",
        //     description: "От первых статей до запуска новых направлений",
        // },
    ];

    const team = [
        {
            title: "Максим Кельшев",
            position: "Production Head",
            description:
                "Строить процессы с нуля и улучшать существующие — то, что мне действительно нравится делать, на какой бы роли я ни был. Если Вселенная бесконечна, то в какой-то реальности я работаю по специальности на логиста, но в этой — я в ONY, где мне дают возможность раскрывать все свои умения, таланты, а также расти в ролях. Я вижу результаты своих усилий, а команда поддерживает меня и доверяет мне.",
            image: null,
            departments: [4],
        },
        {
            title: "Екатерина Кузнецова",
            position: "Group Head",
            description:
                "Созидание — это луч жизни. Мне всегда хотелось работать в кругу творческих и амбициозных. Сфера дизайна мне в этом смысле очень близка. Мой путь в ONY начинался в 2017 году с роли продюсера сразу в трёх направлениях агентства. Сейчас же я занимаю позицию Group Head в направлении брендинга, где занимаюсь развитием отдела совместно с командой. \r\n</br></br>\r\nКаждый день наполнен интересными и очень разными задачами, общением и прогрессией. За такой опыт я благодарна каждому и очень ценю, что я — часть качественных изменений, которые мы привносим в мир.",
            image: null,
            departments: [4],
        },
        {
            title: "Богдан Чернышов",
            position: "Senior Art Director",
            description:
                "Для меня дизайн — это способ общения человека с миром. Как обычный разговор, только помимо слов мы ещё используем образы, которые помогают нам точнее описать то, что чувствуем. Я пришёл в ONY на позицию мидл-дизайнера и за два года стал арт-директором. За это время я стал лучше разбираться в исследованиях и продукте, но самое важное — я нашёл близких по ценностям людей, с которыми просто приятно проводить время вместе.",
            image: null,
            departments: [2],
        },
        {
            title: "Эмиль Исхаков",
            position: "Арт-директор",
            description:
                "Профессия дизайнера, пожалуй, самое прекрасное, что могло бы со мной случиться. Иметь возможность быть на острие, прикасаться к облику новой культуры. Видеть и создавать продукты и сервисы для новой реальности — это то, что мне действительно нравится. \r\n</br></br>\r\nONY — это место в котором есть все компоненты для стремительного роста дизайнера. Сильная команда, блистательные идеи и проекты. ONY для тех, кто хочет приблизиться к совершенству. Команда, в которой есть душевность, поддержка и доверие.",
            image: null,
            departments: [1],
        },
        {
            title: "Линда Косичкина",
            position: "Арт-директор",
            description:
                "Я пришла в брендинг ONY четвёртым дизайнером, а теперь нас двадцать. Команда по-настоящему супергеройская: у каждого есть своя суперсила, и все они, умножаясь друг на друга, складываются в мозг, способный решить что угодно. Очень приятно быть частью этого постоянно самопрокачивающегося коллективного разума.",
            image: null,
            departments: [1],
        },
        {
            title: "Евгения Зелаутдинова",
            position: "Арт-директор",
            description:
                "Мне нравится наблюдать за тем, как люди мыслят, на что обращают внимание, как они профессионально расширяются. Приятно удивляют своей неординарностью и смелостью. Это вдохновляет. \r\n</br></br>\r\nВ ONY я пришла как дизайнер, а сейчас уже арт-директор. Люблю работу в агентстве за интересные кейсы, свежий взгляд, красоту людей, гибкость в общении и возможность быть в этом каждый день.",
            image: null,
            departments: [1],
        },
        {
            title: "Ольга Коваленко",
            position: "Лидер качественных исследований",
            description:
                "Изучение культуры и людей — один из главных интересов в моей жизни. В Signal я реализую эту страсть с реальной пользой для компаний и брендов. Я очень ценю возможность погружаться в абсолютно разные миры, узнавать что-то новое и при этом помогать компаниям выстраивать свою коммуникацию с уважением к своей аудитории и через глубокое понимание человеческих нужд и потребностей.",
            image: null,
            departments: [3],
        },
        {
            title: "Александр Леднев",
            position: "Стратег",
            description:
                "После окончания соцфака МГУ даже не мог представить, что заниматься исследованиями может быть настолько интересно: актуальные методологии, самые желанные индустрии, коллеги-профессионалы с академическим подходом. Signal помог мне зайти в мир стратегии и продвинуться в нём до уровня старшего стратега. Примерно все мои друзья уже соприкасаются с брендами, в развитии которых я принял участие. Как вам такое?",
            image: null,
            departments: [3],
        },
        {
            title: "Алексей Ребров",
            position: "Group Head New Business Digital/BizDev Director",
            description:
                "Меня всегда привлекали работы и клиенты ONY. Очень хотелось стать частью команды и в каком-то смысле действительно менять мир. В отделе New Business мы имеем уникальную возможность регулярно общаться с экспертами и визионерами. Такие диалоги прокачивают тебя самого и позволяют мыслить на ином уровне. \r\n</br></br>\r\nСвою миссию в агентстве и на рынке я видел в создании лучшего клиентского сервиса. Для меня всегда было важно быть услышанным и не бояться быть инициативным. ONY даёт эти возможности, а они дают людям развиваться и становиться ещё сильнее.",
            image: null,
            departments: [6, 2],
        },
        {
            title: "Марина Кошелева",
            position: "Head of Digital Department",
            description:
                "Изначально я приходила в ONY на позицию продюсера. Помню, что уже после первого собеседования возникло чувство, что это именно то место, где я хочу работать. Мне показали офис, рассказали про ценности компании, вектор развития. Так я поняла, что попала в круг единомышленников, которые горят своей работой, очень серьёзно относятся к качеству продукта, не боятся сложных вызовов и хотят делать мир вокруг себя лучше, как бы банально это ни звучало. \r\n</br></br>\r\nВ работе мне всегда было важно видеть картину целиком, организовывать процессы, координировать команду, общаться с клиентом — как бы складывать кусочки пазла воедино и создавать цельную картину. Через два года мне предложили стать аккаунт-директором. Это было непросто, потому что началась пандемия, но всё сложилось хорошо, ребята меня поддерживали и помогали расти. Сейчас я занимаю должность продакшен-директора.",
            image: null,
            departments: [2],
        },
        {
            title: "Катя Демина",
            position: "Head of New Business Development",
            description:
                "Так вышло, что за работами ONY я начала следить за несколько лет до того, как у меня появилась мысль пойти сюда работать. Мне очень нравилось, что ребята делают и как рассказывают о своей работе. Помню, как читала статью на Village про их офис в квартире на набережной Тараса Шевченко и думала: «Вот это да, неужели так можно было». Всё это очень сильно отличалось от той картинки, которую я сама видела на своей работе ежедневно. \r\n</br></br>\r\nВ продажи я тоже попала в каком-то смысле случайно. Я видела себя в управлении проектами, но в продажи идти не планировала, руководствуясь популярным стереотипом о том, что продажники — это те, кто втюхивают что-то ненужное. Я решила попробовать себя в новой роли на открытой тогда позиции менеджера проектов. Довольно быстро я поняла, что моя суперсила не в том, чтобы втираться в доверие и за счёт этого продавать, а в том, что я могу помогать клиенту разложить по полочкам его проблему и предложить ему классное решение на каждом из этапов. \r\n</br></br>\r\nДля меня крайне важны честность и открытость к диалогу. Именно на этих принципах построена вся работа агентства внутри, что очень сильно помогало мне в работе с клиентами. \r\n</br></br>\r\nСейчас я работаю пятый год в агентстве, с недавних пор в позиции Head of New Business Development. Безумно рада, что сейчас я и сама могу воплощать в жизнь те принципы, которые так вдохновляли меня в ONY ещё десять лет назад.",
            image: null,
            departments: [6],
        },
    ];

    const news = [
        {
            block_title:
                "Октябрь, 2022 — Макс Гончаров провёл лекцию о том, как общаться с клиентами",
            block_date: "2022-10-05",
        },
        {
            block_title:
                "Сентябрь, 2022 — Влад Мд Голам провёл лекцию о вычислительном дизайне",
            block_date: "2022-09-05",
        },
        {
            block_title:
                "Сентябрь, 2022 – Леша Горшков начал преподавать Product-менеджмент и UX-исследования в МИДИС",
            block_date: "2022-09-10",
        },
        {
            block_title:
                "Август, 2022 — Линда Косичкина вошла в состав жюри конкурса «Среда 2022»",
            block_date: "2022-08-05",
        },
        {
            block_title:
                "Август, 2022 — Миша Питерский выступил в BEE с темой «Будущее принта в digital-эпоху»",
            block_date: "2022-08-10",
        },
        {
            block_title:
                "Июль, 2022 –  Аида Пачева вошла в состав жюри «Рейтинга Рунета 2022»",
            block_date: "2022-07-10",
        },
        {
            block_title:
                "Июль, 2022 – Команда Signal провела лекцию на тему «Альфачи и экспериментаторы: исследование культуры секса и контрацепции»",
            block_date: "2022-07-05",
        },
        {
            block_title:
                "Июнь, 2022 – Аида Пачева провела лекцию о цифровой доступности ",
            block_date: "2022-06-05",
        },
        {
            block_title:
                "Май, 2022 – Саша Бородин и Леша Горшков съездили на конференцию Dump в Екатеринбург и рассказали о том, почему дизайнер теперь исследователь",
            block_date: "2022-05-05",
        },
        {
            block_title:
                "Май, 2022 – Саша Бородин запустил свой side-проект Облик",
            block_date: "2022-05-10",
        },
        {
            block_title:
                "Апрель, 2022 – Команда Signal совместно с Friends Moscow.провели вебинар на тему «Что чувствуют сегодня люди и как брендам с ними говорить?»",
            block_date: "2022-04-05",
        },
        {
            block_title:
                "Апрель, 2022 – Мила Мелькина рассказала о новой стратегии и ребрендинге канала 2х2 на Best Cases Conference",
            block_date: "2022-04-06",
        },
        {
            block_title:
                "Апрель, 2022 – Аня Шульгина провела лекцию «Продюсирование брендинговых проектов» в ВШЭ и Институте бизнеса и дизайна",
            block_date: "2022-04-14",
        },
        {
            block_title:
                "Октябрь, 2022 — Вся команда выпустила коллективный зин Alzhan4ik 007 с подписчиками ",
            block_date: "2022-10-10",
        },
        {
            block_title:
                "Октябрь, 2022 — Леша Горшков записал видео в наш telegram-канал о том, как мы модернизировали CJM и сделали ее удобной для дизайнеров",
            block_date: "2022-10-20",
        },
        {
            block_title:
                "Ноябрь, 2022 — Мила Мелькина провела менторские сессии на TECH WEEK 2022",
            block_date: "2022-11-05",
        },
        {
            block_title:
                "Ноябрь, 2022 — Аня Шульгина рассказала в нашем telegram-канале о том, кто такой бренд-продюсер и в чем заключается его роль в агентстве",
            block_date: "2022-11-07",
        },
        {
            block_title:
                "Ноябрь, 2022 — Саша Леднев провел открытую лекцию c mads «Роль стратега в агентстве и в создании крутого бренда»",
            block_date: "2022-11-09",
        },
        {
            block_title:
                "Ноябрь, 2022 — Аида Пачева вошла в состав жюри конкурса MIXX Russia в категории Tools & Craft",
            block_date: "2022-11-11",
        },
        {
            block_title:
                "Ноябрь, 2022 — Максим Орлов, Сергей Сережин и Сергей Лавриненко рассказали Inc. Russia историю ONY ",
            block_date: "2022-11-13",
        },
        {
            block_title:
                "Ноябрь, 2022 — Полина Кравченко и Сергей Григорьев провели лекцию о тяжелой промышленности, заводах и индустриальности",
            block_date: "2022-11-17",
        },
        {
            block_title:
                "Декабрь, 2022 — Саша Леднев провел вебинар с Эйч о том, что делать технологическим брендам в России в условиях новой реальности",
            block_date: "2022-12-05",
        },
        {
            block_title:
                "Декабрь, 2022 — Саша Бородин рассказал в нашем telegram-канале о том, быть арт-директором или не быть?",
            block_date: "2022-12-09",
        },
        {
            block_title:
                "Декабрь, 2022 — Леша Горшков и Максим Гончаров провели вебинар «ONY D Conf: Роль исследований в успехе ecommerce решений»",
            block_date: "2022-12-11",
        },
        {
            block_title:
                "Декабрь, 2022 — Ксения Бабий рассказала Adindex о том, как проводить семиотические исследования и как работает семиотика на примере категории премиальности",
            block_date: "2022-12-16",
        },
        {
            block_title:
                "Декабрь, 2022 — Влад Мд Голам рассказал в нашем telegram-канале о том, кто такой креативный кодер",
            block_date: "2022-12-20",
        },
        {
            block_title:
                "Январь, 2023 — Оля Коваленко и Полина Кравченко провели лекцию о том, как отношение к музыке влияет на пользование музыкальными сервисами",
            block_date: "2023-01-05",
        },
        {
            block_title:
                "Февраль, 2023 — Саша Леднев рассказал в нашем telegram-канале о том, кто такой бренд-стратег",
            block_date: "2023-06-02",
        },
        {
            block_title:
                "Февраль, 2023 — Юра Тычинский рассказал Adindex о позиционировании B2B-tech-компаний",
            block_date: "2023-06-03",
        },
        {
            block_title:
                "Март, 2023 — Саша Леднев провел исследование о том, что делать технологическим брендам в России, чтобы привлечь IT-специалистов",
            block_date: "2023-06-04",
        },
        {
            block_title:
                "Март, 2023 — Максим Гончаров рассказал в нашем telegram-канале о том, кто такой диджитал-продюсер и за что он отвечает в агентстве",
            block_date: "2023-06-05",
        },
        {
            block_title:
                "Март, 2023 — Максим Сойфер, Аида Пачева и Антон Чукин рассказали ADPASS о том, как нейросети влияют на индустрию",
            block_date: "2023-06-06",
        },
        {
            block_title:
                "Март, 2023 — Digital-команда выпустила сайт Итоги года про онбординг, внутренние перестановки и новые услуги, запущенные в 2022 году",
            block_date: "2023-06-07",
        },
        {
            block_title:
                "Март, 2023 —  Леша Горшков рассказал в нашем telegram-канале о том, как и зачем проводить воркшопы в рамках продуктовых исследований",
            block_date: "2023-06-08",
        },
        {
            block_title:
                "Апрель, 2023 —  Аида Пачева рассказала MIXX Russia каким стандартам должна соответствовать работа в крафтовых категориях на дизайн-конкурсах",
            block_date: "2023-07-01",
        },
        {
            block_title:
                "Апрель, 2023 — Максим Гончаров выступил на digital-стендапе MIND-15 с темой «Правки в сдаче проекта»",
            block_date: "2023-07-03",
        },
        {
            block_title:
                "Май, 2023 — Junior-дизайнеры брендинговой команды рассказали про первые проекты в ONY в нашем инстаграме команды",
            block_date: "2023-07-06",
        },
        {
            block_title:
                "Май, 2023 — Богдан Чернышов сходил в «Рефодушки» и рассказал о своем пути в дизайн",
            block_date: "2023-07-07",
        },
        {
            block_title:
                "Июнь, 2023 — Ваня Петров рассказал в нашем telegram-канале о том, кто такой дизайнер шрифтов",
            block_date: "2023-07-08",
        },
        {
            block_title:
                "Июнь, 2023 – Аида Пачева и Максим Гончаров рассказали о том, как мы делали имиджевый сайт для винодельни GALITSKIY & GALITSKIY на Best Cases Conference",
            block_date: "2023-07-10",
        },
        {
            block_title:
                "Июнь, 2023 — Алёна Шульга поделилась методами генерации идей в нашем инстаграме команды",
            block_date: "2023-07-11",
        },
    ];

    const internship = [
        {
            description:
                "Так исторически сложилось, что в ONY нет практики стажировок, но иногда мы берём в команду таланты на вырост. Оставить свою почту и оказаться в нашей базе дизайнеров можно здесь.",
        },
    ];

    const education = [
        {
            item_title: "",
            video: "",
            block_description:
                "Команда ONY мультидисциплинарна, поэтому мы регулярно делимся знаниями в формате лекций Skill Share Club. Например, летом 2022 года digital-команда рассказала об особенностях цифровой доступности, брендинг —  о вычислительном дизайне, а стратеги из Signal поделились исследованием о культуре секса и контрацепции.",
            image_path: "https://api.ony.ru/uploads/blocks/1700136638.png",
        },
        {
            item_title: "",
            video: "",
            block_description:
                "Команда брендинга проводит Random Cinema Club по Cinema 4D, практикует навыки публичных выступлений и защит своих идей на What the Slide. Помимо внутреннего обучения, мы отправляем за новыми знаниями в BBE, pioneum, к Ване Замесину и Product Mindset – это школы и люди, которым мы доверяем.",
            image_path: "https://api.ony.ru/uploads/blocks/1700136648.png",
        },
    ];

    const officeSlider = [
        {
            text: "офис",
            image: "/assets/images/hr/office/office-1.jpeg",
        },
        {
            text: "офис",
            image: "/assets/images/hr/office/office-2.jpg",
        },
        {
            text: "офис",
            image: "/assets/images/hr/office/office-3.jpg",
        },
        {
            text: "офис",
            image: "/assets/images/hr/office/office-4.jpg",
        },
        {
            text: "офис",
            image: "/assets/images/hr/office/office-5.jpg",
        },
        {
            text: "офис",
            image: "/assets/images/hr/office/office-6.jpg",
        },
        {
            text: "офис",
            image: "/assets/images/hr/office/office-7.jpg",
        },
    ];

    const teamSlider = [
        {
            text: "ONY ASIA’22",
            image: "/assets/images/hr/team/asia2022/cnt_team_2.jpeg",
        },
        {
            text: "ONY ASIA’22",
            image: "/assets/images/hr/team/asia2022/cnt_team_1.jpeg",
        },
        {
            text: "ONY ASIA’22",
            image: "/assets/images/hr/team/asia2022/cnt_team_3.jpeg",
        },
        {
            text: "ONY ASIA’22",
            image: "/assets/images/hr/team/asia2022/cnt_team_4.jpeg",
        },
        {
            text: "Black&White’21",
            image: "/assets/images/hr/team/blackwhite2021/cnt_team_1.jpg",
        },
        {
            text: "Black&White’21",
            image: "/assets/images/hr/team/blackwhite2021/cnt_team_2.jpg",
        },
        {
            text: "Black&White’21",
            image: "/assets/images/hr/team/blackwhite2021/cnt_team_3.jpg",
        },
        {
            text: "ONY Rave’19",
            image: "/assets/images/hr/team/rave2019/cnt_team_1.jpeg",
        },
        {
            text: "ONY Rave’19",
            image: "/assets/images/hr/team/rave2019/cnt_team_2.jpeg",
        },
        {
            text: "ONY Rave’19",
            image: "/assets/images/hr/team/rave2019/cnt_team_3.jpeg",
        },
        {
            text: "ON(Y)WAVES’22",
            image: "/assets/images/hr/team/waves2022/cnt_waves-1.jpg",
        },
        {
            text: "ON(Y)WAVES’22",
            image: "/assets/images/hr/team/waves2022/cnt_waves-2.jpg",
        },
        {
            text: "ON(Y)WAVES’22",
            image: "/assets/images/hr/team/waves2022/cnt_waves-3.jpg",
        },
        {
            text: "ON(Y)WAVES’22",
            image: "/assets/images/hr/team/waves2022/cnt_waves-4.jpg",
        },
    ];

    return (
        <Layout title="Работа в ONY">
            <div class="wrapper join">
                <Header headerClass="inverse" />

                <main class="main join">
                    <div class="join__intro">
                        <section class="intro inverse">
                            <div class="intro__container">
                                <h1 class="intro__title h1 inverse">
                                    Создавай лучшие дизайн-проекты для топовых
                                    компаний и&nbsp;сервисов
                                </h1>

                                <div class="intro__partners-logos">
                                    <div class="partners-logos">
                                        <div class="partners-logos__track">
                                            <div class="partners-logos__line">
                                                {[...logos, ...logos].map(
                                                    (name, i) => (
                                                        <div class="partners-logos__item">
                                                            <div
                                                                class={`partners-logos__icon partners-logos__icon--${name}`}
                                                            >
                                                                <img
                                                                    src={`/assets/images/partners-logos/${name}.svg`}
                                                                    alt={name}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__advantages">
                        <section class="advantages">
                            <div class="advantages__container">
                                <div class="advantages__list">
                                    {advantagesData.contents.map(
                                        (item, index) => (
                                            <div
                                                class="advantages__item"
                                                key={index}
                                            >
                                                <div class="advantages__item-title h2">
                                                    {item.item_title}
                                                </div>
                                                <div class="advantages__item-text">
                                                    {item.item_text}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__video">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            data-wf-ignore="true"
                            data-object-fit="cover"
                        >
                            <source
                                src="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/20-Years-ONY.mp4"
                                type="video/mp4"
                                data-wf-ignore="true"
                            />
                        </video>
                    </div>

                    <div class="join__open-positions">
                        <section class="infoblock open-positions">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">
                                            Сейчас мы в поиске
                                        </h3>
                                    </div>
                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__list">
                                            {openPositions.map(
                                                (position, index) => (
                                                    <a
                                                        key={index}
                                                        href={`/vacancy/${position.slug}`}
                                                        class="infoblock__item services-card"
                                                    >
                                                        <div class="services-card__top">
                                                            {position.title}
                                                        </div>
                                                        <svg
                                                            class="svg-icon"
                                                            viewBox="0 0 30 30"
                                                            width="40"
                                                            height="40"
                                                        >
                                                            <use xlink:href="#svg-arrow-right"></use>
                                                        </svg>
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__bubbles">
                        <section class="bubbles">
                            <h3 class="bubbles__subtitle">Наши ценности</h3>
                            <div class="bubbles__wr">
                                <div class="bubbles-item">
                                    <div class="bubbles-item__wr">
                                        <div class="bubbles-item__title">
                                            Поддержка идей
                                        </div>
                                        <div class="bubbles-item__hidden">
                                            <span>
                                                В&nbsp;ONY люди продвигают
                                                собственные инициативы, меняют
                                                реальность и&nbsp;берут
                                                за&nbsp;это ответственность.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bubbles-item">
                                    <div class="bubbles-item__wr">
                                        <div class="bubbles-item__title">
                                            Развитие
                                        </div>
                                        <div class="bubbles-item__hidden">
                                            <span>
                                                Если наши ценности совпадут,
                                                то&nbsp;за&nbsp;год работы
                                                вы&nbsp;пройдёте мощнейший
                                                level&nbsp;up. И&nbsp;дальше
                                                в&nbsp;том&nbsp;же темпе.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bubbles-item">
                                    <div class="bubbles-item__wr">
                                        <div class="bubbles-item__title">
                                            Сила команды
                                        </div>
                                        <div class="bubbles-item__hidden">
                                            <span>
                                                Взгляд с&nbsp;нескольких
                                                перспектив, постоянный фидбэк
                                                и&nbsp;поиск лучших решений
                                                в&nbsp;точке пересечения разных
                                                мнений.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__projects">
                        <section class="projects inverse">
                            <h2 class="projects__title h2">
                                Помимо реализации коммерческих работ,
                                мы&nbsp;поддерживаем и&nbsp;помогаем проектам
                                в&nbsp;области устойчивого развития, которые
                                учат нас заботиться о&nbsp;людях и&nbsp;планете.
                            </h2>
                            <div class="projects__overflow">
                                <div class="projects__wr">
                                    {projects.map((project, index) => (
                                        <div key={index} class="projects-item">
                                            <div class="projects-item__image">
                                                <h3 class="projects-item__image--hidden">
                                                    <a
                                                        href={project.video}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {project.block_title}
                                                    </a>
                                                </h3>
                                                <img
                                                    src={project.image_path}
                                                    alt=""
                                                    style={{ width: "100%" }}
                                                />
                                            </div>

                                            <div class="projects-item__text">
                                                <h3>
                                                    <a
                                                        href={project.video}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {project.block_title}
                                                    </a>
                                                </h3>
                                                <p>
                                                    {project.block_description}
                                                </p>
                                                <p>
                                                    <strong>
                                                        {project.block_comment}
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__film inverse">
                        <div class="join__film__wr">
                            <h2 class="join__film__title">
                                Почему дизайн тоже должен быть экологичным
                                рассказываем в киноальманахе «33 слова
                                о&nbsp;дизайне»
                            </h2>{" "}
                            <div target="_blank" class="join__film__video">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/Ox_e_CM04xE?controls=0"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen="allowfullscreen"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <div class="join__team">
                        <section class="team inverse">
                            <h2 class="team__title h2">
                                У&nbsp;нас понятный карьерный трек и&nbsp;есть
                                все возможности быстро расти&nbsp;&mdash;
                                от&nbsp;дизайнера до&nbsp;арт-директора,
                                от&nbsp;продюсера до&nbsp;групп хеда.
                            </h2>
                            <div class="team__filter">
                                {departments.map((dep, i) => (
                                    <h3
                                        class={
                                            "team__filter-title" +
                                            (i === 0 ? "" : " is-hidden")
                                        }
                                        data-id={dep.id}
                                    >
                                        {dep.description}
                                    </h3>
                                ))}
                                <div class="team__filter-btns-overflow">
                                    <div class="team__filter-btns">
                                        {departments.map((dep, i) => (
                                            <button
                                                class={
                                                    "team__filter-btn" +
                                                    (i === 0
                                                        ? " is-active"
                                                        : "")
                                                }
                                                data-elts="filterCareer"
                                                data-id={dep.id}
                                            >
                                                {dep.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div class="team__members">
                                {team.map((person) => (
                                    <div
                                        class={
                                            "team-item" +
                                            (person.departments[0] !==
                                            departments[0].id
                                                ? " is-hidden"
                                                : "")
                                        }
                                        data-elts="toggleActive filterCareerTarget"
                                        data-id={person.departments[0]}
                                    >
                                        <div class="team-item__name">
                                            {person.title}
                                        </div>
                                        <div class="team-item__info">
                                            {person.position}
                                            <div class="team-item__hidden">
                                                {person.description}
                                            </div>
                                        </div>
                                        <div class="team-item__btn">
                                            <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 14H29V16H1V14Z"
                                                    fill="white"
                                                ></path>{" "}
                                                <path
                                                    d="M14 29V1H16V29H14Z"
                                                    fill="white"
                                                ></path>
                                            </svg>{" "}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div class="join__news">
                        <section class="news inverse">
                            <div class="news__block">
                                <h2 class="news__title">Новости</h2>
                                <div class="news__content">
                                    <div class="news__tabs">
                                        <button
                                            class="news__tab"
                                            data-elts="filterNews"
                                            data-type="current"
                                        >
                                            Актуальное
                                        </button>
                                        <button
                                            class="news__tab"
                                            data-elts="filterNews"
                                            data-type="past"
                                        >
                                            Было
                                        </button>
                                    </div>
                                    <div class="news__items">
                                        {news.map((item) => (
                                            <div
                                                class="news-item"
                                                data-elts="filterNewsTarget"
                                                data-date={item.block_date}
                                            >
                                                {item.block_title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__internship">
                        <section class="internship inverse">
                            <div class="internship__block">
                                <h2 class="internship__title">Стажировка</h2>
                                <div class="internship__content">
                                    <h2 class="internship__subtitle">
                                        {internship[0].description}
                                    </h2>
                                    <form
                                        // action={env.API_URL + ''}
                                        id="internshipForm"
                                        method="POST"
                                        class="internship__form"
                                        data-elt="internshipForm"
                                    >
                                        <div class="internship__form-fields">
                                            <div class="text-field-container">
                                                <label
                                                    for="email"
                                                    class="field-label"
                                                >
                                                    Почта
                                                </label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    class="text-field"
                                                />
                                            </div>
                                            <div class="internship___checkbox">
                                                <Checkbox name="agreement" />
                                            </div>
                                        </div>
                                        <div class="internship__form-submit">
                                            <Button label="Отправить" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__education">
                        <section class="education inverse">
                            <div class="education__block">
                                <h2 class="education__title">Обучение</h2>
                                <div class="education__content">
                                    <div class="education__items">
                                        {education.map((item) => (
                                            <div class="education__item">
                                                <img
                                                    src={item.image_path}
                                                    alt=""
                                                />
                                                <p>{item.block_description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__office">
                        <section class="office">
                            <div class="office__block">
                                <h2 class="office__title">Офис</h2>
                                <div class="office__content">
                                    <div class="office__text">
                                        В&nbsp;ONY гибридный формат работы.
                                        Например, команда брендинга почти вся
                                        находится в&nbsp;Москве
                                        и&nbsp;собирается по&nbsp;средам
                                        и&nbsp;пятницам в&nbsp;офисе. Команда
                                        диджитала наоборот&nbsp;&mdash; почти
                                        вся в&nbsp;онлайне и&nbsp;раскидана
                                        по&nbsp;странам и&nbsp;городам.
                                    </div>
                                </div>
                            </div>
                            <div class="office__slider">
                                <div class="swiper">
                                    <div class="swiper-wrapper">
                                        {officeSlider.map((item) => (
                                            <div class="swiper-slide">
                                                <div class="office__image">
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div class="swiper-controls">
                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-button-next"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="office__block">
                                <h2 class="office__title"></h2>
                                <div class="office__content">
                                    <div class="office__text">
                                        Наш офис находится на&nbsp;Красном
                                        октябре. Это идеальное место для работы
                                        и&nbsp;творчества. Там есть бар,
                                        библиотека, подкастерская, синтезатор
                                        и&nbsp;барабанная установка. Дизайнеры
                                        из&nbsp;брендинга выпускают свой зин,
                                        digital рефлексирует
                                        на&nbsp;еженедельных ретроспективах,
                                        а&nbsp;Signal проводит внутри команды
                                        воркшопы. А&nbsp;ещё&nbsp;&mdash;
                                        мы&nbsp;вместе готовим ланчи, катаемся
                                        на&nbsp;скейте вдоль набережной
                                        Москва-реки, плетём генеративный ковёр
                                        и&nbsp;часто устраиваем спонтанные
                                        вечеринки.
                                    </div>
                                </div>
                            </div>

                            <div class="office__slider-second">
                                <div class="swiper">
                                    <div class="swiper-wrapper">
                                        {teamSlider.map((item) => (
                                            <div class="swiper-slide">
                                                <div class="office__image">
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                    />
                                                    <p>{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div class="swiper-controls">
                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-button-next"></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__podcast">
                        <section class="podcast inverse">
                            <div class="podcast__block">
                                <h2 class="podcast__title"></h2>
                                <div class="podcast__content">
                                    <div class="podcast__text">
                                        <p>
                                            В&nbsp;подкасте &laquo;Тема
                                            не&nbsp;раскрыта&raquo;
                                            мы&nbsp;говорим о&nbsp;простых
                                            вещах, понятиях и&nbsp;явлениях,
                                            из&nbsp;которых состоит наша жизнь.
                                        </p>
                                        <p>
                                            Три выпуска&nbsp;&mdash; три
                                            разговора: о&nbsp;черном цвете,
                                            форме и&nbsp;размерах, визаульном
                                            детоксе и&nbsp;наших чувствах
                                            ко&nbsp;всему этому.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="podcast__overflow">
                                <div class="podcast__wrapper">
                                    <div class="podcast-item">
                                        <div class="podcast-item__video">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src="https://www.youtube.com/embed/J1zrkwNjTec?controls=0"
                                                title="YouTube video player"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen="allowfullscreen"
                                            ></iframe>
                                        </div>
                                        <span>
                                            Тема не раскрыта #1 Визуальный
                                            детокс
                                        </span>
                                    </div>

                                    <div class="podcast-item">
                                        <div class="podcast-item__video">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src="https://www.youtube.com/embed/e9BNmyshB5E?controls=0"
                                                title="YouTube video player"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen="allowfullscreen"
                                            ></iframe>
                                        </div>
                                        <span>Тема не раскрыта #2 РАЗМЕРЫ</span>
                                    </div>

                                    <div class="podcast-item">
                                        <div class="podcast-item__video">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src="https://www.youtube.com/embed/RCkbUWywuR0?controls=0"
                                                title="YouTube video player"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen="allowfullscreen"
                                            ></iframe>
                                        </div>
                                        <span>
                                            Тема не раскрыта #3 Черный цвет
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="join__form">
                        <section class="form inverse form--main">
                            <div class="form__block">
                                <h2 class="form__heading">Анкета</h2>
                                <div class="form__content">
                                    <p class="form__text">
                                        Возможно, что именно сейчас вакансии под
                                        ваш профиль нет, но&nbsp;мы всегда
                                        заинтересованы в&nbsp;знакомстве
                                        с&nbsp;уникальными специалистами.
                                        Заполните небольшую анкету
                                        и&nbsp;давайте знакомиться.
                                    </p>
                                    <form
                                        // action={env.API_URL + ''}
                                        id="joinForm"
                                        method="POST"
                                        class="form__form"
                                        data-elt="joinForm"
                                    >
                                        <div class="text-field-container">
                                            <label
                                                for="name"
                                                class="field-label"
                                            >
                                                Имя
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                class="text-field"
                                            />
                                        </div>

                                        <div class="text-field-container">
                                            <label
                                                for="surname"
                                                class="field-label"
                                            >
                                                Фамилия
                                            </label>
                                            <Input
                                                id="surname"
                                                name="surname"
                                                type="text"
                                                class="text-field"
                                            />
                                        </div>

                                        <div class="form__form-department">
                                            <p class="form__form-subtitle">
                                                Направление
                                            </p>
                                            <div class="form__checkbox-container">
                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"branding"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="Branding"
                                                                id="branding"
                                                                class="checkbox__input"
                                                                checked
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>
                                                                Branding
                                                            </span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "branding"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"digital"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="Digital"
                                                                id="digital"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>Digital</span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "digital"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"strategy"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="Strategy (Signal)"
                                                                id="strategy"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>
                                                                Strategy
                                                                (Signal)
                                                            </span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "strategy"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"producers"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="Producers"
                                                                id="producers"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>
                                                                Producers
                                                            </span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "producers"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"pr"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="PR"
                                                                id="pr"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>PR</span>
                                                        </label>
                                                        <div
                                                            data-error={"pr"}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"newBusiness"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="New Business"
                                                                id="newBusiness"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>
                                                                New Business
                                                            </span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "newBusiness"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"other"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="department"
                                                                value="Свой вариант"
                                                                id="other"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>
                                                                Свой вариант
                                                            </span>
                                                        </label>
                                                        <div
                                                            data-error={"other"}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form__form-level">
                                            <p class="form__form-subtitle">
                                                Ваш уровень
                                            </p>
                                            <div
                                                class="form__checkbox-container"
                                                data-input={"junior"}
                                            >
                                                <div class="form__form-checkbox">
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                value="Junior"
                                                                id="junior"
                                                                class="checkbox__input"
                                                                checked
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>Junior</span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "junior"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"middle"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                value="Middle"
                                                                id="middle"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>Middle</span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "middle"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"senior"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                value="Senior"
                                                                id="senior"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>Senior</span>
                                                        </label>
                                                        <div
                                                            data-error={
                                                                "senior"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div
                                                    class="form__form-checkbox"
                                                    data-input={"lead"}
                                                >
                                                    <div class="form__checkbox">
                                                        <label class="checkbox__label">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                value="Lead"
                                                                id="lead"
                                                                class="checkbox__input"
                                                            />
                                                            <span class="checkbox__icon"></span>
                                                            <span>Lead</span>
                                                        </label>
                                                        <div
                                                            data-error={"lead"}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-field-container">
                                            <label
                                                for="portfolio"
                                                class="field-label"
                                            >
                                                Ссылка на портфолио
                                            </label>
                                            <Input
                                                id="portfolio"
                                                name="portfolio"
                                                type="text"
                                                class="text-field"
                                            />
                                        </div>

                                        <div class="text-field-container">
                                            <InputFile
                                                id="resume"
                                                name="file"
                                                type="file"
                                                label="Прикрепить резюме"
                                            />
                                        </div>

                                        <div class="text-field-container text-field-container--full">
                                            <label
                                                for="company"
                                                class="field-label"
                                            >
                                                Предыдущее место работы
                                            </label>
                                            <Input
                                                id="company"
                                                name="company"
                                                type="text"
                                                class="text-field"
                                            />
                                        </div>

                                        <div class="text-field-container text-field-container--full">
                                            <label
                                                for="best_project"
                                                class="field-label"
                                            >
                                                Каким из&nbsp;реализованных
                                                проектов вы&nbsp;гордитесь
                                                больше всего?
                                            </label>
                                            <Input
                                                id="best_project"
                                                name="best_project"
                                                type="text"
                                                class="text-field"
                                            />
                                        </div>

                                        <div class="text-field-container text-field-container--full">
                                            <label
                                                for="contact"
                                                class="field-label"
                                            >
                                                Ваш email или telegram для связи
                                            </label>
                                            <Input
                                                id="contact"
                                                name="contact"
                                                type="text"
                                                class="text-field"
                                            />
                                        </div>

                                        <div class="form__form-submit">
                                            <Button label="Отправить" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer footerClass="inverse" />
            </div>
        </Layout>
    );
};
