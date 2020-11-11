import { useContext } from 'react';

import { Context } from 'components/Context';
import { Text } from 'components/Text';
import { Results } from 'components/Results';
import { STATE } from 'constants/config';

export const Middle = () => {

    const { state } = useContext(Context);

    return (
        <div className="middle">
            { state !== STATE.END && <Text /> }
            { <Results /> }
        </div>
    );

};
