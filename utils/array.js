import { type, equals } from 'ramda'

export const wrapToArray = (items) => {
  return isArray(items) ? items : [items];
}

export const isArray = (items) => equals(type(items), 'Array')