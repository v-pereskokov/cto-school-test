import {ConnectedRouter} from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';

import Core from '__containers/Core';
import store, {history} from '__utils/infrastructure/store';

import './sass/main.scss';

const render = (Component: React.ComponentType) => {
    const HotComponent = hot(Component);

    return ReactDOM.hydrate(
        (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <HotComponent/>
                </ConnectedRouter>
            </Provider>
        ),
        document.getElementById('root'),
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let state;
if (typeof window === 'undefined') {
    state = {};
    (global as any).window = {};
    (global as any).window.location = {};
    (global as any).localStorage = undefined;
} else {
    state = (window as any).__PRELOADED_STATE__;
    delete (window as any).__PRELOADED_STATE__;

    window.onload = () => {
        Loadable.preloadReady().then(() => {
            render(Core);
        });
    };
}
