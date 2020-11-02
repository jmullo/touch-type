export const loadWordList = async () => {
    return fetch('sanalista.txt')
        .then((response) => response.text())
        .then((response) => response.split(/\r?\n/));
};
