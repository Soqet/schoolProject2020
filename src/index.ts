import ApiModule from './api/ApiModule';
import DbModule from './db/DbModule';

const {
  port,
  uri
} = process.env;

let dbModule = new DbModule(uri as string);
let apiModule = new ApiModule(parseInt(port as string), dbModule);

apiModule.setup();
console.log('API started.');

