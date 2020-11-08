import { useContext } from 'react';

import { Context } from 'components/Context';
import { TextArea } from 'components/TextArea';
import { Results } from 'components/Results';
import { STATE } from 'constants/config';

export const Middle = () => {

    const { state } = useContext(Context);

    return (
        <div className="middle">
            { state !== STATE.END && <TextArea /> }
            { <Results /> }
        </div>
    );

};
