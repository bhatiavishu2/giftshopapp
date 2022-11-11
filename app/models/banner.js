/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const bannerModel = sequelize.define(
        'banner',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            bannerUrl: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'banner',

            indexes: [
                {
                    unique: true,
                    fields: ['bannerUrl'],
                },
            ],
        },
    )
    bannerModel.sync()

    return bannerModel
}
