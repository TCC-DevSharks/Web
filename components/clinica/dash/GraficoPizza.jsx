import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from '../../../styles/Dash.module.scss';

export default function GraficoPizza() {
    
    const IdClinica = typeof window !== 'undefined' ? localStorage.getItem('id') : null;
    const [dataClinica, setDataClinica] = useState()

    useEffect(() => {
        function getClinica() {
          const url = `http://10.107.144.6:3000/clinica/data/${IdClinica}`;
          axios.get(url)
            .then(response => {
              const data = response.data;
              
              setDataClinica(data);
            })
            .catch(error => {
              console.error(error);
            });
        }
    
        getClinica();
      }, [IdClinica]);

    const data = {
        labels: ['Homens', 'Mulheres'],
        datasets: [
            {
                data: [dataClinica?.clinica.profissionais_masculinos, dataClinica?.clinica.profissionais_femininos],
                backgroundColor: ['#C6E4FE','#B6B6F6'],
            },
        ],
    };


    return (
        <div className={styles.grafico}>
            <Doughnut data={data} />
        </div>
    );

}