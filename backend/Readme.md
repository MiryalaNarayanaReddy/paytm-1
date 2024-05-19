# backend for paytm -1


## database

- create a database named `paytm` in docker container with the following command

```bash

docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

```

- connect to the database in nodejs using the following code

```typescript

import { Pool } from 'pg';

const pool
    = new Pool

    ({  
        user: 'postgres',
        host: 'localhost',
        database: 'paytm',
        password: 'mysecretpassword',
        port: 5432
    });

```
