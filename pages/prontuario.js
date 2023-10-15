import React from 'react';
import styles from './../styles/Prontuario.module.css';
import TituloSecao from '@/components/TituloSecao';
import PacienteProntuario from '@/components/PacienteProntuario';

const Prontuario = () => {
    return (
        <div className={styles['prontuario-container']}>
            <TituloSecao title="Gerenciar Prontuários" />

            <div className={styles['prontuarios']}>
                <div className={styles['input-area']}>
                    <input type="text" placeholder='Pesquise um paciente' />
                </div>

                <div className={styles['pacientes']}>
                    <span className={styles['title-pacientes']}>Todos os pacientes:</span>
                    <div className={styles['container']}>
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Ingryd Shirlley" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome yfufutiente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                        <PacienteProntuario foto="https://img.freepik.com/fotos-gratis/mulher-adoravel-com-sorriso-cansado-tirando-foto-de-si-mesma-no-espaco-da-cidade_197531-7727.jpg?size=626&ext=jpg&ga=GA1.1.851539966.1695388922&semt=ais" nome="Nome do Paciente" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prontuario;
