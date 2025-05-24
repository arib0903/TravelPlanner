import express from "express";
import mongoose from "mongoose";
//
import cors from "cors";
import "dotenv/config"; //This is a library that allows us to use environment variables in our code LIKE PORT IN .ENV
//Creating the server instance which we will use to do HTTP requests
const server = express();
let PORT = process.env.PORT;
console.log(PORT);

server.use(cors()); //Allowing the server to accept requests from other domains
server.use(express.json()); //automatically parses the request body into a JSON object so we can use it

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
