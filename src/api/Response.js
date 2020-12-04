"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.responseTypes = void 0;
var responseTypes;
(function (responseTypes) {
    responseTypes[responseTypes["successWithData"] = 0] = "successWithData";
    responseTypes[responseTypes["errorWtihouData"] = 1] = "errorWtihouData";
    responseTypes[responseTypes["successWithoutData"] = 2] = "successWithoutData";
    responseTypes[responseTypes["errorWithData"] = 3] = "errorWithData";
})(responseTypes = exports.responseTypes || (exports.responseTypes = {}));
var Response = /** @class */ (function () {
    function Response(response) {
        this.description = response.description;
        this.isSuccess = response.isSuccess;
        this.type = response.type;
        this.data = response.data;
    }
    Response.fromError = function (error) {
        var response = {
            description: error.name + ": " + error.message,
            isSuccess: false,
            type: responseTypes.errorWtihouData,
        };
        return new this(response);
    };
    Response.fromData = function (description, isSuccess, code, data) {
        var response = {
            description: description,
            isSuccess: isSuccess,
            type: code,
            data: data
        };
        return new this(response);
    };
    Response.fromSuccessData = function (data) {
        var response = {
            isSuccess: true,
            type: responseTypes.successWithData,
            data: data
        };
        return new this(response);
    };
    return Response;
}());
exports.Response = Response;
//# sourceMappingURL=Response.js.map