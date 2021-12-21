
const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {

    constructor() {
        this.product = [];
        this.generate();
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
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.product.push(newProduct);
        return newProduct;
    };

    async find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.product);
            }, 5000);
        });
    };

    async fineOne(id) {
        const product = this.product.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        if (product.isBlock) {
            throw boom.conflict('Product is blocked');
        }
        return product;
    };

    async update(id, changes) {
        const index = this.product.findIndex(item => item.id === id);
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
        const index = this.product.findIndex(item => item.id === id);
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
