import { useContext, useState, useEffect } from 'react';

import { DataContext } from 'components/DataContext';
import { countErrors, averageKeyTimes } from 'util/results';
import { STATE, CHARS_IN_WORD } from 'constants/config';

export const Results = () => {

    const { state, results, testWords, setResults } = useContext(DataContext);
    const [ startTime, setStartTime ] = useState(null);

    const className = state === STATE.END ? 'results' : 'results hidden';

    const formatResults = () => {
        if (results.wordsPerMinute) {
            //console.log(averageKeyTimes(results));

            return (
                <>
                    <div className="resultValue">
                        <span className="number">{results.wordsPerMinute}</span> words per minute
                    </div>
                    <div className="resultValue">
                        <span className="number">{results.accuracy}</span> % accuracy
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
            const accuracy = Math.floor((testTextLength - countErrors(results)) / testTextLength * 100);

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
