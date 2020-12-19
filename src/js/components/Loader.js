import { useContext, useEffect } from 'react';

import { Context } from 'components/Context';
import { loadWordList } from 'api/file';
import { selectWords  } from 'util/words';
import { STATE } from 'constants/config';

export const Loader = () => {

    const { state, options, allWords, history, setState, setAllWords, setTestWords } = useContext(Context);

    useEffect(async () => {
        if (state === STATE.LOADING) {
            const loadedWords = await loadWordList();

            setAllWords(loadedWords);
            setTestWords(selectWords(loadedWords, options, history));
            setState(STATE.BEGIN);
        } else if (state === STATE.RESET) {
            setTestWords(selectWords(allWords, options, history));
            setState(STATE.BEGIN);
        }
    }, [state, options]);

    return null;
};
