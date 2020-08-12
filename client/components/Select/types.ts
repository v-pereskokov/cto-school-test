import {FC, MutableRefObject} from 'react';
import {Props as SelectProps} from 'react-select/base';
import {Nullable} from 'utils';

import {RequestOptions} from '__types/dadata';

export type OwnProps = {
    suggest: 'address' | 'country';
    label?: string;
    _ref?: MutableRefObject<Nullable<HTMLInputElement>>;
    handleChange?: (value: string) => string;
    mapLoadOptions?: (value: string) => RequestOptions;
};

export type Props<T> = FC<OwnProps & SelectProps<T>>;
