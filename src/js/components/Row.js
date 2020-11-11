import { Char } from 'components/Char';
import { ROW_HEIGHT, NUMBER_OF_ROWS } from 'constants/config';

export const Row = ({ index, row, hidden, activeRowIndex, typedText, caretIndex }) => {

    const hide = ((activeRowIndex - index) > 1) ||
                  (index >= NUMBER_OF_ROWS && (index - activeRowIndex) > 3);

    const className = (hidden || hide) ? "row hidden" : "row visible";
    const style = { top: `${10 + (row.number * 4) + (row.number * ROW_HEIGHT)}px` };

    let charIndex = row.charIndex;

    return (
        <div className={className} style={style}>
            {
                row.words.map((word) => (
                    <div className="word" key={charIndex}>
                        {
                            word.split('').map((char) => (
                                <Char
                                    char={char}
                                    isCorrect={typedText[charIndex] && char === typedText[charIndex]}
                                    isError={typedText[charIndex] && char !== typedText[charIndex]}
                                    hasCaret={caretIndex === charIndex}
                                    key={charIndex++} />
                            ))
                        }
                        {
                            <Char
                                char={" "}
                                isCorrect={typedText[charIndex] && " " === typedText[charIndex]}
                                isError={typedText[charIndex] && " " !== typedText[charIndex]}
                                hasCaret={caretIndex === charIndex++} />
                        }
                    </div>
                ))
            }
        </div>
    );

};
