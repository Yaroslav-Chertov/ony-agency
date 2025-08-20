const H1Block = ({ data }) => {
    return <div class="case__block case__block--content">
        <section class="heading">
            <div class="heading__container">
                <h1 class="heading__title h1">
                    { data.title }
                </h1>
            </div>
        </section>
    </div>
}

export default H1Block;