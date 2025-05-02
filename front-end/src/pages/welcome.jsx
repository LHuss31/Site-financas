import './welcome.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome(){
    const [nome, setNome] = useState('');
    const [renda, setRenda] = useState('');
    const [diarecebe, setDiaRecebe] = useState('');
    const navigate = useNavigate();

    const Enviarinfo = (e) => {
        e.preventDefault();
        if(diarecebe > 31){
            alert('Dia que recebe o pagamento invalido!');
            return;
        }
        console.log('Continue', {nome, renda, diarecebe});
        navigate('/homepage');
    };
    return(
        <div className = "container2">
                <div className = "Esquerda">
                    <h1>Bem vindo ao Finance</h1>
                    <h3>Nós somos um site com objetivo de ajudar os outros a ter um controle melhor sobre seu dinheiro. Para continuar, preencha as informações ao lado para uma experiencia mais personalizada</h3>
                </div>
                <div className = "Direita">
                    <form onSubmit = {Enviarinfo}>
                    <input type = "text" placeholder = "Nome" value ={nome} onChange={(e) => setNome(e.target.value)}></input>
                    <input type = "number" placeholder = "Quanto ganha por mês"value ={renda} onChange={(e) => setRenda(e.target.value)}></input>
                    <input type = "number" placeholder = "Que dia Ganha no mês" value ={diarecebe} onChange={(e) => setDiaRecebe(e.target.value)}></input>
                    <button type = "submit">Continue</button>
                    </form>
                </div>
        </div>
    )
}

export default Welcome;