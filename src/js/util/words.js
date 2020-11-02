import { sample } from 'lodash';

import { NUMBER_OF_WORDS, MAX_WORD_LENGTH } from 'constants/config';

export const selectWords = ({ words, capitalisation, punctuation, numbers }) => {
    let selectedWords = [];
    let word;
    
    while (selectedWords.length < NUMBER_OF_WORDS) {
        word = sample(words);

        if (word.length <= MAX_WORD_LENGTH) {
            selectedWords.push(word);
        }
    }

    if (capitalisation) {

    } else {
        selectedWords = selectedWords.join(' ').toLowerCase().split(' ');
    }

    return selectedWords;
};
