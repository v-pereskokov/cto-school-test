import {RouterState} from 'connected-react-router';

import page, {PageReducer} from './page';
import preload, {PreloadReducer} from './preload';
import router from './router';
import ui, {UIReducer} from './ui';

export interface BaseStore {
    router: RouterState;
    ui: UIReducer;
    page: PageReducer;
    preload: PreloadReducer;
}

export const reducers = {
    router,
    ui,
    page,
    preload,
};
