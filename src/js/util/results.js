import { find, mean, sortBy, cloneDeep } from 'lodash';

import { CHARS_IN_WORD } from 'constants/config';

export const addKeyTime = (keyTimes, key, time) => {
    const existingKey = find(keyTimes, { key });

    if (existingKey) {
        existingKey.times.push(Math.floor(time));
    } else {
        keyTimes.push({ key, times: [ Math.floor(time) ] });
    }

    return keyTimes;
};

export const addError = (errors, key) => {
    const existingError = find(errors, { key });

    if (existingError) {
        existingError.count++;
    } else {
        errors.push({ key, count: 1 });
    }

    return errors;
};

export const averageKeyTimes = (keyTimes) => {
    keyTimes.forEach((key) => key.averageTime = Math.floor(mean(key.times)));

    return sortBy(keyTimes, ['averageTime']);
};

export const countErrors = (errors) =>
    errors.reduce((sum, { count }) => sum += count, 0);

export const calculateSpeed = (textLength, timeMinutes) =>
    Math.floor(textLength / CHARS_IN_WORD / timeMinutes);

export const calculateAccuracy = (textLength, errors) =>
    Math.floor(Math.max(0, textLength - countErrors(errors)) / textLength * 100);

export const mergeToHistory = (currentHistory, textLength, timeMinutes, keyTimes, errors) => {
    const history = {
        tests: (currentHistory.tests || 0) + 1,
        textLength: (currentHistory.textLength || 0) + textLength,
        timeMinutes: (currentHistory.timeMinutes || 0) + timeMinutes,
        keyTimes: cloneDeep(currentHistory.keyTimes || []),
        errors: cloneDeep(currentHistory.errors || [])
    };

    keyTimes.forEach((item) => {
        const existingKey = find(history.keyTimes, { key: item.key });

        if (existingKey) {
            existingKey.times.push(...item.times);
        } else {
            history.keyTimes.push(item);
        }
    });

    errors.forEach((item) => {
        const existingError = find(history.errors, { key: item.key });

        if (existingError) {
            existingError.count += item.count;
        } else {
            history.errors.push(item);
        }
    });

    history.averageWordsPerMinute = calculateSpeed(history.textLength, history.timeMinutes);
    history.averageAccuracy = calculateAccuracy(history.textLength, history.errors);

    return history;
};
