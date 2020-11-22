import { useContext, useEffect } from 'react';

import { Context } from 'components/Context';
import { loadWordList } from 'api/file';
import { selectWords  } from 'util/words';
import { STATE } from 'constants/config';

let loadedWords;

export const Loader = () => {

    const { state, options, allWords, history, setState, setAllWords, setTestWords } = useContext(Context);

    useEffect(async () => {
        if (!allWords.english) {
            loadedWords = await loadWordList();

            setAllWords(loadedWords);
            setTestWords(selectWords(loadedWords, options, history));
        } else if (state === STATE.RESET) {

            setTestWords(selectWords(loadedWords, options, history));
            setState(STATE.BEGIN);
        }
    });

    return null;
};
