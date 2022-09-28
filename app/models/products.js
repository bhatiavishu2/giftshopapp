/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const productsModel = sequelize.define(
        'products',
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
            price: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            images: {
                type: DataTypes.STRING(512),
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'products',
        },
    )
    productsModel.sync()

    return productsModel
}
