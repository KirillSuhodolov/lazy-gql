import * as database from './database'
import * as mutations from './mutations'
import * as queries from './queries'

// const { setTableKeys, execute, deleteByPkMutation, deleteWhereMutation, insertMultipleMutation, insertOneMutation, queryByPkQuery, queryWhereQuery, updateByPkMutation, updateWhereMutation } = database
// const { buildUpsert, buildInsert, buildUpdate, buildSafeDestroy, buildDestroy } = mutations
// const { buildQuery } = queries

export const setDataSchema = database.setDataSchema
export const execute = database.execute
export const deleteByPkMutation = database.deleteByPkMutation
export const deleteWhereMutation = database.deleteWhereMutation
export const insertMultipleMutation = database.insertMultipleMutation
export const insertOneMutation = database.insertOneMutation
export const queryByPkQuery = database.queryByPkQuery
export const queryWhereQuery = database.queryWhereQuery
export const updateByPkMutation = database.updateByPkMutation
export const updateWhereMutation = database.updateWhereMutation

export const buildUpsert = mutations.buildUpsert
export const buildInsert = mutations.buildInsert
export const buildUpdate = mutations.buildUpdate
export const buildSafeDestroy = mutations.buildSafeDestroy
export const buildDestroy = mutations.buildDestroy

export const buildQuery = queries.buildQuery

export default { ...database, ...mutations, ...queries }