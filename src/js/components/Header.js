import { useContext } from 'react';

import { DataContext } from 'components/DataContext';
import { Button } from 'components/Button';

export const Header = () => {

    const { options, setOptions } = useContext(DataContext);

    const handleToggle = (button) => {
        setOptions({...options,
            [button]: !options[button]
        });
    };

    const handleLanguage = (language) => setOptions({...options, language });

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
