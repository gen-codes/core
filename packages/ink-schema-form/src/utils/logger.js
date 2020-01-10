
const winston = require('winston');

const wlogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

export default function (...logs){
  logs.forEach(log=>wlogger.info(log))
}