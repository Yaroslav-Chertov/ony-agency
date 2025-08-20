const InputFile = ({label, name}) => {
    return <div class="form__field" data-input={name}>
        <div class="form-file">
            <div class="form-file__control">
                <span class="form-file__control-button">
                    <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20"><use xlink:href="#svg-clip"></use></svg>
                    <span>{label}</span>
                </span>
                <input type="file" name={name} id={name} class="form-file__control-input" />
            </div>

            <div class="form-file__result">
                <div class="form-file__result-value" data-filenames></div>
                <button class="form-file__result-reset" data-reset-file>
                    <svg class="svg-icon" viewBox="0 0 21 21" width="21" height="21"><use xlink:href="#svg-cross"></use></svg>
                </button>
            </div>

            <div class="form-message" data-error={name}></div>
        </div>
    </div>
};

export default InputFile;