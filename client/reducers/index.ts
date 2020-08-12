import {RouterState} from 'connected-react-router';
import {combineReducers} from 'redux';

import {WeatherInfo} from '__types/weather';
import {BaseEntityReducer} from '__utils/infrastructure/reducers/flow';

import page, {PageReducer} from './page';
import preload, {PreloadReducer} from './preload';
import router from './router';
import ui, {UIReducer} from './ui';
import {item as weatherItem} from './weather';

type WeatherInfoReducer = BaseEntityReducer<WeatherInfo>;

export interface BaseStore {
    router: RouterState;
    ui: UIReducer;
    page: PageReducer;
    preload: PreloadReducer;
    weather: WeatherInfoReducer;
}

export const reducers = {
    router,
    ui,
    page,
    preload,
    weather: combineReducers<WeatherInfoReducer>({
        item: weatherItem.reducer,
    }),
};
