import { useContext, useState, useEffect } from 'react';

import { Context } from 'components/Context';
import { mergeToHistory, calculateSpeed, calculateAccuracy } from 'util/results';
import { STATE } from 'constants/config';

export const Results = () => {

    const { state, keyTimes, errors, history, results, typedText, setErrors, setKeyTimes, setResults, setHistory } = useContext(Context);
    const [ startTime, setStartTime ] = useState(null);

    useEffect(() => {
        if (state === STATE.TESTING) {
            setStartTime(performance.now());
        } else if (state === STATE.END) {
            const textLength = typedText.length;
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
    }, [state]);

    const className = state === STATE.END ? 'results' : 'results hidden';

    return (
        <div className={className}>
            {
                results.wordsPerMinute &&
                <>
                    <div className="row">
                        <div className="cell">
                            <div className="number">{results.wordsPerMinute}</div>
                            <div>&nbsp;words per minute,</div>
                        </div>
                        <div className="cell">
                            <div className="number">{history.averageWordsPerMinute}</div>
                            <div>&nbsp;average</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <div className="number">{results.accuracy}</div>
                            <div>&nbsp;percent accuracy,</div>
                        </div>
                        <div className="cell">
                            <div className="number">{history.averageAccuracy}</div>
                            <div>&nbsp;average</div>
                        </div>
                    </div>
                    <div className="row empty"></div>
                    <div className="row">
                        <div className="cell">
                            <div>slowest characters:</div>
                        </div>
                        <div className="cell">
                            <div>{history.slowestKeys.join('')}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <div>typo characters:</div>
                        </div>
                        <div className="cell">
                            <div>{history.errorKeys.join('')}</div>
                        </div>
                    </div>
                </>
            }
        </div>
    );

};
