import { load } from 'api/storage';

export const NUMBER_OF_ROWS = 5;
export const ROW_HEIGHT = 37;
export const MAX_WORD_LENGTH = 12;
export const ROW_LENGTH_CHARS = 48;
export const CHARS_IN_WORD = 5;

export const PROPABILITY = {
    CAPITALISED: 0.4,
    NUMBER: 0.3
};

export const OPTIONS_DEFAULT = {
    language: load('language', 'english'),
    words: load('words', '20'),
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
