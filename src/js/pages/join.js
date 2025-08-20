import DOMFactory from "../utils/DOM.js";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import FormFactory from "../app/Form.js";

Swiper.use([Navigation, Autoplay]);

document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".swiper", {
        loop: true,
        slidesPerView: "auto",
        speed: 1000,
        autoplay: {
            delay: 2000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            576: {
                spaceBetween: 10,
            },
            0: {
                spaceBetween: 0,
            },
        },
    });
});

const DOM = DOMFactory();

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
        description: "От первых интервью до бизнес-стратегий крупных клиентов",
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
        block_title: "Май, 2022 – Саша Бородин запустил свой side-проект Облик",
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

// Фильтруем сотрудников
const filter = (button) => {
    const { id } = button.dataset;

    // Переключаем активный класс для кнопок
    DOM.filterCareer.map((filterBtn) => {
        filterBtn.classList.toggle("is-active", filterBtn === button);
    });

    // Показываем или скрываем элементы в зависимости от фильтра
    DOM.filterCareerTarget.map((elt) => {
        const eltId = elt.dataset.id;
        elt.classList.toggle("is-hidden", id !== eltId);
    });

    // Обновляем описание в заголовке в зависимости от активного фильтра
    const activeDepartment = departments.find((dep) => dep.id === parseInt(id));
    if (activeDepartment) {
        const titleElement = document.querySelector(".team__filter-title");
        titleElement.textContent = activeDepartment.description;
    }
};

// Фильтруем новости
document.addEventListener("DOMContentLoaded", () => {
    const newsItems = Array.from(document.querySelectorAll(".news-item"));

    const filterNews = (type) => {
        // Сортируем новости от самой новой к самой старой
        const sortedNews = newsItems.slice().sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateB - dateA;
        });

        // Находим самую последнюю дату в массиве для фильтрации
        const latestDate = new Date(
            Math.max(...sortedNews.map((item) => new Date(item.dataset.date)))
        );

        // Два месяца назад от самой последней даты
        const twoMonthsAgo = new Date(latestDate);
        twoMonthsAgo.setMonth(latestDate.getMonth() - 2);

        // Активируем нужную вкладку
        document.querySelectorAll(".news__tab").forEach((btn) => {
            btn.classList.toggle("is-active", btn.dataset.type === type);
        });

        // Фильтруем новости по типу (current или past)
        const filteredNewsItems = sortedNews.filter((item) => {
            const itemDate = new Date(item.dataset.date);
            return itemDate >= twoMonthsAgo ? "current" : "past";
        });

        // Скрываем все новости
        newsItems.forEach((item) => {
            item.classList.add("is-hidden");
        });

        // Вставляем новости в контейнер
        const container = document.querySelector(".news__items");

        if (type === "current") {
            // Показываем только первые 5 новостей для актуальных
            filteredNewsItems.slice(0, 5).forEach((item) => {
                container.appendChild(item);
                item.classList.remove("is-hidden");
            });
        } else if (type === "past") {
            // Показываем новости начиная с 5 (исключаем первые 5 из старых и 5 из актуальных)
            const newsToShow = filteredNewsItems.slice(5).filter((item) => {
                // Исключаем те новости, которые уже в актуальном
                return !filteredNewsItems.slice(0, 5).includes(item);
            });

            // Добавляем новости, начиная с 5, в правильном порядке
            newsToShow.forEach((item) => {
                container.appendChild(item);
                item.classList.remove("is-hidden");
            });
        }
    };

    // Назначаем слушатели для вкладок
    document.querySelectorAll(".news__tab").forEach((button) => {
        button.addEventListener("click", () => {
            filterNews(button.dataset.type);
        });
    });

    // По умолчанию вызываем фильтрацию "Актуальное"
    filterNews("current");
});

// Формы
const joinForm = document.querySelector('[data-elt="joinForm"]');
const internshipForm = document.querySelector('[data-elt="internshipForm"]');

const forms = FormFactory([
    {
        form: joinForm,

        maskModule: (input, maskProps) => {
            const im = new Inputmask.default(maskProps);
            im.mask(input);
        },
        clearForm: false,
        afterSubmit: (res) => {
            if (res.code === 200) {
                location.assign("/success");
            }

            return false;
        },
        constraints: {
            name: {
                presence: {
                    errorMessage: () => `Пожалуйста, укажите имя`,
                },
            },
            surname: {
                presence: {
                    errorMessage: () => `Пожалуйста, укажите фамилию`,
                },
            },
            file: {
                presence: false,
                size: "102400",
                ext: ["image/jpeg", "image/png", "application/pdf"],
            },
        },
    },

    {
        form: internshipForm,
        maskModule: (input, maskProps) => {
            const im = new Inputmask.default(maskProps);
            im.mask(input);
        },
        clearForm: false,
        afterSubmit: (res) => {
            if (res.code === 200) {
                location.assign("/success");
            }

            return false;
        },
        constraints: {
            email: {
                presence: {
                    errorMessage: () => "Пожалуйста, укажите email",
                },
                email: {
                    errorMessage: () => "Введите корректный email",
                },
            },
            agreement: {
                presence: {
                    errorMessage: () => "Необходимо согласие",
                },
            },
        },
    },
]);

export default () => {
    if (!DOM.filterCareer || !DOM.filterCareer.length) return;

    // Добавляем обработчик клика для всех кнопок
    DOM.filterCareer.map((elt) => {
        elt.addEventListener("click", (e) => filter(elt));
    });
};
