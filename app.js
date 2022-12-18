const express = require('express');
const app = express()
const port = 5000;
const cors = require('cors');
require('dotenv').config()


// middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.p346hyq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    console.log("connected");
    try {
        await client.connect();
        const productCollection = await client.db("moon_tech").collection("products");
        // perform actions on the collection object
        app.get('/products', async (req, res) => {
            try {
                const query = {};
                const result = await productCollection.find(query).toArray();
                res.status(200).json({ data: result })
            } catch (error) {
                res.status(500).json({
                    status: "Failed to get product",
                    message: error.message
                })
            }
        })
        app.get('/product/:id', async (req, res) => {
            try {
                const id = req.params;
                const query = { _id: ObjectId(id) }
                const result = await productCollection.find(query).toArray();
                res.status(200).json({ data: result })
            } catch (error) {
                res.status(500).json({
                    status: "Failed to get product",
                    message: error.message
                })
            }
        })

        app.patch('/product/:id', async (req, res) => {
            try {
                const id = req.params;
                console.log(id);
                const doc = req.body
                const filter = { _id: ObjectId(id) }
                const updatedDoc = {
                    $set: {
                        doc,
                    }
                };
                const options = { upsert: true };
                // const result = { filter, doc, options }
                const result = await productCollection.updateOne(filter, updatedDoc, options);
                res.status(200).json({ data: result })
            } catch (error) {
                res.status(500).json({
                    status: "Failed to updat product",
                    message: error.message
                })
            }
        })


        app.post('/product', async (req, res) => {

            try {
                const data = req.body;
                const result = await productCollection.insertOne(data);
                res.status(200).json({ result })
            } catch (error) {
                res.status(500).json({
                    status: "Failed to add product",
                    message: error.message
                })
            }
        })
        app.delete('/product/:id', async (req, res) => {

            try {
                const { id } = req.params;
                console.log(id);
                const filter = { _id: ObjectId(id) }
                console.log(filter);
                const result = await productCollection.deleteOne(filter);
                console.log(result);
                res.status(200).json({ result })
            } catch (error) {
                res.status(500).json({
                    status: "Failed to delete product",
                    message: error.message
                })
            }
        })

    } finally {

        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})