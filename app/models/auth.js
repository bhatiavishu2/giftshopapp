/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const authModel = sequelize.define(
        'auth',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            token: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'auth',
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['token'],
                },
                {
                    unique: true,
                    fields: ['userId'],
                },
            ],
        },
    )
    authModel.sync()

    return authModel
}
