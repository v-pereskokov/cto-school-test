import {EntityAPI} from 'utils';

import {WeatherInfo} from '__types/weather';
import {weatherApi} from '__utils/transport';

type Request =
    | {
        query: string;
        lat?: number;
        lon?: number;
    }
    | {
        query?: string;
        lat: number;
        lon: number;
    };

class WeatherAPI implements EntityAPI {
    public find = ({query, lat, lon}: Request) => {
        return weatherApi.get<{q?: string; lat?: number; lon?: number}, WeatherInfo>(
            '/current', {q: query, lat, lon},
        );
    };
}

export const apiInstance = new WeatherAPI();
