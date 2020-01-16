
const winston = require('winston');

const wlogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log',  })
  ]
});

export default function (...logs){
  wlogger.info(logs)
}