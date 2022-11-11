/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const bannersModel = sequelize.define(
        'banners',
        {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            bannerUrls: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            merchantBannerUrls: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            merchantMobileBannerUrls: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            mobileBannerUrls: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        {
            tableName: 'banners',

            indexes: [
                {
                    unique: true,
                    fields: ['bannerUrls', 'merchantBannerUrls', 'mobileBannerUrls', 'merchantMobileBannerUrls'],
                },
            ],
        },
    )
    bannersModel.sync()

    return bannersModel
}
