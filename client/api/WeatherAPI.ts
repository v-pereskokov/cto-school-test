import {EntityAPI} from 'utils';

import {weatherApi} from '__utils/transport';

class WeatherAPI implements EntityAPI {
    public request = (): Promise<{}> => {
        return weatherApi.get<{}, {}>('/current', {title: 'test'});
    };
}

export const apiInstance = new WeatherAPI();
