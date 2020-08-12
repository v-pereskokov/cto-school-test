import React, {useCallback} from 'react';
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import {Props as SelectProps} from 'react-select/base';

import {dadataService} from '__services/DadataService';

import {Props} from './types';

import {b} from './Select.scss';

const ControlComponent = props => (
    <div className={b('input')}>
        <components.Control {...props}/>
    </div>
);

const selectComponents = {Control: ControlComponent};

const Select: Props<string> = ({className, suggest,  handleChange,mapLoadOptions, mapLoadedOptions, ...props}) => {
    const onChange: SelectProps['onChange'] = useCallback(({value}, {action}) => {
        if (action === 'select-option') {
            handleChange?.(value);
        }
    }, [handleChange]);

    const handleLoad = useCallback((value: string) => {
        handleChange?.(value);

        return new Promise(resolve => {
            dadataService.request(
                suggest,
                mapLoadOptions ? mapLoadOptions(value) : {query: value},
                mapLoadedOptions,
            )
                .then(data => {
                    return resolve(data);
                });
        });
    }, [suggest, handleChange, mapLoadOptions, mapLoadedOptions]);

    return (
        <AsyncSelect<string>
            {...props}
            cacheOptions
            defaultOptions
            onChange={onChange as any}
            loadOptions={handleLoad}
            className={className}
            components={selectComponents}
        />
    );
};
export default Select;
