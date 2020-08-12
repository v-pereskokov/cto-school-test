import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import {weatherPendingSelector, weatherSelector} from '__selectors/weather';

import {b} from './Info.scss';

const Info: FC = () => {
    const weatherInfo = useSelector(weatherSelector);
    const isPending = useSelector(weatherPendingSelector);

    if (!weatherInfo && !isPending) {
        return null;
    }

    if (isPending) {
        return (
            <div className={b()}>
                <div className={b('loader')}>
                    Загрузка...
                </div>
            </div>
        );
    }

    return (
        <div className={b()}>
            {!!weatherInfo && <hr/>}

            <pre>
                {JSON.stringify(weatherInfo)}
            </pre>
        </div>
    );
};
export default Info;
