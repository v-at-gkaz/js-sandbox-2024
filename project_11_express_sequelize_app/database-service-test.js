import DatabaseService from "./database-service.js";

const db = new DatabaseService();

const data = {
    id: 456,
    name: 'Петров Иван',
    phone: '+79990007766'
};


//const oldData = db.getAll();
//console.log('old data?', oldData);

//db.create(data);
//db.update(456, data);
//db.delete(456);

const oneItem = db.getOne(456);
console.log('oneItem?', oneItem);

const newData = db.getAll();
console.log('new data?', newData);