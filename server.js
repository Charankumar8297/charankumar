const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();

dotEnv.config();
app.use(cors())

app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log(" MongoDB Connected Successfully");
}).catch((error) => {
    console.error(" MongoDB Connection Error:", error);
});

app.use(bodyParser.json()); 


const PORT = process.env.PORT || 5000;
console.log(process.env);

app.listen(PORT, () => {
    console.log(` Server Started and running at ${PORT}`);
});
