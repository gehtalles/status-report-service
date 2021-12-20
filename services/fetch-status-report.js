const fetch = require('node-fetch')
const retry = require('async-retry')

// TODO: ensure env values are present
const { REPORTS_ENDPOINT } = process.env

async function fetchStatusReportJob({ token }) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }

  const reportsResponse = await fetch(REPORTS_ENDPOINT, {
    method: 'POST',
    ...options,
  })
  // TODO: error handling
  const response = await reportsResponse.json()
  return response
}

async function fetchStatusReport({ job_id, token }) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  }

  // NOTE: use `async-retry` as initiated job could not be finished yet.
  return await retry(
    async (_bail) => {
      const response = await fetch(`${REPORTS_ENDPOINT}/${job_id}`, options)
      if (response.status === 202) {
        throw new Error('Job not ready')
      }

      const data = await response.json()
      return data
    },
    // TODO: add backoff
    { retries: 5 },
  )
}

module.exports = {
  fetchStatusReport,
  fetchStatusReportJob,
}
