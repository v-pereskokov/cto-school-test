import {createSelector} from 'reselect';
import {Nil} from 'utils';

import {WeatherInfo} from '__types/weather';
import {Status} from '__utils/infrastructure/reducers/flow';
import {CommonStore} from '__utils/infrastructure/store';


export const weatherSelector = createSelector(
    (state: CommonStore) => state.weather.item?.data,
    (weather: Nil<WeatherInfo>) => weather,
);

export const weatherPendingSelector = createSelector(
    (state: CommonStore) => state.weather.item?.status,
    (status: Nil<Status>) => status === Status.Pending,
);
