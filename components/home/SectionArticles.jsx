import React, { useState, useEffect } from "react";
import styles from "./SectionArticles.module.scss";
import Articles from "./Article";
import ArticleModal from "./ModalArticle";

function SectionArticles() {
  const [articles, setArticles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedArticle, setSelectedArticle] = useState(null); 

  useEffect(() => {
    fetch("https://api-bebevindo.azurewebsites.net/artigos")
      .then((response) => response.json())
      .then((data) => {
        
        setArticles(data.artigos);
      });
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setModalOpen(false);
  };

  return (
    <section className={styles.articles}>
      <div className={styles.description__ex}>
        Nossos artigos <p>Use o scroll para ver os outros artigos a direita.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.articleScroll}>
          <div className={styles.news}>
            {articles.map((article) => (
              <Articles
                key={article.id}
                title={article.titulo}
                imageUrl={article.imagem}
                onReadMore={() => openModal(article)} 
              />
            ))}
          </div>
        </div>
        {modalOpen && selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={closeModal} 
          />
        )}
      </div>
    </section>
  );
}

export default SectionArticles;
