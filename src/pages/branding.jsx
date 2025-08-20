import Layout from '#@/layouts/Layout.jsx';
import Header from '#@/components/Header.jsx';
import Footer from '#@/components/Footer.jsx';

export const staticPage = false;

export default async ({ data }) => {
    const bubbles = [
        {
            "letter": "а",
            "title": "Мультидисци-<br/>плинарный <br/>брендинг",
            "content": "Новые идеи и решения рождаются на пересечении мнений и экспертиз. Мультидисциплинарность нашей команды даёт возможность найти ответы не на поверхности, а в точке, где решение будет объёмным и многогранным. Мы продумываем различные форматы офлайн и онлайн присутствия, чтобы брендинг легко масштабировался, бесшовно входил в контекст и органично жил в любой среде, не теряя характера и целостности. Будь то наружная реклама или кнопка в интерфейсе — мультидисциплинарный подход делает образ продукта близким аудитории в любой точке&nbsp;&nbsp;контакта."
        }, {
            "letter": "б",
            "title": "Future<br/>thinking",
            "content": "Все наши решения основаны на продуманной стратегии и научном подходе, глубинных исследованиях, трендфоркастинге и работе с культурными кодами. Это даёт нам возможность создавать долгосрочный дизайн, который способен привлекать новую аудиторию, не теряя старую, и сохранять актуальность вопреки течению времени."
        }, {
            "letter": "в",
            "title": "Осмысленная<br/>эстетика",
            "content": "Решение задачи начинается на уровне функциональности — продукт должен быть понятным и удобным в использовании. Но чтобы заполучить любовь — именно любовь, а не просто внимание — пользователя, важно не то, ЧТО мы делаем, а КАК. Проекты ONY невозможны без осмысленной эстетики и внимания к деталям. Вся наша команда живёт идеей о функциональном дизайне, в котором огромную роль играет красота. Именно красота наполняет базовое удобство смыслами и изящными деталями, делает продукт интересным и неповторимым. За такими решениями к нам приходят клиенты, и именно такие продукты выбирают для себя пользователи."
        }
    ]

    const process = [
        {
            "id": 1,
            "group": 1,
            "title": "Вводные проектные исследования",
            "content": "Глубокое понимание задачи и четко сформулированные критерии оценки помогают нам лучше слышать друг друга, а дизайн-командам синхронизироваться между собой. Вступительная встреча, анализ вводных данных, серия интервью / воркшоп, аналитика категории и конкурентов."
        }, {
            "id": 2,
            "group": 1,
            "title": "Дизайн-аудит",
            "content": "При работе по обновлению визуального языка мы всегда рекомендуем проводить дизайн-аудит — подробный разбор существующего стиля, интервью с дизайнерами, понимание внутреннего ресурса и формулировка критериев оценки нашей работы."
        }, {
            "id": 3,
            "group": 1,
            "title": "Нейминг",
            "content": "Яркое запоминающееся название компании, продукта или сервиса способно не только вдохновить клиента, но и закладывает мощный фундамент для развития визуального языка и дальнейшей коммуникации бренда."
        }, {
            "id": 4,
            "group": 2,
            "title": "Визуальная концепция",
            "content": "На этапе концептинга мы ищем метафору, исследуем возможности дополнительной графики, фотостиля и иллюстраций, ищем логотип и типографический тритмент. Думаем широко: оцениваем диджитал- и моушен-потенциал визуального языка, думаем про развитие визуального языка в долгосрочной перспективе."
        }, {
            "id": 5,
            "group": 2,
            "title": "Подбор и разработка шрифта",
            "content": "Мы можем предложить разработку уникального шрифта под вашу задачу. Часто при большом количестве лицензиатов и серьёзном потоке просмотров на сайте или в приложении разработка собственного шрифта может оказаться экономически выгодней приобретенной лицензии."
        }, {
            "id": 6,
            "group": 3,
            "title": "Фирменная иллюстрация",
            "content": "На этапе концептинга мы показываем look&feel корпоративной иллюстрации на одном-трёх примерах с использованием референсов. Разработка уникального стиля корпоративной иллюстрации и описание правил по их созданию могут войти в дополнительный пул работ. Также мы можем провести воркшоп для дизайн-команды клиента, где расскажем, как за несколько шагов придумать уникальный стиль иллюстраций, поддерживающий характер бренда."
        }, {
            "id": 7,
            "group": 3,
            "title": "Фотостиль",
            "content": "На этапе концептинга мы показываем look&feel фотостиля с использованием референсов. Детальная проработка и описание фотостиля и правил ретуши изображений входят в дополнительный пул работ, в рамках которого мы также можем провести референсный фотошут — исходники этих изображений и права на их использование передаются клиенту."
        }, {
            "id": 8,
            "group": 4,
            "title": "CG & Motion identity",
            "content": "Мы уделяем особое внимание продумыванию анимационного потенциала айдентики. Сегодня бренд обязан жить в подвижных форматах: микроанимации на сайте, видео на ютубе, тик-ток, сториз. Поэтому разработке и описанию правил, по которым бренд будет жить в подвижной среде, стоит посвятить отдельное время."
        }, {
            "id": 9,
            "group": 4,
            "title": "Коммуникационные форматы",
            "content": "Мы можем разработать коммуникационную стратегию, а затем создать форматы для запуска или перезапуска вашего бренда. Это может быть простая система наружки или масштабная кампания 360 с использованием самых разных форматов и медиа."
        }, {
            "id": 10,
            "group": 4,
            "title": "Упаковка",
            "content": "Точечная работа с формой и материалами позволяет нам создать более цельный образ бренда и перенести визуальный язык с экрана в реальную среду, работая не только с визуальными, но и с тактильными компонентами бренда."
        }, {
            "id": 11,
            "group": 4,
            "title": "Audio Branding",
            "content": "Звук — это естественный канал потребления информации, один из инстинктивных и самых понятных для нас каналов коммуникации. Занимаясь брендингом, мы считаем необходимым использовать этот арсенал средств выражения в работе над большими и значимыми проектами."
        }, {
            "id": 12,
            "group": 5,
            "title": "Гайдлайны / Digital",
            "content": "На этом этапе мы проверяем и систематизируем все визуальные приёмы, отметаем лишнее, собираем мастер-макеты и мастер-анимации. Затем формируем подробный гайдлайн, описывающий базовые элементы стиля и принципы макетирования, а также включающий в себя описания «внутренних проектов» (например, стиля иллюстраций, фотостиля, иконографики и пр.)"
        }, {
            "id": 13,
            "group": 6,
            "title": "Воркшопы",
            "content": "Мы готовы устроить вашей команде большое погружение в стиль на воркшопе по работе с системой."
        }, {
            "id": 14,
            "group": 7,
            "title": "PR-поддержка",
            "content": "Мы можем поучаствовать в подготовке к запуску проекта — напишем текст о кейсе, создадим эффектную подачу для презентации обновлённого образа бренда на медиа-ресурсах, подготовим ролик о проекте."
        }, {
            "id": 15,
            "group": 8,
            "title": "Арт-контроль",
            "content": "После запуска наша работа не заканчивается. Мы готовы отсматривать результаты работ дизайн-команды клиента, устраивать артдирекшен-сессии или полноценные воркшопы для передачи дополнительных знаний команде и решения возникающих при работе со стилем вопросов. При необходимости включимся в процесс и поможем с решением конкретных оформительских задач."
        }
    ]

    const metaTags = {
        description: 'Создание бренда и броадкаст, айдентика, разработка фирменных шрифтов, иллюстраций и многое другое | Чтобы заказать — заполните бриф на сайте или звоните +7(495) 120-78-88',
        ogDescription: 'Создание бренда и броадкаст, айдентика, разработка фирменных шрифтов, иллюстраций и многое другое | Чтобы заказать — заполните бриф на сайте или звоните +7(495) 120-78-88',
    }

    const groupedProcess = process.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});

    // TODO: интегрировать данные
    const title = data.data.title;
    const dataProjects = data.struct_data.find(d => d.id == 'branding_1465823292784').projects;
    const dataManifest = data.struct_data.find(d => d.id == 'branding_378336075695');
    const dataShowreel = data.struct_data.find(d => d.id == 'branding_1546375329940');
    const dataDescription = data.struct_data.find(d => d.id == 'branding_445296151550').description;
    const dataProjects1 = data.struct_data.find(d => d.id == 'branding_1281732582755').projects;
    const dataApproach = data.struct_data.find(d => d.id == 'branding_138971162309');
    const dataServices = data.struct_data.find(d => d.id == 'branding_1262530596334');
    const dataProjects2 = data.struct_data.find(d => d.id == 'branding_705668676543').projects;
    const dataProcess = data.struct_data.find(d => d.id == 'branding_1335455499744');
    const dataProjects3 = data.struct_data.find(d => d.id == 'branding_851628089184').projects;
    const dataAwards = data.struct_data.find(d => d.id == 'branding_1036181713699');
    const dataAwardsChronology = Object.entries(dataAwards.chronology).map(([key, value]) => ({ year: key, value: value[0] })).sort((a, b) => b.year - a.year);
    const dataVideo = data.struct_data.find(d => d.id == 'branding_1328961106688');
    const dataTeam = data.struct_data.find(d => d.id == 'branding_502379037116');
    const dataCTA = data.struct_data.find(d => d.id == 'branding_884624245902');

    return <Layout title={data.options.meta_title} meta={metaTags}>
        <div class="wrapper">
            <Header />

            <main class="main">
                <div class="branding">
                    <div class="branding__intro">
                        <section class="intro">
                            <div class="intro__container">
                                <h1 class="intro__title h1">{title}</h1>
                            </div>
                        </section>
                    </div>

                    <div class="branding__cases branding__cases--1">
                        <section class="cases">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {dataProjects.map((p, i) =>
                                        <div class="cases__item">
                                            <a href={'/work/' + p.slug} class="case-card" data-elts="casePreview" data-key={i}>
                                                <div class="case-card__preview">
                                                {p.video_link
                                                    ? <video preload="meta" muted loop playsinline autoplay src={p.video_link}></video>
                                                    : <img src={p.image} alt="" />
                                                }
                                                </div>
                                                <div class="case-card__title">{p.title}</div>
                                                <div data-elts="caseHoverTitle" class="case-card__head no-opacity"><div>{p.title_hover}</div></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataManifest.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">{dataManifest.description}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__video">
                                    <div class="video" data-elt="showreel">
                                        <div class="video__container">
                                            <div class="video__cover">
                                                <video class="video__bg" src={dataShowreel.video_link} muted loop playsinline autoplay={ true } poster="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/shoereel.png"></video>
                                                <video class="video__video" src={dataShowreel.video_link} poster="https://ony-ru-media.storage.yandexcloud.net/_Ony_new-site/shoereel.png"></video>
                                            </div>

                                            <div class="video__controls">
                                                <button class="video__play-btn" data-elt="playShowreel">
                                                    <span>{dataShowreel.button_title}</span>
                                                    <div class="video__play-icon">
                                                        <svg class="svg-icon svg-icon--play" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-play"></use></svg>
                                                        <svg class="svg-icon svg-icon--pause" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-pause"></use></svg>
                                                    </div>
                                                </button>

                                                <div class="video__progress" data-elt="showreelProgress">
                                                    <div class="video__progress-line"><span class="video__progress-line1"></span></div>
                                                    {/* <div class="video__progress-line1"></div>
                                                    <div class="video__progress-line2"></div> */}
                                                </div>

                                                <div class="video__time" data-elt="showreelTime">0:00 / 5:42</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__info">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side"></div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text">{dataDescription}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__cases branding__cases--2">
                        <section class="cases">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {dataProjects1.map((p, i) =>
                                        <div class="cases__item">
                                            <a href={'/work/' + p.slug} class="case-card" data-elts="casePreview" data-key={i}>
                                                <div class="case-card__preview">
                                                {p.video_link
                                                    ? <video preload="meta" muted loop playsinline autoplay src={p.video_link}></video>
                                                    : <img src={p.image} alt="" />
                                                }
                                                </div>
                                                <div class="case-card__title">{p.title}</div>
                                                <div data-elts="caseHoverTitle" class="case-card__head no-opacity"><div>{p.title_hover}</div></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__bubbles">
                        <section class="bubbles">
                            <div class="bubbles__container">
                                <h3 class="bubbles__subtitle">{dataApproach.title}</h3>

                                <div class="bubbles__list">
                                    {bubbles.map((b,i) =>
                                        <div class="bubbles__item">
                                            <div class="bubbles__main">
                                                <div class="bubbles__letter"><span>{b.letter}</span></div>
                                                <div class="bubbles__title">{b.title}</div>
                                            </div>
                                            <div class="bubbles__content">{b.content}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__info branding__info--services">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataServices.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__services">
                                            {dataServices.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__cases branding__cases--1">
                        <section class="cases">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {dataProjects2.map((p, i) =>
                                        <div class="cases__item">
                                            <a href={'/work/' + p.slug} class="case-card" data-elts="casePreview" data-key={i}>
                                                <div class="case-card__preview">
                                                {p.video_link
                                                    ? <video preload="meta" muted loop playsinline autoplay src={p.video_link}></video>
                                                    : <img src={p.image} alt="" />
                                                }
                                                </div>
                                                <div class="case-card__title">{p.title}</div>
                                                <div data-elts="caseHoverTitle" class="case-card__head no-opacity"><div>{p.title_hover}</div></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__info branding__info--process">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataProcess.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <ol class="infoblock__list" data-elts="accordionBlock">
                                            {/* {dataProcess.description} */}
                                            {Object.entries(groupedProcess).map(([number, items]) => {
                                                return <li class="infoblock__group">
                                                    {items.map((p, i) => (
                                                        <div class="infoblock__item">
                                                            <div class={`infoblock-card`} data-elts="accordionTarget" data-param={p.id}>
                                                                <button type="button" class="infoblock-card__top" data-elts="accordionBtn" data-param={p.id}>
                                                                    <span>{p.title}</span>
                                                                    <svg class="svg-icon" viewBox="0 0 21 21" width="25" height="25"><use xlink:href="#svg-cross"></use></svg>
                                                                </button>
                                                                <div class="infoblock-card__drop" data-elts="accordionBox">
                                                                    <div class="infoblock-card__content" data-elts="accordionContent">{p.content}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </li>
                                            })}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__cases branding__cases--3">
                        <section class="cases">
                            <div class="cases__container">
                                <div class="cases__list">
                                    {dataProjects3.map((p, i) =>
                                        <div class="cases__item">
                                            <a href={'/work/' + p.slug} class="case-card" data-elts="casePreview" data-key={i}>
                                                <div class="case-card__preview">
                                                {p.video_link
                                                    ? <video preload="meta" muted loop playsinline autoplay src={p.video_link}></video>
                                                    : <img src={p.image} alt="" />
                                                }
                                                </div>
                                                <div class="case-card__title">{p.title}</div>
                                                <div data-elts="caseHoverTitle" class="case-card__head no-opacity"><div>{p.title_hover}</div></div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__info branding__info--links">
                        <section class="infoblock infoblock--api">
                            <div class="infoblock__container">
                                <h3 class="infoblock__title">Опыт работы</h3>

                                <div class="infoblock__links">
                                    <a href="/work?filter=Авто и транспорт"><span>Авто и транспорт</span></a>
                                    <a href="/work?filter=IT и сервисы"><span>IT и сервисы</span></a>
                                    <a href="/work?filter=Финансы"><span>Финансы</span></a>
                                    <a href="/work?filter=Стартапы"><span>Стартапы</span></a>
                                    <a href="/work?filter=Культура и искусство"><span>Культура и искусство</span></a>
                                    <a href="/work?filter=Телеком"><span>Телеком</span></a>
                                    <a href="/work?filter=Retail"><span>Retail</span></a>
                                    <a href="/work?filter=Мода и красота"><span>Мода и красота</span></a>
                                    <a href="/work?filter=Медиа и реклама"><span>Медиа и реклама</span></a>
                                    <a href="/work?filter=Образование"><span>Образование</span></a>
                                    <a href="/work?filter=Недвижимость и пространства"><span>Недвижимость и пространства</span></a>
                                    <a href="/work?filter=Здоровье"><span>Здоровье</span></a>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__awards inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataAwards.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__numbers">
                                            <section class="info-num">
                                                <div class="info-num__list">
                                                    {dataAwards.description}
                                                    {/* infonum.map((n,i) => (
                                                        <div class="info-num__item">
                                                            <div class="info-num__title h1">{n.title}</div>
                                                            <div class="info-num__text">{n.text}</div>
                                                        </div>
                                                    )) */}
                                                </div>
                                            </section>
                                        </div>

                                        <div class="infoblock__more-btn">
                                            <button class="more-btn" data-elts="toggleOpen" data-param="awards">
                                                <span>Полный список</span>
                                                <span>Скрыть список</span>
                                                <svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-cross"></use></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="more-content" data-elts="toggleOpenTarget" data-param="awards">
                            <div class="more-content__container">
                                <div class="more-content__wrap">
                                    <div class="more-awards">
                                        {dataAwardsChronology.map(row =>
                                            <div class="more-awards__row">
                                                <div class="more-awards__col more-awards__col--side">
                                                    <div class="more-awards__year">{row.year}</div>
                                                </div>

                                                <div class="more-awards__col more-awards__col--main">
                                                    <div class="more-awards__list">
                                                        {row.value.map(v =>
                                                            <>
                                                                <div class="more-awards__item">
                                                                    <div class="more-awards__title">{v.description}</div>
                                                                    <div class="more-awards__subtitle">{v.title}</div>
                                                                </div>

                                                                <div class="more-awards__item">
                                                                    <div class="more-awards__title">{v.awards_title}</div>
                                                                    <div class="more-awards__subtitle">{v.awards_description}</div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__media inverse">
                        <section class="media">
                            <div class="media__container">
                                <div class="media__wrap">
                                    <div class="media__box">
                                        <video preload="meta" muted loop playsinline autoplay src={dataVideo.video_link} type="video/mp4"></video>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="branding__team inverse">
                        <section class="infoblock">
                            <div class="infoblock__container">
                                <div class="infoblock__row">
                                    <div class="infoblock__col infoblock__col--side">
                                        <h3 class="infoblock__title">{dataTeam.title}</h3>
                                    </div>

                                    <div class="infoblock__col infoblock__col--main">
                                        <div class="infoblock__text body-l"><p>{dataTeam.description}</p></div>

                                        <div class="infoblock__more-btn">
                                            <button class="more-btn" data-elts="toggleOpen" data-param="team">
                                                <span>Вся команда</span>
                                                <span>Скрыть список</span>
                                                <svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-cross"></use></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="more-content" data-elts="toggleOpenTarget" data-param="team">
                            <div class="more-content__container">
                                <div class="more-content__wrap">
                                    <div class="more-team">
                                        <div class="more-awards__list">
                                            {dataTeam.team.map(t => <div class="more-team__item">
                                                <div class="more-team__title">{t.title}</div>
                                                <div class="more-team__subtitle">{t.position}</div>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="brief brief--content inverse">
                        <div class="brief__container">
                            <div class="brief__wrap">
                                <h2 class="brief__title h1">{dataCTA.block_description}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer footerClass="inverse" />
        </div>
    </Layout>
}
