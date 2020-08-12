import {createSelector} from 'reselect';
import {Nil} from 'utils';

import {WeatherInfo} from '__types/weather';
import {Status} from '__utils/infrastructure/reducers/flow';
import {CommonStore} from '__utils/infrastructure/store';
import {kelvin2Celsius} from '__utils/weather';

export const weatherSelector = createSelector(
    (state: CommonStore) => state.weather.item?.data,
    (weather: Nil<WeatherInfo>) => {
        if (!weather) {
            return null;
        }

        const {main} = weather;

        return {
            ...weather,
            main: {
                ...main,
                temp: kelvin2Celsius(main.temp),
                temp_max: kelvin2Celsius(main.temp_max),
                temp_min: kelvin2Celsius(main.temp_min),
            },
        } as WeatherInfo;
    },
);

export const weatherPendingSelector = createSelector(
    (state: CommonStore) => state.weather.item?.status,
    (status: Nil<Status>) => status === Status.Pending,
);
