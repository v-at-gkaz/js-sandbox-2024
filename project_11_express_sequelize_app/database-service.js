//import {cwd} from 'node:process';
//import {join} from 'node:path';
//import {existsSync, writeFileSync, readFileSync} from 'node:fs';
import {Sequelize} from "sequelize";
import process, {env, platform, stdin, stdout} from "node:process";
import * as readline from "readline";

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

    //database = [];
    //filePath = join(cwd(), '..', 'project_08_database.json');

    constructor() {

        if (platform === "win32") {
            const rl = readline.createInterface({
                input: stdin,
                output: stdout
            });

            rl.on("SIGINT", function () {
                process.emit("SIGINT");
            });
        }

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

        this.sequelize.authenticate().then(()=>{
            console.log('Connection has been established successfully.');
        }).catch((error)=>{
            console.error('Sequelize Error:', error);
        });


        // if (existsSync(this.filePath)) {
        //     try {
        //         this.database = JSON.parse(readFileSync(this.filePath));
        //     } catch (e) {
        //         console.error('DATABASE ERROR', e);
        //     }
        // } else {
        //     writeFileSync(this.filePath, JSON.stringify([]));
        // }
    }

    getAll() {
        return []; // this.database;
    }

    getOne(id) {
       // const found = this.database.find((item) => {
       //      return item.id === id;
       //  });
       // return found;
        return {};
    }

    create(data) {
        // try {
        //     this.database.push(data);
        //     this.storeToDisk();
        //     return true;
        // } catch (e) {
        //     console.error('DATABASE ERROR', e);
        //     return false;
        // }
        return {};
    }

    update(id, data) {
        // const found = this.database.find((item) => {
        //     return item.id === id;
        // });
        // const foundElIdx = this.database.indexOf(found);
        // try {
        //     this.database[foundElIdx]=data;
        //     this.storeToDisk();
        //     return true;
        // } catch (e) {
        //     console.error('DATABASE ERROR', e);
        //     return false;
        // }
        return {};
    }

    delete(id) {
        // try {
        //     this.database = this.database.filter((item) => {
        //         return item.id !== id;
        //     });
        //     this.storeToDisk();
        //     return true;
        // } catch (e) {
        //     console.error('DATABASE ERROR', e);
        //     return false;
        // }
        return true;
    }

    // storeToDisk() {
    //     try {
    //         writeFileSync(this.filePath, JSON.stringify(this.database));
    //     } catch (e) {
    //         console.error('DATABASE ERROR', e);
    //     }
    // }


}