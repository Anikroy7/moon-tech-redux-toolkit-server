

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://moon_tech:KOG4XEgQqFqwrvt7@cluster0.p346hyq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    module.exports.collection = client.db("moon_tech").collection("products");
    // perform actions on the collection object

    // client.close();
    console.log('connected again')
});





