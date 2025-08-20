import validator from 'validator';
// import Inputmask from 'inputmask';
import wait from '../utils/wait.js';

// v1.1.1
// 26.12.24 - Добавлена валидация селектов, Choices.js

// v1.1.2
// 04.03.25 - Обновлена документация, добавлены опции removeErrorOnInput, submitMessageTimeout
// beforeSubmit должна вернуть true чтобы отправка была продолжена, может быть асинхронной
// beforeSubmit выззывается до того, как данные формы будут собраны

// v1.1.3
// 10.03.25 - добавлен коллбэк onInput, который после каждого события input в форме и передает элемент, в котором оно вызывается
// добавлен коллбэк afterInit, вызывается после инициализации формы
// таймаут успеха не включается если указано значение 0
// добавлены методы transformRequest и transformResponse для обработки запросов/ответов от апи

// v1.1.4
// 13.03.25 - добавлен коллбэк onInput, который после каждого события input в форме и передает элемент, в котором оно вызывается

// v1.1.5
// 27.03.25 - сообщения об ошибках теперь функции, в которые передаются constraints для генерации более точных ошибок (например размер файла)
// e.preventDefault(); всегда до отправки срабатывает, но после options.onSubmit
// TODO: tel типа валидации, без него автозаполнение телефона работает некорректно? Тоже самое, что текст, стоит удалить
// maskModule опция для подключения модуля с маской для каждого инпута, у которого указана маска

/*
Инициализация
import FormFactory from 'Form.js';
FormFactory([массив параметров])

Форма требует 2 обязательных параметра
    1) form - селектор или HTML элемент
    2) constraints - описание всех обязательных полей
    Пример формы
    {
        form: '#form-main',
        constraints: {
            name: {
                presence: true
            },
            email: {
                presence: true,
                email: true
            },
            phone: {
                phone: true
            },
            message: {
                presence: true,
                maxLength: 1000,
            },
            attach: {
                size: '2048', //Kb
                ext: ['jpg', 'png', 'pdf']
            },
        }
    }

Описание свойств
У каждого типа инпута свои валидаторы.
    type="text" || type="textarea"
        presence - обязательное поле
        maxLength - максимальная длина поля
        email - проверяет почту на корректность ввода
        phone - проверяет телефон регулярным выражением, ожидаемый формат: +7(000)0000000 все пробелы будут удалены из строки при проверке

    type="file"
        presence - обязательно поле
        size - максимальный размер файла в kb
        ext - массив допустимых типов для файла

    type="password"
        presence - обязательное поле
        sync - name инпута внутри формы, с которым нужно сравнивать основной пароль


Необходимым элементам у инпутов добавляются дата-аттрибуты:
data-input={name} - ключевой контейнер инпута. Все остальные элементы должны находиться внутри элемента с этим аттрибутом.
Этому элементу будут ставиться классы is-error is-filled is-success и тд, так же будет добавляться аттрибут data-error-type, который указывает на тип ошибки (presence, maxLength и тд)
data-error={name} - сюда будет записано сообщение об ошибке
data-reset-file - кнопка очистки файла
data-filenames - место записи названия добавленных файлов

Для проверки файлов указывать реальный тип данных файла, не рсширение!
Возможные типы данных:
1. image/svg+xml - .svg
2. image/jpeg - .jpg || .jpeg
3. image/png - .png
4. application/pdf - .pdf
*/


// DONE: Прелоадер формы
// DONE: Обработку двойного поля паролей
// DONE: Чекбоксы проверять
// DONE: Реализовать группировку полей

