import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'

const formatOut = bunyanFormat({ outputMode: 'short', color: false })

const logger = bunyan.createLogger({ name: 'Digital Prison Reporting MI UI', stream: formatOut, level: 'debug' })

export default logger
