import axios from 'axios';
import styles from './../styles/Chat.module.css'; // Importe os estilos do arquivo CSS da página
import { useEffect } from 'react';
import React, { useState } from 'react';


const ConversaPaciente = (
    {   
        foto,
        nome,
        email,
        usuario,
        onPacienteClick
    }
) => {
    const [listpacientes, setPacientes] = useState();
    

    function getPaciente() {
        axios.get(`http://localhost:3000/user/one?email=${email}&usuario=${usuario}`)
            .then(response => {
                const data = response.data;
                if(data._id !== undefined)
                localStorage.setItem('_id', data._id);
                else
                localStorage.setItem('_id',"")
                console.log(data._id);
            })
            .catch(error => {
                console.error(error);
            });
    }
    var id
    
    ;
    return (
        <div onClick={() => (getPaciente(),
            id = localStorage.getItem('_id'),
            console.log(id)
        )}>
            <div onClick={() => onPacienteClick(
                {id, nome, foto, email, usuario}
            )}>
                <div className={styles['paciente']}>
                    <div className={styles['imagem-div']}>
                        <img className={styles['img']} src={foto} alt="" />
                    </div>
                    <div className={styles['descricao-paciente-chat']}>
                        <div className={styles['nome-paciente']}> {nome}</div>

                        <div className={styles['previa-mensagem']}>oiiii wrb hewh HWvnweiovnioW</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversaPaciente;