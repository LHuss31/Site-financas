import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function Homepage() {
    const [showModal, setShowModal] = useState(false);
    const [usuario, setUsuario] = useState({ name: '', dia: '' });
    const [categorias, setCategorias] = useState([]);
    const [diasParaPagamento, setDiasParaPagamento] = useState(0);
    const navigate = useNavigate();

    // Busca usuário e categorias ao carregar a página
    useEffect(() => {
        const fetchUsuarioECategorias = async () => {
            try {
                const token = localStorage.getItem('token');
                // Busca dados do usuário
                const responseUser = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (responseUser.ok) {
                    const dataUser = await responseUser.json();
                    setUsuario({ name: dataUser.name, dia: dataUser.dia });
                } else {
                    navigate('/conta');
                    return;
                }
                // Busca categorias do usuário
                const responseCat = await fetch('/api/categories', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (responseCat.ok) {
                    const dataCat = await responseCat.json();
                    setCategorias(dataCat);
                }
            } catch (error) {
                alert('Erro ao buscar dados do usuário ou categorias');
            }
        };

        fetchUsuarioECategorias();
    }, [navigate]);

    // Calcula os dias para o pagamento sempre que o usuário for carregado
    useEffect(() => {
        if (usuario.dia) {
            const hoje = new Date();
            const diaAtual = hoje.getDate();
            let dias = usuario.dia - diaAtual;
            if (dias < 0) dias += 30; // Ajuste simples para meses
            setDiasParaPagamento(dias);
        }
    }, [usuario]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAdicionarCategoria = async (e) => {
        e.preventDefault();
        const nameCategoria = e.target.name.value;
        const valorCategoria = parseFloat(e.target.valor.value);

        if (!nameCategoria || isNaN(valorCategoria) || valorCategoria <= 0) {
            alert('Por favor, insira um nome e um valor válido para a categoria.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: nameCategoria, value: valorCategoria }),
            });
            if (response.ok) {
                const data = await response.json();
                setCategorias([...categorias, data.category]);
                setShowModal(false);
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao adicionar categoria');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor');
        }
    };

    const perfil = () => {
        navigate('/perfil');
    };

    const handleExcluirCategoria = async (nameCategoria) => {
        const categoria = categorias.find((cat) => cat.name === nameCategoria);
        if (!categoria) return;
        const confirmacao = window.confirm(`Tem certeza que deseja excluir a categoria "${nameCategoria}"?`);
        if (!confirmacao) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/categories/${categoria._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setCategorias(categorias.filter((cat) => cat._id !== categoria._id));
            } else {
                alert('Erro ao excluir categoria');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor');
        }
    };

    // Dados do gráfico de pizza
    const data = {
        labels: categorias.map((categoria) => categoria.name),
        datasets: [
            {
                label: '',
                data: categorias.map((categoria) => categoria.value),
                backgroundColor: [
                    'black',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="telas">
            <div className="Headerh">
                <h1>Welcome {usuario.name}</h1>
                <button className="perfil-button" onClick={perfil}>Perfil</button>
            </div>
            <div className="tela">
                <div className="left">
                    <h2>Dias para receber o pagamento: {diasParaPagamento}</h2>
                    <button type="button" onClick={handleOpenModal}>
                        Adicionar categoria
                    </button>
                    <button type="button" onClick={() => {
                        const nameCategoria = prompt('Digite o nome da categoria que deseja excluir:');
                        if (nameCategoria) {
                            handleExcluirCategoria(nameCategoria);
                        }
                    }}>
                        Excluir categoria
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
                                <input type="text" name="name" placeholder="Nome da categoria" />
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