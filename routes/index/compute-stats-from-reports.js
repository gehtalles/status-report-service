function sumReports(reports) {
  return reports.reduce((acc, { status_code }) => {
    return Object.assign(acc, { [status_code]: (acc[status_code] || 0) + 1 })
  }, {})
}

const REPORT_STATUS_CODE_WHITELIST = [200, 500, 501]

function computeStatsFromReports(rawReport) {
  const { service_reports: serviceReports } = rawReport
  const reports = serviceReports
    .filter(({ status_code }) =>
      REPORT_STATUS_CODE_WHITELIST.includes(status_code),
    )
    .map((report) => Object.assign(report, { host: report.host }))

  const stats = sumReports(reports)

  return { stats, reports }
}

module.exports = computeStatsFromReports
