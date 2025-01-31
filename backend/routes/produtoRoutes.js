const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get("/", produtoController.listarProdutos);
router.get("/:id", produtoController.buscarProduto);
router.post("/", produtoController.criarProduto);
router.put("/:id", produtoController.atualizarProduto);
router.delete("/:id", produtoController.excluirProduto);
router.patch("/:id/incrementar", produtoController.incrementarQuantidade);
router.patch("/:id/decrementar", produtoController.decrementarQuantidade);

module.exports = router;