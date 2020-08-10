import { ErrorRequestHandler, RequestHandler, Router } from 'express';

import index from '../controllers/app';
import renders from '../middlewares/render';

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [
    ...renders,
];

export function appRoutes(router: Router) {
    router.get('/', middlewares, index);
}
