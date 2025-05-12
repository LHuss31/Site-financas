import './welcome.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome(){
    const [name, setname] = useState('');
    const [renda, setRenda] = useState('');
    const [diarecebe, setDiaRecebe] = useState('');
    const navigate = useNavigate();

    const Enviarinfo = async (e) => {
        e.preventDefault();
        if(diarecebe > 31){
            alert('Dia que recebe o pagamento invalido!');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/auth/atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    renda: Number(renda),
                    dia: Number(diarecebe),
                }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/homepage');
            } else {
                alert(data.message || 'Erro ao salvar informações');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor');
        }
    };

    return(
        <div className = "container2">
                <div className = "Esquerda">
                    <h1>Bem vindo ao Finance</h1>
                    <h3>Nós somos um site com objetivo de ajudar os outros a ter um controle melhor sobre seu dinheiro. Para continuar, preencha as informações ao lado para uma experiencia mais personalizada</h3>
                </div>
                <div className = "Direita">
                    <form onSubmit = {Enviarinfo}>
                    <input type = "text" placeholder = "name" value ={name} onChange={(e) => setname(e.target.value)} />
                    <input type = "number" placeholder = "Quanto ganha por mês" value ={renda} onChange={(e) => setRenda(e.target.value)} />
                    <input type = "number" placeholder = "Que dia Ganha no mês" value ={diarecebe} onChange={(e) => setDiaRecebe(e.target.value)} />
                    <button type = "submit">Continue</button>
                    </form>
                </div>
        </div>
    )
}

export default Welcome;