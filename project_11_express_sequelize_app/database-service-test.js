import DatabaseService from "./database-service.js";

const db = new DatabaseService();

const data = {
    name: 'Петров Иван',
    phone: '+79990007766'
};


const oldData = await db.getAll();
console.log('old data?', oldData);

//await db.create(data);
//await db.update(456, data);
//await db.delete(456);

const oneItem = await db.getOne(456);
console.log('oneItem?', oneItem);

const newData = await db.getAll();
console.log('new data?', newData);