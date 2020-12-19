import { useState } from 'react';

import { Context } from 'components/Context';
import { Loader } from 'components/Loader';
import { Header } from 'components/Header';
import { Middle } from 'components/Middle';
import { Status } from 'components/Status';
import { Links } from 'components/Links';
import { OPTIONS_DEFAULT, STATE } from 'constants/config';

export const App = () => {

    const [ state, newState ] = useState(STATE.LOADING);
    const [ options, newOptions ] = useState(OPTIONS_DEFAULT);
    const [ allWords, newAllWords ] = useState({});
    const [ testWords, newTestWords ] = useState([]);
    const [ typedText, newTypedText ] = useState([]);
    const [ keyTimes, newKeyTimes ] = useState([]);
    const [ errors, newErrors ] = useState([]);
    const [ results, newResults ] = useState({});
    const [ history, newHistory ] = useState({});

    const setState = (props) => newState(props);
    const setOptions = (props) => newOptions(props);
    const setAllWords = (props) => newAllWords(props);
    const setTestWords = (props) => newTestWords(props);
    const setTypedText = (props) => newTypedText(props);
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
            typedText, setTypedText,
            keyTimes, setKeyTimes,
            errors, setErrors,
            results, setResults,
            history, setHistory
        }}>
            <span id="measure">x</span>
            <Loader />
            <Header />
            <Middle />
            <Status />
            <Links />
        </Context.Provider>
    );

};
