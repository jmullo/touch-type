import { useContext, useCallback } from 'react';

import { Context } from 'components/Context';
import { Timer } from 'components/Timer';
import { resetHistory } from 'util/results';
import { STATE } from 'constants/config';
import { focusHandler } from 'util/dom';

export const Status = () => {

    const { state, options, results, setState, setHistory } = useContext(Context);
    const inputRef = useCallback(focusHandler, []);

    const handleKeyUp = (event) => {
        event.preventDefault();

        if (state === STATE.END && event.key === 'Enter') {
            setState(STATE.RESET);
        } else if (state === STATE.END && event.key === 'Delete') {
            setHistory(resetHistory(results));
        }
    };

    const handleTimerComplete = () => {
        if (state === STATE.TESTING) {
            setState(STATE.END);
        }
    };

    const handleContinue = () => {
        if (state === STATE.END) {
            setState(STATE.RESET);
        }
    };

    const handleReset = () => {
        if (state === STATE.END) {
            setHistory(resetHistory(results));
        }
    };

    const classNameStart = state === STATE.BEGIN ? "hint visible" : "hint hidden";
    const classNameTesting = state === STATE.TESTING ? "hint visible" : "hint hidden";
    const classNamePrompt = state === STATE.END ? "hint visible" : "hint hidden";

    return (
        <div className="status">
            {
                state === STATE.END &&
                <input
                    autoFocus
                    className="input"
                    tabIndex="0"
                    autoComplete="off"
                    ref={inputRef}
                    onKeyUp={handleKeyUp} />
            }
            <div className={classNameStart}>
                <div className="entry">
                    Start typing
                </div>
            </div>
            <div className={classNameTesting}>
                <div className="entry">
                    {
                        state === STATE.TESTING &&
                        <Timer time={options.time} onComplete={handleTimerComplete} />
                    }
                </div>
            </div>
            <div className={classNamePrompt}>
                <div className="entry clickable" onClick={handleContinue}>
                    Press <span className="key">Enter</span> to continue,
                </div>
                <div className="entry clickable" onClick={handleReset}>
                    <span className="key">Delete</span> to reset statistics
                </div>
            </div>
        </div>
    );

};
