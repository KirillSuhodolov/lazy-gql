import {
  path,
  equals,
  split,
  values,
  reduce,
  or,
  find,
  mergeAll,
  pluck,
  merge,
  toPairs,
  not,
  flatten,
  filter,
  map,
  when,
  prop,
  includes,
  compose,
  flip,
  join,
  head,
  is,
  gt,
  length,
  defaultTo,
  either,
  keys,
  and,
  fromPairs,
} from 'ramda'
import { compact } from 'ramda-adjunct'
import { plural, isPlural } from 'pluralize'
import { camelCase, capitalize, snakeCase, upperCase } from 'voca'
import { wrapToArray } from './array'

let dataSchema = {}

export const setDataSchema = (data) => dataSchema = data

const strIncludes = (substr) => (str) => str.includes(substr)

const fragmentKeys = (tk) => compose(
  map(prop(0)),
  filter(compose(not, flip(includes)(['hasMany', 'belongsTo']), path([1, 'type']))),
  toPairs,
  flip(prop)(tk)
)

const tableNameFromStruct = ([k, v]) => (is(Array, v) ? k : v || k)
const getFirstRootTable = compose(tableNameFromStruct, head, toPairs)
const buildStruct = when(is(String), (struct) => ({
  [struct]: plural(struct),
}))

const skeletonMock = reduce((acc, key) => ({ ...acc, [key]: 'loading' }), {
  loading: true,
})

const addKeysToQueryFromVariables = (variablesSchema) => (ast) =>
  compose(
    reduce(
      (acc, [variableKey, variableValue]) =>
        when(compose(not, includes(variableValue), values), flip(merge)({ [variableKey]: variableKey }))(acc),
      ast
    ),
    toPairs
  )(variablesSchema)

const getVariableKeysFromSchema = (variablesSchema) => (table) => map((key) => [variableMapper(0)(table)(key), key])(keys(variablesSchema))

const makeGql = (variablesSchema) => (struct, name, wrapper) => {
  const ast = buildStruct(struct)
  const [[k, v]] = toPairs(ast)
  const table = plural(tableNameFromStruct([k, v]))
  const others = filter(([k, v]) => and(k, v))(getVariableKeysFromSchema(variablesSchema)(table))
  const conds = others.map(([cond, variable]) => `${cond}: $${variable}`)
  const variables = others.map(([cond, variable]) => ({
    cond,
    variable,
    table,
  }))
  const cond = conds.length ? `(${conds.join(', ')})` : ''
  const innerGql = is(Array, v) ? map(makeGql(variablesSchema))(v) : []
  const inner = pluck('part')(innerGql)
  const nestedVariables = pluck('variables')(innerGql)
  const nestedSkeleton = pluck('skeleton')(innerGql)
  const mergedNestedSkeleton = mergeAll([...nestedSkeleton, skeletonMock(fragmentKeys(dataSchema)(table))])
  const wrapperLeft = wrapper ? `${wrapper} {` : ''
  const wrapperRight = wrapper ? '}' : ''

  return {
    part: `${name || k}${cond} { ${wrapperLeft} ${fragmentKeys(dataSchema)(table).join(` `)} ${inner.join(` `)} ${wrapperRight} }`,
    variables: flatten([variables, nestedVariables]),
    skeleton: isPlural(k) ? { [k]: [mergedNestedSkeleton] } : { [k]: mergedNestedSkeleton },
  }
}

const mapper = (table) => ({
  where: `${table}_bool_exp!`,
  object: `${table}_insert_input!`,
  objects: `[${table}_insert_input!]!`,
  on_conflict: `${table}_on_conflict`,
  _set: `${table}_set_input!`,
  _inc: `${table}_inc_input`,
  pk_columns: `${table}_pk_columns_input!`,
  order_by: `[${table}_order_by!]`,
  distinct_on: `[${table}_select_column]`,
  id: 'Int!',
  limit: 'Int',
  offset: 'Int',
})

const variableMapper = (idx) => (table) => (key) => {
  return compose(
    prop(idx),
    find(([k]) => either(
      equals(k),
      compose(equals(k), head, split(`_${table}`)),
    )(key)),
    toPairs
  )(mapper(table))
}

const extendVariablesKeys = (table) => (variablesSchema) => compose(
  fromPairs,
  map(([k, v]) => [strIncludes('where_')(k) ? k : `${k}_${table}`, v]),
  toPairs,
)(variablesSchema)

const baseRequest =
  ({ name, wrapper, type }) =>
  (args, variablesSchema, gqlName) => {
    const items = compose(
      map((arg) => {
        const ast = compose(buildStruct)(arg)

        const table = getFirstRootTable(ast)
        const queryName = name(table)
        const { part, variables, skeleton } = makeGql(extendVariablesKeys(table)(variablesSchema))(ast, queryName, wrapper)
        const strVars = variables
          .map(({ variable, table }) => `$${variable}: ${variableMapper(1)(table)(variable)}`)
          .join(', ')
        const astName = capitalize(camelCase(gqlName || queryName))
    
        return {
          skeleton,
          extendVariablesKeys: extendVariablesKeys(table),
          dataPath: compact([queryName, wrapper]),
          [type]: `${type} ${astName} (${strVars}) { ${part} }`,
          name: astName,
          type,
          astName,
          strVars,
          part,
          variables,
        }
      }),
      wrapToArray
    )(args)

    return { ...items[0], items, [type]: `${type} ${join('')(map(prop('astName'))(items))} (${join(', ')(map(prop('strVars'))(items))}) { ${join(', ')(map(prop('part'))(items))} }` }
  }

export const insertOneMutation = baseRequest({
  name: (table) => `insert_${table}_one`,
  type: 'mutation',
})

export const insertMultipleMutation = baseRequest({
  name: (table) => `insert_${table}`,
  wrapper: 'returning',
  type: 'mutation',
})

export const updateByPkMutation = baseRequest({
  name: (table) => `update_${table}_by_pk`,
  type: 'mutation',
})

export const updateWhereMutation = baseRequest({
  name: (table) => `update_${table}`,
  wrapper: 'returning',
  type: 'mutation',
})

export const deleteByPkMutation = baseRequest({
  name: (table) => `delete_${table}_by_pk`,
  type: 'mutation',
})

export const deleteWhereMutation = baseRequest({
  name: (table) => `delete_${table}`,
  wrapper: 'returning',
  type: 'mutation',
})

export const queryByPkQuery = baseRequest({
  name: (table) => `${table}_by_pk`,
  type: 'query',
})

export const queryWhereQuery = baseRequest({
  name: (table) => `${table}`,
  type: 'query',
})

export const execute = ({ name, struct, variables, type, mandatoryVariables }) => merge(type(struct, variables(), name), {variables, mandatoryVariables })
