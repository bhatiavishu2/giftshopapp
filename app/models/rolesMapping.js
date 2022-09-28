/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const rolesMappingModel = sequelize.define(
        'rolesMapping',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
            roleIds: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'rolesmapping',

            indexes: [
                {
                    unique: true,
                    fields: ['userId'],
                },
            ],
        },
    )

    rolesMappingModel.sync()
    return rolesMappingModel
}
