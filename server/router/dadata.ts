import {Router} from 'express';

import {dadataProxy} from '../controllers/dadata';

/**
 * @swagger
 * tags:
 *   - name: dadata
 *     description: Suggests routes
 */
export const dadataRoutes = (router: Router) => {
    router.use('/suggests', dadataProxy);
};
