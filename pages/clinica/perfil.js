import styles from '../../styles/PerfilClinica.module.scss';
import Sidebar from "../../components/clinica/sideBar/SidebarClinica";
import React from 'react';
import { divide } from 'lodash';

export default function Perfil() {
  return (
    <div>
        < Sidebar />
<div className={styles.container_geral}>

<div className={styles.container_dados}>

  <div className={styles.dados_iniciais}>
    <div className={styles.dados_foto}>
      <div className={styles.dados_title}>Dados da Clínica</div>

      <div className={styles.img_img}>
        <img
          src="https://play-lh.googleusercontent.com/lcdNm0UDhiEZFBOdscJap7agVIlOadFlVESsxBhTnapD54zg7za1Y0pMotPVpBXU8yE"
          alt=""
        />
      </div>

      <div className={styles.inputs}>
        <input placeholder='11 949676202' />
        <input placeholder='Amilsilva@gmail.com' />
      </div>
    </div>
  </div>

  <div className={styles.dados_finais}>
    <div className={styles.inputs_row1}>
      <input placeholder='Adicione uma descrição' className='input_descricao'/>
    </div>
    
    <div className={styles.inputs_row2}>
      <input placeholder='CEP' className={styles.input_cep}/>
      <input placeholder='Rua' className={styles.input_rua}/>
      <input placeholder='N' className={styles.input_n}/>
      <input placeholder='Bairro' className={styles.input_bairro}/>
      <input placeholder='Cidade' className={styles.input_cidade}/>
    </div>

    <div className={styles.inputs_row3}>
      <input placeholder='11 949676202' />
      <input placeholder='Amilsilva@gmail.com' />
    </div>
    
    <button className={styles.btn}>Enviar</button>
  </div>
</div>

</div >
    </div>
  )
}