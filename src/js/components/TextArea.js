import { useContext, useState, useCallback, useEffect } from 'react';

import { DataContext } from 'components/DataContext';
import { Row } from 'components/Row';
import { STATE } from 'constants/config';
import { addError, addKeyTime } from 'util/results';
import { rowGenerator, getActiveRowIndex } from 'util/words';

let lastKeyTime;

export const TextArea = () => {

    const { state, testWords, results, setState, setResults } = useContext(DataContext);
    const [ typedText, setTypedText ] = useState([]);
    const [ cursorIndex, setCursorIndex ] = useState(0);

    let typedChar;
    let timeNow;

    const testText = testWords.join(' ');
    const rows = Array.from(rowGenerator(testWords));

    const inputRef = useCallback((element) => {
        if (element) {
            window.getSelection().removeAllRanges();
            element.focus();
            
            element.onblur = () => {
                setTimeout(() => element.focus(), 1);
            }
        }
    }, []);

    useEffect(async () => {
        if (state === STATE.RESET) {
            setTypedText([]);
            setCursorIndex(0);
        }
    });

    const handleInput = (event) => {
        if (state === STATE.END) {
            event.preventDefault();
            return;
        }

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            typedText.pop();
            setTypedText(typedText);
            setCursorIndex(Math.max(0, cursorIndex - 1));
        }
    };

    const handleKeypress = (event) => {
        if (state === STATE.END) {
            event.preventDefault();
            lastKeyTime = null;

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

        typedText.push(typedChar);

        if (typedChar !== testText[cursorIndex]) {
            setResults(addError({ results, key: testText[cursorIndex] }));
            lastKeyTime = null;
        } else if (lastKeyTime) { 
            setResults(addKeyTime({ results, key: testText[cursorIndex], time: timeNow - lastKeyTime }));
            lastKeyTime = timeNow;
        } else {
            lastKeyTime = timeNow;
        }

        setTypedText(typedText);
        setCursorIndex(cursorIndex + 1);

        if (cursorIndex + 1 === testText.length) {
            setState(STATE.END);
        }
    };

    return (
        <div className="textArea">
            <input
                autoFocus
                id="text"
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
                        typedText={typedText}
                        activeRowIndex={getActiveRowIndex(rows, cursorIndex)}
                        lastRowIndex={rows.length - 1}
                        cursorIndex={cursorIndex}
                        key={index} />
                ))
            }
        </div>
    );

};
