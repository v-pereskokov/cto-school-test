import {Router} from 'express';

import {appRoutes} from './app';
import {dadataRoutes} from './dadata';
import {healthRoutes} from './healthchecks';
import {weatherRoutes} from './weather';

const router: Router = Router();

const BASE_API_PATH = '/api';

appRoutes(router);
dadataRoutes(router, {basePath: BASE_API_PATH});
weatherRoutes(router, {basePath: BASE_API_PATH});
healthRoutes(router);

export default router;
