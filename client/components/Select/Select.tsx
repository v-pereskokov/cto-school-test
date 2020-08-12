import React, {useCallback, useMemo} from 'react';
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import {Props as SelectProps} from 'react-select/base';

import {dadataService} from '__services/DadataService';

import {Props} from './types';

import {b} from './Select.scss';

const Select: Props<string> = ({
    className,
    suggest,
    handleChange,
    mapLoadOptions,
    mapLoadedOptions,
    error,
    ...props
}) => {
    const onChange: SelectProps['onChange'] = useCallback(({value}, {action}) => {
        if (action === 'select-option') {
            handleChange?.(value);
        }
    }, [handleChange]);

    const handleLoad = useCallback((value: string) => {
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

    const controls = useMemo(() => {
        return {
            Control: props => (
                <div className={b('input')}>
                    <components.Control {...props}/>
                    {error
                        ? <span className={b('error')}>{error}</span>
                        : <span className={b('help')}>Начните вводить текст</span>
                    }
                </div>
            ),
        };
    }, [error]);

    return (
        <AsyncSelect<string>
            {...props}
            cacheOptions
            defaultOptions
            onChange={onChange as any}
            loadOptions={handleLoad}
            className={className}
            components={controls}
        />
    );
};
export default Select;
