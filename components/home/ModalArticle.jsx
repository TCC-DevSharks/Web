import React from "react";
import styles from "./Article.module.scss";

function ArticleModal({ article, onClose }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={article.imagem} alt="img-article" />
        </div>
        <div className={styles.modalContent}>
          <h2>{article.titulo}</h2>

          <p>{article.descricao}</p>

          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;
