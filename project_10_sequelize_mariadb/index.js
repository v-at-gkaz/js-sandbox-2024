import {Sequelize} from "sequelize";
import process, {env, platform, stdin, stdout} from "node:process";
import * as readline from "readline";

const db = env.NODEAPP_DB || 'db';
const dbUser = env.NODEAPP_USER || 'user1';
const dbPass = env.NODEAPP_PASS || 'pass1';
const dbHost = env.NODEAPP_HOST || 'localhost';
const dbDialect = env.NODEAPP_DIALECT || 'mariadb'; // 'postgres'

const schemaPrefix = dbDialect === 'postgres' ? 'public.' : '';

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
        await sequelize.close();
        console.log('Disconnect from DB Success');
        process.exit(0);
    } catch (e) {
        console.log('Disconnect from DB Error', e);
        process.exit(1);
    }
});

const sequelize = new Sequelize(
    db,
    dbUser,
    dbPass,
    {
        host: dbHost,
        dialect: dbDialect
    });

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // await insertDataToDB('Новое Имя222222', '+70000000000');

    // await updateDataInDB(5, [
    //     {name: 'name', value: 'Petya 3'},
    //     {name: 'phone', value: '+73333333333'}
    // ]);

    //await deleteDataInDB(2);

      const contacts= await selectDataFromDB();
      console.log('Contacts from database', contacts[0]);

} catch (error) {
    console.error('Sequelize Error:', error);
}

process.exit(0);

// setTimeout(() => {
//     process.exit(0);
// }, 60000);

async function insertDataToDB(name, phone) {
    try {
        return await sequelize.query(`INSERT INTO ${schemaPrefix}contacts (name, phone) VALUES ('${name}', '${phone}');`);
    } catch (e) {
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}

async function updateDataInDB(id, fields) {

    const validateFields = ['name', 'phone'];
    const setStringData = [];
    for (const field of fields) {
        if (validateFields.includes(field.name)) {
            setStringData.push(`${field.name} = '${field.value}'`);
        }
    }

    const setString = `SET ${setStringData.join(', ')} `;

    const queryParts = [
        `UPDATE ${schemaPrefix}contacts `,
        setString,
        `WHERE id = ${id}`
    ];

    const query = queryParts.join('');

    try {
        return await sequelize.query(query);
    } catch (e) {
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}

async function deleteDataInDB(id) {
    try {
        return await sequelize.query(`DELETE FROM ${schemaPrefix}contacts WHERE id = ${id}`);
    } catch (e) {
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}

async function selectDataFromDB() {
    try {
        return await sequelize.query(`SELECT * FROM ${schemaPrefix}contacts`);
    } catch (e) {
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}