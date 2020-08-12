import React from 'react';
import Loadable from 'react-loadable';
import {Route} from 'react-router';

import {ROOT_PATH} from './consts';

const AsyncPage = Loadable({
    loader: () => import(/* webpackChunkName: "Weather" */ './components/page'),
    loading: () => null,
});

export default (
    <React.Fragment>
        <Route path={ROOT_PATH} component={AsyncPage} exact/>
    </React.Fragment>
);
