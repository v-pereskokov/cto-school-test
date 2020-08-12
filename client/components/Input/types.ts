import {FC, InputHTMLAttributes, MutableRefObject} from 'react';
import {Nullable} from 'utils';

export type OwnProps = {
    label?: string;
    _ref?: MutableRefObject<Nullable<HTMLInputElement>>;
};

export type Props<T = HTMLInputElement> = FC<OwnProps & InputHTMLAttributes<T>>;
