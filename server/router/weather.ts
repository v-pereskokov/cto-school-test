import {Router} from 'express';

import {weatherProxy} from '../controllers/weather';

/**
 * @swagger
 * tags:
 *   - name: open-weather
 *     description: Open weather routes
 */
export const weatherRoutes = (router: Router, {basePath}: {basePath: string}) => {
    router.use(`${basePath}/weather`, weatherProxy);
};
