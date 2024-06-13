const express = require('express')
const app = express()
const port = process.PORT || 5000;
const cors = require('cors')

//middleware
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//mongodb config

const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = "mongodb+srv://mern-book-store:1w5u1UVJDJBWrqZW@cluster0.jd03vhg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //CREATE A COLLECTION OF DOCUMENT
        const bookCollection = client.db("BookInventory").collection("books");

        //ADD BOOK
        app.post("/upload-book", async(req, res) =>{
            const data = req.body;
            const result = await bookCollection.insertOne(data);
            res.send(result);
        })

        //GET ALL BOOKS
        app.get("/all-books", async(req, res) =>{
            const books =  bookCollection.find();
            const result = await books.toArray();
            res.send(result);
        })

        //UPDATE A BOOK
        app.patch("/book/:id", async(req,res)=>{
            const id = req.params.id;
            //console.log(id);
            const updateBookData =req.body;
            const filter = {_id: new ObjectId(id)};

            const updateDoc = {
                $set: {
                    ...updateBookData
                },
            }
            const options = { upsert: true };
            //UPDATE
            const result = await bookCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //DELETE A BOOK
        app.delete("/book/:id" , async(req, res) =>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await  bookCollection.deleteOne(filter);
            res.send(result);
        })

        //FIND BY CATEGORY
        app.get("'all-books" , async(req, res) =>{
            let query = {};
            if(req.query?.category){
                query = {category: req.query.category}
            }
            const result = bookCollection.find(query).toArray();
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
