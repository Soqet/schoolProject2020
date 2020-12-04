"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeError = exports.DbValueError = exports.DbIdError = exports.DbError = exports.ErrorName = void 0;
var ErrorName;
(function (ErrorName) {
    ErrorName["DbError"] = "Data base error";
    ErrorName["DbIdError"] = "Data base id error";
    ErrorName["DbValueError"] = "Data base value error";
    ErrorName["ScopeError"] = "Scope error";
})(ErrorName = exports.ErrorName || (exports.ErrorName = {}));
var DbError = /** @class */ (function (_super) {
    __extends(DbError, _super);
    function DbError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = ErrorName.DbError;
        return _this;
    }
    return DbError;
}(Error));
exports.DbError = DbError;
var DbIdError = /** @class */ (function (_super) {
    __extends(DbIdError, _super);
    function DbIdError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = ErrorName.DbIdError;
        return _this;
    }
    return DbIdError;
}(DbError));
exports.DbIdError = DbIdError;
var DbValueError = /** @class */ (function (_super) {
    __extends(DbValueError, _super);
    function DbValueError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = ErrorName.DbValueError;
        return _this;
    }
    return DbValueError;
}(DbError));
exports.DbValueError = DbValueError;
var ScopeError = /** @class */ (function (_super) {
    __extends(ScopeError, _super);
    function ScopeError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = ErrorName.ScopeError;
        return _this;
    }
    return ScopeError;
}(Error));
exports.ScopeError = ScopeError;
//# sourceMappingURL=Errors.js.map