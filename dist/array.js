"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapToArray = exports.isArray = void 0;

var _ramda = require("ramda");

var wrapToArray = function wrapToArray(items) {
  return isArray(items) ? items : [items];
};

exports.wrapToArray = wrapToArray;

var isArray = function isArray(items) {
  return (0, _ramda.equals)((0, _ramda.type)(items), 'Array');
};

exports.isArray = isArray;