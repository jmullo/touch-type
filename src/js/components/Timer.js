
import { useState, useEffect } from 'react';

export const Timer = ({ time, onComplete }) => {

    const [seconds, setSeconds] = useState(time);

    let id;

    const clear = () => clearInterval(id);

    const formatTime = () => {
        const date = new Date(seconds * 1000);

        return `${date.getUTCMinutes().toString()}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (seconds === 0) {
            clear();
            onComplete();
        } else {
            id = setInterval(() => {
                setSeconds((value) => value - 1);
            }, 1000);
        }

        return () => clear();
    }, [seconds]);

    return (
        <div className="timer">
            {formatTime()}
        </div>
    );

}
