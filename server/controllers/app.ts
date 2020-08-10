import {Request, Response} from 'express';

export default function index(req: Request, res: Response) {
    res.renderBundle('weather');
}
