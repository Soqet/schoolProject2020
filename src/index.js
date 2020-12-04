"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiModule_1 = __importDefault(require("./api/ApiModule"));
var DbModule_1 = __importDefault(require("./db/DbModule"));
var _a = process.env, port = _a.port, uri = _a.uri;
var dbModule = new DbModule_1.default(uri);
var apiModule = new ApiModule_1.default(parseInt(port), dbModule);
apiModule.setup();
console.log('API started.');
//# sourceMappingURL=index.js.map