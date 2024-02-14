import fs from 'fs';
import winston from 'winston';

const fsPromise= fs.promises;

const logger= winston.createLogger({
    level:'info',
    format: winston.format.json(),
    defaultMeta:{service: 'request-logging'},
    transports:[new winston.transports.File({filename:'log.txt'})
]
});

const isSensitiveField = (key) => ['email', 'password'].includes(key.toLowerCase());

const filterSensitiveFields = (object) => {
  const filteredObject = { ...object };
  Object.keys(filteredObject).forEach((key) => {
    if (isSensitiveField(key)) {
      filteredObject[key] = '***'; // Replace sensitive data with '***'
    }
  });
  return filteredObject;
};


const loggerMiddleware = async(req,res,next)=>{
    //1 log request body
    if(!req.url.includes('loginUser')){
        const logData= `${req.url} - ${JSON.stringify(filterSensitiveFields(req.body))}`;
    //await log(logData); 
    logger.info(logData);
    }
    next();
};
export default loggerMiddleware;


