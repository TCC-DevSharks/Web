import React from 'react';
import { RiNotification2Line } from 'react-icons/ri';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './../styles/Perfil.module.css';
import TituloSecao from '@/components/TituloSecao';

const Perfil = () => {
    return (
        <div className={styles['perfil-container']}>
            <TituloSecao title="Gerenciar Perfil" />
            
            <div className={styles['container']}>
                <div className={styles['options']}>
                    <div className={styles['box-option']}>
                        <div className={styles['title']}>
                            Notification
                        </div>
                        <div className={styles['description']}>
                            <a> <RiNotification2Line /> </a>Pop-up Notification
                        </div>
                    </div>

                    <div className={styles['box-option']}>
                        <div className={styles['title']}>
                            Account
                        </div>
                        <div className={styles['description']}>
                            <a> <BsPerson /> </a>Personal Data <div className={styles['seta']}><IoIosArrowForward /></div>
                        </div>
                    </div>

                    <div className={styles['box-option']}>
                        <div className={styles['title']}>
                            Other
                        </div>

                        <div className={styles['container-description']}>
                            <div className={styles['description']}>
                                <a> <HiOutlineMail /> </a>Contact Us <div className={styles['seta']}><IoIosArrowForward /></div>
                            </div>
                            <div className={styles['description']}>
                                <a> <MdOutlinePrivacyTip /> </a>Privacy Policy <div className={styles['seta']}><IoIosArrowForward /></div>
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
    );
};

export default Perfil;


