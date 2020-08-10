import {bound as commonActions} from '__actions';
import {apiInstance} from '__api/TestAPI';
import {CommonStore, getStore} from '__utils/infrastructure/store';

export default class TestService {
    public sendData = async (someFormData: {}) => {
        // Можно делать и так:
        const someFromSelector = getStore<CommonStore>(); // Можно и в селектор это обернуть
        commonActions.page.setAsReady(); // Или любой другой экшен
    };
}

export const testService = new TestService();
