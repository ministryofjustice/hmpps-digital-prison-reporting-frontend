// @ts-nocheck
const mockBadQueryRequest = {
  text: '{"status":400,"userMessage":"Validation failure: Invalid filters provided.","developerMessage":"Invalid filters provided."}',
  status: 400,
  headers: {
    date: 'Fri, 21 Jun 2024 14:28:13 GMT',
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    vary: 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
    'x-content-type-options': 'nosniff',
    'x-xss-protection': '0',
    'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
    pragma: 'no-cache',
    expires: '0',
    'strict-transport-security': 'max-age=15724800; includeSubDomains',
    'x-frame-options': 'SAMEORIGIN',
  },
  data: {
    status: 400,
    userMessage: 'Validation failure: Invalid filters provided.',
    developerMessage: 'Invalid filters provided.',
  },
  message: 'Bad Request',
  stack:
    'Error: Bad Request\n    at Request.callback (/Users/ross.dowthwaite/Documents/moj/hmpps-digital-prison-reporting-mi-ui/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/node_modules/superagent/lib/node/index.js:845:17)\n    at /Users/ross.dowthwaite/Documents/moj/hmpps-digital-prison-reporting-mi-ui/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/node_modules/superagent/lib/node/index.js:1070:18\n    at IncomingMessage.<anonymous> (/Users/ross.dowthwaite/Documents/moj/hmpps-digital-prison-reporting-mi-ui/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/node_modules/superagent/lib/node/parsers/json.js:21:7)\n    at IncomingMessage.emit (node:events:531:35)\n    at endReadableNT (node:internal/streams/readable:1696:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)',
}

module.exports = mockBadQueryRequest
