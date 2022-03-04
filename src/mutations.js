import { deleteWhereMutation, insertMultipleMutation, updateWhereMutation, execute } from './database'

export const buildUpsert = (struct) => execute({
  type: insertMultipleMutation,
  struct,
  variables: (objects, on_conflict) => ({
    objects,
    on_conflict
  })
})

export const buildInsert = (struct) => execute({
  type: insertMultipleMutation,
  struct,
  variables: (objects) => ({
    objects,
  })
})

export const buildUpdate = (tableName) => execute({
  type: updateWhereMutation,
  struct: tableName,
  variables: (where, _set) => ({
    where,
    _set,
  })
})

export const buildSafeDestroy = (tableName) => execute({
  type: updateWhereMutation,
  struct: tableName,
  variables: (where, deleted_at) => ({
    where,
    _set: {
      deleted_at,
    }
  })
})

export const buildDestroy = (tableName) => execute({
  type: deleteWhereMutation,
  struct: tableName,
  variables: (where) => ({
    where,
  })
})
