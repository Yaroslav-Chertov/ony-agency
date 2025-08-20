// ROUTES
// Описание маршрутов и связывание с контроллерами.
import { Router } from 'express';
import { pageController, workController, clientController, testApiController, redirectsMiddleware, cacheController } from '#_/server/controllers/webController.js';
import { clearCache } from '../utils/cache.js';

const router = Router();
router.use(redirectsMiddleware);

router.get('/', pageController);

router.get('/work', workController);
router.get('/work/:page', workController);
router.get('/client/:page', clientController);

router.get('/api/clear-cache', cacheController); 
router.post('/api/:form', testApiController);

// WARN: порядок имеет значение. Этот роут всегда должен быть последний
router.get('/:page', pageController); 

/* router.get('/', async (req, res) => {
    return res.json({
        health: 'OK'
    });
}); */





export default router;