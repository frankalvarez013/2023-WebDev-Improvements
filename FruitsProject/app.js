const {MongoClient} = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {useUnifiedTopology: true});

async function run() {
    try {
        await client.connect();
        console.log("Connected Successfully to server");

        const database = client.db('fruitsDB');
        const fruitsCollection = database.collection('fruits');
        const docs = [
          {
            name: "a",
            score: 8,
            review: "yooooo"
          },
          {
            name: "b",
            score: 6,
            review: "Kinda Sour"
          },
          {
            name: "c",
            score: 9,
            review: "Great Stuff!"
          }
        ]
        ////////////////////////////////////
        //To Add many
        ////////////////////////////////////
        // const options = { ordered: true };
        // const result = await fruitsCollection.insertMany(docs, options);
        ////////////////////////////////////
        //To Find the documents and list them here
        ////////////////////////////////////
        // const query1 = {name: "a"};
        // const options1 = {
        //   // sort returned documents in ascending order by title (A->Z)
        //   sort: { title: 1 }
        // };
        // const cursor = fruitsCollection.find(query1, options1);
        // await cursor.forEach(function(fruit){
        //   console.log(fruit);
        });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
