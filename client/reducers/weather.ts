import {WeatherInfo} from '__types/weather';
import {generateEntityReducer} from '__utils/infrastructure/reducers/flow';

const PREFIX = '@weather';

const {item} = generateEntityReducer<WeatherInfo>(PREFIX);
export {item};
