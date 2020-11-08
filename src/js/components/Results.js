import { useContext, useState, useEffect } from 'react';

import { Context } from 'components/Context';
import { countErrors, averageKeyTimes } from 'util/results';
import { STATE, CHARS_IN_WORD } from 'constants/config';

export const Results = () => {

    const { state, keyTimes, errors, results, testWords, setResults } = useContext(Context);
    const [ startTime, setStartTime ] = useState(null);

    const className = state === STATE.END ? 'results' : 'results hidden';

    const formatResults = () => {
        if (results.wordsPerMinute) {
            //console.log(averageKeyTimes(keyTimes));

            return (
                <>
                    <div className="resultRow">
                        <div className="number">{results.wordsPerMinute}</div><div className="text">&nbsp;words per minute</div>
                    </div>
                    <div className="resultRow">
                        <div className="number">{results.accuracy}</div><div className="text">&nbsp;percent accuracy</div>
                    </div>
                </>
            );
        }
    };

    useEffect(() => {
        if (!startTime && state === STATE.TESTING) {
            setStartTime(performance.now());
        } else if (startTime && state === STATE.END) {
            const testTextLength = testWords.join(' ').length;
            const timeMinutes = (performance.now() - startTime) / 60000;
            const wordsPerMinute = Math.floor(testTextLength / CHARS_IN_WORD / timeMinutes);
            const accuracy = Math.floor(Math.max(0, testTextLength - countErrors(errors)) / testTextLength * 100);

            //console.log(testTextLength);
            //console.log(errors, countErrors(errors));

            setResults({ ...results, wordsPerMinute, accuracy });
            setStartTime(null);
        } else if (state === STATE.RESET) {
            setResults({});
        }
    });

    return (
        <div className={className}>
            { formatResults() }
        </div>
    );

};
