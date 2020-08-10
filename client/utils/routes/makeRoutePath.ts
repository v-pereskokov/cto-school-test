import config from '__config/config';

const {BASE_PATH} = config;

export default (path: string) => `${BASE_PATH}${path}`;
