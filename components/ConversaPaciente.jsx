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
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    var _id
    
    function getPaciente() {
        setIsLoading(true);
        axios.get(`http://localhost:3000/user/one?email=${email}&usuario=${usuario}`)
            .then(response => {
                const data = response.data;
                if (data._id !== undefined) {
                    setId(data._id);
                    setIsLoading(false);
                } else {
                    setId("");
                    setIsLoading(false);
                }
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
    _id = localStorage.getItem('_id'),
    console.log(_id),
    onPacienteClick(
        {_id: isLoading ? "Carregando..." : id, nome, foto, email, usuario}
    )
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
    );
};

export default ConversaPaciente;