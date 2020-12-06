const mongoose = require('mongoose');
const { Schema } = mongoose;

// String: pq é uma palavra
// Number: Pq é um numero
// (required: true) Siginifica que é obrigatorio a inclusão desta informação

const estoqueSchema = new Schema({    
    modelo: { type: String, required: true },
    cor: { type: String, required: true },
    tamanho: { type: String, required: true },
    quantidade: { type: Number, required: true }
}, { timestamps: true })

const Estoque = mongoose.model('Estoque', estoqueSchema);

module.exports = Estoque;
