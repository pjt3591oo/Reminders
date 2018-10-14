"use strict";

module.exports = (sequelize, DataTypes) => {
    let reminder = sequelize.define("reminder", {
        name :   DataTypes.STRING
    });

    reminder.associate = (models) => {
        reminder.hasMany(models.reminderListItem, { onDelete: 'cascade' })
    }

    return reminder;
};