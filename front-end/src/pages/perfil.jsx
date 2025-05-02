import './perfil.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Perfil() {
    const [usuario, setUsuario] = useState({}); // Estado para armazenar os dados do usuário
    const [editando, setEditando] = useState(false); // Estado para controlar o modo de edição
    const [formData, setFormData] = useState({}); // Estado para armazenar os dados do formulário
    const navigate = useNavigate();

    // Função para buscar os dados do usuário
    useEffect(() => {
        fetch('/api/usuario') // Substitua pela URL da sua API
            .then((response) => response.json())
            .then((data) => {
                setUsuario(data);
                setFormData(data); // Inicializa o formulário com os dados do usuário
            })
            .catch((error) => console.error('Erro ao buscar os dados do usuário:', error));
    }, []);

    // Função para alternar para o modo de edição
    const handleEditar = () => {
        setEditando(true);
    };

    // Função para salvar as alterações
    const handleSalvar = () => {
        fetch('/api/usuario', {
            method: 'PUT', // Método HTTP para atualizar os dados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Envia os dados atualizados
        })
            .then((response) => response.json())
            .then((data) => {
                setUsuario(data); // Atualiza os dados do usuário
                setEditando(false); // Sai do modo de edição
            })
            .catch((error) => console.error('Erro ao salvar os dados do usuário:', error));
    };

    // Função para lidar com mudanças nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const voltar = () => {
        navigate('/homepage');
    };

    return (
        <div className="perfil">
            <div className="headerh">
                <h1>Perfil</h1>
                <button onClick={voltar}>voltar</button>
            </div>
            <div className="info">
                {editando ? (
                    // Formulário de edição
                    <>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome || ''}
                            onChange={handleChange}
                            placeholder="Nome"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            name="renda"
                            value={formData.renda || ''}
                            onChange={handleChange}
                            placeholder="Renda"
                        />
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha || ''}
                            onChange={handleChange}
                            placeholder="Senha"
                        />
                        <input
                            type="number"
                            name="diaRecebe"
                            value={formData.diaRecebe || ''}
                            onChange={handleChange}
                            placeholder="Dia que recebe"
                        />
                        <button onClick={handleSalvar}>Salvar</button>
                    </>
                ) : (
                    // Exibição dos dados
                    <>
                        <h3>Nome: {usuario.nome}</h3>
                        <h3>Email: {usuario.email}</h3>
                        <h3>Renda: {usuario.renda}</h3>
                        <h3>Senha: {usuario.senha}</h3>
                        <h3>Dia que recebe: {usuario.diaRecebe}</h3>
                        <button onClick={handleEditar}>Editar</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Perfil;