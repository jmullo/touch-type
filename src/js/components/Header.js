import { useContext } from 'react';

import { Context } from 'components/Context';
import { Button } from 'components/Button';
import { save } from 'api/storage';
import { STATE } from 'constants/config';

export const Header = () => {

    const { options, setOptions, setState } = useContext(Context);

    const setAndResetState = (options) => setOptions(options) || setState(STATE.RESET);

    const handleOption = (key, value) => {
        if (value !== options[key]) {
            save(key, value);
            setAndResetState({...options, [key]: value });
        }
    };

    const handleToggle = (key) => {
        save(key, !options[key]);
        setAndResetState({...options, [key]: !options[key] });
    };

    const createOptionButton = (key, value) => (
        <Button
            className="button"
            text={value}
            enabled={options[key] === value}
            onClick={() => handleOption(key, value)} />
    );

    const createToggleButton = (key) => (
        <Button
            className="button"
            text={key}
            enabled={options[key]}
            onClick={() => handleToggle(key)} />
    );

    return (
        <div className="header">
            <div className="appName">
                touch-type
            </div>
            <div className="options">
                { createOptionButton('language', 'english') }
                { createOptionButton('language', 'finnish') }
            </div>
            <div className="options">
                { createOptionButton('words', '20') }
                { createOptionButton('words', '50') }
                { createOptionButton('words', '100') }
            </div>
            <div className="options">
                { createToggleButton('capitalisation') }
                { createToggleButton('punctuation') }
                { createToggleButton('numbers') }
            </div>
        </div>
    );

};
