import React from 'react'
import styles from './SectionArticles.module.scss'
import Article from './Article'

function SectionArticles(){
    return(
        <section className={styles.articles}>
            <div className={styles.description__ex}>
                Nossos artigos
            </div>

            <div className={styles.news}>
                <Article/>
                <Article/>
                <Article/>
                <Article/>
            </div>
       </section>
    );
}

export default SectionArticles;