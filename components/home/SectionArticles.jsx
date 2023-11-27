import React, { useState, useEffect } from "react";
import styles from "./SectionArticles.module.scss";
import Articles from "./Article";
import ArticleModal from "./ModalArticle";

function SectionArticles() {
  const [articles, setArticles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar se o modal está aberto
  const [selectedArticle, setSelectedArticle] = useState(null); // Estado para armazenar o artigo selecionado

  useEffect(() => {
    // Aqui você deve fazer a requisição à sua API e obter os artigos desejados
    fetch("https://api-bebevindo.azurewebsites.net/artigos")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados da API:", data); // Adicione esta linha

        // Defina o número máximo de artigos que deseja exibir (neste caso, 4)

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
        Nossos artigos
        <p>Explore nossa coleção de artigos cuidadosamente elaborados para oferecer orientação,
          esclarecer dúvidas comuns e proporcionar apoio durante essa jornada especial da maternidade.
          Descubra informações valiosas sobre a gestação, parto, cuidados pré-natais e muito mais. 
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.articleScroll}>
          <div className={styles.news}>
            {articles.map((article) => (
              <Articles
                key={article.id}
                title={article.titulo}
                imageUrl={article.imagem}
                onReadMore={() => openModal(article)} // Quando o botão é clicado, abre o modal
              />
            ))}
          </div>
        </div>
        {modalOpen && selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={closeModal} // Passa a função para fechar o modal
          />
        )}
      </div>
    </section >
  );
}

export default SectionArticles;
