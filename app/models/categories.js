/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const categoriesModel = sequelize.define(
        'categories',
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
            categoryImage: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'categories',

            indexes: [
                {
                    unique: true,
                    fields: ['name'],
                },
            ],
        },
    )
    categoriesModel.sync()

    return categoriesModel
}
