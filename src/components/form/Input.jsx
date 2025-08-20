const Input = ({ name, value = false, type, label, elts = false, minlength = false, maxlength = false, placeholder }) => {
    return <div class="form__field" data-input={name}>
        <input value={value} type={type} class="form__input" id={name} name={name} data-elts={elts} 
            minlength={minlength} maxlength={maxlength} placeholder={placeholder}
            {...(type === 'number' || type === 'tel' ? {inputmode: "numeric"}: {})} 
        />
        <label for={name} class="form__label">{label}</label>
        <div data-error={name} class="form-message"></div>
    </div>
};

export default Input;