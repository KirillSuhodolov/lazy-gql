"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWhereMutation = exports.updateByPkMutation = exports.setDataSchema = exports.queryWhereQuery = exports.queryByPkQuery = exports.insertOneMutation = exports.insertMultipleMutation = exports.execute = exports.deleteWhereMutation = exports.deleteByPkMutation = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _pluralize = require("pluralize");

var _voca = require("voca");

var _array = require("./array");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dataSchema = {};

var setDataSchema = function setDataSchema(data) {
  return dataSchema = data;
};

exports.setDataSchema = setDataSchema;

var strIncludes = function strIncludes(substr) {
  return function (str) {
    return str.includes(substr);
  };
};

var fragmentKeys = function fragmentKeys(tk) {
  return (0, _ramda.compose)((0, _ramda.map)((0, _ramda.prop)(0)), (0, _ramda.filter)((0, _ramda.compose)(_ramda.not, (0, _ramda.flip)(_ramda.includes)(['hasMany', 'belongsTo']), (0, _ramda.path)([1, 'type']))), _ramda.toPairs, (0, _ramda.flip)(_ramda.prop)(tk));
};

var tableNameFromStruct = function tableNameFromStruct(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  return (0, _ramda.is)(Array, v) ? k : v || k;
};

var getFirstRootTable = (0, _ramda.compose)(tableNameFromStruct, _ramda.head, _ramda.toPairs);
var buildStruct = (0, _ramda.when)((0, _ramda.is)(String), function (struct) {
  return _defineProperty({}, struct, (0, _pluralize.plural)(struct));
});
var skeletonMock = (0, _ramda.reduce)(function (acc, key) {
  return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, 'loading'));
}, {
  loading: true
});

var addKeysToQueryFromVariables = function addKeysToQueryFromVariables(variablesSchema) {
  return function (ast) {
    return (0, _ramda.compose)((0, _ramda.reduce)(function (acc, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          variableKey = _ref5[0],
          variableValue = _ref5[1];

      return (0, _ramda.when)((0, _ramda.compose)(_ramda.not, (0, _ramda.includes)(variableValue), _ramda.values), (0, _ramda.flip)(_ramda.merge)(_defineProperty({}, variableKey, variableKey)))(acc);
    }, ast), _ramda.toPairs)(variablesSchema);
  };
};

var getVariableKeysFromSchema = function getVariableKeysFromSchema(variablesSchema) {
  return function (table) {
    return (0, _ramda.map)(function (key) {
      return [variableMapper(0)(table)(key), key];
    })((0, _ramda.keys)(variablesSchema));
  };
};

var makeGql = function makeGql(variablesSchema) {
  return function (struct, name, wrapper) {
    var ast = buildStruct(struct);

    var _toPairs = (0, _ramda.toPairs)(ast),
        _toPairs2 = _slicedToArray(_toPairs, 1),
        _toPairs2$ = _slicedToArray(_toPairs2[0], 2),
        k = _toPairs2$[0],
        v = _toPairs2$[1];

    var table = (0, _pluralize.plural)(tableNameFromStruct([k, v]));
    var others = (0, _ramda.filter)(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          k = _ref7[0],
          v = _ref7[1];

      return (0, _ramda.and)(k, v);
    })(getVariableKeysFromSchema(variablesSchema)(table));
    var conds = others.map(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          cond = _ref9[0],
          variable = _ref9[1];

      return "".concat(cond, ": $").concat(variable);
    });
    var variables = others.map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
          cond = _ref11[0],
          variable = _ref11[1];

      return {
        cond: cond,
        variable: variable,
        table: table
      };
    });
    var cond = conds.length ? "(".concat(conds.join(', '), ")") : '';
    var innerGql = (0, _ramda.is)(Array, v) ? (0, _ramda.map)(makeGql(variablesSchema))(v) : [];
    var inner = (0, _ramda.pluck)('part')(innerGql);
    var nestedVariables = (0, _ramda.pluck)('variables')(innerGql);
    var nestedSkeleton = (0, _ramda.pluck)('skeleton')(innerGql);
    var mergedNestedSkeleton = (0, _ramda.mergeAll)([].concat(_toConsumableArray(nestedSkeleton), [skeletonMock(fragmentKeys(dataSchema)(table))]));
    var wrapperLeft = wrapper ? "".concat(wrapper, " {") : '';
    var wrapperRight = wrapper ? '}' : '';
    return {
      part: "".concat(name || k).concat(cond, " { ").concat(wrapperLeft, " ").concat(fragmentKeys(dataSchema)(table).join(" "), " ").concat(inner.join(" "), " ").concat(wrapperRight, " }"),
      variables: (0, _ramda.flatten)([variables, nestedVariables]),
      skeleton: (0, _pluralize.isPlural)(k) ? _defineProperty({}, k, [mergedNestedSkeleton]) : _defineProperty({}, k, mergedNestedSkeleton)
    };
  };
};

var mapper = function mapper(table) {
  return {
    where: "".concat(table, "_bool_exp!"),
    object: "".concat(table, "_insert_input!"),
    objects: "[".concat(table, "_insert_input!]!"),
    on_conflict: "".concat(table, "_on_conflict"),
    _set: "".concat(table, "_set_input!"),
    _inc: "".concat(table, "_inc_input"),
    pk_columns: "".concat(table, "_pk_columns_input!"),
    order_by: "[".concat(table, "_order_by!]"),
    distinct_on: "[".concat(table, "_select_column]"),
    id: 'Int!',
    limit: 'Int',
    offset: 'Int'
  };
};

