"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQuery = void 0;

var _database = require("./database");

var buildQuery = function buildQuery(tableName) {
  return (0, _database.execute)({
    type: _database.queryWhereQuery,
    struct: tableName,
    variables: function variables() {
      var where = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        where: where || {}
      };
    }
  });
};

exports.buildQuery = buildQuery;