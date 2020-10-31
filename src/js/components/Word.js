import { Char } from 'components/Char';

export const Word = ({word, typedWord, charIndex, cursorIndex}) => {

    return (
        <div className="word">
            {
                word.split('').map((char, index) => (
                    <Char 
                        char={char}
                        typedChar={typedWord[index]}
                        charIndex={charIndex}
                        cursorIndex={cursorIndex}
                        key={charIndex++} />
                ))
            }
        </div>
    );

};
