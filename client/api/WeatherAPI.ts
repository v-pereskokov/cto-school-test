import {EntityAPI} from 'utils';

import {weatherApi} from '__utils/transport';

class WeatherAPI implements EntityAPI {
    public find = ({query}: {query: string}) => {
        return weatherApi.get<{q: string}, {}>('/current', {q: query});
    };
}

export const apiInstance = new WeatherAPI();
