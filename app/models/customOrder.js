/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const customOrdersModel = sequelize.define(
        'customOrders',
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
            address: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            pinCode: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            itemName: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'customOrders',
            indexes: [],
        },
    )
    customOrdersModel.sync()

    return customOrdersModel
}
