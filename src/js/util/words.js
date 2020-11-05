import { sample, cloneDeep, findIndex, upperFirst } from 'lodash';

import { NUMBER_OF_ROWS, MAX_WORD_LENGTH, ROW_LENGTH_CHARS, PROPABILITY } from 'constants/config';

const probability = (number) => Math.random() <= number;

const capitalisation = (enabled, words) => {
    if (enabled) {
        words.forEach((word, index) => {
            if (probability(PROPABILITY.CAPITALISED)) {
                words[index] = upperFirst(word);
            }
        });
    } else {
        words = words.join(' ').toLowerCase().split(' ');
    }
};

const numbers = (enabled, words) => {
    if (enabled) {
        words.forEach((word, index) => {
            if (index > 1 && !!isNaN(words[index - 1]) && probability(PROPABILITY.NUMBER)) {
                words[index] = `${Math.floor(Math.random() * 999) + 100}`.substr(0, Math.floor(Math.random() * 3) + 1);
            }
        });
    }
};

export const selectWords = ({ options, list }) => {
    let selectedWords = [];
    let word;
    
    while (selectedWords.length < options.words) {
        word = sample(list);

        if (word.length <= MAX_WORD_LENGTH) {
            selectedWords.push(word);
        }
    }

    capitalisation(options.capitalisation, selectedWords);
    numbers(options.numbers, selectedWords);

    return selectedWords;
};

export const getActiveRowIndex = (rows, cursorIndex) => 
    findIndex(rows, (row) => (cursorIndex >= row.charIndex && cursorIndex < row.charIndex + row.length ));

const getRow = (words) => {
    const array = [];

    while (words.length && array.join(' ').length + words[0].length + 2 <= ROW_LENGTH_CHARS) {
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
        const row = getRow(array, charIndex);

        row.charIndex = charIndex;
        row.number = rowNumberIterator.next().value;
        charIndex += row.length;

        yield row;
    }
}
