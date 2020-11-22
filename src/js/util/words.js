import { sample, sampleSize, cloneDeep, findIndex, upperFirst, union } from 'lodash';

import {
    PROBABILITY,
    NUMBER_OF_ROWS,
    MAX_WORD_LENGTH,
    CHAR_WIDTH_PX,
    WORDS_SAMPLE_SIZE
} from 'constants/config';

const withProbability = (number) => Math.random() <= number;

const createNumber = () => `${Math.floor(Math.random() * 999) + 100}`.substr(0, Math.floor(Math.random() * 3) + 1);

const nextNumber = (enabled) => enabled && withProbability(PROBABILITY.NUMBER);

const capitalise = (enabled, word, probability) => enabled && withProbability(probability) ? upperFirst(word) : word.toLowerCase();

const upperFirstInWorst = (word, worstKeys) => worstKeys.includes(word.substr(0, 1).toUpperCase());

const calculateRank = (word, worstKeys, capitalisation) => {
    const rank = worstKeys.reduce((sum, char) => word.includes(char.toLowerCase()) ? sum + 1 : sum, 0);

    return capitalisation && upperFirstInWorst(word, worstKeys) ? rank + 1 : rank;
};

const adaptiveSample = (list, worstKeys, options) => {
    const samples = sampleSize(list, WORDS_SAMPLE_SIZE);

    samples.sort((wordA, wordB) =>
        calculateRank(wordB, worstKeys, options.capitalisation) - calculateRank(wordA, worstKeys, options.capitalisation));

    return samples[0];
};

const selectWord = (list, options, worstKeys) => {
    let word;

    do {
        if (withProbability(PROBABILITY.ADAPTIVE) && worstKeys.length) {
            word = adaptiveSample(list[options.language], worstKeys, options);
        } else {
            word = sample(list[options.language]);
        }
    } while (word.length > MAX_WORD_LENGTH);

    if (upperFirstInWorst(word, worstKeys)) {
        word = capitalise(options.capitalisation, word, PROBABILITY.ADAPTIVE_CAPITALISED);
    } else {
        word = capitalise(options.capitalisation, word, PROBABILITY.CAPITALISED);
    }

    return word;
};

export const selectWords = (list, options, history) => {
    const worstKeys = union(history.errorKeys || [], history.slowestKeys || []);

    let selectedWords = [];

    while (selectedWords.length < options.words) {
        if (nextNumber(options.numbers)) {
            selectedWords.push(createNumber());
        } else {
            selectedWords.push(selectWord(list, options, worstKeys));
        }
    }

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
