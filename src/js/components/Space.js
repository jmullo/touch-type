import { Char } from 'components/Char';

export const Space = ({typedChar, charIndex, cursorIndex}) => {

    return (
        <div className="space">
            <Char
                char={" "}
                typedChar={typedChar}
                charIndex={charIndex}
                cursorIndex={cursorIndex} />
        </div>
    );

};
