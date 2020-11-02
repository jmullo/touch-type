import { useContext } from 'react';

import { DataContext } from 'components/DataContext';
import { STATE } from 'constants/config';

export const Options = () => {

    const { state, setState } = useContext(DataContext);

    return (
        <div className="options">

        </div>
    );

};
