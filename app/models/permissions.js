/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const permissionsModel = sequelize.define(
        'permissions',
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
        },
        {
            tableName: 'permissions',

            indexes: [
                {
                    unique: true,
                    fields: ['name'],
                },
            ],
        },
    )
    permissionsModel.sync()

    return permissionsModel
}
