import {EntityAPI} from 'utils';

import {RequestOptions, Response} from '__types/dadata';
import {suggestsApi} from '__utils/transport';

class AddressAPI implements EntityAPI {
    public request = (options: RequestOptions) => {
        return suggestsApi.post<RequestOptions, Response>('/address', options)
            .then(({suggestions}) => suggestions);
    };
}

export const apiInstance = new AddressAPI();
