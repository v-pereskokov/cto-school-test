import {EntityAPI, Indexed, Empty} from 'utils';

import store, {CommonStore, getStore} from '__utils/infrastructure/store';

import {EntityLoaderConfig} from './types';

export function entityOperation<D>(
    request: Empty<(...args: any[]) => Promise<any>>,
    config: EntityLoaderConfig<D>,
) {
    if (!request) {
        throw new TypeError('API должен содержать метод request или find.');
    }

    const {mapOptions, actions} = config;

    const {dispatch} = store;
    const state = getStore<CommonStore>();
    const initArgs: any = null;

    const initAction = actions.pending;
    const successAction = actions.success;
    const errorAction = actions.failed;

    return async function (params: Indexed<string | number | boolean> = {}) {
        if (initAction) {
            dispatch(initAction());
        }

        try {
            const result = await request({
                ...params,
                ...(mapOptions ? mapOptions(state, initArgs) : {}),
            });

            if (successAction) {
                dispatch(successAction(result));
            }
            return result;
        } catch (error) {
            if (errorAction) {
                dispatch(errorAction(error));
            }

            throw error;
        }
    };
}

export function entityLoader<D>(
    entityApiInstance: EntityAPI,
    config: EntityLoaderConfig<D>,
) {
    return entityOperation<D>(entityApiInstance?.request, config);
}

export function entityFind<D>(
    entityApiInstance: EntityAPI,
    config: EntityLoaderConfig<D>,
) {
    return entityOperation<D>(entityApiInstance?.find, config);
}
