import {apiInstance as addressApiInstance} from '__api/DadataAPI/AddressAPI';
import {apiInstance as countryApiInstance} from '__api/DadataAPI/CountryAPI';
import {SelectProps} from '__components/Select';
import {RequestOptions} from '__types/dadata';

export default class DadataService {
    public request = async (suggestType: SelectProps['suggest'], options: RequestOptions) => {
        const requester = suggestType === 'address'
            ? addressApiInstance.request
            : countryApiInstance.request;
        const response = await requester(options);

        return response.map(({value}) => ({
            value,
            label: value,
        }));
    };
}

export const dadataService = new DadataService();
