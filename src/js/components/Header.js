import { useContext } from 'react';

import { DataContext } from 'components/DataContext';
import { Button } from 'components/Button';
import { STATE } from 'constants/config';

export const Header = () => {

    const { options, setOptions, setState } = useContext(DataContext);

    const setAndReset = (options) => setOptions(options) || setState(STATE.RESET);
    const handleLanguage = (language) => language !== options.language && setAndReset({...options, language });
    const handleWords = (words) => words !== options.words && setAndReset({...options, words });
    const handleToggle = (button) => setAndReset({...options, [button]: !options[button] });

    return (
        <div className="header">
            <div className="appName">
                touch-type
            </div>
            <div className="options">
                <Button
                    className="button"
                    text="english"
                    enabled={options.language === "english"}
                    onClick={() => handleLanguage("english")} />
                <Button
                    className="button"
                    text="finnish"
                    enabled={options.language === "finnish"}
                    onClick={() => handleLanguage("finnish")} />
            </div>
            <div className="options">
                <Button
                    className="button"
                    text="20"
                    enabled={options.words === "20"}
                    onClick={() => handleWords("20")} />
                <Button
                    className="button"
                    text="50"
                    enabled={options.words === "50"}
                    onClick={() => handleWords("50")} />
                <Button
                    className="button"
                    text="100"
                    enabled={options.words === "100"}
                    onClick={() => handleWords("100")} />
            </div>
            <div className="options">
                <Button
                    className="button"
                    text="capitalisation"
                    enabled={options.capitalisation}
                    onClick={() => handleToggle("capitalisation")} />
                <Button
                    className="button"
                    text="punctuation"
                    enabled={options.punctuation}
                    onClick={() => handleToggle("punctuation")} />
                <Button
                    className="button"
                    text="numbers"
                    enabled={options.numbers}
                    onClick={() => handleToggle("numbers")} />
            </div>
        </div>
    );

};