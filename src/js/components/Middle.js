import { useContext } from 'react';

import { Context } from 'components/Context';
import { Text } from 'components/Text';
import { Results } from 'components/Results';
import { getMeasuredFont, getBoxPadding, getRowPadding } from 'util/dom';
import { STATE, NUMBER_OF_ROWS } from 'constants/config';

export const Middle = () => {

    const { state } = useContext(Context);

    const style = {
        minHeight: `${(getBoxPadding() * 2) + ((NUMBER_OF_ROWS - 1) * getRowPadding()) + (NUMBER_OF_ROWS * getMeasuredFont().height)}px`
    };

    return (
        <div id="middle" className="middle" style={style}>
            <div className="box">
                { state !== STATE.END && <Text /> }
                { <Results /> }
            </div>
        </div>
    );

};
