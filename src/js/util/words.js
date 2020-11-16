import { sample, cloneDeep, findIndex, upperFirst } from 'lodash';

import { PROBABILITY, NUMBER_OF_ROWS, MAX_WORD_LENGTH, CHAR_WIDTH_PX } from 'constants/config';

const probability = (number) => Math.random() <= number;

const addCapitalisation = (enabled, words) => {
    if (enabled) {
        words.forEach((word, index) => {
            if (probability(PROBABILITY.CAPITALISED)) {
                words[index] = upperFirst(word);
            }
        });
    } else {
        words = words.join(' ').toLowerCase().split(' ');
    }
};

const addNumbers = (enabled, words) => {
    if (enabled) {
        words.forEach((word, index) => {
            if (!!isNaN(words[index - 1]) && probability(PROBABILITY.NUMBER)) {
                words[index] = `${Math.floor(Math.random() * 999) + 100}`.substr(0, Math.floor(Math.random() * 3) + 1);
            }
        });
    }
};

export const selectWords = ({ options, list }) => {
    let selectedWords = [];
    let word;

    while (selectedWords.length < options.words) {
        word = sample(list[options.language]);

        if (word.length <= MAX_WORD_LENGTH) {
            selectedWords.push(word);
        }
    }

    addCapitalisation(options.capitalisation, selectedWords);
    addNumbers(options.numbers, selectedWords);

    return selectedWords;
};

export const getActiveRowIndex = (rows, caretIndex) =>
    findIndex(rows, (row) => (caretIndex >= row.charIndex && caretIndex < row.charIndex + row.length ));

const createRow = (words) => {
    const maxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--main-width'), 10);
    const array = [];

    while (words.length && (array.join(' ').length + words[0].length + 2) * CHAR_WIDTH_PX < maxWidth) {
        array.push(words.shift());
    }

    return {
        words: array,
        length: array.join(' ').length + 1
    };
};

function *rowNumberGenerator() {
    let number = 0;

    while (true) {
        yield number++;

        if (number >= NUMBER_OF_ROWS) {
            number = 0;
        }
    }
}

export function *rowGenerator(words) {
    const array = cloneDeep(words);
    const rowNumberIterator = rowNumberGenerator();

    let charIndex = 0;

    while (array.length) {
        const row = createRow(array, charIndex);

        row.charIndex = charIndex;
        row.number = rowNumberIterator.next().value;
        charIndex += row.length;

        yield row;
    }
}
