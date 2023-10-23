import { Doughnut } from 'react-chartjs-2';
import styles from '../../../styles/Dash.module.scss';


export default function GraficoPizza() {
    const data = {
        labels: ['Homens', 'Mulheres'],
        datasets: [
            {
                data: [50, 25],
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