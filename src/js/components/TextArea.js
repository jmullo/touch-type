import { useContext, useState, useCallback } from 'react';

import { DataContext } from 'components/DataContext';
import { Word } from 'components/Word';
import { Space } from 'components/Space';
import { STATE } from 'constants/config';
import { addError } from 'util/results';

export const TextArea = () => {

    const { state, testWords, results, setState, setResults } = useContext(DataContext);
    const [ typedText, setTypedText ] = useState([]);
    const [ cursorIndex, setCursorIndex ] = useState(0);

    let typedWord;
    let typedChar;
    let charIndex = 0;

    const testText = testWords.join(' ');

    const elements = testWords.reduce((array, word, index) => { 
        typedWord = typedText.slice(charIndex, charIndex + word.length).join('');

        array.push(
            <Word
                word={word}
                typedWord={typedWord}
                charIndex={charIndex}
                cursorIndex={cursorIndex}
                key={charIndex} />
        );
        
        charIndex += word.length;
        typedChar = typedText.slice(charIndex, charIndex + 1).join('');

        if (index < testWords.length - 1) {
            array.push(
                <Space
                    typedChar={typedChar}
                    charIndex={charIndex}
                    cursorIndex={cursorIndex}
                    key={charIndex++} />
            );
        }

        return array;
    }, []);

    const inputRef = useCallback((element) => {
        if (element) {
            element.focus();
            
            element.onblur = () => {
                setTypedText([]);
                setCursorIndex(0);
                setState(STATE.RESET);
                element.focus();
            }
        }
    }, []);

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
            return;
        }
        
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
            { elements }
        </div>
    );

};
