import { useContext, useCallback } from 'react';

import { Context } from 'components/Context';
import { resetHistory } from 'util/results';
import { STATE } from 'constants/config';
import { focusHandler } from 'util/dom';

export const Status = () => {

    const { state, results, setState, setHistory } = useContext(Context);
    const inputRef = useCallback(focusHandler, []);

    const handleKeyUp = (event) => {
        event.preventDefault();

        if (state === STATE.END && event.key === 'Enter') {
            setState(STATE.RESET);
        } else if (state === STATE.END && event.key === 'Delete') {
            setHistory(resetHistory(results));
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

    let className;

    if (state === STATE.BEGIN ) {
        className = 'hint visible';
    } else if (state === STATE.END) {
        className = 'hint visible clickable';
    } else {
        className = 'hint hidden';
    }

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
            <div className={className}>
                {
                    state === STATE.END &&
                    <>
                        <div className="entry" onClick={handleContinue}>
                            Press <span className="key">Enter</span> to continue,
                        </div>
                        <div className="entry" onClick={handleReset}>
                            <span className="key">Delete</span> to reset statistics
                        </div>
                    </>
                }
                {
                    state !== STATE.END &&
                    <>Start typing</>
                }
            </div>
        </div>
    );

};
