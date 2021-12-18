const {
  fetchStatusReport,
  fetchStatusReportJob,
} = require('../services/fetch-status-report')

async function preloadStatusReport(req, _res, next) {
  const statusReport = await fetchStatusReport({
    token: req.private.access_token,
    job_id: req.params.job_id,
  })

  req.locals = Object.assign(req.locals || {}, {
    statusReport: statusReport,
  })
  next()
}

async function enqueueStatusReportJob(req, _res, next) {
  const job = await fetchStatusReportJob({
    token: req.private.access_token,
  })
  req.locals = Object.assign(req.locals || {}, { job })
  next()
}

module.exports = {
  enqueueStatusReportJob,
  preloadStatusReport,
}
