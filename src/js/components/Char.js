import { memoize } from 'lodash';

const charFunction = ({ char, isCorrect, isError, hasCursor }) => {

    let className = 'char';
    
    if (isCorrect) {
        className += ' correct';
    } else if (isError) {
        className += ' error';

        if (char === ' ') {
            char = '_';
        }
    }

    if (hasCursor) {
        className += ' cursor';
    }

    return (
        <div className={className}>
            {
                char === ' ' ? <div>&nbsp;</div> : char
            }
        </div>
    );

};

export const Char = memoize(charFunction, ({ char, isCorrect, isError, hasCursor }) => 
    `${char}-${isCorrect}-${isError}-${hasCursor}`);
