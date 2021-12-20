const express = require('express')
const router = express.Router()
const { ensureAuthentication } = require('../middlewares/authentication')
const {
  enqueueStatusReportJob,
  preloadStatusReport,
} = require('../middlewares/status-report')

const computeStatsFromReports = require('./index/compute-stats-from-reports.js')

const STATUS_CODE_LABELS = {
  200: 'Healthy',
  403: 'Authorization',
  500: 'Failures',
  501: 'Unknown Status',
  ECONNREFUSED: 'Disconnected',
}

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
    const { stats, reports } = computeStatsFromReports(statusReport)
    const labels = STATUS_CODE_LABELS

    res.render('job_detail', {
      pieChartData: JSON.stringify({ stats, labels }),
      stats,
      reports,
      labels,
    })
  },
)

module.exports = router
