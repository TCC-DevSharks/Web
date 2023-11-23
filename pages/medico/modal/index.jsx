import styles from '../modal/style.module.css';
import { AiFillCloseCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';

export default function Modal({ pacienteInfo, closeModal }) {
  const [dia, mes] = pacienteInfo && pacienteInfo.dataConsulta ? pacienteInfo.dataConsulta.split('/') : ['', ''];
  const [prontuario, selectedPronturario] = useState()
  const [valor, setValor] = useState('')


  const handleChange = (event) => {
    setValor(event.target.value);
  };

  const url = 'https://api-bebevindo.azurewebsites.net/prontuario';

  function postProntuario() {
    axios.post(url, {
      descricao: `${valor}`,
      id_consulta: pacienteInfo.idConsulta
    })

      .then(response => {
        const data = response.data;

        closeModal()
      })
      .catch(error => {
        console.error(error);
      });
  }



  return (
    <div className={styles['modalContainer']}>
      <div className={styles['modalBox']}>
        <div className={styles['modalContent']}>
          <div className={styles['closeButtonModal']} onClick={closeModal}>
            <AiFillCloseCircle style={{ fill: '#fa0000' }} />
          </div>
          <h2 style={{ color: '#464444', fontSize: '2.4rem' }}>
          <p>Paciente: <span style={{ color: '#b6b6f6' }}>{pacienteInfo && pacienteInfo.nome ? pacienteInfo.nome : ''}</span></p>
          </h2>
          <div className={styles['especialidadesBox']}>
            <h4>Especialidade:</h4>
            <div className={styles['boxButtonEspecialidade']}>
            <p>Especialidade: <span style={{ color: '#b6b6f6' }}>{pacienteInfo && pacienteInfo.especialidade ? pacienteInfo.especialidade : ''}</span></p>

            </div>
          </div>
          <div className={styles['datasBox']}>
            <h4>Data:</h4>
            <div className={styles['boxButtonEspecialidade']}>
              <button className={styles['buttonData']}>{dia + '/' + mes}</button>
            </div>
          </div>
          <div className={styles['descricaoBox']}>
            <h4>Descrição:</h4>
            <textarea
              value={valor}
              onChange={handleChange}
              className={styles['inputDescricao']}
              type="text" />
          </div>
          <button onClick={postProntuario} className={styles['buttonEnvModal']}>
            atualizar prontuário <AiOutlineArrowRight style={{ fontSize: '1.4rem', fontWeight: '800' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
