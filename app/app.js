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

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
)
