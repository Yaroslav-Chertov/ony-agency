import Swiper from "swiper";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { DOMFactory, DOMUtils } from "./utils/DOM.js";
import { overflow } from "./utils/overflow.js";
import PageTransitions from "./app/PageTransitions.js";
import HeaderToggle from "./app/HeaderToggle.js";
// import CaseHover from './app/CaseHover.js';
import LoadMedia from "./app/LoadMedia.js";
// import Reveal from './app/Reveal.js';
import CasePreview from "./app/CasePreview.js";
import ScrollController from "./utils/ScrollController.js";
import Debug from "./utils/Debug.js";
import { scrollToAnim, scrollToTick } from "./utils/scrollTo.js";
import WorkFilter from "./app/WorkFilter.js";
import PopupController from "./utils/PopupController.js";
import FormFactory, {
    checkDocumentInputsFill,
    formDataToObject,
} from "./app/Form.js";
import PlayerFactory from "./app/VideoPlayer.js";
import { loadDigitalContent, pageDigitalHeader } from "./pages/digital.js";
import initJoin from "./pages/join.js";
import Accordion from "./app/Accordion.js";
import { Rotator } from "./app/Rotator.js";
import Inputmask from "inputmask";

// import ScrollController2 from './utils/ScrollController2.js';

const wait = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/*
TODO: отрефакторить JS, сейчас много непонятных моментов по архитектуре
*/

/* TODO: у каждого модуля должна быть система инициализации и удаления,
на каждой странице инициализируются разные модули, а не используемые должны удаляться
При этом должна быть возможность хранить микро состояние, чтобы при возврате назад все работало хорошо

База это дом элемент и его название.
К каждому названию мы можем привязать набор модулей.
Но в разных ситуациях тот же модуль должен работать по-разному. Для этого можно добавить второй параметр с ключами

Как быть с условным рендерингом на фронте? Например на Поларисе нам нужно было рендерить блок цен в зависимости от его наличия в принципе
На примерке мы загружаем шаблоны на фронт, которые потом можно рендерить
*/

/*

TODO: ScrollController должен быть глобальным, но не быть привязанным к DOM.
Мы можем ему передавать элементы, для которых должны считаться позиции и вызываться коллбэк.
ВСЕ!!!!!!!!!!!!!!!!!!!!!
Больше ничего этот класс делать не должен!
*/

const onInputForm = (elt) => {
    console.dir(elt);
};

