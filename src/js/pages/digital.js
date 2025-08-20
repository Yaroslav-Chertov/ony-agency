let headerHidden = false;
let prevHeaderHidden = false;
export const pageDigitalHeader = (intersection, header) => {
    if (!header) return;

    headerHidden = intersection.inClamp > 0;

    if (headerHidden !== prevHeaderHidden) {
        header.classList.toggle('is-offscreen', headerHidden);
    }

    prevHeaderHidden = headerHidden;
}

export const loadDigitalContent = (target) => {
    const contentElt = document.querySelector(`[data-elts="popup"][data-popup="${target}"] [data-elts="popupContent"]`)
    const allVideos = [...contentElt.querySelectorAll('video')].map((v) => {
        v.play();
        v.preload = 'auto';
        v.loop = true;
    })
}