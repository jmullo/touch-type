export const Button = ({ text, enabled, onClick }) => {

    const className = enabled ? "button enabled" : "button";

    return (
        <div className={className} onClick={onClick}>
            { text }
        </div>
    );

};
