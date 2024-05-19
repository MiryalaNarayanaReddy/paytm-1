import {Client } from 'pg'

// sudo docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

// connecting to the postgres database

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
})

client.connect().then(() => {
    console.log('Connected to database')
}
).catch((err) => {
    console.log('Error connecting to database', err)
})

export default client

