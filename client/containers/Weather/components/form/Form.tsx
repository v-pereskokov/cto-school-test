import React, {FC, useState, useCallback} from 'react';
import {Empty} from 'utils';

import Button, {Group} from '__components/Button';
import Select from '__components/Select';
import {weatherLoader} from '__loaders/weather';
import {DataMapper} from '__types/dadata';

import {b} from './Form.scss';

const addressLoadedMapper: DataMapper = data => {
    return data.map(({data: {city}}) => ({
        value: city,
        label: city,
    }));
};

const Form: FC = () => {
    const [country, setCountry] = useState<Empty<string>>(undefined);
    const [address, setAddress] = useState<Empty<string>>(undefined);

    const [countryError, setCountryError] = useState<Empty<string>>(undefined);
    const [addressError, setAddressError] = useState<Empty<string>>(undefined);

    const handleAddressMapOptions = useCallback((value: string) => ({
        query: value,
        locations: [{country}],
    }), [country]);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!address && !country) {
            setCountryError('Заполните хотя бы одно из значений');
            setAddressError('Заполните хотя бы одно из значений');
        }

        if (!!address) {
            weatherLoader({query: address});
            return;
        }

        if (!!country) {
            weatherLoader({query: country});
            return;
        }
    }, [country, address]);

    const handleCountryChange = useCallback((value: string) => {
        setCountry(value);
        setCountryError(undefined);
        setAddressError(undefined);
    }, []);

    const handleAddressChange = useCallback((value: string) => {
        setAddress(value);
        setAddressError(undefined);
        setCountryError(undefined);
    }, []);

    return (
        <form className={b()} onSubmit={handleSubmit}>
            <div className={b('wrapper')}>
                <Select
                    suggest="country"
                    placeholder="Страна"
                    handleChange={handleCountryChange}
                    error={countryError}
                    autoFocus
                />
                <Select
                    suggest="address"
                    placeholder="Город"
                    handleChange={handleAddressChange}
                    mapLoadOptions={handleAddressMapOptions}
                    mapLoadedOptions={addressLoadedMapper}
                    error={addressError}
                />
            </div>

            <div className={b('wrapper')}>
                <Group>
                    <Button theme="primary">
                        Найти
                    </Button>
                </Group>
            </div>
        </form>
    );
};
export default Form;