const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const validators = {
    text: {
        presence: {
            validator: ([value, fieldConstraint]) => !validator.isEmpty(value, { ignore_whitespace: true }),
            errorMessage: (constraints) => 'Поле не может быть пустым'
        },
        maxLength: {
            validator: ([value, fieldConstraint]) => value.length <= fieldConstraint,
            errorMessage: (constraints) => 'Превышено допустимое количество символов'
        },
        minLength: {
            validator: ([value, fieldConstraint]) => value.length >= fieldConstraint,
            errorMessage: (constraints) => 'Неправильное количество символов'
        },
        email: {
            validator: ([value, fieldConstraint]) => validator.isEmail(value),
            errorMessage: (constraints) => 'Неверный формат электронной почты'
        },
        phone: {
            validator: ([value]) => {
                return validator.isMobilePhone(value, 'ru-RU');
                // const trimmed = value.replace(/\s/gi, '');
                // return (/\+\d\(\d\d\d\)\d\d\d\d\d\d\d/).test(trimmed);
            },
            errorMessage: (constraints) => 'Введите существующий номер телефона'
        },
    },
    tel: {
        presence: {
            validator: ([value, fieldConstraint]) => {
                return !validator.isEmpty(value, { ignore_whitespace: true })
            },
            errorMessage: (constraints) => 'Поле не может быть пустым'
        },
        phone: {
            validator: ([value]) => {
                return validator.isMobilePhone(value, 'ru-RU');
                // const trimmed = value.replace(/\s/gi, '');
                // return (/\+\d\(\d\d\d\)\d\d\d\d\d\d\d/).test(trimmed);
            },
            errorMessage: (constraints) => 'Введите существующий номер телефона'
        },
    },
    checkbox: {
        presence: {
            validator: ([value, fieldConstraint]) => {
                return value;
            },
            errorMessage: (constraints) => 'Поле не может быть пустым'
        },
    },
    file: {
        presence: {
            validator: ([value, fieldConstraint, input]) => {
                return !!value[0];
            },
            errorMessage: (constraints) => 'Не удалось загрузить файл. Попробуйте еще раз'
        },
        size: {
            validator: ([value, fieldConstraint, input]) => {
                const invalid = value.filter(f => f.size > fieldConstraint * 1024); // размер в байтах
                console.log('asdasdasd');
                return invalid.length === 0;
            },
            errorMessage: (constraints) => {
                return `Файл слишком большой. Максимальный размер: ${constraints.size / 1024}Мб`
            }
        },
        ext: {
            validator: ([value, fieldConstraint, input]) => {
                const extensions = value.map(f => {
                    return f.type;
                    // return f.name.split('.').at(-1); // только проверка расширения - не надежный метод
                });

                const valid = extensions.some(ext => fieldConstraint.includes(ext));

                return valid;
            },
            errorMessage: (constraints) => 'Неподдерживаемый формат файла. Пожалуйста, загрузите JPG, PNG или PDF'
        },
    },
    password: {
        presence: {
            validator: ([value, fieldConstraint]) => !validator.isEmpty(value, { ignore_whitespace: true }),
            errorMessage: (constraints) => 'Поле не может быть пустым'
        },
        strength: {
            validator: ([value, fieldConstraint]) => {
                if (typeof fieldConstraint === 'boolean') {
                    return fieldConstraint === validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 0,
                        returnScore: false,
                        pointsPerUnique: 1,
                        pointsPerRepeat: 0.5,
                        pointsForContainingLower: 10,
                        pointsForContainingUpper: 10,
                        pointsForContainingNumber: 10,
                        pointsForContainingSymbol: 10
                    })
                }

                if (typeof fieldConstraint === 'object') {
                    return validator.isStrongPassword(value, fieldConstraint.options)
                }
            },
            errorMessage: (constraints) => 'Пароль должен содержать минимум одну цифру, строчную и заглавную буквы. Минимальная длина 6 символов'
        },
        sync: {
            validator: ([value, syncValue]) => {
                if (syncValue === '') return true;

                return value === syncValue;
            },
            errorMessage: (constraints) => 'Пароли не совпадают'
        }
    },
    number: {
        presence: {
            validator: ([value, fieldConstraint]) => !validator.isEmpty(value, { ignore_whitespace: true }),
            errorMessage: (constraints) => 'Поле не может быть пустым'
        },
        maxLength: {
            validator: ([value, fieldConstraint]) => value.length <= fieldConstraint,
            errorMessage: (constraints) => 'Превышено допустимое количество символов'
        },
        minLength: {
            validator: ([value, fieldConstraint]) => value.length >= fieldConstraint,
            errorMessage: (constraints) => 'Неправильное количество символов'
        },
    },
    'select-one': {
        presence: {
            validator: ([value, fieldConstraint]) => {
                return !validator.isEmpty(value, { ignore_whitespace: true })
            },
            errorMessage: (constraints) => 'Поле не может быть пустым'
        },
    }
}

