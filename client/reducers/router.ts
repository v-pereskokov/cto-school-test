import {connectRouter as router, routerActions} from 'connected-react-router';
import {History} from 'history';
import {RouteComponentProps} from 'react-router';
import {RouterLocation} from 'utils';

export interface RouterHistory extends History {
    location: RouterLocation;
}

interface CurrentRouteState {
    location: RouterLocation;
    match: RouteComponentProps<{}, {}>['match'];
}

export const actions = {
    ...routerActions,
};

export default router;
