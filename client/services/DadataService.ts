import {uniqBy} from 'lodash';

import {apiInstance as addressApiInstance} from '__api/DadataAPI/AddressAPI';
import {apiInstance as countryApiInstance} from '__api/DadataAPI/CountryAPI';
import {SelectProps} from '__components/Select';
import {RequestOptions, DataMapper} from '__types/dadata';

export default class DadataService {
    public request = async (
        suggestType: SelectProps['suggest'],
        options: RequestOptions,
        mapper?: DataMapper,
    ) => {
        const requester = suggestType === 'address'
            ? addressApiInstance.request
            : countryApiInstance.request;
        const response = await requester(options);

        const suggests = mapper
            ? mapper(response || [])
            : (response || []).map(({value}) => ({value, label: value}));

        return uniqBy(suggests, 'label')
            .filter(({value}) => Boolean(value));
    };
}

export const dadataService = new DadataService();
