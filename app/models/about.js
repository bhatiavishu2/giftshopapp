/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const aboutModel = sequelize.define(
        'about',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            html: {
                type: DataTypes.STRING(65535),
                allowNull: false,
            },
        },
        {
            tableName: 'about',

            indexes: [
                {
                    unique: true,
                    fields: ['html'],
                },
            ],
        },
    )
    aboutModel.sync()

    return aboutModel
}
