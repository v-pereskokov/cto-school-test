import {EntityAPI} from 'utils';

import {RequestOptions, Response} from '__types/dadata';
import {suggestsApi} from '__utils/transport';

class CountryAPI implements EntityAPI {
    public request = (options: RequestOptions) => {
        return suggestsApi.post<RequestOptions, Response>('/country', options)
            .then(({suggestions}) => suggestions);
    };
}

export const apiInstance = new CountryAPI();
