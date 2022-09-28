const db = require('./database')
module.exports = async function (req, res, next) {
    try {
        if (!req.user) {
            const token = req.headers['authorization']
            if (!token) {
                next()
                return
            }
            const authData = await db.auth.findOne({
                where: {
                    token: token,
                },
            })

            if (!authData) {
                next()
                return
            }
            const roleMappingData = await db.rolesMapping.findOne({
                where: {
                    userId: authData.userId,
                },
            })
            const roleData = await db.roles.findAll({
                where: {
                    id: roleMappingData.dataValues.roleIds
                        .split(',')
                        .map((role) => Number(role)),
                },
            })

            const permissionIds = roleData.reduce((result, role) => {
                result += role.dataValues.permissions + ','
                return result
            }, '')
            const permissions = await db.permissions.findAll({
                where: {
                    id: permissionIds
                        .split(',')
                        .map((permission) => Number(permission)),
                },
            })
            req.user = {
                userId: authData.userId,
                permissions: permissions.map(
                    (permission) => permission.dataValues.name,
                ),
                token,
            }
            next()
        }
    } catch (e) {
        next()
    }
}
