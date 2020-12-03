export const getMaxTextWidth = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--main-width'), 10);

export const getBoxPadding = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--box-padding'), 10);

export const getRowPadding = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row-padding'), 10);

export const measureFont = () => {
    const element = document.getElementById('measure');
    const rect = element.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height
    };
};

export const focusHandler = (element) => {
    if (element) {
        element.focus();

        element.onblur = () => {
            setTimeout(() => element.focus(), 1);
        }
    }
};
