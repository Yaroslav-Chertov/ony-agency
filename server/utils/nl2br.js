const nl2br = (str) => {
    if (!str) return '';

    /* INFO: странный код. Убедиться, что новая версия работает нормально и удалить эту
    const res = str.split(/\n+/gi).map((line, index) => {
        if (index > 0) {
            return ['<br />', line];
        } else {
            return line;
        }
    }).flat(); */

    const withBreaks = str.replace(/\n/gi, '<br />')

    return withBreaks;
};

export { nl2br };