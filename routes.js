const router = require('express').Router();
const {
  allProductsController,
  singleProductController,
  homeController,
} = require('./controller');

// get all projects
router.get('/api/projects', allProductsController);

// get single projects
router.get('/api/project/:id', singleProductController);

router.get('/', homeController);

module.exports = router;
