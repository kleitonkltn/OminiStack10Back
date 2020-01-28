const { Router } = require('express')

const router = Router()
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')


router.get('/devs', DevController.index)
router.get('/devs/:github_username', DevController.show)
router.post('/devs', DevController.store)
router.put('/devs', DevController.update)
router.delete('/devs', DevController.destroy)

router.get('/search', SearchController.index)

module.exports = router
