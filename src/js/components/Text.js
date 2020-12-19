import { useContext, useState, useCallback, useEffect, useRef } from 'react';

import { Context } from 'components/Context';
import { Row } from 'components/Row';
import { STATE, NUMBER_OF_ROWS } from 'constants/config';
import { focusHandler } from 'util/dom';
import { addError, addKeyTime } from 'util/results';
import { rowGenerator, getActiveRowIndex } from 'util/words';

let testText;
let lastKeyTime;

const setLastKeyTime = (time) => lastKeyTime = time;

export const Text = () => {

    const { state, testWords, typedText, setState, setTypedText, setKeyTimes, setErrors } = useContext(Context);
    const [ rows, setRows ] = useState([]);
    const inputRef = useCallback(focusHandler, []);
    const testWordsRef = useRef();

    let typedChar;
    let caretIndex;
    let timeNow;

    useEffect(() => {
        if (state === STATE.BEGIN && testWordsRef.current !== testWords) {
            testWordsRef.current = testWords;
            testText = testWords.join(' ');

            setRows(Array.from(rowGenerator(testWords)));
        } else if (state === STATE.RESET) {
            testText = null;

            setRows([]);
            setTypedText([]);
            setLastKeyTime(null);
        }

    }, [state]);

    const handleInput = (event) => {
        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            setTypedText(typedText.slice(0, -1));
            setLastKeyTime(null);

            if (typedText.length === 1 && state !== STATE.BEGIN) {
                setState(STATE.BEGIN);
            }
        }
    };

    const handleKeypress = (event) => {
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
                rows.map((row, index) => {
                    const activeRowIndex = getActiveRowIndex(rows, typedText.length);

                    if (Math.abs(index - activeRowIndex) <= NUMBER_OF_ROWS) {
                        return (
                            <Row
                                index={index}
                                row={row}
                                hidden={state === STATE.END}
                                typedText={typedText}
                                activeRowIndex={activeRowIndex}
                                caretIndex={typedText.length}
                                key={index} />
                        );
                    }

                    return null;
                })
            }
        </div>
    );

};
