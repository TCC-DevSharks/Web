import axios from 'axios';
import styles from '../../../pages/medico/chat/Chat.module.css';
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
    const [id, setId] = useState("");
    var _id
    
    function getPaciente() {

        axios.get(`https://api-bebevindo.azurewebsites.net/user/one?email=${email}&usuario=${usuario}`)
            .then(response => {
                const data = response.data;
                    setId(data._id);
            
            })
            .catch(error => {
                console.error(error);
            });
    }
 
    useEffect(() => {
        if (id === "") {
            getPaciente();
        }
    }, [id]);
    
    ;
    return (
  <div onClick={() => (getPaciente(),
    _id = id,
    onPacienteClick(
        {_id, nome, foto, email, usuario}
    )
        )}>
                <div className={styles['paciente']}>
                    <div className={styles['imagem-div']}>
                        <img className={styles['img']} src={foto} alt="" />
                    </div>
                    <div className={styles['descricao-paciente-chat']}>
                        <div className={styles['nome-paciente']}> {nome}</div>

                    </div>
                </div>
        </div>
    );
};

export default ConversaPaciente;