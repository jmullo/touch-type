import { memoize } from 'lodash';

let measuredFont;

const measureFont = () => {
    const element = document.getElementById('measure');

    if (element) {
        const rect = element.getBoundingClientRect();

        measuredFont = {
            width: rect.width,
            height: rect.height
        };

        return measuredFont;
    }

    return {
        width: 1,
        height: 1
    };
};

export const getMeasuredFont = () => measuredFont ? measuredFont : measureFont();

export const getMaxTextWidth = memoize(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--main-width'), 10));

export const getBoxPadding = memoize(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--box-padding'), 10));

export const getRowPadding = memoize(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row-padding'), 10));

export const focusHandler = (element) => {
    if (element) {
        element.focus();

        element.onblur = () => {
            setTimeout(() => element.focus(), 1);
        }
    }
};
