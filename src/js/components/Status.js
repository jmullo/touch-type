import { useContext, useCallback } from 'react';

import { Context } from 'components/Context';
import { STATE } from 'constants/config';
import { focusHandler } from 'util/dom';

export const Status = () => {

    const { state, setState } = useContext(Context);
    const inputRef = useCallback(focusHandler, []);

    const handleKeypress = (event) => {
        event.preventDefault();

        if (event.key === 'Enter') {
            setState(STATE.RESET);
        }
    };

    const handleClick = () => {
        setState(STATE.RESET);
    };

    const className = state === STATE.END ? 'prompt visible' : 'prompt hidden';

    return (
        <div className="status">
            {
                state === STATE.END &&
                <input
                    autoFocus
                    id="status"
                    className="input"
                    tabIndex="0"
                    autoComplete="off"
                    ref={inputRef}
                    onKeyPress={handleKeypress} />
            }            
            <div className={className} onClick={handleClick}>Press <span className="key">Enter</span> to continue</div>  
        </div>
    );

};
