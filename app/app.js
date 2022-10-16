import '@babel/polyfill'
import express from 'express'
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const app = express()
import * as path from 'path'
const authmiddleware = require('./authmiddleware')
const { handleUploadFile, uploadFilePath } = require('./upload')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(authmiddleware)
app.use('/static', express.static(uploadFilePath))
const server = new ApolloServer({
    modules: [
        require('./GraphQL/tickets'),
        require('./GraphQL/status'),
        require('./GraphQL/users'),
        require('./GraphQL/priorities'),
        require('./GraphQL/roles'),
        require('./GraphQL/permissions'),
        require('./GraphQL/rolesMapping'),
        require('./GraphQL/auth'),
        require('./GraphQL/products'),
    ],
    playground: {
        settings: {
            'editor.theme': 'dark',
        },
    },
    context: ({ req }) => ({
        ...req.user,
    }),
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/file/upload', async (req, res) => {
    let uploadResult

    try {
        uploadResult = await handleUploadFile(req, res)
    } catch (e) {
        return res.status(422).json({ errors: [e.message] })
    }
    console.log('uploadResult---', uploadResult)
    const uploadedFile = uploadResult.file

    const { files } = uploadResult

    const result = {
        files,
    }

    return res.json({ data: result })
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
)
