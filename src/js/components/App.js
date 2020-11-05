import { useState } from 'react';

import { DataContext } from 'components/DataContext';
import { DataLoader } from 'components/DataLoader';
import { Header } from 'components/Header';
import { TextArea } from 'components/TextArea';
import { Results } from 'components/Results';
import { Footer } from 'components/Footer';
import { OPTIONS_DEFAULT, STATE } from 'constants/config';

export const App = () => {

    const [ state, newState ] = useState(STATE.BEGIN);
    const [ options, newOptions ] = useState(OPTIONS_DEFAULT);
    const [ allWords, newAllWords ] = useState([]);
    const [ testWords, newTestWords ] = useState([]);
    const [ results, newResults ] = useState({});

    const setState = (props) => newState(props);
    const setOptions = (props) => newOptions(props);
    const setAllWords = (props) => newAllWords(props);
    const setTestWords = (props) => newTestWords(props);
    const setResults = (props) => newResults(props);

    return (
        <DataContext.Provider value={{ 
            state,
            options,
            allWords,
            testWords,
            results,
            setState,
            setOptions,
            setAllWords,
            setTestWords,
            setResults
         }}>
            <div className="top">
                <div className="app">
                    <DataLoader />
                    <Header />
                    <TextArea />
                    <Results />
                </div>
            </div>
            <Footer />
        </DataContext.Provider>
    );

};
