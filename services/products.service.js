
const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize')

//const pool = require('../libs/postgres.pool');
//const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class ProductService {

    constructor() {
        this.product = [];
        this.generate();
        //this.pool = pool;
        //this.pool.on('error', (error) => console.log(error));

    };

    async generate() {
        const limit = 100;
        for (let i = 0 ; i < limit ; i++) {
            this.product.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            });
        };
    };

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    };

    async find(query) {
        //const res = await this.pool.query(query);
        const options = {
            include: ['category'],
            where: {}
        };
        const {limit, offset } = query;
        if( limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        const { price } = query;
        if (price) {
            options.where.price = price;
        }

        const { price_min, price_max} = query;
        if (price_min && price_max) {
            options.where.price = {
                [Op.gte]: price_min,
                [Op.lte]: price_max
            }
        }

        const products = await models.Product.findAll(options);
        //return res.rows;
        return products
    };

    async fineOne(id) {
        const product = models.Product.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        if (product.isBlock) {
            throw boom.conflict('Product is blocked');
        }
        return product;
    };

    async update(id, changes) {
        const index = models.Product.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        const product = this.product[index];
        this.product[index] = {
            ...product,
            ...changes
        };
        return this.product[index];
    };

    async delete(id) {
        const index = models.Product(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');;
        }
        this.product.splice(index, 1);
        return {
            message: 'Product deleted',
            id
        }
    };
}

module.exports = ProductService;