const formDataToObject = (form) => {
    const object = {};
    form.forEach((value, key) => {
        object[key] = value;
    });

    return object;
}

// INFO: использовать вместо стандартной new FormData(form); чтобы трансформировать данные перед отправкой, например убирать маску телефона
// TODO: исследовать возможность сделать Proxy объект для инпутов и получения значения value
/* const formData = (form) => {
    const data = new FormData();
    const elts = [...form]
        .filter(elt => elt.tagName === 'INPUT' || elt.tagName === 'TEXTAREA')
        .map(input => {
            let value = input.imask ? input.imask.unmaskedValue : input.value;

            if (input.type === 'file') {
                [...input.files]?.map(f => data.append(input.name, f));
            } else {
                data.append(input.name, value);
            }

            return input;
        });

    return data;
} */
















class Form {
    constructor(options) {
        const constraints = {
            email: {
                presence: true,
                email: true,
            }
        };

        this.options = {
            constraints,
            maskModule: (input, maskProps) => {},
            afterInit: (instance) => {},
            onChange: (target, errors) => {}, // функция вызывается при событии change у инпута
            // в constraints для нескольких полей можно указаться числовое свойство group,
            // тогда валидация будет происходить в рамках одной формы но по группам
            // данная функция вызывается когда происходит смена группы
            onGroupChange: (group) => {},
            removeErrorOnInput: true, // убирать ошибку при печати
            clearForm: true, // очищать форму после отправки
            beforeSubmit: null, // функция, который вызывается перед отправкой формы, должна вернуть true чтобы отправка была продолжена, может быть асинхронной
            onSubmit: null, // функция, который вызывается ВМЕСТО стандартной onSubmit
            afterSubmit: (response, instance) => {}, // функция, который вызывается после отправки формы
            onInput: (elt) => {}, // вызов метода при событии input
            showAllErrors: false, // показывать все ошибки или
            submitMessageTimeout: 3000,
            transformResponse: async (r) => {
                const response = await r.json();
                const result = {
                    code: r.status,
                    message: response.message || response.responseText || 'Ошибка в ответе сервера. Попробуйте позже',
                };

                return result;
            },
            transformRequest: async (req) => {
                return req;
            },
            ...options
        };

        this.form = this.options.form;

        this.isLoading = false;

        this.inputs = [...this.form.querySelectorAll('input:not([type="hidden"]), select, textarea')];
        this.inputsKV = {};
        this.inputs.map(i => {
            this.inputsKV[i.name] = i;
        });

        this.fileInputs = this.inputs.filter(i => i.type === 'file');
        this.formResponse = this.form.querySelector('[data-form-response]');
        this.hasErrors = [];

        this.currentGroup = 0;
        this.maxGroup = Math.max(...Object.keys(this.options.constraints).map((key, i) => this.options.constraints[key].group)) || 0;
        this.groupBackButton = this.form.querySelector(this.options.groupBackButton);

        this.lengthCounters = this.form.querySelectorAll('[data-length]');

        if (this.lengthCounters) {
            [...this.form.querySelectorAll('[data-length]')].map(i => {
                const elt = i.parentElement.querySelector('input, textarea');

                elt?.addEventListener('input', (e) => this.countValueLength(e.target, i))
            })
        }

        this.form.addEventListener('focusout', (e) => {
            this.checkInputsFill();
        });

        this.form.addEventListener('input', (e) => {
            this.options.removeErrorOnInput && this.removeError(e.target);
            this.checkInputsFill();
            this.options.onInput(e.target);
        });

        this.form.addEventListener('change', (e) => {
            this.onChange(e.target, e)
        });

        this.form.addEventListener('submit', (e) => {
            // FIXME: отправка через Enter происходит на фоне и никак не отображается
            this.onSubmit(e);
            e.preventDefault();
            return false;
        });

        this.groupBackButton?.addEventListener('click', (e) => {
            this.setGroup(this.currentGroup - 1);
            e.preventDefault();
            return false;
        });

        this.fileInputs.forEach(input => {
            const container = input.closest('[data-input]');
            const resetBtn = container.querySelector('[data-reset-file]');

            container.addEventListener('dragover',  e => this.onDragOver(e, container));
            container.addEventListener('dragleave', e => this.onDragLeave(e, container));
            resetBtn.addEventListener('click', e => this.onFileReset(e, input));
        });

        this.initMasks();
        this.checkInputsFill();
        this.options.afterInit(this);
    }

