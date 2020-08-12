import {apiInstance} from '__api/WeatherAPI';
import {item} from '__reducers/weather';
import {entityFind} from '__utils/infrastructure/reducers/entityLoader';

export const weatherLoader = entityFind(apiInstance, {
    actions: item.actions,
});
