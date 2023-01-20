//require the Mongoose package (after running >npm i mongoose in Hyper to install it)
const mongoose = require('mongoose');

//connect to MongoDB by specifying port to access MongoDB server
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/FruitsDB');
  }

//create a SCHEMA that sets out the fields each document will have and their datatypes
const fruitSchema = new mongoose.Schema ({
	name: String,
	rating: Number,
	review: String
})

//create a MODEL
const Fruit = new mongoose.model ("Fruit", fruitSchema)

//create a DOCUMENT
const fruit = new Fruit ({
	name: "Apple",
	rating: 7,
	review: "Great!"
})

//save the document
fruit.save()

//**CHALLENGE: Set up a people database with one document and two fields**//
//create a SCHEMA
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

//create a MODEL
const Person = mongoose.model('Person', personSchema);

//create a DOCUMENT
const person = new Person({
  name: "John",
  age: 37
});

//Save it
person.save();


// Replace the uri string with your MongoDB deployment's connection string.
// const {MongoClient} = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri, {useUnifiedTopology: true});
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected Successfully to server");
//
//         const database = client.db('fruitsDB');
//         const fruitsCollection = database.collection('fruits');
//         const docs = [
//           {
//             name: "a",
//             score: 8,
//             review: "yooooo"
//           },
//           {
//             name: "b",
//             score: 6,
//             review: "Kinda Sour"
//           },
//           {
//             name: "c",
//             score: 9,
//             review: "Great Stuff!"
//           }
//         ]
//         ////////////////////////////////////
//         //To Add many
//         ////////////////////////////////////
//         // const options = { ordered: true };
//         // const result = await fruitsCollection.insertMany(docs, options);
//         ////////////////////////////////////
//         //To Find the documents and list them here
//         ////////////////////////////////////
//         // const query1 = {name: "a"};
//         // const options1 = {
//         //   // sort returned documents in ascending order by title (A->Z)
//         //   sort: { title: 1 }
//         // };
//         // const cursor = fruitsCollection.find(query1, options1);
//         // await cursor.forEach(function(fruit){
//         //   console.log(fruit);
//         });
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
