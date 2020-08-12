import React, {FC, useEffect, useState, useCallback} from 'react';
import {YMaps, Map as YMap, GeolocationControl} from 'react-yandex-maps';

import {weatherLoader} from '__loaders/weather';

import {b} from './Map.scss';

const MAP_OPTIONS = {
    state: {center: [55.75, 37.57], zoom: 9},
};

const Map: FC = () => {
    const [map, setMapRef] = useState<any>(null);

    const setRef = useCallback(ref => {
        setMapRef(ref);
    }, [setMapRef]);

    useEffect(() => {
        if (map) {
            map.events.add('click', event => {
                const [lat, lon] = event.get('coords');
                weatherLoader({lat, lon});
            });
        }
    }, [map]);

    return (
        <div className={b()}>
            <div className={b('preview')}>
                <YMaps>
                    <YMap
                        defaultState={MAP_OPTIONS.state}
                        width="100%"
                        height="100%"
                        instanceRef={setRef}
                    >
                        <GeolocationControl/>
                    </YMap>
                </YMaps>
            </div>
        </div>
    );
};
export default Map;
