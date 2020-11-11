import { memoize } from 'lodash';

const charFunction = ({ char, isCorrect, isError, hasCaret }) => {

    let className = 'char';

    if (isCorrect) {
        className += ' correct';
    } else if (isError) {
        className += ' error';

        if (char === ' ') {
            char = '_';
        }
    }

    if (hasCaret) {
        className += ' caret';
    }

    return (
        <div className={className}>
            {
                char === ' ' ? <div>&nbsp;</div> : char
            }
        </div>
    );

};

export const Char = memoize(charFunction, ({ char, isCorrect, isError, hasCaret }) =>
    `${char}-${isCorrect}-${isError}-${hasCaret}`);
