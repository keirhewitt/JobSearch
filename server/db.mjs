/* Handles Database connection MongoDB Atlas database
    Project0 -> job-listings */

import * as dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config({path: '../.env'});

//const { MongoClient } = require('mongodb');

/* NOTE: Database user password, NOT account password. 
    Go to Database Access -> Edit and then you have to change User password and copy it before exiting that screen */
const client = new MongoClient(process.env.MONGO_URI);

async function connect() {  // Tries to connect, returns error if not
    try {
        await client.connect();
        console.log("Connected to database.")
    } catch (err) { console.error(err); }
}

async function createListing(client, newListing) {  // Add a single listing to the database
    const result = await client.db("listings").collection("listing_data").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function addMultListings(client, listingsArray) { // Add an array of listings to the database
    const result = await client.db("listings").collection("listing_data").insertMany(listingsArray);

    console.log(`${result.insertedCount} new listings created with the follwing id(s):`)
    console.log(result.insertedIds);
}


async function listDatabases(client) {  // Lists all of the MongoDB collections
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

connect();  // Start by trying to connect