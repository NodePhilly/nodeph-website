var winston = require('winston');

switch (process.env.NODE_ENV) {
  case 'prod': {
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.File, {
      filename: 'app.log'
    }); 
    break;
  }

  case 'test': {
    winston.remove(winston.transports.Console);
    break;
  }
}

module.exports = winston;