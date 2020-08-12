import {Router} from 'express';

import {appRoutes} from './app';
import {dadataRoutes} from './dadata';
import {healthRoutes} from './healthchecks';
import {weatherRoutes} from './weather';

const router: Router = Router();

appRoutes(router);
dadataRoutes(router);
weatherRoutes(router);
healthRoutes(router);

export default router;
