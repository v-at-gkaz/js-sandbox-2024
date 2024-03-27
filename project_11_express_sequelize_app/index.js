import express from "express";
import DatabaseService from "./database-service.js";
import bodyParser from "body-parser";

const db = new DatabaseService();
const app = express();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

const port = 3000;
app.get('/api/v1.0/contacts', async (req, res) => {
    try {
        const oneItem = await db.getAll();
        res.send(oneItem);
    } catch (e) {
        res.status(500);
        res.send(e);
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