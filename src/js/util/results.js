import { find } from 'lodash';

export const addError = ({ results, key }) => {
    const existingError = find(results.errors, { key });

    if (existingError) {
        existingError.count++;
    } else {
        results.errors.push({ key, count: 1 });
    }

    return results;
};

export const countErrors = ({ results }) => {
    return results.errors.reduce((sum, { count }) => {
        return sum += count;
    }, 0);
};
