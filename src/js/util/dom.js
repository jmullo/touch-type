export const focusHandler = (element) => {
    if (element) {
        element.focus();
        
        element.onblur = () => {
            setTimeout(() => element.focus(), 1);
        }
    }
};
