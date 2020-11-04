import { sample, cloneDeep, findIndex, upperFirst } from 'lodash';

import { NUMBER_OF_ROWS, MAX_WORD_LENGTH, ROW_LENGTH_CHARS } from 'constants/config';

export const selectWords = ({ options, list }) => {
    let selectedWords = [];
    let word;
    
    while (selectedWords.length < options.words) {
        word = sample(list);

        if (word.length <= MAX_WORD_LENGTH) {
            selectedWords.push(word);
        }
    }

    if (options.capitalisation) {
        selectedWords.forEach((word, index) => selectedWords[index] = upperFirst(word));
    } else {
        selectedWords = selectedWords.join(' ').toLowerCase().split(' ');
    }

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
