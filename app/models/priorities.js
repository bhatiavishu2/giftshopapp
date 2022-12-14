/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const propertiesModel = sequelize.define(
        'priorities',
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
            tableName: 'priorities',
        },
    )
    propertiesModel.sync()
    return propertiesModel
}
