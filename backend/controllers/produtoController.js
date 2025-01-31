const { Produto } = require('../models');

// Listar produtos
exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar produtos' });
    }
};

// Buscar um produto
exports.buscarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
};

// Criar um produto
exports.criarProduto = async (req, res) => {
    try {
        const { nome, quantidade, valor } = req.body;
        if (!nome || !quantidade || !valor) {
            return res.status(400).json({ erro: 'Preencha todos os campos' });
        }
        const produto = await Produto.create({ nome, quantidade, valor });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar produto' });
    }
};

// Atualizar um produto existente
exports.atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, quantidade, valor } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

        await produto.update({ nome, quantidade, valor });
        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar produto' });
    }
};

// Excluir um produto
exports.excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

        await produto.destroy();
        res.json({ mensagem: 'Produto excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir produto' });
    }
}

// Incrementar a quantidade de um produto
exports.incrementarQuantidade = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

        produto.quantidade++;
        await produto.save();
        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao incrementar quantidade' });
    }
}

// Decrementar a quantidade de um produto
exports.decrementarQuantidade = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

        if (produto.quantidade > 0) {
            produto.quantidade--;
            await produto.save();
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao decrementar quantidade' });
    }
};