import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import {b} from './Button.scss';

const Button: Props = ({children, className, theme = 'secondary', variant = 'filled', ...props}) => {
    return (
        <button
            {...props}
            className={cn(
                b(),
                b(theme),
                b(theme, {[variant]: true}),
                className,
            )}
        >
            {children}
        </button>
    );
};
export default Button;
