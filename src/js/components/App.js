import { useState } from 'react';

import { DataContext } from 'components/DataContext';
import { DataLoader } from 'components/DataLoader';
import { Options } from 'components/Options';
import { TextArea } from 'components/TextArea';
import { Results } from 'components/Results';
import { STATE } from 'constants/config';

export const App = () => {

    const [ state, newState ] = useState(STATE.BEGIN);
    const [ allWords, newAllWords ] = useState([]);
    const [ testWords, newTestWords ] = useState([]);
    const [ results, newResults ] = useState({ errors:[] });

    const setState = (props) => { console.log('State: ' + props); newState(props); };
    const setAllWords = (props) => newAllWords(props);
    const setTestWords = (props) => newTestWords(props);
    const setResults = (props) => newResults(props);

    return (
        <DataContext.Provider value={{ 
            state,
            allWords,
            testWords,
            results,
            setState,
            setAllWords,
            setTestWords,
            setResults
         }}>
            <div className="app">
                <DataLoader />
                <Options />
                <TextArea />
                <Results />
            </div>
        </DataContext.Provider>
    );

};
