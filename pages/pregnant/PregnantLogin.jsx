import Image from 'next/image';
import React from 'react';
import Header from '../../components/home/header/Header'
import styles from '../pregnant/PregnantLogin.module.scss';
import imagem from "../../public/images/mobile.png"

function PregnantLogin() {
    return (
        <div>
            <Header />
            <div className={styles.p_login_container}>
                <div className={styles.svg_1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="232" height="302" viewBox="0 0 232 302" fill="none">
                        <path d="M232 34.8043C232 98.6175 64.9432 101.767 1.45115 302C-51.1473 302 -61 193.81 -61 129.996C-61 66.183 -18.3605 14.4521 34.238 14.4521C86.8365 14.4521 232 -29.009 232 34.8043Z" fill="#B6B6F6" />
                    </svg>
                </div>
                <div className={styles.center_content}>
                    <Image width={800} height={850} className={styles.download} src={imagem} alt="" />
                    <div className={styles.phrase}>
                    <div className={styles.install}>
                    <h4 className={styles.h44}>Instale nosso</h4>
                    <h4 className={styles.h4}>aplicativo</h4>
                    </div>
                    <h4 className={styles.h44}>para uma melhor</h4>
                    <h4 className={styles.h4}>experiência.</h4>
                    </div>
                </div>
                <div className={styles.svg_2}>
                <svg xmlns="http://www.w3.org/2000/svg" width="451.097" height="364.74" viewBox="0 0 394 295" fill="none">
                    <path d="M447 208.629C447 293.129 380.067 361.629 297.5 361.629C214.934 361.629 0.5 385.5 0.5 301C0.5 216.5 447 208.629 392.5 0C475.067 0 447 124.13 447 208.629Z" fill="#B6B6F6" />
                </svg>
                </div>
               
            </div>
        </div>
    );
};

export default PregnantLogin;

