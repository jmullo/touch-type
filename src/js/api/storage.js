export const save = (key, item) => {
    if (localStorage) {
        localStorage.setItem(`touch-type.${key}`, JSON.stringify(item));
    }
};

export const load = (key, defaultValue) => {
    if (localStorage) {
        const item = localStorage.getItem(`touch-type.${key}`);

        if (item) {
            return JSON.parse(item);
        }
    }

    return defaultValue;
};
