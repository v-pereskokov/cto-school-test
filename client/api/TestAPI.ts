import {EntityAPI} from 'utils';

import {api} from '__utils/transport';

class TestAPI implements EntityAPI {
    public request = (): Promise<{}> => {
        return api.get<{}, {}>('test', {title: 'test'});
    };

    public create = () => {
        return api.post('/test/action');
    };
}

export const apiInstance = new TestAPI();
