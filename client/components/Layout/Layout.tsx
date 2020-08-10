import React from 'react';

import {Props} from './types';

import {b} from './Layout.scss';

const Layout: Props = ({children}) => {
    return (
        <div className={b()}>
            {children}
        </div>
    );
};
export default Layout;