    initMasks = () => {
        this.inputs.map(input => {
            const mask = this.options.constraints[input.name]?.mask;

            if (mask !== undefined) {
                const maskProps = typeof mask === 'string' ? { mask } : mask;
                this.options.maskModule(input, maskProps)
                /* const im = new Inputmask.default(maskProps);
                im.mask(input); */
            }
        });
    }

    checkInputsFill = () => {
        this.inputs.map(i => {
            let value = i.value.length;
            if (i.type === 'file') value = i.files.length;
            if (i.nodeName === 'SELECT') value = !!i.value;
            i.closest('[data-input]')?.classList.toggle('is-filled', value);
        });
    }

    removeError = (input) => {
        input.closest('[data-input]')?.classList.remove('is-error');
    }

    onChange = (target, e) => {
        const errors = this.validateField(target, this.options.constraints[target.name]);

        if (errors.length) {
            this.hasErrors.push([...errors]);
        }

        if (target.type === 'file') {
            [...target.files].length && this.onDrop(target.closest('[data-input]'));
            this.updateFileInput(target);
        }

        this.renderFieldStates(target, errors);

        this.options.onChange(target, errors);
    }

    onSubmit = async (e) => {
        this.form.classList.remove('is-error');

        this.hasErrors = [];

        this.inputs.map(i => {
            this.onChange(i);
        });

        if (this.hasErrors.length) {
            e.preventDefault();
            return false;
        } else {
            if (this.currentGroup < this.maxGroup) {
                this.setGroup(this.currentGroup + 1);

                e.preventDefault();
                return false;
            }
        }

        if (this.isLoading) return;
        this.isLoading = true;

        if (this.options.onSubmit) {
            this.isLoading = false;
            return this.options.onSubmit(e);
        }

        this.form.classList.remove('is-success');
        this.form.classList.add('is-loading');

        if (this.form.getAttribute('action')) {
            e.preventDefault();

            if (this.options.beforeSubmit) {
                const continueSubmit = await this.options.beforeSubmit(this);

                if (!continueSubmit) {
                    this.isLoading = false;
                    this.form.classList.remove('is-loading');
                    return;
                }
            }

            let params = {};

            if (this.form.getAttribute('method')?.toLowerCase() === 'post') {
                params = {
                    method: 'POST',
                    body: new FormData(this.form)
                }
            } else {
                //get request, do nothing
            }

            await wait(500);

            const response = await fetch(this.form.getAttribute('action'), await this.options.transformRequest(params))
                .then(r => this.options.transformResponse(r))
                .catch(r => {
                    return {
                        code: 500,
                        message: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже',
                    }

                    /* {
                        code: 200,
                        redirect: '/profile',
                        message: 'Данные отправлены, спасибо',
                    } */
                });


            if (response.code === 200 || response.success) {
                this.form.classList.add('is-success');
                this.removeSuccessTimer();
            } else {
                this.form.classList.add('is-error');
            }

            if (response.message) {
                if (this.formResponse) {
                    if (response.redirect) {
                        this.formResponse.innerText = '';
                    } else {
                        this.formResponse.innerText = response.message;
                    }
                }
            }

            if (response.redirect) {
                return location.assign(response.redirect);
            }

            if (!this.options?.afterSubmit(response, this)) {
                return false;
            }

            this.form.classList.remove('is-loading');
            this.isLoading = false;
            
            if (this.options.clearForm) {
                await this.clearForm();
            }

            return false;
        } else {
            if (this.options.beforeSubmit) {
                const continueSubmit = await this.options.beforeSubmit(this);

                if (!continueSubmit) {
                    this.isLoading = false;
                    return;
                }
            }

            console.log('FAKE REQUEST ONLY FOR DEVELOPMENT');
            const data = new FormData(this.form);

            console.log('data', formDataToObject(data));
            await wait(1500);

            this.form.classList.remove('is-loading');
            this.form.classList.add('is-success');
            this.removeSuccessTimer();

            if (this.options.clearForm) {
                await this.clearForm();
            }

            this.options?.afterSubmit({ code: 200, message: 'Успех' }, this);

            this.isLoading = false;
            e.preventDefault();
            return false;
        }
    }

