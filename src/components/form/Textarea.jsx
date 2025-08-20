const Textarea = ({name, label, rows, value = '', placeholder}) => {
    return <div class="form__field" data-input="">
        <textarea name={name} id={name} type="text" class="form__textarea" rows={rows} data-elts="autoresize" placeholder={placeholder}>{value}</textarea>
        <label for={name} class="form__label">{label}</label>
        <div class="form-message" data-error={name}></div>
    </div>
};

export default Textarea;