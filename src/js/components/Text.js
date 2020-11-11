import { useContext, useState, useCallback, useEffect } from 'react';

import { Context } from 'components/Context';
import { Row } from 'components/Row';
import { STATE } from 'constants/config';
import { focusHandler } from 'util/dom';
import { addError, addKeyTime } from 'util/results';
import { rowGenerator, getActiveRowIndex } from 'util/words';

let lastKeyTime;

const setLastKeyTime = (time) => lastKeyTime = time;

export const Text = () => {

    const { state, testWords, setState, setKeyTimes, setErrors } = useContext(Context);
    const [ typedText, setTypedText ] = useState([]);
    const inputRef = useCallback(focusHandler, []);

    const testText = testWords.join(' ');
    const rows = Array.from(rowGenerator(testWords));

    let typedChar;
    let caretIndex;
    let timeNow;

    useEffect(() => {
        if (state === STATE.RESET) {
            setTypedText([]);
            setLastKeyTime(null);
        }
    });

    const handleInput = (event) => {
        if (state === STATE.END) {
            event.preventDefault();
            return;
        }

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            setTypedText(typedText.slice(0, -1));
            setLastKeyTime(null);

            if (typedText.length === 1 && state !== STATE.BEGIN) {
                setState(STATE.BEGIN);
            }
        }
    };

    const handleKeypress = (event) => {
        if (state === STATE.END) {
            event.preventDefault();
            return;
        }

        timeNow = performance.now();

        if (state !== STATE.TESTING) {
            setState(STATE.TESTING);
        }

        if (event.key === 'Enter') {
            typedChar = ' ';
            event.target.value = event.target.value + typedChar;
        } else {
            typedChar = event.key;
        }

        caretIndex = typedText.length;

        if (typedChar !== testText[caretIndex]) {
            setErrors((errors) => addError(errors, testText[caretIndex]));
            setLastKeyTime(null);
        } else if (lastKeyTime) {
            setKeyTimes((keyTimes) => addKeyTime(keyTimes, testText[caretIndex], timeNow - lastKeyTime));
            setLastKeyTime(timeNow);
        } else {
            setLastKeyTime(timeNow);
        }

        setTypedText((chars) => [...chars, typedChar]);

        if (caretIndex + 1 === testText.length) {
            setState(STATE.END);
        }
    };

    return (
        <div className="text">
            <input
                autoFocus
                className="input"
                tabIndex="0"
                autoComplete="off"
                ref={inputRef}
                onChange={handleInput}
                onKeyPress={handleKeypress} />
            {
                rows.map((row, index) => (
                    <Row
                        index={index}
                        row={row}
                        hidden={state === STATE.END}
                        typedText={typedText}
                        activeRowIndex={getActiveRowIndex(rows, typedText.length)}
                        caretIndex={typedText.length}
                        key={index} />
                ))
            }
        </div>
    );

};
