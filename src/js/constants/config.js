import { load } from 'api/storage';

export const NUMBER_OF_ROWS = 5;
export const ROW_HEIGHT_PX = 37;
export const MAX_WORD_LENGTH = 12;
export const CHAR_WIDTH_PX = 16.81;
export const CHARS_IN_WORD = 5;
export const NUMBER_OF_SLOW_KEYS = 10;
export const NUMBER_OF_ERROR_KEYS = 10;

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
