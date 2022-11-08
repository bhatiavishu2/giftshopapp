/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const usersModel = sequelize.define(
        'users',
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
            phone: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            companyName: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
        },
        {
            tableName: 'users',

            indexes: [
                {
                    unique: true,
                    fields: ['phone'],
                },
            ],
        },
    )
    usersModel.sync()
    return usersModel
}
