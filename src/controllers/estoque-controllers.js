const helper = require('../helpers/helper');
const Estoque = require('../models/estoque');
const mongoose = require('mongoose');

//req é = a requisição (request) que são os dados de entrada da rota.
//res é = a resposta (response)  que são os dados de saida da rota.

const obterTodosProduto = (req, res) => {
    Estoque.find()
        .then(estoques => res.status(200).json(estoques))
        .catch(err => res.status(500).json(err));
}

const obterProdutoPorId = (req, res) => {
    //{ id } = req.params retorna o Id do estoque 
    // req.params: É quando o ID vem na URL depois da barra (/)
    const {
        id
    } = req.params;
    Estoque.findById(id)
        .then(estoques => res.status(200).json(estoques))
        .catch(err => res.status(500).json(err));

}

const entradaEstoque = (req, res) => {
    // req.body é o corpo da requisição. Exemplo: E-mail (assunto, destinatario e corpo)
    const {
        modelo,
        cor,
        tamanho,
        quantidade
    } = req.body;
    const novoEstoque = new Estoque({
        modelo: modelo,
        cor: cor,
        tamanho: tamanho,
        quantidade: quantidade,
    })
    novoEstoque.save() //then: Depois que salva retorna o que foi criado com status 201
        .then(estoque => res.status(201).json(estoque))
        .catch(err => res.status(500).json(err)); //Catch: Em caso de erro retorna para o insominia 
}

const atualizarEstoque = (req, res) => {
    const { id } = req.params;
    // verifica se o ID é valido para o banco de dados
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            mensagem: 'ID não é válido'
        });
        return;
    }

    Estoque.findByIdAndUpdate(id, req.body)
        .then(() => res.status(200).json({
            mensagem: 'Atualizado com sucesso'
        }))
        .catch(err => res.status(500).json(err));
}

/**
 * DELETE
 * desc: Exclui um registro de estoque por ID
 */
const excluirEstoque = (req, res) => {
    const {
        id
    } = req.params;

    //encontar estoque por ID e depois excluir
    Estoque.findByIdAndDelete(id)
        .then(() => res.status(200).json('Estoque excluido com sucesso!'))
        .catch(err => res.status(500).json(err));
}

const atualizarQuantidadeEstoque = (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body

    Estoque.findByIdAndUpdate(id, { quantidade })
    .then(() => res.status(200).json('Quantidade atualizada com sucesso!'))
    .catch(err => res.status(500).json(err));


}

module.exports = {
    atualizarQuantidadeEstoque,
    obterTodosProduto,
    obterProdutoPorId,
    entradaEstoque,
    atualizarEstoque,
    excluirEstoque
}