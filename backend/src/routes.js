import { Router } from 'express';

import ItemController from './app/controllers/ItemController';

const routes = new Router();

routes.post('/items', ItemController.store);
routes.get('/items', ItemController.index);
routes.put('/items/:id', ItemController.update);
routes.delete('/items/:id', ItemController.delete);


export default routes;
