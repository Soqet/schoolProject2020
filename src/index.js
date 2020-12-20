"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiModule_1 = __importDefault(require("./api/ApiModule"));
var DbModule_1 = __importDefault(require("./db/DbModule"));
var uri = process.env.uri;
var port = process.env.PORT || process.env.port;
var dbModule = new DbModule_1.default(uri);
var apiModule = new ApiModule_1.default(parseInt(port), dbModule);
apiModule.setup();
console.log('API started.');
// test()
// async function test() {
//   let a =  await dbModule.getMessages('5fca683de3d81719348ff085', '5fcbd79b44710032a809c770', 2);
//   console.log(a);
// }
//# sourceMappingURL=index.js.map