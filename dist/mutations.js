"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUpsert = exports.buildUpdate = exports.buildSafeDestroy = exports.buildInsert = exports.buildDestroy = void 0;

var _database = require("./database");

var buildUpsert = function buildUpsert(struct) {
  return (0, _database.execute)({
    type: _database.insertMultipleMutation,
    struct: struct,
    variables: function variables(objects, on_conflict) {
      return {
        objects: objects,
        on_conflict: on_conflict
      };
    }
  });
};

exports.buildUpsert = buildUpsert;

var buildInsert = function buildInsert(struct) {
  return (0, _database.execute)({
    type: _database.insertMultipleMutation,
    struct: struct,
    variables: function variables(objects) {
      return {
        objects: objects
      };
    }
  });
};

exports.buildInsert = buildInsert;

var buildUpdate = function buildUpdate(tableName) {
  return (0, _database.execute)({
    type: _database.updateWhereMutation,
    struct: tableName,
    variables: function variables(where, _set) {
      return {
        where: where,
        _set: _set
      };
    }
  });
};

exports.buildUpdate = buildUpdate;

var buildSafeDestroy = function buildSafeDestroy(tableName) {
  return (0, _database.execute)({
    type: _database.updateWhereMutation,
    struct: tableName,
    variables: function variables(where, deleted_at) {
      return {
        where: where,
        _set: {
          deleted_at: deleted_at
        }
      };
    }
  });
};

exports.buildSafeDestroy = buildSafeDestroy;

var buildDestroy = function buildDestroy(tableName) {
  return (0, _database.execute)({
    type: _database.deleteWhereMutation,
    struct: tableName,
    variables: function variables(where) {
      return {
        where: where
      };
    }
  });
};

exports.buildDestroy = buildDestroy;