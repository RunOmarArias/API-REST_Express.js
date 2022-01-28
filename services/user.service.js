const boom = require('@hapi/boom');

//const getConnection = require('../libs/postgres');
//const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class UserService {

    constructor() {
        //this.pool = pool;
        //this.pool.on('error', (error) => console.log(error));

    }

    async create(data) {
        //return data;
        const newUser = await models.User.create(data);
        return newUser;
    }

    async find() {
        //const query = 'SELECT * FROM tasks';
        //const response = await this.pool.query(query);
        //return response.rows;
        const response = await models.User.findAll({
            include: ['customer']
        });
        return response;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if(!user) {
            throw boom.notFound('User not found');
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const response = await user.update(changes);
        /* return {
            id,
            changes,
        }; */
        return response;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;
