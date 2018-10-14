"use strict";

module.exports = (sequelize, DataTypes) => {
    let reminderListItem = sequelize.define("reminderListItem", {
        name :  DataTypes.STRING,
        status: DataTypes.STRING
    });

    reminderListItem.associate =  (models) => {
        reminderListItem.belongsTo(models.reminder)
    }

    return reminderListItem;
};