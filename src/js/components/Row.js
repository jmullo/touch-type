import { Char } from 'components/Char';
import { getMeasuredFont, getRowPadding } from 'util/dom';
import { NUMBER_OF_ROWS } from 'constants/config';

export const Row = ({ index, row, hidden, activeRowIndex, typedText, caretIndex }) => {

    const hide = ((activeRowIndex - index) > 1) ||
                  (index >= NUMBER_OF_ROWS && (index - activeRowIndex) > 3);

    const className = (hidden || hide) ? "row hidden" : "row visible";
    const style = { top: `${(row.number * getRowPadding()) + (row.number * getMeasuredFont().height)}px` };

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
