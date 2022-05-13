const express = require('express')
const jwt = require('jsonwebtoken');
var cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqrik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services')
        const bookingCollection = client.db('bookingCollection').collection('bookings')

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.post('/bookings', async (req, res) => {
            const body = req.body;
            const result = await bookingCollection.insertOne(body);
            res.send(result)

        })
        app.get('/bookings', async (req, res) => {
            const query = {}
            const cursor = bookingCollection.find(query)
            const bookings = await cursor.toArray()
            res.send(bookings)

        })
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})