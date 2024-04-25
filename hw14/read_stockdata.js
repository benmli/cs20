// getting node modules
const readline = require('readline');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const connStr = "mongodb+srv://benjaminli:Strawberry13!@cluster0.7xrbawh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// connect to MongoDB database
client = new MongoClient(connStr);
async function readStocks() {
    try {
        await client.connect();

        var dbo = client.db("Stock");
        var collection = dbo.collection("PublicCompanies");

        // read from CSV file
        var myFile = readline.createInterface({
            input: fs.createReadStream('companies-1.csv')
        });

        myFile.on('line', async function(line) {
            console.log("Current line: " + line);

            // split line by commas and make new document accordingly
            var lineArray = line.split(',');
            var newDoc = {
                company: lineArray[0],
                ticker: lineArray[1],
                price: lineArray[2]
            };
            
            await collection.insertOne(newDoc);
        });
    } catch(err) {
        console.log("Error: " + err);
    }
}

readStocks();