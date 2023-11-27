import { React } from 'react'
import { MdOutlineArticle } from "react-icons/md";
import styles from '../home/Article.module.scss'


function Articles({ title, imageUrl, onReadMore }) {

    return (
        <div className={styles.new}>
            <div className={styles.image_card}>
                <img className={styles.img_card} src={imageUrl} alt='img-article'></img>
            </div>

            <div className={styles.title}>
                {title}
            </div>

            <button className={styles.more} onClick={onReadMore}>
                Leia mais <MdOutlineArticle/>
            </button>
        </div>
    );
}

export default Articles;
