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

            indexes: [
                {
                    unique: true,
                    fields: ['name'],
                },
            ],
        },
    )
    rolesModel.sync()

    return rolesModel
}
