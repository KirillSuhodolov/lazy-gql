import { queryWhereQuery, execute } from './database'

export const buildQuery = (tableName) => execute({
  type: queryWhereQuery,
  struct: tableName,
  variables: (where={}) => ({ where: where || {} }),
})
