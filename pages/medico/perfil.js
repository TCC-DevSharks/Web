import React from 'react';
import { RiNotification2Line } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import styles from '../../styles/Perfil.module.css';
import TituloSecao from '../../components/TituloSecao';
import ToggleButton from '../../components/ToggleButton';
import Sidebar from '../../components/Sidebar';

const Perfil = () => {
    return (
        <>
            <Sidebar />
            <div className={styles['perfil-container']}>
                <TituloSecao title="Gerenciar Perfil" />

                <div className={styles['container']}>
                    <div className={styles['options']}>
                        <div className={styles['box-option']}>
                            <div className={styles['title']}>
                                Notificação
                            </div>
                            <div className={styles['description']}>
                                <a> <RiNotification2Line /> </a>Notificações Pop-up
                                <ToggleButton />
                            </div>
                        </div>

                        <div className={styles['box-option']}>
                            <div className={styles['title']}>
                                Conta
                            </div>
                            <div className={styles['description']}>
                                <a> <BsPerson /> </a>Dados Pessoais <div className={styles['seta']}><IoIosArrowForward /></div>
                            </div>
                        </div>

                        <div className={styles['box-option']}>
                            <div className={styles['title']}>
                                Outro
                            </div>

                            <div className={styles['container-description']}>
                                <div className={styles['description']}>
                                    <a> <HiOutlineMail /> </a>Contate-nos <div className={styles['seta']}><IoIosArrowForward /></div>
                                </div>
                                <div className={styles['description']}>
                                    <a> <MdOutlinePrivacyTip /> </a>Politica de Privacidade<div className={styles['seta']}><IoIosArrowForward /></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={styles['tela-box']}>
                        <div className={styles['tela']}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Perfil;