    setGroup = (group) => {
        if (group < 0 || group > this.maxGroup) return;

        this.currentGroup = group;
        this.form.dataset.state = group;
        this.options.onGroupChange(group);
    }

    clearForm = async () => {
        await wait(300);
        this.inputs.map(i => {
            if (i.type === 'file') {
                i.files = null;
            }

            if (i.type === 'select-one') {
                i.selectedIndex = -1;
                i.value = '';

                if (i.Choices) i.Choices.refresh(false, false, true);
            }

            i.value = null;

            i.closest('[data-input]')?.classList.remove('is-filled');
            i.closest('[data-input]')?.classList.remove('is-error');
        });

        this.checkInputsFill();
    }

    onDragOver = (e, container) => {
        container.classList.add('is-active');
    }

    onDragLeave = (e, container) => {
        container.classList.remove('is-active');
    }

    onDrop = (container) => {
        container.classList.remove('is-active');
        container.classList.add('is-filled');
    }

    validateField = (input, constraints) => {
        let value = input.inputmask ? input.inputmask.unmaskedvalue() : input.value;

        if (constraints?.phone) {
            value = '7' + value;
        }

        const field = input.name;
        let type = input.type === 'textarea' ? 'text' : input.type;

        if (!constraints) {
            return false;
        }

        if (constraints.group !== undefined && constraints.group !== this.currentGroup) {
            console.log('skip group fields', this.currentGroup);
            return false;
        }

        let errors = [];

        errors = Object.keys(constraints).map((key, i) => {
            const constraintsValue = constraints[key];

            if (key === 'group' || key === 'mask') {
                return false;
            }

            const validatorItem = validators[type][key];

            let params;

            if (type === 'text' || type === 'tel' || type === 'textarea') {
                params = [value, constraintsValue];
            }

            if (type ==='password') {
                if (key === 'sync') {
                    const syncValue = this.form.querySelector(`[name="${constraintsValue}"]`).value;
                    params = [value, syncValue];
                } else {
                    params = [value, constraintsValue];
                }
            }

            if (type === 'file') {
                const files = input.files && [...input.files];

                if (!files.length && !constraints.presence) {
                    return false;
                }

                params = [files, constraintsValue, input];
            }

            if (type === 'checkbox') {
                params = [input.checked, constraintsValue];
            }

            if (type === 'number') {
                params = [value, constraintsValue];
            }

            if (type === 'select-one') {
                params = [value, constraintsValue];
            }

            const valid = constraintsValue?.validator?.(params) || validatorItem.validator(params);

            if (valid) return false; // если нет ошибок, то возвращаем false. Иначе возвращаем объект с ошибкой

            return {
                field,
                key,
                valid,
                value,
                group: constraints.group || 0,
                message: constraintsValue?.errorMessage?.(constraints) || validatorItem.errorMessage(constraints)
            }
        }).filter(v => v);

        return errors.length
            ? this.options.showAllErrors ? errors : [errors[0]]
            : false;
    }

