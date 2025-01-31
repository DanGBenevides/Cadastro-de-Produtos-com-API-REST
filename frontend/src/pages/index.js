import { useEffect, useState } from 'react';
import api from './api/api.js';
import Link from 'next/link.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/')
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos: ", err));
  }, []);

  useEffect(() => {
    console.log(produtos);
  }, [produtos]);

  async function alterarQuantidade(id, tipo) {
    await api.patch(`/${id}/${tipo}`);
    setProdutos(produtos.map((p) => (p.id === id ? { ...p, quantidade: tipo === 'incrementar' ? p.quantidade + 1 : p.quantidade - 1 } : p)))
  }

  async function excluirProduto(id) {
    await api.delete(`/${id}`);
    setProdutos(produtos.filter((p) => p.id !== id));
  }

  function formatValue(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value).replace('R$', '').trim();
  }

  return (
    <div className='min-h-screen bg-gray-400 flex flex-col items-center p-8'>
      <h1 className='text-3xl font-bold mb-4'>Lista de Produtos</h1>
      <Link href='/add'>
        <button className='bg-green-500 text-white px-4 py-2 rounded-md mb-4'>
          + Adicionar Produto
        </button>
      </Link>
      
      <table className='w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-blue-500 text-white'>
          <tr>
            <th className='p-3'>Nome</th>
            <th className='p-3'>Quantidade</th>
            <th className='p-3'>Valor (R$)</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className='border-b text-center'>
              <td className='p-3 text-black'>{produto.nome}</td>
              
              <td className='p-3 flex justify-center'>
                <button
                  onClick={() => alterarQuantidade(produto.id, 'decrementar')}
                  className='bg-red-500 text-white p-2 rounded-l-md'
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className='p-3 text-black'>{produto.quantidade}</span>
                <button
                  onClick={() => alterarQuantidade(produto.id, 'incrementar')}
                  className='bg-blue-500 text-white p-2 rounded-r-md'
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </td>
              
              <td className='p-3 text-black text-right'>
                {formatValue(produto.valor)}
              </td>
              
              <td className='p-3'>
                <Link href={`/edit/${produto.id}`}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    size='lg'
                    className='transition duration-500 ease-in-out fill-current text-yellow-600 cursor-pointer transform hover:scale-125'
                  />
                </Link>
              </td>
              
              <td className='p-3'>
                <FontAwesomeIcon
                  icon={faTrash}
                  size='lg'
                  onClick={() => excluirProduto(produto.id)}
                  className='transition duration-500 ease-in-out fill-current text-red-600 cursor-pointer transform hover:scale-125'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
}