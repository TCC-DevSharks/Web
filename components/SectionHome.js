import React from "react";
import styles from '../styles/SectionHome.module.css';

function SectionHome() {
    return (
        <section className={styles.home}>
            <div className={styles.container__text_home}>
                <div>
                    <h1>Acompanhe e cuide da sua</h1>
                    <h1>gravidez.</h1>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quas fuga nam deleniti,
                    nisi nulla rem nemo libero blanditiis, molestias
                    ipsa ipsam. Dolores fugiat reiciendis debitis distinctio
                    laboriosam ipsam nihil aliquid.</p>

                <button className={styles.button_home}>Baixe o App!</button>
            </div>

            <div className={styles.container__img_home}>
                <img src="./images/imgHome.png" alt="" />
            </div>
        </section>
    );
}

export default SectionHome;