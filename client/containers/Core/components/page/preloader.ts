import {bound as commonActions} from '__actions';

export default (): Promise<any> => {
    return new Promise(resolve => {
        resolve(42);
    })
        .then(() => commonActions.page.setAsReady());
};
