/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const subCategoriesModel = sequelize.define(
        'subCategories',
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
            category: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
        },
        {
            tableName: 'subCategories',

            indexes: [
                {
                    unique: true,
                    fields: ['name'],
                },
            ],
        },
    )
    subCategoriesModel.sync()

    return subCategoriesModel
}
