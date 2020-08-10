import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import {b} from './Group.scss';

const Group: Props = ({children, className}) => {
    return (
        <div className={cn(b(), className)}>
            {children}
        </div>
    );
};
export default Group;
