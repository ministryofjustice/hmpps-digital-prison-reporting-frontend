import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'

const formatOut = bunyanFormat({ outputMode: 'short', color: false })

const disableLogs = process.env.SUPPRESS_LOGS
console.log({ disableLogs })
export const logger = bunyan.createLogger({
  name: 'Digital Prison Reporting:',
  stream: formatOut,
  level: disableLogs ? bunyan.FATAL + 1 : 'debug',
})

export default logger
