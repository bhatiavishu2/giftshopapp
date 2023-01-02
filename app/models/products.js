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
            shippingCharges: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            wholeSalePrice: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            subCategory: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            images: {
                type: DataTypes.STRING(512),
                allowNull: false,
            },
            productDescription: {
                type: DataTypes.STRING(512),
                allowNull: true,
            },
            localShippingCharges: {
                type: DataTypes.STRING(512),
                allowNull: true,
            },
            previewFile: {
                type: DataTypes.STRING(512),
                allowNull: true,
            },
            videoUrl: {
                type: DataTypes.STRING(512),
                allowNull: true,
            },
            isOutOfStock: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: 'products',
            indexes: [],
        },
    )
    productsModel.sync()

    return productsModel
}
