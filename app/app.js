import '@babel/polyfill'
import express from 'express'
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
    modules: [
        require('./GraphQL/tickets'),
        require('./GraphQL/status'),
        require('./GraphQL/users'),
        require('./GraphQL/priorities'),
    ],
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3003, () => console.log(`🚀 Server ready at http://localhost:3003`))
