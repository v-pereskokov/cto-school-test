import {Router} from 'express';

import {appRoutes} from './app';
import {healthRoutes} from './healthchecks';

const router: Router = Router();

appRoutes(router);
healthRoutes(router);

export default router;
