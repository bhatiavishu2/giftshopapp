/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const ordersModel = sequelize.define(
        'orders',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            productIds: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            orderStatus: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            uploadedPhotos: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            orderRemarks: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            shippingDetails: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            initialPayment: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'orders',
            indexes: [],
        },
    )
    ordersModel.sync()

    return ordersModel
}
