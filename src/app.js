const express = require('express');
const app = express();

const mongoose = require('mongoose');
// mongodb://localhost/estoque é a connection string do banco de dados
mongoose.connect('mongodb://localhost/estoque', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(x => console.log(`Connected to mongo Database name "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err))

const estoque = require('./routes/estoque-routes')
app.use(express.json());
app.use('/estoque', estoque);

module.exports = app;
