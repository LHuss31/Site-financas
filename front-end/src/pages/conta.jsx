import React, { useState } from 'react';
import './conta.css';
import { useNavigate } from 'react-router-dom';

function Conta() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginSenha, setLoginSenha] = useState('');
    const navigate = useNavigate();

    const handleCriarConta = (e) => {
        e.preventDefault();
        if (senha !== confirmacaoSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        console.log('Criar conta:', { email, senha });
        // Aqui você pode enviar os dados para o back-end
        navigate('/welcome');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login:', { loginEmail, loginSenha });
        // Aqui você pode enviar os dados para o back-end
        navigate('/homepage');
    };

    return (
        <div className="container">
            <div className="Header">
                <h1>FINANCE</h1>
            </div>
            <div className="Login-container">
                <div className="criar_conta">
                    <h2>Crie sua conta</h2>
                    <form onSubmit={handleCriarConta}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirmação de senha"
                            value={confirmacaoSenha}
                            onChange={(e) => setConfirmacaoSenha(e.target.value)}
                        />
                        <button type="submit">Criar conta</button>
                    </form>
                </div>
                <div className="login">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={loginSenha}
                            onChange={(e) => setLoginSenha(e.target.value)}
                        />
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Conta;