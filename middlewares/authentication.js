const fetchAccessToken = require('../services/fetch-access-token')

function isExpired({ expires_at }) {
  // TODO: determine a good threshold (possible race condition)
  return expires_at <= Date.now()
}

// XXX: in-memory auth response cache
let authenticationState = null

async function ensureAuthentication(req, _res, next) {
  if (!authenticationState || isExpired(authenticationState)) {
    authenticationState = await fetchAccessToken()
  }
  const { access_token } = authenticationState
  req.private = Object.assign(req.private || {}, { access_token })
  next()
}

module.exports = ensureAuthentication
