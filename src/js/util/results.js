import { find, mean, sortBy } from 'lodash';

export const addKeyTime = ({ results, key, time }) => {
    if (!results.keyTimes) {
        results.keyTimes = [];
    }

    const existingTime = find(results.keyTimes, { key });

    if (existingTime) {
        existingTime.keyTimes.push(time);
    } else {
        results.keyTimes.push({ key, keyTimes: [ time ] });
    }

    return results;
};

export const averageKeyTimes = (results) => {
    if (!results.keyTimes) {
        results.keyTimes = [];
    }

    results = results.keyTimes.map((key) => {
        key.averageTime = mean(key.keyTimes);

        return key;
    });

    return sortBy(results, ['averageTime']);
};

export const addError = ({ results, key }) => {
    if (!results.errors) {
        results.errors = [];
    }

    const existingError = find(results.errors, { key });

    if (existingError) {
        existingError.count++;
    } else {
        results.errors.push({ key, count: 1 });
    }

    return results;
};

export const countErrors = (results) => {
    if (!results.errors) {
        results.errors = [];
    }

    return results.errors.reduce((sum, { count }) => {
        return sum += count;
    }, 0);
};
