import React, {FC, useState, useCallback} from 'react';
import {Empty, Nullable} from 'utils';

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

    const [countryError, setCountryError] = useState<Nullable<string>>(null);
    const [addressError, setAddressError] = useState<Nullable<string>>(null);

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

    return (
        <form className={b()} onSubmit={handleSubmit}>
            {countryError}
            {addressError}
            <div className={b('wrapper')}>
                <Select
                    suggest="country"
                    placeholder="Страна"
                    handleChange={setCountry}
                    autoFocus
                />
                <Select
                    suggest="address"
                    placeholder="Город"
                    handleChange={setAddress}
                    mapLoadOptions={handleAddressMapOptions}
                    mapLoadedOptions={addressLoadedMapper}
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
