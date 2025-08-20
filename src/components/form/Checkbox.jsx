const Checkbox = ({ name, checked = false }) => {
    return <div class="form__field" data-input>
        <div class="checkbox">
            <div class="checkbox__control">
                <input type="checkbox" name={name} id={name} class="checkbox__input" checked={checked} />
                <span class="checkbox__icon">
                    <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-check"></use></svg>
                </span>
            </div>
            <label for={name} class="checkbox__label">Я согласен с&nbsp;<a href="https://ony.ru/policy" target="_blank">правилами обработки персональных данных</a></label>
        </div>
        <div class="form-message" data-error={name}></div>
    </div>
};

export default Checkbox;