    onFileReset = (e, input) => {
        input.value = null;
        input.files = null;

        input.closest('[data-input]').classList.remove('is-filled');
        input.closest('[data-input]').classList.remove('is-active');
        input.closest('[data-input]').classList.remove('is-success');

        this.onChange(input);

        e.preventDefault();
        return false;
    }

    updateFileInput = (input) => {
        const nameContainer = input.closest('[data-input]').querySelector('[data-filenames]');
        const names = [...input.files].map(file => {
            const r = file.name.match(/(^.*)(\..*)$/);
            return ` <span>${escapeHtml(r[1])}</span><span>${escapeHtml(r[2])}</span>`;
        });

        nameContainer.innerHTML = names.join(', ');
    }

    renderFieldStates = (target, errors) => {
        if (!target.name) {
            console.error('Attribute "name" required for each field', target);
            return;
        }
        const container = target.closest('[data-input]')
        const errField = container.querySelector(`[data-error]`);// this.form.querySelector(`[data-error=${target.name}]`);

        if (!errField) {
            console.error('Can\'t find [data-error] element to render errors');
            return;
        }

        if (!errors) {
            delete container.dataset.errorType;
            container.classList.remove('is-error');
            container.classList.add('is-success');
            target.type !== 'file' && target.value.length && container.classList.add('is-filled');
            return;
        }

        const errs = errors.map(err => err.message).join('. ');
        container.classList.toggle('is-filled', target.value.length);
        errField.innerText = errs;
        container.dataset.errorType = errors.map(e => e.key).join(' '); //TODO: удалять если ок
        container.classList.remove('is-success');
        container.classList.add('is-error');
    }

    countValueLength = (input, target) => {
        target.innerText = `${input.value.length}/${target.dataset.length}`;
    }

    removeSuccessTimer = () => {
        this.successTimeout && clearTimeout(this.successTimeout);

        if (this.options.submitMessageTimeout) {
            this.successTimeout = setTimeout(() => {
                this.form.classList.remove('is-success');
            }, this.options.submitMessageTimeout);
        }
    }

    autoresizeTextarea = () => {
        this.form.querySelectorAll('textarea').forEach((textarea) => {
            textarea.style.height = textarea.scrollHeight + 'rem';
            textarea.style.overflowY = 'hidden';

            textarea.addEventListener('input', (elt) => {
              elt.target.style.height = 'auto';
              elt.target.style.height = (elt.target.scrollHeight + 0) + 'rem';
            });
        });
    }
}

const FormFactory = (forms) => {
    return forms.map((options) => {
        if (!options.form) return false;

        const form = options.form.nodeType === Node.ELEMENT_NODE ? options.form : document.querySelector(options.form);

        if (!form) return;

        return new Form({
            ...options,
            form
        });
    }).filter(f => f);
}

const checkDocumentInputsFill = () => {
    setTimeout(() => {
        document.querySelectorAll('input, textarea').forEach(i => {
            let value = i.value.length;
            if (i.type === 'file') value = i.files.length;
            if (i.nodeName === 'SELECT') value = !!i.value;
            i.closest('[data-input]')?.classList.toggle('is-filled', value);
        });
    }, 300);
}

export default FormFactory;
export { formDataToObject, checkDocumentInputsFill };