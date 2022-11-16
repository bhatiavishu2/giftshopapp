/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const contactModel = sequelize.define(
        'contact',
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
            tableName: 'contact',

            indexes: [
                {
                    unique: true,
                    fields: ['html'],
                },
            ],
        },
    )
    contactModel.sync()

    return contactModel
}