var variableMapper = function variableMapper(idx) {
  return function (table) {
    return function (key) {
      return (0, _ramda.compose)((0, _ramda.prop)(idx), (0, _ramda.find)(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 1),
            k = _ref15[0];

        return (0, _ramda.either)((0, _ramda.equals)(k), (0, _ramda.compose)((0, _ramda.equals)(k), _ramda.head, (0, _ramda.split)("_".concat(table))))(key);
      }), _ramda.toPairs)(mapper(table));
    };
  };
};

var extendVariablesKeys = function extendVariablesKeys(table) {
  return function (variablesSchema) {
    return (0, _ramda.compose)(_ramda.fromPairs, (0, _ramda.map)(function (_ref16) {
      var _ref17 = _slicedToArray(_ref16, 2),
          k = _ref17[0],
          v = _ref17[1];

      return [strIncludes('where_')(k) ? k : "".concat(k, "_").concat(table), v];
    }), _ramda.toPairs)(variablesSchema);
  };
};

var baseRequest = function baseRequest(_ref18) {
  var name = _ref18.name,
      wrapper = _ref18.wrapper,
      type = _ref18.type;
  return function (args, variablesSchema, gqlName) {
    var items = (0, _ramda.compose)((0, _ramda.map)(function (arg) {
      var _ref20;

      var ast = (0, _ramda.compose)(buildStruct)(arg);
      var table = getFirstRootTable(ast);
      var queryName = name(table);

      var _makeGql = makeGql(extendVariablesKeys(table)(variablesSchema))(ast, queryName, wrapper),
          part = _makeGql.part,
          variables = _makeGql.variables,
          skeleton = _makeGql.skeleton;

      var strVars = variables.map(function (_ref19) {
        var variable = _ref19.variable,
            table = _ref19.table;
        return "$".concat(variable, ": ").concat(variableMapper(1)(table)(variable));
      }).join(', ');
      var astName = (0, _voca.capitalize)((0, _voca.camelCase)(gqlName || queryName));
      return _ref20 = {
        skeleton: skeleton,
        extendVariablesKeys: extendVariablesKeys(table),
        dataPath: (0, _ramdaAdjunct.compact)([queryName, wrapper])
      }, _defineProperty(_ref20, type, "".concat(type, " ").concat(astName, " (").concat(strVars, ") { ").concat(part, " }")), _defineProperty(_ref20, "name", astName), _defineProperty(_ref20, "type", type), _defineProperty(_ref20, "astName", astName), _defineProperty(_ref20, "strVars", strVars), _defineProperty(_ref20, "part", part), _defineProperty(_ref20, "variables", variables), _ref20;
    }), _array.wrapToArray)(args);
    return _objectSpread(_objectSpread({}, items[0]), {}, _defineProperty({
      items: items
    }, type, "".concat(type, " ").concat((0, _ramda.join)('')((0, _ramda.map)((0, _ramda.prop)('astName'))(items)), " (").concat((0, _ramda.join)(', ')((0, _ramda.map)((0, _ramda.prop)('strVars'))(items)), ") { ").concat((0, _ramda.join)(', ')((0, _ramda.map)((0, _ramda.prop)('part'))(items)), " }")));
  };
};

var insertOneMutation = baseRequest({
  name: function name(table) {
    return "insert_".concat(table, "_one");
  },
  type: 'mutation'
});
exports.insertOneMutation = insertOneMutation;
var insertMultipleMutation = baseRequest({
  name: function name(table) {
    return "insert_".concat(table);
  },
  wrapper: 'returning',
  type: 'mutation'
});
exports.insertMultipleMutation = insertMultipleMutation;
var updateByPkMutation = baseRequest({
  name: function name(table) {
    return "update_".concat(table, "_by_pk");
  },
  type: 'mutation'
});
exports.updateByPkMutation = updateByPkMutation;
var updateWhereMutation = baseRequest({
  name: function name(table) {
    return "update_".concat(table);
  },
  wrapper: 'returning',
  type: 'mutation'
});
exports.updateWhereMutation = updateWhereMutation;
var deleteByPkMutation = baseRequest({
  name: function name(table) {
    return "delete_".concat(table, "_by_pk");
  },
  type: 'mutation'
});
exports.deleteByPkMutation = deleteByPkMutation;
var deleteWhereMutation = baseRequest({
  name: function name(table) {
    return "delete_".concat(table);
  },
  wrapper: 'returning',
  type: 'mutation'
});
exports.deleteWhereMutation = deleteWhereMutation;
var queryByPkQuery = baseRequest({
  name: function name(table) {
    return "".concat(table, "_by_pk");
  },
  type: 'query'
});
exports.queryByPkQuery = queryByPkQuery;
var queryWhereQuery = baseRequest({
  name: function name(table) {
    return "".concat(table);
  },
  type: 'query'
});
exports.queryWhereQuery = queryWhereQuery;

var execute = function execute(_ref21) {
  var name = _ref21.name,
      struct = _ref21.struct,
      variables = _ref21.variables,
      type = _ref21.type,
      mandatoryVariables = _ref21.mandatoryVariables;
  return (0, _ramda.merge)(type(struct, variables(), name), {
    variables: variables,
    mandatoryVariables: mandatoryVariables
  });
};

exports.execute = execute;