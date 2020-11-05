import { Char } from 'components/Char';
import { ROW_HEIGHT, NUMBER_OF_ROWS } from 'constants/config';

export const Row = ({ index, row, activeRowIndex, lastRowIndex, typedText, cursorIndex }) => {

    //console.log(`index: ${index}, active: ${activeRowIndex}, number: ${row.number}, length: ${row.length}`);

    const hidden = (/*lastRowIndex - index >= NUMBER_OF_ROWS &&*/ (activeRowIndex - index) > 1) || 
                   (index >= NUMBER_OF_ROWS && (index - activeRowIndex) > 3);

    const className = hidden ? "row hidden" : "row";
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
                                    typedChar={typedText[charIndex]}
                                    charIndex={charIndex}
                                    cursorIndex={cursorIndex}
                                    key={charIndex++} />
                            ))
                        }
                        {
                            <Char 
                                char={" "}
                                typedChar={typedText[charIndex]}
                                charIndex={charIndex++}
                                cursorIndex={cursorIndex} />
                        }
                    </div>
                ))   
            }
        </div>
    );

};
