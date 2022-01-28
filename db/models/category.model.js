const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
};

class Category extends Model {

    static associate(models) {
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            model: 'Category',
            timestamps: false
        };
    };
};

module.exports = {
    CategorySchema,
    Category,
    CATEGORY_TABLE
};
