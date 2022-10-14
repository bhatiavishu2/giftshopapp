const Sequelize = require('sequelize')

var db = {}

const sequelize = new Sequelize(
    'u157971984_test',
    'u157971984_test',
    'Test12345',
    {
        host: 'bbeventgift.shop',
        port: '3306',
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false,
    },
)

let models = [
    require('./models/priorities.js'),
    require('./models/status.js'),
    require('./models/tickets.js'),
    require('./models/users.js'),
    require('./models/roles.js'),
    require('./models/permissions.js'),
    require('./models/rolesMapping.js'),
    require('./models/auth.js'),
    require('./models/products.js'),
    require('./models/images.js'),
]

// Initialize models
models.forEach((model) => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach((key) => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
