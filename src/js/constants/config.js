import { load } from 'api/storage';

export const NUMBER_OF_ROWS = 5;
export const MAX_WORD_LENGTH = 14;
export const CHARS_IN_WORD = 5;
export const WORDS_SAMPLE_SIZE = 20;
export const NUMBER_OF_SLOW_KEYS = 8;
export const NUMBER_OF_ERROR_KEYS = 8;

export const PROBABILITY = {
    ADAPTIVE: 0.5,
    ADAPTIVE_CAPITALISED: 0.7,
    CAPITALISED: 0.4,
    NUMBER: 0.3
};

export const OPTIONS_DEFAULT = {
    language: load('language', 'english'),
    words: load('words', '10'),
    capitalisation: load('capitalisation', false),
    punctuation: load('punctuation', false),
    numbers: load('numbers', false)
};

export const STATE = {
    BEGIN: 'BEGIN',
    TESTING: 'TESTING',
    END: 'END',
    RESET: 'RESET'
};
