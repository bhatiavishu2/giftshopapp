/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const rolesModel = sequelize.define(
        'roles',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            permissions: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'roles',
            timestamps: false,
        },
    )
    rolesModel.sync()
    // rolesModel.associate = (db) => {
    //     db.users.belongsToMany(db.roles, {
    //         through: 'rolesmapping',
    //         sourceKey: 'id',
    //         targetKey: 'id',
    //     })
    //     db.roles.belongsToMany(db.users, {
    //         through: 'rolesmapping',
    //         sourceKey: 'id',
    //         targetKey: 'id',
    //     })
    // }
    return rolesModel
}
