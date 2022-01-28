'use strict';

const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn(USER_TABLE, 'role', {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'customer',
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(USER_TABLE, 'role');
    },
};
