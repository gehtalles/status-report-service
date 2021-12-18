const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, _next) {
  console.log(req.private.access_token)
  res.render('index', { title: 'Express' })
})

module.exports = router
