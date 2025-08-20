const Select = ({ name, options = [] }) => {
    return <div class="form__field" data-input="">
        <select name={name} id={name} class="form__select" data-elt="formSelect">
            <option value="" placeholder selected>Выберите услугу</option>
            {options.map(s => <option value={s.value}>{s.title}</option>)}
        </select>
        <div data-error={name} class="form-message"></div>
    </div>
};

export default Select;