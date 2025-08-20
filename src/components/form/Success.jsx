const Success = ({ message, btn }) => {
    return <div class="form-success">
        <div class="form-success__box">
            <h2 class="form-success__title">{ message }</h2>
            <button class="form-success__btn btn-link" type="button" data-elt="hideFormMessage"><span>{ btn }</span></button>
        </div>
    </div>
};

export default Success;
