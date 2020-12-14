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

// test()

// async function test() {
//   let a =  await dbModule.getMessages('5fca683de3d81719348ff085', '5fcbd79b44710032a809c770', 2);
//   console.log(a);
// }