/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const statusModel = sequelize.define(
        'status',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            slug: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'status',
        },
    )
    statusModel.sync()

    return statusModel
}
