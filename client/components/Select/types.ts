import {FC} from 'react';
import {Props as SelectProps} from 'react-select/base';

import {RequestOptions, DataMapper} from '__types/dadata';

export type OwnProps = {
    suggest: 'address' | 'country';
    label?: string;
    handleChange?: (value: string) => void;
    mapLoadOptions?: (value: string) => RequestOptions;
    mapLoadedOptions?: DataMapper;
};

export type Props<T> = FC<OwnProps & SelectProps<T>>;
