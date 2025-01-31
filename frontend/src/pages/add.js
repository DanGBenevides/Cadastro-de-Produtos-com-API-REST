import { useState } from 'react';
import { useRouter } from 'next/router';
import api from './api/api.js';
import Link from 'next/link.js';

export default function NovoProduto() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post('/', { nome, quantidade: Number(quantidade), valor: Number(valor) });
            setAlertMessage('Produto adicionado com sucesso!');
            setAlertType('success');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error) {
            setAlertMessage('Erro ao adicionar produto');
            setAlertType('error');
            console.error('Erro ao adicionar produto: ', error);
        }
    }

    return (
        <div className='min-h-screen bg-gray-400 flex flex-col items-center p-4 md:p-8'>
            <h1 className='text-3xl font-bold mb-4'>Adicionar Produto</h1>
            {alertMessage && (
                <div
                    className={`w-full max-w-xs p-4 mb-4 text-black rounded-md shadow-md ${
                        alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {alertMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className='bg-white p-6 shadow-md rounded-lg w-full max-w-md'>
                <div>
                    <label className='block mb-1 font-bold text-black'>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className='w-full p-2 border rounded text-black'
                        required
                    />
                </div>
                <div className='mt-4'>
                    <label className='block mb-1 font-bold text-black'>Quantidade:</label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className='w-full p-2 border rounded text-black'
                        required
                    />
                </div>
                <div className='mt-4'>
                    <label className='block mb-1 font-bold text-black'>Valor:</label>
                    <input
                        type="number"
                        step="0.10"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className='w-full p-2 border rounded text-black'
                        required
                    />
                </div>
                <button type='submit' className='mt-4 w-full bg-blue-500 text-white p-2 rounded'>
                    Salvar
                </button>
                <Link href='/'>
                    <button className='mt-4 w-full bg-red-500 text-white p-2 rounded'>
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
    
}