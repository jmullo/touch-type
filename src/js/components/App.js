import { useState } from 'react';

import { Context } from 'components/Context';
import { WordLoader } from 'components/WordLoader';
import { Header } from 'components/Header';
import { Middle } from 'components/Middle';
import { Status } from 'components/Status';
import { Footer } from 'components/Footer';
import { OPTIONS_DEFAULT, STATE } from 'constants/config';

export const App = () => {

    const [ state, newState ] = useState(STATE.BEGIN);
    const [ options, newOptions ] = useState(OPTIONS_DEFAULT);
    const [ allWords, newAllWords ] = useState({});
    const [ testWords, newTestWords ] = useState([]);
    const [ keyTimes, newKeyTimes ] = useState([]);
    const [ errors, newErrors ] = useState([]);
    const [ results, newResults ] = useState({});
    const [ history, newHistory ] = useState({});

    const setState = (props) => newState(props);
    const setOptions = (props) => newOptions(props);
    const setAllWords = (props) => newAllWords(props);
    const setTestWords = (props) => newTestWords(props);
    const setKeyTimes = (props) => newKeyTimes(props);
    const setErrors = (props) => newErrors(props);
    const setResults = (props) => newResults(props);
    const setHistory = (props) => newHistory(props);

    return (
        <Context.Provider value={{
            state, setState,
            options, setOptions,
            allWords, setAllWords,
            testWords, setTestWords,
            keyTimes, setKeyTimes,
            errors, setErrors,
            results, setResults,
            history, setHistory
         }}>
            <div className="top">
                <div className="app">
                    <WordLoader />
                    <Header />
                    <Middle />
                    <Status />
                </div>
            </div>
            <Footer />
        </Context.Provider>
    );

};
