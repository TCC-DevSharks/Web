import React from 'react'
import styles from '../home/Article.module.scss'


function Articles() {
    return (
        <div className={styles.new}>
            <div className={styles.image_card}>
                <img className={styles.img_card} src='/images/article-ex.png' alt='img-article'></img>
            </div>

            <div className={styles.author_new}>
                <div className={styles.author}>
                    <i className="fa-solid fa-calendar"></i> 3 Maio, 2023
                </div>
            </div>

            <div className={styles.title}>
                Blog title goes here
            </div>

            <div className={styles.desc_new}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quibusdam.
            </div>

            <button className={styles.more}>
                learn more <i className="fa-solid fa-square-caret-right"></i>
            </button>
        </div>
    );
}

export default Articles;