const Button = ({ label, elt }) => {
    return <div class="form__field form__field--controls">
        <button type="submit" class="form__button">
            <span>{label}</span>
            <svg class="svg-icon" viewBox="0 0 30 30" width="30" height="30"><use href="#svg-arrow-right"></use></svg>
        </button>
    </div>
};

export default Button;