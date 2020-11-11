import { useContext, useCallback } from 'react';

import { Context } from 'components/Context';
import { STATE } from 'constants/config';
import { focusHandler } from 'util/dom';

export const Status = () => {

    const { state, setState } = useContext(Context);
    const inputRef = useCallback(focusHandler, []);

    const handleKeypress = (event) => {
        event.preventDefault();

        if (state === STATE.END && event.key === 'Enter') {
            setState(STATE.RESET);
        }
    };

    const handleClick = () => {
        if (state === STATE.END) {
            setState(STATE.RESET);
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
                    onKeyPress={handleKeypress} />
            }
            <div className={className} onClick={handleClick}>
                {
                    state === STATE.END &&
                    <>Press <span className="key">Enter</span> to continue</>
                }
                {
                    state !== STATE.END &&
                    <>Start typing</>
                }
            </div>
        </div>
    );

};
