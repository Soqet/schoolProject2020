"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiModule_1 = __importDefault(require("./api/ApiModule"));
var DbModule_1 = __importDefault(require("./db/DbModule"));
var _a = process.env, PORT = _a.PORT, URI = _a.URI;
console.log(URI, PORT);
var dbModule = new DbModule_1.default(URI);
var apiModule = new ApiModule_1.default(parseInt(PORT), dbModule);
apiModule.setup();
console.log('API started.');
// test()
// async function test() {
//   let a =  await dbModule.getMessages('5fca683de3d81719348ff085', '5fcbd79b44710032a809c770', 2);
//   console.log(a);
// }
//# sourceMappingURL=index.js.map