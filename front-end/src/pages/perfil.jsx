import './perfil.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Perfil() {
    const [usuario, setUsuario] = useState({}); // Estado para armazenar os dados do usuário
    const [editando, setEditando] = useState(false); // Estado para controlar o modo de edição
    const [formData, setFormData] = useState({}); // Estado para armazenar os dados do formulário
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsuario(data);
                setFormData(data);
            })
            .catch((error) => console.error('Erro ao buscar os dados do usuário:', error));
    }, []);

    // Função para alternar para o modo de edição
    const handleEditar = () => {
        setEditando(true);
    };

    // Função para salvar as alterações
    const handleSalvar = () => {
        const token = localStorage.getItem('token');
        fetch('/api/auth/editar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsuario(data.user); // O back-end retorna { message, user }
                setEditando(false);
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
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            placeholder="name"
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
                            type="number"
                            name="dia"
                            value={formData.dia || ''}
                            onChange={handleChange}
                            placeholder="Dia que recebe"
                        />
                        <button onClick={handleSalvar}>Salvar</button>
                    </>
                ) : (
                    // Exibição dos dados
                    <>
                        <h3>name: {usuario.name}</h3>
                        <h3>Email: {usuario.email}</h3>
                        <h3>Renda: {usuario.renda}</h3>
                        <h3>Dia que recebe: {usuario.dia}</h3>
                        <button onClick={handleEditar}>Editar</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Perfil;