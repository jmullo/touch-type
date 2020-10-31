import { useState, useCallback } from 'react';

import { Word } from 'components/Word';
import { Space } from 'components/Space';

export const TextArea = ({text}) => {

    const [typedText, setTypedText] = useState([]);
    const [cursorIndex, setCursorIndex] = useState(0);

    let typedWord;
    let typedChar;
    let charIndex = 0;

    const words = text.split(' ');

    const elements = words.reduce((array, word, index) => { 
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

        if (index < words.length - 1) {
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
                element.focus();
            }
        }
    }, []);

    const handleInput = (event) => {
        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            typedText.pop();
            setTypedText(typedText);
            setCursorIndex(Math.max(0, cursorIndex - 1));
        }
    };

    const handleKeypress = (event) => {
        if (cursorIndex < text.length) {
            if (event.key === 'Enter') {
                event.target.value = event.target.value + ' ';
                typedText.push(' ');
            } else {
                typedText.push(event.key);
            }
    
            setTypedText(typedText);
            setCursorIndex(cursorIndex + 1);
        }
    };

    return (
        <div className="textArea">
            <input
                autoFocus
                id="text"
                className="input"
                tabIndex="0"
                ref={inputRef}
                onChange={handleInput}
                onKeyPress={handleKeypress} />
            { elements }
        </div>
    );

};
