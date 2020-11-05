export const loadWordList = async () => {
    const [english, finnish] = await Promise.all([
        fetch('words_english.txt')
            .then((response) => response.text())
            .then((response) => response.split(/\r?\n/)),
        fetch('words_finnish.txt')
            .then((response) => response.text())
            .then((response) => response.split(/\r?\n/))
    ]);

    return { finnish, english };
};
