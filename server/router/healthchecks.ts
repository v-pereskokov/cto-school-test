import {Router} from 'express';

import ping from '../controllers/healthchecks/ping';

/**
 * @swagger
 * tags:
 *   - name: health
 *     description: Service healthcheck routes
 */
export const healthRoutes = (router: Router) => {
    const healthRouter: Router = Router();

    healthRouter
        /**
         * @swagger
         * /healthcheck/ping:
         *   get:
         *     tags:
         *     - health
         *     responses:
         *       200:
         *         description: Service is enabled
         *       500:
         *         description: Unexpected error
         */
        .get('/ping', ping);

    router.use('/healthcheck', healthRouter);
};
