import { useContext, useState, useEffect } from 'react';

import { Context } from 'components/Context';
import { mergeToHistory, calculateSpeed, calculateAccuracy } from 'util/results';
import { STATE } from 'constants/config';

export const Results = () => {

    const { state, keyTimes, errors, history, results, testWords, setErrors, setKeyTimes, setResults, setHistory } = useContext(Context);
    const [ startTime, setStartTime ] = useState(null);

    useEffect(() => {
        if (!startTime && state === STATE.TESTING) {
            setStartTime(performance.now());
        } else if (startTime && state === STATE.END) {
            const textLength = testWords.join(' ').length;
            const timeMinutes = (performance.now() - startTime) / 60000;
            const wordsPerMinute = calculateSpeed(textLength, timeMinutes);
            const accuracy = calculateAccuracy(textLength, errors);

            setResults({ wordsPerMinute, accuracy });
            setHistory(mergeToHistory(history, textLength, timeMinutes, keyTimes, errors));
            setStartTime(null);
        } else if ((state === STATE.RESET || state === STATE.BEGIN) &&
                   (startTime || keyTimes.length || errors.length)) {
            setKeyTimes([]);
            setErrors([]);
            setResults({});
            setStartTime(null);
        }
    });

    const className = state === STATE.END ? 'results' : 'results hidden';

    return (
        <div className={className}>
            {
                results.wordsPerMinute &&
                <div className="resultColumn">
                    <div className="resultItem">
                        <div className="number">{results.wordsPerMinute}</div><div className="text">&nbsp;words per minute,</div>
                    </div>
                    <div className="resultItem">
                        <div className="number">{results.accuracy}</div><div className="text">&nbsp;percent accuracy,</div>
                    </div>
                </div>
            }
            {
                history.averageWordsPerMinute &&
                <div className="resultColumn">
                    <div className="resultItem">
                        <div className="number">{history.averageWordsPerMinute}</div><div className="text">&nbsp;average</div>
                    </div>
                    <div className="resultItem">
                        <div className="number">{history.averageAccuracy}</div><div className="text">&nbsp;average</div>
                    </div>
                </div>
            }
        </div>
    );

};
