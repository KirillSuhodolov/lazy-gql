"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWhereMutation = exports.updateByPkMutation = exports.setTableKeys = exports.queryWhereQuery = exports.queryByPkQuery = exports.insertOneMutation = exports.insertMultipleMutation = exports.execute = exports.deleteWhereMutation = exports.deleteByPkMutation = exports["default"] = exports.buildUpsert = exports.buildUpdate = exports.buildSafeDestroy = exports.buildQuery = exports.buildInsert = exports.buildDestroy = void 0;

var database = _interopRequireWildcard(require("./database"));

var mutations = _interopRequireWildcard(require("./mutations"));

var queries = _interopRequireWildcard(require("./queries"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const { setTableKeys, execute, deleteByPkMutation, deleteWhereMutation, insertMultipleMutation, insertOneMutation, queryByPkQuery, queryWhereQuery, updateByPkMutation, updateWhereMutation } = database
// const { buildUpsert, buildInsert, buildUpdate, buildSafeDestroy, buildDestroy } = mutations
// const { buildQuery } = queries
var setTableKeys = database.setTableKeys;
exports.setTableKeys = setTableKeys;
var execute = database.execute;
exports.execute = execute;
var deleteByPkMutation = database.deleteByPkMutation;
exports.deleteByPkMutation = deleteByPkMutation;
var deleteWhereMutation = database.deleteWhereMutation;
exports.deleteWhereMutation = deleteWhereMutation;
var insertMultipleMutation = database.insertMultipleMutation;
exports.insertMultipleMutation = insertMultipleMutation;
var insertOneMutation = database.insertOneMutation;
exports.insertOneMutation = insertOneMutation;
var queryByPkQuery = database.queryByPkQuery;
exports.queryByPkQuery = queryByPkQuery;
var queryWhereQuery = database.queryWhereQuery;
exports.queryWhereQuery = queryWhereQuery;
var updateByPkMutation = database.updateByPkMutation;
exports.updateByPkMutation = updateByPkMutation;
var updateWhereMutation = database.updateWhereMutation;
exports.updateWhereMutation = updateWhereMutation;
var buildUpsert = mutations.buildUpsert;
exports.buildUpsert = buildUpsert;
var buildInsert = mutations.buildInsert;
exports.buildInsert = buildInsert;
var buildUpdate = mutations.buildUpdate;
exports.buildUpdate = buildUpdate;
var buildSafeDestroy = mutations.buildSafeDestroy;
exports.buildSafeDestroy = buildSafeDestroy;
var buildDestroy = mutations.buildDestroy;
exports.buildDestroy = buildDestroy;
var buildQuery = queries.buildQuery;
exports.buildQuery = buildQuery;

var _default = _objectSpread(_objectSpread(_objectSpread({}, database), mutations), queries);

exports["default"] = _default;