class App {
    constructor(options) {
        // WARN:
        // TODO: после плавного перехода с /work/_samolet на /work/_yandex-uslugi ломается LoadMedia или ScrollController. Нужно принудительно обновлять ДОМ
        this.DOM = DOMFactory();
        new Debug();
        this.width = window.innerWidth;
        this.header = new HeaderToggle(this.DOM.header, { minScroll: 150 });
        this.pageTransition = new PageTransitions(this.pageUpdated); //TODO: добавить DI вместо импорта? { header: this.header }
        this.casePreview = new CasePreview();
        this.rotator = new Rotator();
        this.scrollController = new ScrollController({
            callback: this.intersect,
            sections: {
                digitalFooter: {
                    watch: true,
                },
                loadMedia: {
                    // key is selector
                    watch: true,
                },
                casePreview: {
                    watch: true,
                },
            },
        });

        this.accordion = new Accordion();

        this.mouse = {
            x: 0,
            y: 0,
        };

        this.loadMedia = new LoadMedia(); // TODO: LoadMedia для видое и картинок
        // this.scrollController2 = new ScrollController2();
        // this.caseHover = new CaseHover(this.DOM.casePreview, this.DOM.caseHoverTarget);
        // this.reveal = new Reveal();

        this.workFilter = new WorkFilter();
        this.workFilter.read(() => {
            // setTimeout(() => {
            this.casePreview.resetState();
            this.handleScrollEvent();
            // }, 100);
        });

        this.addTargetBlank();

        /*
            Возможные запросы форм к апи
            /send_brief
            /send_consultation
            /send_crypto
            /subscribe
            /send_job
            /send_internship
        */

        /*
        name: asdasd
        phone: 987654654654
        email: asd@asd.com
        desc: asdasd
        goal: consultation development
        */

        this.phoneMask = {
            mask: "+7 (999) 999-99-99",
            showMaskOnHover: false,
            greedy: true,
            jitMasking: 4,
            clearIncomplete: true,
        };

        this.forms = FormFactory([
            {
                form: this.DOM.briefForm,
                maskModule: (input, maskProps) => {
                    const im = new Inputmask.default(maskProps);
                    im.mask(input);
                },
                clearForm: false,
                // onInput: onInputForm,
                afterInit: (instance) => {
                    // instance.autoresizeTextarea();
                },
                afterSubmit: (res) => {
                    ym(
                        80176045,
                        "reachGoal",
                        "ORDER",
                        {
                            URL: document.location.href,
                        },
                        () => {
                            console.log("goal sent");
                        }
                    );

                    if (res.code === 200) {
                        location.assign("/success");
                    }

                    return false;
                },
                constraints: {
                    name: {
                        presence: {
                            errorMessage: () => `Пожалуйста, заполните имя`,
                        },
                    },
                    company: {
                        presence: {
                            errorMessage: () =>
                                `Пожалуйста, заполните название компании`,
                        },
                    },
                    phone: {
                        presence: {
                            errorMessage: () =>
                                `Пожалуйста, заполните номер телефона`,
                        },
                        mask: this.phoneMask,
                    },
                    email: {
                        presence: {
                            errorMessage: () => `Пожалуйста, заполните email`,
                        },
                        email: true,
                    },
                    file: {
                        presence: false,
                        size: "102400", //Kb
                        ext: ["image/jpeg", "image/png", "application/pdf"],
                    },
                    /* comment: {
                    presence: true
                }, */
                    agreement: {
                        presence: false,
                    },
                },
            }, {
                form: this.DOM.digitalForm,
                // onInput: onInputForm,
                maskModule: (input, maskProps) => {
                    const im = new Inputmask.default(maskProps);
                    im.mask(input);
                },
                afterInit: (instance) => {
                    instance.autoresizeTextarea();
                },
                afterSubmit: (res) => {
                    if (res.code === 200) {
                        location.assign("/success");
                    }
                },
                constraints: {
                    name: {
                        presence: {
                            errorMessage: () => `Пожалуйста, заполните имя`,
                        },
                    },
                    company: {
                        presence: {
                            errorMessage: () =>
                                `Пожалуйста, заполните название компании`,
                        },
                    },
                    phone: {
                        presence: {
                            errorMessage: () =>
                                `Пожалуйста, заполните номер телефона`,
                        },
                        mask: this.phoneMask,
                    },
                    email: {
                        presence: {
                            errorMessage: () => `Пожалуйста, заполните email`,
                        },
                        email: true,
                    },
                    comment: {
                        presence: false,
                    },
                    file: {
                        presence: false,
                        size: "102400", //Kb
                        ext: ["image/jpeg", "image/png", "application/pdf"],
                    },
                    agreement: {
                        presence: true,
                    },
                },
            },
            {
                form: this.DOM.techForm,
                // onInput: onInputForm,
                maskModule: (input, maskProps) => {
                    const im = new Inputmask.default(maskProps);
                    im.mask(input);
                },
                afterInit: (instance) => {
                    // instance.autoresizeTextarea();
                },
                transformRequest: (req) => {
                    const joinedGoal = req.body.getAll("goal").join(" ");
                    req.body.delete("goal");
                    req.body.set("goal", joinedGoal);
                    return req;
                },
                afterSubmit: (res) => {
                    if (res.code === 200) {
                        location.assign("/success");
                    }
                },
                constraints: {
                    name: {
                        presence: true,
                    },
                    company: {
                        presence: true,
                    },
                    phone: {
                        presence: true,
                        mask: this.phoneMask,
                    },
                    email: {
                        presence: true,
                        email: true,
                    },
                    agreement: {
                        presence: true,
                    },
                },
                submitMessageTimeout: 0,
            },
            {
                form: this.DOM.subscribeForm,
                constraints: {
                    email: {
                        presence: true,
                        email: true,
                    },
                },
                submitMessageTimeout: 0,
            },
        ]);

        this.videoPlayers = new PlayerFactory('[data-elt="showreel"]');
        this.videoPlayers.create();

        this.addEvents();
        this.init();
        initJoin();

        this.loop(0);
        this.lastTime = 0;
        this.popup = new PopupController();

        // check load after timeout or autoscroll
        this.loadMedia.load(this.scrollController.sectionBounds?.loadMedia);
        /* window.scrollTo({
            top: 0,
            behavior: 'instant'
        }) */

        const swiperContainer = document.querySelector(".swiper-container"),
            swiperReviews = document.querySelector(".swiper-reviews"),
            swiperMedia = document.querySelector(".swiper-media");

        if (swiperContainer) {
            new Swiper(".swiper-container", {
                modules: [Pagination, Autoplay, EffectFade],
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<div class="${className}"><div class="loader"></div></div>`;
                    },
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                effect: "fade",
                fadeEffect: {
                    crossFade: true,
                },
                on: {
                    slideChange: (event) => {
                        const currentVideo =
                            event.slides[event.realIndex].querySelector(
                                "video"
                            );
                        if (currentVideo.paused) {
                            currentVideo.play();
                        }
                    },
                },
            });
        }

        if (swiperReviews) {
            new Swiper(".swiper-reviews", {
                modules: [Navigation],
                slidesPerView: 1.08,
                spaceBetween: 16,
                loop: true,
                touchRatio: 1,
                navigation: {
                    nextEl: ".swiper-btn-next",
                    prevEl: ".swiper-btn-prev",
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                },
            });
        }

        if (swiperMedia) {
            new Swiper(".swiper-media", {
                modules: [Navigation],
                slidesPerView: 1.2,
                spaceBetween: 16,
                loop: false,
                touchRatio: 1,
                navigation: {
                    nextEl: ".swiper-btn-next",
                    prevEl: ".swiper-btn-prev",
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                },
            });
        }
    }

    init = () => {
        if (this.DOM.digitalIntroState) {
            this.digitalIntroAnimation();
        }
        this.initAudioPlayers();

        // INFO: запрет на восстановление скролла при переходе по истории. Вроде пока не нужно
        // if ('scrollRestoration' in history) {
        //     history.scrollRestoration = 'manual';
        // }
    };

    addEvents = () => {
        this.DOM.body.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            if (this.casePreview) {
                this.casePreview.mouse = this.mouse;
            }
        });

        /* document.addEventListener("visibilitychange", () => {
            console.log(document.visibilityState);
            // Modify behavior…
        }); */

        window.addEventListener(
            "scroll",
            (e) => {
                this.handleScrollEvent(e);
            },
            { passive: true }
        );

        window.addEventListener("load", (e) => {
            this.scrollController.onLoad(e);

            this.DOM.accordionTarget?.forEach((el) => {
                this.accordion.setDefaultHeight(el);
            });
        });

        window.addEventListener("resize", (e) => {
            this.width = window.innerWidth;
            this.scrollController.onResize(e);
            this.handleResizeEvent(e);
        });

        window.addEventListener("popstate", (e) => {
            if (this.DOM.body.dataset.route === "work") {
                this.workFilter.read();
            }

            if (history.state?.pageTransition) {
                location.reload();
            }
        });

        window.addEventListener("click", (e) => {
            if (this.popup.opened) {
                const eltDigitalPopupContent = e.target.closest(
                    '[data-elts="popupContent"]'
                );
                if (!eltDigitalPopupContent) {
                    this.popup.close();
                }
            }

            const eltCloseNav = e.target.closest('[data-elts="closeNav"]');
            if (eltCloseNav) {
                overflow.off();
            }

            const eltNavBg = e.target.closest('[data-elt="navBg"]');
            if (eltNavBg) {
                this.closeNav();
            }

            const eltCloseDigitalPopup = e.target.closest(
                '[data-elts="closeDigitalPopup"]'
            );
            if (eltCloseDigitalPopup) {
                this.popup.close();
            }

            const tabControl = e.target.closest('[data-elts="tabControl"]');
            if (tabControl) {
                const { param } = tabControl.dataset;
                this.DOM.tabControl.map((elt) =>
                    elt.classList.toggle("is-active", elt === tabControl)
                );
                this.DOM.tabTarget.map((elt) =>
                    elt.classList.toggle(
                        "is-active",
                        elt.dataset.param === param
                    )
                );
            }

            const closeTabControl = e.target.closest(
                '[data-elts="closeTabControl"]'
            );
            if (closeTabControl) {
                this.DOM.closeTabControl.map((elt) =>
                    elt
                        .closest('[data-elts="tabTarget"]')
                        .classList.remove("is-active")
                );
            }

            const eltToggleOpen = e.target.closest('[data-elts="toggleOpen"]');
            if (eltToggleOpen) {
                const { param } = eltToggleOpen.dataset;
                this.DOM.toggleOpenTarget.map(
                    (elt) =>
                        param === elt.dataset.param &&
                        elt.classList.toggle("is-open")
                );
                eltToggleOpen.classList.toggle("is-active");
            }

            const eltToggleActive = e.target.closest(
                '[data-elts~="toggleActive"]'
            );
            if (eltToggleActive) {
                console.time("render");
                const parentClosureElts = [
                    ...eltToggleActive.parentElement.querySelectorAll(
                        '[data-elts~="toggleActive"]'
                    ),
                ];
                parentClosureElts.map(
                    (elt) =>
                        elt !== eltToggleActive &&
                        elt.classList.remove("is-active")
                );
                eltToggleActive.classList.toggle("is-active");
                console.timeEnd("render");
            }

            const eltAccordionBtn = e.target.closest(
                '[data-elts="accordionBtn"]'
            );
            if (eltAccordionBtn) {
                let el = eltAccordionBtn,
                    blockCurrent = el.closest(
                        '[data-elts ~= "accordionTarget"]'
                    ),
                    blocks = document.querySelectorAll(
                        '[data-elts ~= "accordionTarget"]'
                    );

                if (!blockCurrent.classList.contains("is-open")) {
                    blocks.forEach((block) => {
                        this.accordion.close(block);
                    });

                    this.accordion.open(blockCurrent);
                } else {
                    blocks.forEach((block) => {
                        this.accordion.close(block);
                    });
                }

                /* const parentBlock = eltAccordionBtn.closest('[data-elts="accordionBlock"]');
                const { param } = eltAccordionBtn.dataset;

                const currentTarget = parentBlock.querySelector(`[data-elts="accordionTarget"][data-param="${param}"]`);
                const isOpen = currentTarget.classList.contains('is-open');

                parentBlock.querySelectorAll('[data-elts="accordionTarget"]').forEach(elt => elt.classList.remove('is-open'));
                //parentBlock.querySelectorAll('[data-elts="accordionBtn"]').forEach(elt => elt.classList.remove('is-active'));

                if (!isOpen) {
                    currentTarget.classList.add('is-open');
                    //eltAccordionBtn.classList.add('is-active');
                } */
            }

            const eltNavToggle = e.target.closest('[data-elt="navToggle"]');
            if (eltNavToggle) {
                if (eltNavToggle) {
                    this.DOM.body.classList.toggle("is-nav-open");

                    if (this.DOM.body.classList.contains("is-nav-open")) {
                        overflow.on();
                    } else {
                        overflow.off();
                    }
                }
            }

            const eltToggleWorkFilter = e.target.closest(
                '[data-elt="toggleWorkFilter"]'
            );
            if (eltToggleWorkFilter) {
                // const open = eltToggleWorkFilter.classList.toggle('is-active');
                // const { height } = this.DOM.filterHeight.getBoundingClientRect();
                // this.DOM.filterHeight.parentElement.style.setProperty('height', open ? `${height}px` : 0);

                this.DOM.body.classList.toggle("is-filter-open");
            }

            const eltResetWorkFilter = e.target.closest(
                '[data-elt="resetWorkFilter"]'
            );
            if (eltResetWorkFilter) {
                this.workFilter.resetFilters();
            }

            const eltWorkFilter = e.target.closest(
                '[data-elts="setWorkFilter"]'
            );

            if (eltWorkFilter) {
                // this.workFilter.toggleFilterState(eltWorkFilter.dataset.filter);
                this.workFilter.setFilter(eltWorkFilter.dataset.filter);
                // this.DOM.toggleWorkFilter.classList.toggle('is-active', false);
                this.DOM.body.classList.toggle("is-filter-open", false);
                setTimeout(() => {
                    this.casePreview.resetState();
                    this.handleScrollEvent();
                }, 100);
                e.preventDefault();
            }

            const eltWorkDirection = e.target.closest(
                '[data-elts="setWorkDirection"]'
            );

            if (eltWorkDirection) {
                this.workFilter.setFilterDirection(
                    eltWorkDirection.dataset.filter
                );
                this.DOM.body.classList.toggle("is-filter-open", false);

                setTimeout(() => {
                    this.casePreview.resetState();
                    this.handleScrollEvent();
                }, 100);
                e.preventDefault();
            }

            const eltGoNextPage = e.target.closest('[data-elt="goNextPage"]');
            if (eltGoNextPage && this.width > 1023) {
                this.pageTransition.setPage(eltGoNextPage.href);
                e.preventDefault();
            }

            const eltfooterMessage = e.target.closest(
                '[data-elt="hideFormMessage"]'
            );
            if (eltfooterMessage) {
                const f = eltfooterMessage.closest("form");
                f.classList.remove("is-success");
                f.closest("form").classList.remove("is-error");
                e.preventDefault();
            }

            const popupOpen = e.target.closest('[data-elts~="popupOpen"]');
            if (popupOpen) {
                this.popup.open(popupOpen.dataset.popup);

                if (this.DOM.body.dataset?.page === "digital") {
                    loadDigitalContent(popupOpen.dataset.popup);
                }
            }

            const popupClose = e.target.closest('[data-elts~="popupClose"]');
            if (popupClose) {
                this.popup.close(popupClose);
            }

            const eltToggleNavMobile = e.target.closest(
                '[data-elts~="toggleNavMobile"]'
            );
            if (eltToggleNavMobile) {
                this.toggleNavMobile(e, eltToggleNavMobile);
            }
        });

        this.DOM.navHover?.map((el) => {
            el.addEventListener(
                "mouseenter",
                (e) => !this.isTouchDevice() && this.showNav(e)
            );
            el.addEventListener(
                "mouseleave",
                (e) => !this.isTouchDevice() && this.closeNav()
            );

            el.addEventListener("touchstart", (e) => {
                if (!this.isTouchDevice() || this.width < 1024) return;

                const clickedBtn = e.target.closest('[data-elts="navHover"]');
                const clickedLink = e.target.closest("a");

                if (clickedLink) return true;

                if (clickedBtn === this.currentNavElt) {
                    this.closeNav();
                } else {
                    this.showNav(e);
                }
            });
        });

        this.addFormEvents();

        /*
        // INFO: если на ховер вешаем отображение маски
        this.DOM.mask?.forEach(maskInput => {
			maskInput.addEventListener('mouseenter', (e) => {
				const input = e.target.closest('[data-input]');
				input?.classList.add('is-filled');
			})

			maskInput.addEventListener('mouseout', (e) => {
				const inputParent = e.target.closest('[data-input]');
				if (inputParent) {
					const val = inputParent.querySelector('input').value;
					if (!val) {
						inputParent.classList.remove('is-filled');
					}
				}
			})
		}) */

        // DOMUtils.on('click', 'toggleClientsList')

        // TODO: как обрабатывать события если элемент исчезает с экрана и возвращается?
        // Добавлять обсервер через обновленный метод addEventListener и удалять обработчик при удалении элемента?
        /* this.DOM.body.addEventListener('mousemove', (e) => {
            const isHover = e.target.closest('[data-elt~="caseHover"]');

            if (isHover) {
                // isHover
            }
        }); */

        /* DOM.caseHover?.map(el => {
            el.addEventListener('mousein', (e) => {
                console.log('mousein');
            });

            el.addEventListener('mouseenter', (e) => {
                this.caseHover.showTitle(e.target, e.target.dataset.hoverTitle);
            });

            el.addEventListener('mouseleave', (e) => {
                this.caseHover.hideTitle(e.target);
            })
        }); */
    };

    isTouchDevice = () => {
        return navigator?.maxTouchPoints > 0;
    };

    handleScrollEvent = (e) => {
        this.header.toggle(scrollY);
        this.scrollController.onScroll(e);
        this.casePreview.onScroll(
            e,
            this.scrollController.sectionBounds?.casePreview
        );

        //if (this.loadMediaThrottle) {
        //    clearTimeout(this.loadMediaThrottle);
        //}

        // this.loadMediaThrottle = setTimeout(() => {
        this.loadMedia.load(this.scrollController.sectionBounds?.loadMedia);
        // }, 100);

        // this.revealOnScroll(this.scrollController.sectionBounds);
        // console.log('this.scrollController.sectionBounds', this.scrollController.sectionBounds);
        // Вызываем все необходимые методы, которые должны срабатывать при скролле и получать значения из scrollController
        // this.caseHover.hideTitle();

        if (this.DOM.digitalFooter) {
            pageDigitalHeader(
                this.scrollController.sectionBounds?.digitalFooter?.items?.[0]
                    ?.intersections,
                this.DOM.digitalHeader
            );
        }

        this.closeNav();
    };

    handleResizeEvent = (e) => {
        this.casePreview.onResize(
            this.scrollController.sectionBounds?.casePreview
        );
        this.DOM.accordionTarget?.forEach((el) => {
            this.accordion.setDefaultHeight(el);
        });
    };

    pageUpdated = () => {
        this.DOM = DOMFactory(true);
        this.scrollController.updateSectionsList(null, true);
        this.loadMedia.reset();
        this.DOM.accordionTarget?.forEach((el) => {
            this.accordion.setDefaultHeight(el);
        });
        this.rotator.update();

        if (this.videoPlayers) {
            this.videoPlayers.destroy();
        }

        this.videoPlayers = new PlayerFactory('[data-elt="showreel"]');
        this.videoPlayers.create();

        this.addTargetBlank();

        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    };

    loop = (time) => {
        requestAnimationFrame(this.loop);
        const delta = time - this.lastTime;

        // console.log('draw');

        scrollToTick(delta);
        this.rotator.render(delta);

        this.lastTime = time;
    };

    digitalIntroAnimation = () => {
        if (!this.DOM.digitalIntroState || !this.DOM.digitalIntroTitleRotate)
            return;

        this.state = 0;
        this.rotationDeg = 0;

        this.interval = setInterval(() => {
            this.state = (this.state + 1) % 4;
            this.rotationDeg += 90;

            this.DOM.digitalIntroState.setAttribute("data-state", this.state);
            this.DOM.digitalIntroTitleRotate.style.setProperty(
                "transform",
                `rotateX(${this.rotationDeg}deg)`
            );
        }, 4000);
    };

    showNav = async (e) => {
        if (this.width < 1024) return;
        /* setTimeout(() => {
            this.DOM.navHover.map(el => e.target !== el && el.classList.remove('is-hover'))
        }, 100); */

        this.DOM.navHover.map(
            (el) => e.target !== el && el.classList.remove("is-hover")
        );
        this.currentNavContainer = e.target.closest(
            '[data-elt="navHoverContainer"]'
        );

        this.currentNavElt = e.currentTarget;
        const height =
            this.currentNavElt
                .querySelector(".nav-submenu")
                .getBoundingClientRect().height + 66;

        this.currentNavContainer.classList.add("is-hover");
        this.currentNavElt.classList.add("is-hover");

        this.DOM.body.classList.add("is-nav");
        this.DOM.navBg.style.setProperty("height", `${height}px`);
    };

    closeNav = () => {
        if (!this.currentNavContainer) return;

        this.DOM.body.classList.remove("is-nav");
        this.currentNavContainer?.classList.remove("is-hover");
        this.currentNavContainer = null;
        this.currentNavElt?.classList.remove("is-hover");
        this.currentNavElt = null;
        this.DOM.navBg.style.setProperty("height", `${66}px`);
        this.DOM.navHover.map((el) => el.classList.remove("is-hover"));
    };

    closeNavWithDelay = () => {
        this.closeNavTM = setTimeout(() => {
            this.closeNav();
        }, 200);
    };

    toggleNavMobile = (e, elt) => {
        if (this.width > 1023) return;

        this.DOM.toggleNavMobile.map((eltNav) => {
            eltNav.classList.remove("is-open");
        });

        const added = elt.parentElement.classList.toggle("is-open");
        const h = elt.parentElement
            .querySelector(".nav-submenu__container")
            .getBoundingClientRect().height;
        [...document.querySelectorAll(".nav-submenu")].map((nav) => {
            const same = elt.parentElement === nav.parentElement;
            nav.style.setProperty("max-height", `${same && added ? h : 0}px`);
            !same && nav.parentElement.classList.remove("is-open");
        });

        e.preventDefault();
    };

    /* WARN: проверить и если надо оптимизировать/исправить */
    initAudioPlayers = () => {
        const audioButtons = document.querySelectorAll("[data-player]");
        if (!audioButtons.length) return;

        let currentPlayer = null;
        let currentButton = null;

        audioButtons.forEach((button) => {
            const player = new Audio(button.dataset.player);
            const parent = button.closest(".audio-card");

            player.preload = "auto";

            player.addEventListener("ended", () => {
                button.classList.remove("is-active");
                updateProgress(0, parent);
                currentPlayer = null;
                currentButton = null;
            });

            button.addEventListener("click", () => {
                playPause(player, button, parent);
            });

            const playPause = (player, button, parent) => {
                if (currentPlayer && currentPlayer !== player) {
                    currentPlayer.pause();
                    if (currentButton)
                        currentButton.classList.remove("is-active");
                }

                if (player.paused) {
                    player.play();
                    button.classList.add("is-active");
                    currentPlayer = player;
                    currentButton = button;
                    updateProgressLoop(player, parent);
                } else {
                    player.pause();
                    button.classList.remove("is-active");
                    updateProgress(
                        (player.currentTime / player.duration) * 100,
                        parent
                    );
                }
            };

            const updateProgressLoop = (player, parent) => {
                const interval = setInterval(() => {
                    if (
                        !currentPlayer ||
                        currentPlayer !== player ||
                        player.paused
                    ) {
                        clearInterval(interval);
                        return;
                    }
                    updateProgress(
                        (player.currentTime / player.duration) * 100,
                        parent
                    );
                }, 100);
            };

            const updateProgress = (percent, parent) => {
                const progressBar = parent.querySelector(
                    ".survey-results__circle"
                );
                const percentageText = parent.querySelector(
                    ".survey-results__percentage"
                );

                if (progressBar) {
                    progressBar.setAttribute(
                        "stroke-dasharray",
                        `${(percent.toFixed(0) / 100) * 167}, 167`
                    );
                }
                if (percentageText) {
                    percentageText.innerHTML =
                        percent.toFixed(2).replace(".", ",") + "%";
                }
            };
        });
    };

    addTargetBlank = () => {
        [...document.querySelectorAll("a")].map((a) => {
            const href = a.href;
            const hrefAttr = a.getAttribute("href");

            if (!href || !hrefAttr) return;
            if (href.includes("tel:") || href.includes("mailto:")) return;

            const innerLinks = [location.host, "ony.ru"];

            const cleanHref = href.replace(/http[s]?:\/\//gi, "");

            const index = innerLinks
                .map((link) => cleanHref.indexOf(link))
                .filter((index) => index !== -1)[0];
            const outer = index === undefined;
            const sameDomain = index > 0;
            const inner = index === 0;

            if (outer || sameDomain) {
                a.setAttribute("target", "_blank");
            }
        });
    };

    addFormEvents = () => {
        if (!this.DOM.briefForm) return;

        const handler = () => {
            if (typeof ym === "undefined") return;

            ym(80176045, "reachGoal", "form_touch");
        };

        this.DOM.briefForm.addEventListener("input", handler);
        this.DOM.briefForm.addEventListener("click", handler);
        this.DOM.briefForm.addEventListener("touchstart", handler);
    };
}

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("is-loading");
    window.app = new App();
});

checkDocumentInputsFill();
