import ApiModule from './api/ApiModule';
import DbModule from './db/DbModule';

const {
  PORT,
  URI
} = process.env;

console.log(URI, PORT)

let dbModule = new DbModule(URI as string);
let apiModule = new ApiModule(parseInt(PORT as string), dbModule);

apiModule.setup();
console.log('API started.');

// test()

// async function test() {
//   let a =  await dbModule.getMessages('5fca683de3d81719348ff085', '5fcbd79b44710032a809c770', 2);
//   console.log(a);
// }