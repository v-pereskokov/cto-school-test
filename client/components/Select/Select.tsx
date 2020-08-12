import React, {useCallback} from 'react';
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';

import {dadataService} from '__services/DadataService';

import {Props} from './types';

import {b} from './Select.scss';

const ControlComponent = props => (
    <div className={b('input')}>
        <components.Control {...props}/>
    </div>
);

const selectComponents = {Control: ControlComponent};

const Select: Props<string> = ({className, suggest,  handleChange,mapLoadOptions, ...props}) => {
    const onInputChange = useCallback((value: string) => {
        handleChange?.(value);
        return value;
    }, []);

    const handleLoad = useCallback((value: string) => {
        return new Promise(resolve => {
            dadataService.request(
                suggest,
                mapLoadOptions ? mapLoadOptions(value) : {query: value},
            )
                .then(data => {
                    resolve(data);
                });
        });
    }, [suggest]);

    return (
        <AsyncSelect<string>
            {...props}
            cacheOptions
            defaultOptions
            onInputChange={onInputChange}
            loadOptions={handleLoad}
            className={className}
            components={selectComponents}
        />
    );
};
export default Select;
