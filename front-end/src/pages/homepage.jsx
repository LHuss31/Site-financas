import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function Homepage() {
    const [showModal, setShowModal] = useState(false);
    const [usuario, setUsuario] = useState({ nome: '', diaRecebe: 15 }); // Adicione o dia de pagamento
    const [categorias, setCategorias] = useState([
        { nome: 'Dinheiro Disponível', valor: 1000 }, // Categoria inicial
    ]);
    const [diasParaPagamento, setDiasParaPagamento] = useState(0); // Estado para armazenar os dias restantes
    const navigate = useNavigate();

    useEffect(() => {
        const nomeUsuario = 'Lucas'; // Simula a obtenção do nome do usuário
        const diaRecebe = 2; // Simula o dia de pagamento
        setUsuario({ nome: nomeUsuario, diaRecebe });

        // Calcula os dias restantes para o pagamento
        const hoje = new Date();
        const diaAtual = hoje.getDate();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        let diasRestantes;
        if (diaRecebe >= diaAtual) {
            diasRestantes = diaRecebe - diaAtual; // Pagamento ainda neste mês
        } else {
            const ultimoDiaDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
            diasRestantes = ultimoDiaDoMes - diaAtual + diaRecebe; // Pagamento no próximo mês
        }

        setDiasParaPagamento(diasRestantes); // Atualiza o estado com os dias restantes
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAdicionarCategoria = (e) => {
        e.preventDefault();
        const nomeCategoria = e.target.nome.value;
        const valorCategoria = parseFloat(e.target.valor.value);

        if (!nomeCategoria || isNaN(valorCategoria) || valorCategoria <= 0) {
            alert('Por favor, insira um nome e um valor válido para a categoria.');
            return;
        }

        setCategorias([...categorias, { nome: nomeCategoria, valor: valorCategoria }]);
        setShowModal(false); // Fecha o modal após adicionar a categoria
    };

    const perfil = () => {
        navigate('/perfil');
    };

    // Dados do gráfico de pizza
    const data = {
        labels: categorias.map((categoria) => categoria.nome),
        datasets: [
            {
                label: '',
                data: categorias.map((categoria) => categoria.valor),
                backgroundColor: [
                    'black', // Vermelho
                    '#36A2EB', // Azul
                    '#FFCE56', // Amarelo
                    '#4BC0C0', // Verde
                    '#9966FF', // Roxo
                    '#FF9F40', // Laranja
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="telas">
            <div className="Headerh">
                <h1>Welcome {usuario.nome}</h1>
                <button className="perfil-button" onClick={perfil}>Perfil</button>
            </div>
            <div className="tela">
                <div className="left">
                    <h2>Dias para receber o pagamento: {diasParaPagamento}</h2> {/* Exibe os dias restantes */}
                    <button type="button" onClick={handleOpenModal}>
                        Adicionar categoria
                    </button>
                </div>

                <div className="Right">
                    <h2>Distribuição de Gastos</h2>
                    <Pie data={data} />
                </div>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Adicionar Categoria</h2>
                            <form onSubmit={handleAdicionarCategoria}>
                                <input type="text" name="nome" placeholder="Nome da categoria" />
                                <input type="number" name="valor" placeholder="Valor inicial" />
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={handleCloseModal}>
                                    Fechar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Homepage;