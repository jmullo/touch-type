export const Char = ({ char, typedChar, charIndex, cursorIndex }) => {

    let className = 'char';

    if (cursorIndex === charIndex) {
        className += ' cursor';
    }
    
    if (typedChar && char !== typedChar) {
        className += ' error';

        if (char === ' ') {
            char = '_';
        }
    } else if (typedChar && char === typedChar) {
        className += ' correct';
    }

    return (
        <div className={className}>
            {
                char === ' ' ? <div>&nbsp;</div> : char
            }
        </div>
    );

};
