import cn from 'classnames';
import React, {useMemo, useState, useCallback} from 'react';

import {Props} from './types';

import {b} from './Input.scss';

const Input: Props = ({className, label, _ref, value, ...props}) => {
    const [inputValue, setInputValue] = useState(value ?? '');

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    const inputComponent = useMemo(() => {
        return (
            <span className={b('inputWrapper')}>
                <input
                    {...props}
                    ref={_ref}
                    className={cn(
                        b('input'),
                        className,
                    )}
                    value={inputValue}
                    onChange={onInputChange}
                />
            </span>
        );
    }, [props, inputValue]);

    return (
        <label className={b('label')}>
            {label}
            {inputComponent}
        </label>
    );
};
export default Input;
