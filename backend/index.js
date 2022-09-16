const express = require('express')
const { Client } = require('pg');
const cors = require('cors')
// const keys = require('./keys')
// require('dotenv').config()

const client = new Client({
    host: process.env.pgHost,
    user: process.env.pgUser,
    password: process.env.pgPassword,
    port: process.env.pgPort,
    database: process.env.pgDatabase
});

const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        // await client.query('CREATE DATABASE my_database'); // sends queries
        await client.query('CREATE TABLE IF NOT EXISTS posts (post varchar, id serial primary key)'); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
    // finally {
    //     await client.end();                                // closes connection
    // }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database created');
    }
});

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hi')
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await client.query(`select * from posts`)
        res.send(posts.rows)    
    } catch (error) {
        console.error(error.stack);
        return false;
    }
    
})

app.get('/posts/:id', async (req, res) => {
    const post = await client.query('select * from posts where id = ($1)', [req.params.id])
    res.send(post.rows)
})

app.post('/posts', async (req,res) => {
    try {
        const post = await client.query(`insert into posts (post) values ($1) returning post`, [req.body.post])
        res.send({inserted: true})    
    } catch (error) {
        console.error(error.stack);
        return false;
    }
    
})

app.delete('/posts/:id', async (req,res) => {
    try {
        const post = await client.query(`delete from posts where id = $1`, [req.params.id])
        res.send(post.rows)    
    } catch (error) {
        console.error(error.stack);
        return false;
    }
    
})

app.listen(5000, () => console.log('Server Started on port 5000'))
