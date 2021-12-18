const fetch = require('node-fetch')
// TODO: ensure env values are present
const { AUTH_ENDPOINT, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } = process.env

async function fetchAccessToken() {
  const response = await fetch(AUTH_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: AUTH_CLIENT_ID,
      client_secret: AUTH_CLIENT_SECRET,
    }),
  })
  // TODO: error handling
  const { access_token, expires_in } = await response.json()
  // NOTE: `expires_in` is most likley in seconds
  const expires_at = Date.now() + expires_in * 1000
  return { access_token, expires_at }
}

module.exports = fetchAccessToken
