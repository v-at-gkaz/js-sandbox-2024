import {Sequelize, DataTypes} from "sequelize";
import process, {env, platform, stdin, stdout} from "node:process";
// import * as readline from "readline"; // Windows 7 ?

const db = env.NODEAPP_DB || 'db';
const dbUser = env.NODEAPP_USER || 'user1';
const dbPass = env.NODEAPP_PASS || 'pass1';
const dbHost = env.NODEAPP_HOST || 'localhost';
const dbDialect = env.NODEAPP_DIALECT || 'mysql'; // 'postgres'

export default class DatabaseService {

    sequelize = new Sequelize(
        db,
        dbUser,
        dbPass,
        {
            host: dbHost,
            dialect: dbDialect
        });

    Contact = this.sequelize.define('Contact', {
       name: {
           type: DataTypes.STRING,
           allowNull: false
       },
        phone: {
            type: DataTypes.STRING,
        }
    },{
        freezeTableName: true
    });

    constructor() {

        // Windows 7 ?
        // if (platform === "win32") {
        //     const rl = readline.createInterface({
        //         input: stdin,
        //         output: stdout
        //     });
        //
        //     rl.on("SIGINT", function () {
        //         process.emit("SIGINT");
        //     });
        // }

        process.on("SIGINT", async () => {
            try {
                await this.sequelize.close();
                console.log('Disconnect from DB Success');
                process.exit(0);
            } catch (e) {
                console.log('Disconnect from DB Error', e);
                process.exit(1);
            }
        });

        this.sequelize.authenticate().then(async ()=>{
            console.log('Connection has been established successfully.');
            //await this.sequelize.sync({ force: true });
            await this.sequelize.sync();
        }).catch((error)=>{
            console.error('Sequelize Error:', error);
        });
    }

    async getAll() {
        return await this.Contact.findAll();
    }

    async getOne(id) {
        return await this.Contact.findOne({where: {id}});
    }

    async create(data) {
        return await this.Contact.create({name: data.name, phone: data.phone});
    }

    async update(id, data) {
        return await this.Contact.update(data, {where: {id}});
    }

    async delete(id) {
        return await this.Contact.destroy({where: {id}});
    }
}