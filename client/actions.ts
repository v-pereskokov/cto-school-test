import {actions as pageActions} from '__reducers/page';
import {actions as preloadActions} from '__reducers/preload';
import {actions as routerActions} from '__reducers/router';
import {actions as uiActions} from '__reducers/ui';
import store from '__utils/infrastructure/store';

export const pure = {
    page: pageActions,
    ui: uiActions,
    router: routerActions,
    preload: preloadActions,
};
export const bound = store.bindActions(pure);
