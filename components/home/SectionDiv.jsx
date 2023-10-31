import React from "react";
import styles from './SectionDiv.module.scss';

function SectionDiv() {
    return (
        <section className={styles.divLine}>
            <div className={styles.container__text}>
                <div>
                    <h3>Conheça nossos <br/>serviços</h3>
                </div>
            </div>
        </section>
    );
}

export default SectionDiv;