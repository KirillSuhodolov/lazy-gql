# Very lazy gql builder for your app

## Npm package for fast app prototyping

### Motivation

For fast prototyping [next.js](https://nextjs.org) app with [Hasura](https://hasura.io) as backend
Library is abstruction layer ower Hasura query api

### How to use

1. Create dataSchema file, minimal example

```
export default {
  user: {
    id: { },
    name: { },
    email: { },
  },
}
```

2. Fill internal library store with `setDataSchema`

```
import { setDataSchema } from 'lazy-gql'
import dataSchema from 'dataSchema'

setDataSchema(dataSchema)

```

3. Call one of build methods

#### Examples

#### [lazy-gql-request](https://github.com/KirillSuhodolov/lazy-gql-request) for backend use example(with next.js api routes)

```
import { request } from 'lazy-gql-request'
import { buildInsert, setDataSchema } from 'lazy-gql'
import dataSchema from 'dataSchema'

setDataSchema(dataSchema)

const handler = async (req) => {
  return await request(process.env.URL, { headers: { } })(buildInsert('users'), [{
    name: 'random name',
    email: 'random@email',
  }])
}

export default handler

```

Set data schema you could on app instance initialization

```
import { setDataSchema } from 'lazy-gql'
import dataSchema from 'dataSchema'

setDataSchema(dataSchema)
```

For react application use hooks from [lazy-gql-hooks](https://github.com/KirillSuhodolov/lazy-gql-hooks)

Also available support for react for builder [lazy-gql-form](https://github.com/KirillSuhodolov/lazy-gql-form)

See examples at each package separately

### Complex example with relations

```
export default {
  user: {
    id: { },
    name: { },
    email: { },
  },
  projects: {
    name: {  },
    description: {  }
  },
  flows: {
    name: {  },
  }
}

```

```
return await request(process.env.URL)(buildQuery({
  users: [{
    projects: ['flows']
  }]
}))
```

this renders gql query

```
query QueryUsers {
  users {
    id
    name
    email
    projects {
      name
      description
      flows {
        name
      }
    }
  }
}
```

### API

all api methods have similar argument types - first is struct, second, variables
more special info about each Hasura api methods
[buildQuery](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/index.html) -
[buildUpsert](https://hasura.io/docs/latest/graphql/core/databases/postgres/mutations/upsert.html)
[buildInsert](https://hasura.io/docs/latest/graphql/core/databases/postgres/mutations/insert.html)
[buildUpdate](https://hasura.io/docs/latest/graphql/core/databases/postgres/mutations/update.html)
[buildDestroy](https://hasura.io/docs/latest/graphql/core/databases/postgres/mutations/delete.html)
buildSafeDestroy - is update with passed deleted_at timestamp
