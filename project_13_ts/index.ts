import express from "express";
import DatabaseService from "./database-service";
import { getJwt, isJwtOk } from "./jwt-service";
import bodyParser from "body-parser";
import { env } from "node:process";

const db = new DatabaseService();
const app = express();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// ДЗ: перенести хранение пользователей в бд (пароль в открытом виде не хранить!).
const userId=1;
const userLogin='vasya';
const userPassword = '123321';

const port = env.PROJECT12_PORT || 3000;

const jwtSecret = env.PROJECT12_JWT_SECRET || 'SimpleSecret';

app.post('/api/v1.0/login', async (req, res) => {

    const data = req.body;

    try {
        if(data.login === userLogin && data.password === userPassword){
            res.status(200);
            const payload = {id: userId};
            res.send({ token: getJwt(payload, jwtSecret) });
        } else {
            res.status(401);
            res.send({status: 'unauthorized'});
        }
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

app.get('/api/v1.0/contacts', async (req, res) => {

    // @ts-ignore
    const jwt = req.headers.authorization.replace('Bearer ', '');

    // console.log('isJwtOk >>>> ', isJwtOk(jwt, jwtSecret));

    if(isJwtOk(jwt, jwtSecret)) {
        try {
            const oneItem = await db.getAll();
            res.send(oneItem);
        } catch (e) {
            res.status(500);
            res.send(e);
        }
    } else {
        res.status(401);
        res.send({status: 'unauthorized'});
    }

});
app.get('/api/v1.0/contacts/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const oneItem = await db.getOne(id);
        res.send(oneItem);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

app.post('/api/v1.0/contacts/', async (req, res) => {

    const data = req.body;

    try {
        const createdItem = await db.create(data);
        res.status(201);
        res.send(createdItem);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

app.patch('/api/v1.0/contacts/:id', async (req, res) => {

    const id = Number(req.params.id);
    const data = req.body;

    try {
        await db.update(id, data);
        res.status(200);
        res.send(null);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

app.delete('/api/v1.0/contacts/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
       await db.delete(id);
        res.status(204);
        res.send(null);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});