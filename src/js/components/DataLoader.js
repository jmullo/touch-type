import { useContext, useEffect } from 'react';

import { DataContext } from 'components/DataContext';
import { loadWordList } from 'api/file';
import { selectWords  } from 'util/words';
import { STATE } from 'constants/config';

let loadedWords;

export const DataLoader = () => {

    const { state, allWords, setState, setAllWords, setTestWords } = useContext(DataContext);

    useEffect(async () => {
        if (!allWords[0]) {
            loadedWords = await loadWordList();

            setAllWords(loadedWords);
            setTestWords(selectWords({ words: loadedWords }));
        } else if (state === STATE.RESET) {
            setTestWords(selectWords({ words: loadedWords }));
            setState(STATE.BEGIN);
        }
    });

    return null;

};
