const express = require('express')
const router = express.Router()
const { ensureAuthentication } = require('../middlewares/authentication')
const {
  enqueueStatusReportJob,
  preloadStatusReport,
} = require('../middlewares/status-report')

router.get(
  '/',
  ensureAuthentication,
  enqueueStatusReportJob,
  ({ locals }, res, _next) => {
    const {
      job: { job_id },
    } = locals
    res.render('index', { title: 'ready', job_id })
  },
)

router.get(
  '/jobs/:job_id',
  ensureAuthentication,
  preloadStatusReport,
  ({ locals }, res, _next) => {
    const { statusReport: statusReport } = locals
    res.render('job_detail', {
      statusReport: JSON.stringify(statusReport),
      title: 'fetched report',
    })
  },
)

module.exports = router
