import React, {FC, useRef} from 'react';
import {YMaps, Map as YMap} from 'react-yandex-maps';

import {b} from './Map.scss';

const Map: FC = () => {
    const _ref = useRef(null);
    console.log(_ref);

    return (
        <div className={b()}>
            <div className={b('preview')}>
                <YMaps>
                    <YMap
                        defaultState={{center: [55.75, 37.57], zoom: 9}}
                        width="100%"
                        height="100%"
                        options={{
                            events: {
                                click: (...args) => {
                                    console.log({args});
                                },
                            },
                        }}
                        events={{
                            click: (...args) => {
                                console.log({args});
                            },
                        }}
                    />
                </YMaps>
            </div>
        </div>
    );
};
export default Map;
