import { find, mean, sortBy } from 'lodash';

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
