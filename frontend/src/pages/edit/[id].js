import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../api/api.js";
import Link from "next/link.js";

export default function EditarProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            api.get(`/${id}`)
                .then((res) => {
                    setNome(res.data.nome);
                    setQuantidade(res.data.quantidade);
                    setValor(res.data.valor);
                })
                .catch((err) => console.error('Erro ao buscar produto: ', err));
        }
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.put(`/${id}`, { nome, quantidade: Number(quantidade), valor: Number(valor)});
            setAlertMessage('Produto atualizado com sucesso!');
            setAlertType('success');
            setTimeout(() => {
                router.push('/');
            }, 1000)
        } catch (error) {
            setAlertMessage('Erro ao atualizar produto');
            setAlertType('error');
            console.error('Erro ao atualizar produto: ', error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-400 flex flex-col items-center p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-4">Editar Produto</h1>
      
          {alertMessage && (
            <div
              className={`w-full max-w-xs p-4 mb-4 text-black rounded-md shadow-md ${
                alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {alertMessage}
            </div>
          )}
      
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
            <div className="mt-4">
              <label className="block mb-1 font-bold text-black">Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
      
            <div className="mt-4">
              <label className="block mb-1 font-bold text-black">Quantidade:</label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
      
            <div className="mt-4">
              <label className="block mb-1 font-bold text-black">Valor (R$):</label>
              <input
                type="number"
                step="0.10"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
      
            <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
              Salvar
            </button>
      
            <Link href='/'>
              <button className="mt-4 w-full bg-red-500 text-white p-2 rounded">Cancelar</button>
            </Link>
          </form>
        </div>
      );      
}